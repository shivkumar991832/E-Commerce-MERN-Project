import React from 'react'
import {assets} from '../assets/admin_assets/assets.js'
import { toast } from 'react-toastify'


const Navbar = ({setToken}) => {

  const logOut = () => {
     setToken("")
     toast.success("Logout successfully")
  }
  return (
    <div className='flex items-center py-2 px-[4%] justify-between shadow-md shadow-black'>
        {/* w-[max(10%, 80px)] */}
      <img className='w-40 ml-5' src={assets.logo} alt="" />
      <button onClick={logOut} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-black'>Logout</button>

    </div>
  )
}

export default Navbar
