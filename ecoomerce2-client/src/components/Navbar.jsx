import React, { useContext, useState } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
    
    const {setShowSearch , getCartCount} = useContext(ShopContext)
    const [visible, setVisible] = useState(false)

    document.querySelector('body').onmouseenter = () => {
        if (visible){
            setVisible(false)
        }

    }
    

  return (
    <>
    <nav className='flex items-center justify-between py-5 w-full font-medium shadow-md'>
     <Link to={'/'}> <img src={assets.logo} className='w-36' alt="" /></Link>
       

       {/* by default NavLink add extra className(name is active) */}

       <ul className='hidden sm:flex gap-5 text-sm text-gray-700 '>
        <li >
            <NavLink to='/' className='flex flex-col items-center gap-1 ' >
                <p>HOME</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
        </li>

         <li >
            <NavLink to='/collections' className='flex flex-col items-center gap-1 ' >
                <p>COLLECTIONS</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
        </li>

         <li >
            <NavLink to='/about' className='flex flex-col items-center gap-1 ' >
                <p>ABOUT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
        </li>

         <li >
            <NavLink to='/contact' className='flex flex-col items-center gap-1 ' >
                <p>CONTACT</p>
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
        </li>
       </ul>


       <div className='flex items-center gap-6'>
          <img onClick={()=>{setShowSearch(true)}} className='w-5 cursor-pointer ' src={assets.search_icon} alt="" />
          <div className='group relative'>
            <Link to='/login'> <img className='w-5 cursor-pointer' src={assets.profile_icon} alt="" /></Link>
              <div className='hidden group-hover:block absolute dropdown-menu right-0 pt-2 '>
                {/* dropdown menu */}
                    <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                        <p className='cursor-pointer hover:text-black '>My Profile</p>
                       <Link to='/orders'> <p className='cursor-pointer hover:text-black '>My Orders</p></Link>
                        <p className='cursor-pointer hover:text-black '>Logout</p>
                    </div>
              </div>
          </div>
        
        <Link to='/cart' className='relative '>
           <img className='w-5 min-w-5' src={assets.cart_icon} alt="" />
           <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px]'>{getCartCount()}</p>
        </Link>

        <img onClick={()=>setVisible(true)} className='w-5 cursor-pointer sm:hidden  ' src={assets.menu_icon} alt="" />
       </div>
       {/* Sidebar menu for small screen using dynamic className={``}*/}
       <div className={`absolute top-0 right-0 bottom-0 overflow-hidden transition-all bg-white shadow-lg ${visible ? 'w-1/2' : 'w-0'}`}>
           <div className='flex flex-col text-gray-600 '>
               <div onClick={()=> setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                     <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                     <p>Back</p>
               </div>
               <div className='flex flex-col mt-8'>
                <NavLink onClick={()=> setVisible(false)} className="py-3 pl-6 hover:bg-gray-800 hover:text-white shadow-md" to='/' >HOME</NavLink>
                <NavLink onClick={()=> setVisible(false)} className="py-3 pl-6  hover:bg-gray-800 hover:text-white shadow-md" to='/collections' >COLLECTIONS</NavLink>
                <NavLink onClick={()=> setVisible(false)} className="py-3 pl-6 hover:bg-gray-800 hover:text-white shadow-md" to='/about' >ABOUT</NavLink>
                <NavLink onClick={()=> setVisible(false)} className="py-3 pl-6  hover:bg-gray-800 hover:text-white shadow-md" to='/contact' >CONTACT</NavLink>
               </div>

           </div>
       </div>
    </nav>
    </>
  )
}

export default Navbar
