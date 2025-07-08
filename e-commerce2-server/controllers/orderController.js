// Placing order using COD Method 

import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";
import Stripe from 'stripe';
import razorpay from 'razorpay'

//global variable for currency and delivery charges

const currency = 'usd'
const deliveryCharges = 10


//getway intialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


//Initialize razorpay instance
const razorpayInstance = new razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET
}    
) 


// only for COD methods
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address} = req.body;

        // let date = new Date().toDateString();

        //basis on orderSchema
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod : 'COD',
            payment : false,
            date : Date.now()
        }

        const orderInfo = await orderModel.create(orderData)
        //after placing order, we need to clear the cart items(cartData) of user
        await userModel.findByIdAndUpdate(userId, {cartData : {}})
        res.json({
            success : true,
            orderInfo : orderInfo,
            message : 'Order Placed Successfully'
        })



    } catch (error) {
        console.log(error)
        res.json({
            success : false,
            message : error.message 
        })
    }
}


// Placing order using Stripe Method 

const placeOrderStripe = async (req, res) => {
     try {
          const { userId, items, amount, address} = req.body
          //origin url of the frontend where user iniate the payment
          const {origin} = req.headers;

            const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod : 'Stripe',
            payment : false,
            date : Date.now()
        }

        //creating order in the database
        const orderInfo = await orderModel.create(orderData)
        //after placing order, we need to clear the cart items(cartData) of user
        
        const line_items = items.map((item)=> {
            return {
                price_data : {
                    currency : currency,
                    product_data : {
                        name : item.name,

                    },
                    unit_amount : item.price* 100, //stripe required amount in cents
                },
                quantity : item.quantity,
            }
        })

        line_items.push({
             price_data : {
                    currency : currency,
                    product_data : {
                        name : 'Delivery Charges',

                    },
                    unit_amount : deliveryCharges * 100, //stripe required amount in cents
                },
                quantity : 1,// 1 for only delivery charges
        })


        //creating new session

        const session = await stripe.checkout.sessions.create({
            //for payment either success or failed
            success_url : `${origin}/verify?success=true&orderId=${orderInfo._id}`, //frontend url
            cancel_url : `${origin}/verify?success=false&orderId=${orderInfo._id}`,
            line_items,
            mode : 'payment'

        })

        //when session will create we will got a url where user can go to make payment

        res.status(200).json({
            success : true,
            session_url : session.url,
            message : 'Stripe gataway successfully created'
        })

     } catch (error) {
        console.log(error)
            res.json({
            success : false,
            message : error.message 
        })
     }
}


//to verify stripe payment creating another controller function

const verifyStripe = async (req, res) => {
    //geting userId, user's orderId and success property
    const { userId , orderId, success} = req.body

    try {
        if(success === 'true'){
            await orderModel.findByIdAndUpdate(orderId, {payment : true});
            await userModel.findByIdAndUpdate(userId, {cartData : {}} );

            res.status(200).json({
                success: true,
                message : "payment success"
            })
        }else {
            //if payment failed order will be deleted
            await orderModel.findByIdAndDelete(orderId)
            res.json({
                success : false
            })
        }
    } catch (error) {
          console.log(error)
            res.json({
            success : false,
            message : error.message 
        })
    }

}



// Placing order using RazorPay Method 

const placeOrderRazorpay = async (req, res) => {
     try {
         const { userId, items, amount, address} = req.body
         
            const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod : 'razorpay',
            payment : false,
            date : Date.now()
        }

           const orderInfo = await orderModel.create(orderData)

           // creating options for payment

           const options = {
            amount : amount*100,
            currency : currency.toUpperCase(),
            receipt : orderInfo._id.toString()
           }

           //using this option creating new order of razorpay
           await razorpayInstance.orders.create(options, (error, order)=>{
              if (error) {
                console.log(error)
                return res.json({
                    success : false,
                    message  : error.message
                })}

                res.json({
                    success : true,
                    order: order
                })


           })


     } catch (error) {
         console.log(error)
            res.json({
            success : false,
            message : error.message 
        })
     }
}

//to verify razorpay payment || creating new controller

const verifyRazorpay = async (req, res)=>{
    try {
        //sending razorpay_order_id from frontend to backend
        const { userId , razorpay_order_id } = req.body

        //order details save in orderInfo variable
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        // console.log(orderInfo)
        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, {payment : true})
            await userModel.findByIdAndUpdate(userId, {cartData : {}})
            res.json({
                success : true,
                message : "Payment Successfull Via Razorpay"
            })
        }else {
            res.json({
                 success : true,
                 message : "Payment Faild"
            })
        }


    } catch (error) {
          console.log(error)
            res.json({
            success : false,
            message : error.message 
        })
    }
}





// All orders data for admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({}) // sorting by date in descending order
        res.status(200).json({
            success : true,
            orders : orders,
            message : "All orders fetched successfully"
        })
    } catch (error) {
         console.log(error)
            res.json({
            success : false,
            message : error.message 
        })
    } 
}


//individual User's all orders data
const userOrders = async (req, res) => {
      try {
        const { userId } = req.body;
        const orders = await orderModel.find({userId})
        
        res.status(200).json({
            success : true,
            orders : orders,
            message : 'User orders fetched successfully'
        })
      } catch (error) {
            console.log(error)
            res.json({
            success : false,
            message : error.message 
        })
      }
}

//update order status from admin panel(only admin can update it)
const updateStatus = async (req, res) => {
     try {
        const {orderId, status} = req.body;
        await orderModel.findByIdAndUpdate(orderId, {status : status})
        res.json({
            success : true,
            message : 'Order status updated successfully'
        })

     } catch (error) {
         console.log(error)
            res.json({
            success : false,
            message : error.message 
        })
     }
}



export {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorpay}

