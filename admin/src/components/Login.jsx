import React, { useState } from 'react'
import axios from 'axios'

import { backendUrl } from '../App'
import { toast } from 'react-toastify'


const Login = ({setToken}) => {

    const [adminLogin, setAdminLogin] = useState({
        email : "",
        password : ""
    })


   const handleOnChange = (e) =>{
       setAdminLogin({...adminLogin, [e.target.name] : e.target.value})
   }

    const onsubmitHandler = async (e) =>{
       try {
         e.preventDefault()
         
            // const formData = new FormData()
            // formData.append({"email" :adminLogin.email, "password" : adminLogin.password})
         
            const response = await axios.post(backendUrl + '/api/user/admin', adminLogin)
        
         if(response.data.success) {
             setToken(response.data?.token)
         }else {
             toast.error(response.data.message)
         }

       } catch (error) {
          toast.error(error.message)
       }

    }
  return (
    <div className='flex items-center justify-center min-h-screen w-full bg-gray-600'>
      <div className='bg-white shadow-md shadow-black rounded-lg px-13 py-15 max-w-lg'>
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
        <form onSubmit={onsubmitHandler}>
            <div className='mb-3 min-w-72 '>
                <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                <input name='email' onChange={handleOnChange} value={adminLogin.email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='your@email.com' required/>
            </div>
             <div className='mb-3 min-w-72 '>
                <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                <input name='password' onChange={handleOnChange} value={adminLogin.password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Enter your password' required/>
            </div>

            <button className='bg-black hover:scale-102 mt-2 w-full px-7 rounded-lg py-2 border text-white' type="submit">login</button>
            
        </form>

      </div>
    </div>
  )
}

export default Login
