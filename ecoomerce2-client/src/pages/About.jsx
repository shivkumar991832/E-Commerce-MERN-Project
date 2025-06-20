import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {

  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
         <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16 '>
          <img className='w-full md:max-w-[450px] ' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            
            <p >Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae repudiandae dolor officia quae harum provident pariatur exercitationem. Debitis, nihil, beatae vero corporis pariatur praesentium non nostrum quo cupiditate quisquam at? ipsum, dolor sit amet consectetur adipisicing elit. Aliquam architecto animi tenetur ipsam ad ipsa error, dignissimos officia. Fugiat, quod.</p>
            <p>Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Id pariatur ad debitis commodi animi magni adipisci doloribus eaque eligendi aliquid. Qui, consequatur temporibus porro sequi molestias laudantium aspernatur sunt est. ipsum dolor sit amet consectetur adipisicing elit. Vitae optio aut, ullam consectetur est velit ea voluptatem fugit sed id.</p>
             <b className='text-gray-800 text-2xl '>Our Mission</b>
             <p>Lorem  ipsum dolor, sit amet consectetur adipisicing elit. Impedit unde aliquam laudantium aspernatur, sit debitis delectus quo temporibus accusantium quos perspiciatis culpa qui quidem voluptatibus quaerat molestiae corporis rem fuga?</p>
          </div>
      </div>

      <div className='text-3xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

       <div className='flex flex-col md:flex-row text-sm mb-20 gap-6'>
             <div className='hover:bg-amber-500  shadow-md shadow-black px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b>Quality Assurence :</b>
                <p className='text-gray-600 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus voluptas ut assumenda? Voluptatum aliquam beatae adipisci eligendi maiores animi culpa quidem sapiente quam aut vel, aliquid doloribus repellendus consectetur, blanditiis non. Optio recusandae beatae, soluta, odio debitis esse quidem dolor illum dolorum perspiciatis voluptatem, accusantium laudantium eum itaque mollitia ducimus.</p>
             </div>
              <div className='hover:bg-amber-500 shadow-md shadow-black px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b>Convenience :</b>
                <p className='text-gray-600 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus voluptas ut assumenda? Voluptatum aliquam beatae adipisci eligendi maiores animi culpa quidem sapiente quam aut vel, aliquid doloribus repellendus consectetur, blanditiis non. Optio recusandae beatae, soluta, odio debitis esse quidem dolor illum dolorum perspiciatis voluptatem, accusantium laudantium eum itaque mollitia ducimus.</p>
             </div>
              <div className='hover:bg-amber-500 shadow-md shadow-black   px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                <b>Exceptional Customer Services :</b>
                <p className='text-gray-600 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam officia provident ut perferendis consequatur, eveniet consequuntur excepturi esse adipisci reiciendis aliquam. Rem sit illum culpa aut accusamus repellat exercitationem iure repellendus natus ipsum sequi rerum odio deserunt, dolore perspiciatis maiores officia quaerat numquam sed ea sint vel temporibus aspernatur quos!</p>
             </div>
       </div>

       <NewsLetterBox/>
      

      
    </div>
  )
}

export default About
