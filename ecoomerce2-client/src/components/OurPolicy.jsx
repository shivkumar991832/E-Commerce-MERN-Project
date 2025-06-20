import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import Title from './Title'

const OurPolicy = () => {
  return (

    <>
     <div className=''> 
      <div className=' text-center py-8 text-3xl '>
         <Title text1={"OUR"} text2={"POLICIES"}/>
         <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, adipisci!
         </p>
      </div>

  
    <div className='flex flex-col sm:flex-row justify-around gap-10 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-black'>
      {/* three policy will be there */}
      <div className='shadow-md shadow-gray-900 p-7 hover:bg-orange-400 hover:text-white'>
        <img className='w-12 m-auto mb-5' src={assets.exchange_icon} alt="" />
        <p className='font-semibold'> Easy Exchange Policy </p>
        <p >We offer hassel free exchange policy</p>
      </div>

      <div className='shadow-md shadow-gray-900 p-7 hover:bg-orange-400 hover:text-white '>
        <img className='w-12 m-auto mb-5' src={assets.quality_icon} alt="" />
        <p className='font-semibold'> 7 Days Return Policy </p>
        <p >We provide 7 days free return policy</p>
      </div>

      <div className='shadow-md shadow-gray-900 p-7 hover:bg-orange-400 hover:text-white'>
        <img className='w-12 m-auto mb-5' src={assets.support_img} alt="" />
        <p className='font-semibold'> Best customer support </p>
        <p >we Provide 24/7 customer supports</p>
      </div>
    </div>

    </div>
    </>
  )
}

export default OurPolicy
