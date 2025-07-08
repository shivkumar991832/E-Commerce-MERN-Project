import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios'
import { toast } from 'react-toastify';


const Login = () => {


  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate,  backendURL} = useContext(ShopContext)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


    const onSubmitHandler = async (e) => {
       e.preventDefault()
      

       try {
        if (currentState === 'Sign Up') {
          
          const response = await axios.post(backendURL+'/api/user/register', {name, email, password} )
          console.log(response.data)
          if (response.data.success) {
            toast.success(response.data.message)
            setToken(response.data.token)
            // also save the token in localStorage
            localStorage.setItem('token', response.data.token)
          }else {
            toast.error(response.data.message)
          } 
          
        }else {
          const response = await axios.post(backendURL+ '/api/user/login', {email, password})  
          // console.log(response.data)
          if (response.data.success) {
            toast.success(response.data.message)
            setToken(response.data.token)
            localStorage.setItem('token', response.data.token)
              
          }else {
            toast.error(response.data.message)
          }
        }
       } catch (error) {
            console.log(error)
            toast.error(error.message);
            
       }

    }

    useEffect(() => {
       if (token) {
        navigate('/')
       }
    }, [token])
    
      


  return (
    <>
     <form onSubmit={onSubmitHandler} className=' flex flex-col items-center w-[420px] m-auto mt-14 gap-4 text-gray-800 shadow-md shadow-black'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10 '>
           <p className='prata-regular text-3xl'>{currentState}</p>
           <hr className='border-none h-[1.5px] w-10 bg-black' />
      </div>

       {currentState === 'Login' ? '' : <input onChange={(e)=> setName(e.target.value)} value={name} className='w-[380px] px-3 py-2 border border-gray-800 outline-none' placeholder='Name' type="text" required /> }
       <input onChange={(e)=> setEmail(e.target.value)} value={email} className='w-[380px] px-3 py-2 border border-gray-800 outline-none' placeholder='Email' type="email" required/>
        <input onChange={(e)=> setPassword(e.target.value)} value={password} className='w-[380px] px-3 py-2 border border-gray-800 outline-none' placeholder='Password' type="password" required/>
        <div className='w-[380px] flex justify-between text-md mt-[-8px]'>
           <p className='cursor-pointer hover:underline'>Forgot your password ?</p>
           {
            currentState=== 'Login' ? <p onClick={()=>{setCurrentState('Sign Up')}} className='cursor-pointer hover:underline'>Create account</p> : <p onClick={()=>{setCurrentState('Login')}} className='cursor-pointer hover:underline'>Login Here</p>
           }
        </div>

         <button className='bg-black text-white font-light px-8 py-2 mt-4 mb-[50px] hover:scale-102'>{currentState === 'Login' ? "Sign In" : 'Sign Up'}</button>
    </form>
    </>
  )
}

export default Login




  


