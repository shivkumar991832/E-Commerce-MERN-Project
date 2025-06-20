import React, { useState } from 'react'

const NewsLetterBox = () => {

  const [email, setEmail] = useState("")

  const onSubmitHandeler = (e)=> {
    e.preventDefault();
    console.log(email)

  }
  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
      <p className='text-gray-400 mt-3'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto, dolorem.</p>
      <form onSubmit={onSubmitHandeler} className='w-full sm:w-1/2 flex items-center mx-auto my-6 border pl-3'>
        <input value={email} onChange={(e)=> setEmail(e.target.value)} className='w-full sm:flex-1 outline-none ' type="email" placeholder='enter your email' required />
        <button className='bg-black text-white text-sm px-10 py-4 hover:bg-orange-400 hover:text-white' type='submit'>SUBSCRIBE</button>

      </form>
    </div>
  )
}

export default NewsLetterBox
