import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
//mount this component in app.jsx
const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);

const [visible, setVisible] = useState(false)

//denied searchbox access to components(home, about, contact)
const location = useLocation();
useEffect(() => {
  if (location.pathname.includes('collection')) {
    setVisible(true)
  }else {
    setVisible(false)
  }
},[location])

  return showSearch && visible ? (
    <div className='border-t border-b text-center bg-gray-800'>
      <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 bg-white'>
         <input value={search} onChange={(e)=>{setSearch(e.target.value)}} className='flex-1 outline-none bg-inherit text-md  ' type="text" placeholder='Search'/>
         <img className='w-6' src={assets.search_icon} alt="" />
      </div>
      <img onClick={()=>{setShowSearch(false)}} className='inline w-4 cursor-pointer' src={assets.cross_icon} alt="" />
    </div>
  ) : null
}

export default SearchBar
