import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {
  const [list, setList] = useState([])

  const fetchList = async ()=> {
     try {
      const response = await axios.get(backendUrl + '/api/product/list')
      if (response.data.success) {
         setList(response.data.listedProduct)
      }else {
        toast.error("Something wrong while listing product")
      }
    
     } catch (error) {
      toast.error(error.message)
     }
  }


  const removeProduct = async (_id)=> {
    try {
      
      const response = await axios.post(backendUrl + '/api/product/remove', {_id}, {
        headers : {token}
      } )

      if (response.data) {
        toast.success(response.data.message)
        //after dlt product , list(array) should be updated --- call fetchList()
        await fetchList();
      }else {
        toast.error("Something wrong while deleting product")
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  // run above function when page is reloaded
  useEffect(() => {
    fetchList()
  }, [])
  




  return (
    <>
      <p className='mb-2'>All Product List</p>
      <div className='flex flex-col gap-2 '>
        {/* ----list Table Title */}

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* -----Product List----- */}

        {
          //we get product id through here
          list.map((item, index)=>{
              return (
                <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm'>
                   <img className='w-12' src={item.image[0]} alt="" />
                   <p>{item.name}</p>
                   <p>{item.category}</p>
                   <p>{currency}{item.price}</p>
                   <p onClick={()=>removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-xl hover:text-red-600 hover:underline'>X</p>
                </div>
              )
          })
        }


      </div>
    </>
  )
}

export default List
