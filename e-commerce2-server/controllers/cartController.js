

// add product to user's cart

import userModel from "../models/user.model.js";

const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;
        const userData = await userModel.findById(userId)
        console.log("userData", userData);
        //extracting cartData from userData
        // const { cartData } = userData;
        let cartData =await userData.cartData;
        
        // check if item already exists in cart
        if (cartData[itemId]) {
            //if item already exists in cart, check for size
            if (cartData[itemId][size]) {
                //if item with size already exists in cart, increment thr quantity
                cartData[itemId][size] += 1;
            }else {
                //if item with size doestn't exists in cart, add it with quantity 1
                cartData[itemId][size] = 1;
            }
        } else {
            //if item doesn't exists in cart, add it with size and quantity 1
            cartData[itemId] = {};
            cartData[itemId][size] = 1;

        }

        //update userData with new updated cartData
        await userModel.findByIdAndUpdate(userId, {cartData}, {new: true})
        res.status(200).json({
            success : true,
            message : "Item added to cart successfully"
        })


    } catch (error) {
        console.log(error)
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

//logic for update user's cart

const updateCart = async (req, res) => {
    try {
        //On api call, we shall provide itemId, size, quantity 
        const { userId, itemId, size, quantity } = req.body;
        const userData = await userModel.findById(userId)
        let cartData =await userData.cartData;

        //update the quantity of product in the cart data
        cartData[itemId][size] = quantity

        //save the updated cartData in the database
        await userModel.findByIdAndUpdate(userId, {cartData}, {new: true})
        res.status(200).json({
            success : true,
            message : "Cart updated successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

//logic for get user's cart data
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId)
        let cartData =await userData.cartData;
        res.status(200).json({
            success : true,
            cartData : cartData,
            message : "Cart data fetched successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}


export {addToCart, updateCart, getUserCart}