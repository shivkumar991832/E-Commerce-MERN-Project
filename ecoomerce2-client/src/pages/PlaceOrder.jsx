import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'

import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const { navigate, backendURL , token, cartItems, setCartItems , getCartAmount, delivery_fees, products} = useContext(ShopContext)
  const [method, setMethod] = useState('cod');

  // for address
  const [formData, setFormData] = useState({
     firstName : '',
     lastName : '',
     email : '',
     street : '',
     city : '',
     state: '',
     zipcode : '',
     country : '',
     phone: ''

  })

  const onChangehandler = (e) => {
      const name = e.target.name;
      const value = e.target.value;

      setFormData(data => ({...data, [name] : value}))
  }

  //taking razorpay response detail for payment(extract from order)

  const initPay = (order) => {
     const options = {
          key : import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount : order.amount,
          currency : order.currency,
          name : 'Order Payment',
          description : 'Order Payment',
          order_id : order._id,
          receipt : order.receipt,
          // handler function to call payment integration api
          handler: async (response)=> {
          //this is output after successfull payment
          //in this response we have orderId

          //     console.log(response)

              try {
               //this api will verify the payment that user done payment through razorpay
                const {data} = await axios.post(backendURL+ '/api/order/verifyRazorpay',response, {
                   headers: {token}
                })

                if (data.success) {
                    navigate('/orders')
                    setCartItems({})
                }

              } catch (error) {
               console.log(error)
               toast.error(error.message)
              }
          }
          
     }

     const rzp = new window.Razorpay(options)
     //then open razorpay
     rzp.open()
  }


  const onSubmitHandler =async (e) => {
        e.preventDefault();

        try {
          
          let orderitems = [];
          //getting all items from cartItems
          for (const items in cartItems){
               //getting all sizes of this item
               for(const item in cartItems[items]){
                    //if item is greater them 0 then add to orderitems
                    if (cartItems[items][item] > 0) {
                    const itemInfo = structuredClone(products.find(products => products._id === items))
                    if (itemInfo) { 
                        //if itemInfo is found then add size and quantity to itemInfo
                        itemInfo.size = item;
                        itemInfo.quantity = cartItems[items][item] ;
                        //cartItems[items][item] == quantity
                        orderitems.push(itemInfo)
                    }

                    }
               }
          }

          // console.log(orderitems)
          // data for sending
          let orderData = {
               address : formData,
               items : orderitems,
               amount : getCartAmount() + delivery_fees,
               
          }

          switch (method) {
               //api call for COD order
               case 'cod':
                    const response = await axios.post(backendURL + '/api/order/place', orderData, {
                         headers : {token}
                    })

                    // console.log(response.data)

                    if (response.data.success) {
                         toast.success(response.data.message)
                         setCartItems({}) //clear cart
                         navigate('/orders')
                    }else {
                         toast.error(response.data.message)
                    }
               
                    break;

              case 'stripe':
                  
                 const responseStripe = await axios.post(backendURL + '/api/order/stripe' , orderData , {
                    headers : {token}
                 })
                 console.log(responseStripe.data)
                 if (responseStripe.data.success) {
                    //extract session url
                    const {session_url } = responseStripe.data
                    //send user to this session url
                    window.location.replace(session_url)

                 }else {
                    toast.error(responseStripe.data.message)
                 }

                 break;

             case 'razorpay':
                  const responeRazorpay = await axios.post(backendURL+'/api/order/razorpay', orderData, {
                    headers : {token}
                  })

                  if (responeRazorpay.data.success) {
                    console.log(responeRazorpay.data.order)
                    initPay(responeRazorpay.data.order)
                  }
                 
                 break;

               default:
                    break;
          }

        } catch (error) {
           console.log(error)
           toast.error("Please Login First")
        }
  }
 

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* ------left side ------- */}
       <div className='flex flex-col gap-4 w-full sm:max-w-[480px] '>
            <div className='text-xl sm:text-2xl my-3'>
               <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
            </div>

            <div className='flex gap-3 '>
                 <input required onChange={onChangehandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' placeholder='First Name' type="text" />
                 <input required onChange={onChangehandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' placeholder='Last Name' type="text" />
            </div>
             <input required onChange={onChangehandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' placeholder='Email Address' type="email" />
              <input required onChange={onChangehandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' placeholder='Street' type="text" />

               <div className='flex gap-3 '>
                 <input required onChange={onChangehandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' placeholder='City' type="text" />
                 <input required onChange={onChangehandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' placeholder='State' type="text" />
              </div>
               <div className='flex gap-3 '>
                 <input required onChange={onChangehandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' placeholder='Zipcode' type="number" />
                 <input required onChange={onChangehandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' placeholder='Country' type="text" />
            </div>
                  <input required onChange={onChangehandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' placeholder='Phone Number' type="number" />
           </div>

           {/* ------Right Side------ */}

           <div className='mt-8'>
              <div className='mt-8 min-w-80 '>
                   <CartTotal/>
              </div>

              <div className='mt-12 '>
                  <Title text1={'PAYMENT'} text2={'METHODS'}/>
                  {/* -------Payments Methods Selection */}
                   <div className='flex gap-3 flex-col lg:flex-row '>
                       <div  onClick={()=>{setMethod('stripe')}} className='flex items-center gap-3 border p-2 px-3 cursor-pointer '>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400': ''} `}></p> 
                            <img className='h-5 mx-4' src={assets.stripe_logo} alt="" /> 
                       </div>
                        <div onClick={()=>{setMethod('razorpay')}} className='flex items-center gap-3 border p-2 px-3 cursor-pointer '>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400': ''} `}></p> 
                            <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" /> 
                       </div>
                         <div onClick={()=>{setMethod('cod')}} className='flex items-center gap-3 border p-2 px-3 cursor-pointer '>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400': ''} `}></p> 
                            <p className='text-black text-sm font-medium mx-4'>CASH ON DELIVERY</p> 
                       </div>
                   </div>

                   <div className='w-full text-end mt-8 '>
                           <button type='submit' className='bg-black text-white px-16 py-3 text-sm hover:scale-102'>PLACE ORDER</button>
                   </div>
              </div>
           </div>

           
    </form>
  )
}

export default PlaceOrder
