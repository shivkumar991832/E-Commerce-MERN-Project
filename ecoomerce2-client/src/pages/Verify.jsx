import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios'
import {toast} from 'react-toastify'
const Verify = () => {

    const { navigate, token, setCartItems,backendURL } = useContext(ShopContext);
    const [searchParams, setSearchParams] = useSearchParams();

     // we can see this url after complete successfull payment
    // http://localhost:5177/verify?success=true&orderId=6865305be2c8e836c643e625

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
         try {
            
            if (!token) {
                return null // its will be stop execution
            }

            //api calling to verify the stripe

            const response = await axios.post(backendURL + '/api/order/verifyStripe', {orderId, success}, {
                headers : {token}
            })

            if (response.data.success) {
                setCartItems({}) // cart Data will be cleared
                navigate('/orders')
            }else{
                navigate('/cart')
            }

         } catch (error) {
            console.log(error)
            toast.error(error.message)
         }
    }

    useEffect(() => {
      verifyPayment()
    }, [token])
    

  return (
    <div>
      
    </div>
  )
}

export default Verify