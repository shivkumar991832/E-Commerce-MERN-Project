import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext';

const Login = () => {
  const [currenState, setCurrenState] = useState('Sign Up');
  const { token, setToken, navigate,  backendURL} = useContext(ShopContext)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  
  const onSubmitHandler = async (e) => {
       e.preventDefault()
      

  //      try {
  //       if (currenState === 'Sign Up') {
  //         const response = await fetch(backendURL+'/api/user/register', {
  //           method : "POST",
  //           body : JSON.stringify(userData)
  //         })
  //         const data = await response.json()
  //         console.log(data)
  //       }else {
            
  //       }
  //      } catch (error) {
        
  //      }
  // }
  }

// sm:max-w-96

  return (
    <form onSubmit={onSubmitHandler} className=' flex flex-col items-center w-[420px] m-auto mt-14 gap-4 text-gray-800 shadow-md shadow-black'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10 '>
           <p className='prata-regular text-3xl'>{currenState}</p>
           <hr className='border-none h-[1.5px] w-10 bg-black' />
      </div>

       {currenState === 'Login' ? '' : <input onChange={(e)=> setName(e.target.value)} value={name} className='w-[380px] px-3 py-2 border border-gray-800 outline-none' placeholder='Name' type="text" required /> }
       <input onChange={(e)=> setEmail(e.target.value)} value={email} className='w-[380px] px-3 py-2 border border-gray-800 outline-none' placeholder='Email' type="email" required/>
        <input onChange={(e)=> setPassword(e.target.value)} value={password} className='w-[380px] px-3 py-2 border border-gray-800 outline-none' placeholder='Password' type="password" required/>
        <div className='w-[380px] flex justify-between text-md mt-[-8px]'>
           <p className='cursor-pointer '>Forgot your password ?</p>
           {
            currenState=== 'Login' ? <p onClick={()=>{setCurrenState('Sign Up')}} className='cursor-pointer hover:underline'>Create account</p> : <p onClick={()=>{setCurrenState('Login')}} className='cursor-pointer'>Login Here</p>
           }
        </div>

         <button className='bg-black text-white font-light px-8 py-2 mt-4 mb-[50px] hover:scale-102'>{currenState === 'Login' ? "Sign In" : 'Sign Up'}</button>
    </form>
  ) 
}

export default Login
