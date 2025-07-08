import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'
import { toast } from 'react-toastify'

const Order = () => {
  
  const {backendURL, token, currency } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])


  //fetching orders data from backend of individual user

  const fetchOrdersData = async () => {
    try {
      
     if (!token) {
        return null
     } else {
        const response = await axios.post(backendURL + '/api/order/userorders', {}, {
          headers : {token}
        })

        // console.log(response.data)
        if (response.data.success) {
          let allOrdersItem = []
          
          //orders is an array of objects
          //inside a orders object there is an items array
          // so we need to map through orders and then items(double map)
          response.data.orders.map((order) => {
             order.items.map((item)=> {
                 item['status'] = order.status //adding status to each item(bahar se add kiya hai)
                 item['payment'] = order.payment //adding payment to each item
                 item['paymentMethod'] = order.paymentMethod // adding paymentMethod to each item
                 item['date'] = order.date // adding date to each item
                 allOrdersItem.push(item) // pushing item to allOrdersItem array
             })
          } )

          // console.log(allOrdersItem)
          setOrderData(allOrdersItem.reverse())  // reverse to show latest orders to the top
          
        }else {
          toast.error('Something went wrong while fetching orders data')
        }
     }

    } catch (error) {
      
    }
  }


  //run above function when page reloaded
  useEffect(() => {
     fetchOrdersData()
  }, [token])
  
  

  return (
    <div className='border-t pt-16 ' >
        <div className='text-2xl '>
          <Title text1={'MY'} text2={'ORDERS'}/>
        </div>

       {/* for Orders data */}
        <div >
          
          {
            orderData.map((item, index)=>{

              return(
                <div key={index}  className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                  <div className='flex items-start gap-6 text-sm '>
                       <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                       <div>
                        <p className='sm:text-base font-medium'>{item.name}</p>
                        <div className='flex items-center gap-3 mt-1 text-base text-gray-700'>
                              <p>{currency}{item.price}</p>
                              <p>Quantity : {item.quantity}</p>
                              <p>Size: {item.size}</p>
                        </div>
                         <p className='mt-1'>Date : <span className='text-gray-400 '>{new Date(item.date).toLocaleDateString()}</span></p>
                         <p className='mt-1'>Payment : <span className='text-gray-400 '>{item.paymentMethod}</span></p>
                       </div>
                  </div>

                  <div className='md:w-1/2 flex justify-between'>
                        <div className='flex items-center gap-2'>
                           <p className='min-w-2 h-2 rounded-full bg-green-500 '></p>
                           <p className='text-md md-text-base '>{item.status}</p>
                        </div>
                        <button onClick={fetchOrdersData} className='border px-4 py-2 text-md font-medium rounded-sm hover:bg-green-500 hover:scale-104'>Track Order</button>
                  </div>
                </div>
              )
            })
          }
        </div>
    </div>
  )
}

export default Order
