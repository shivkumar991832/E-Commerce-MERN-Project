import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import RelatedProduct from '../components/RelatedProduct'

const Product = () => {

  const { productId } = useParams()
  // console.log(productId)
  const {products, currency, addToCart} = useContext(ShopContext)

  const [productData, setProductData] = useState(false)

  const [image, setImage] = useState('')

  const [size, setSize] = useState('')

  const fetchProductData = async () =>{
        products.map((item)=>{
            if (item._id === productId) {
              setProductData(item)
              // console.log(item)
              setImage(item.image[0])
              return null
            }
        })
  }

  useEffect(() => {
   fetchProductData()
  }, [products, productId])
  

  //productData always store valid data that is available
  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/*--------- Product Data --------*/}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        
        {/*---- Product Images---- */}
          <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
             <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                {
                  productData.image.map((item, index)=>{
                    return (
                       <img onClick={()=>{setImage(item)}} src={item} alt="" key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ' /> 
                    )
                  })
                } 
             </div>
              
              {/*------ main image ------ Image(state) */}
            <div className='w-full sm:w-[80%] '>
                <img className='w-full ' src={image} alt="" />
            </div>
          </div>

          {/* -----Product info----- */}
          <div className='flex-1 '>
              <h1 className='font-medium text-2xl mt-2 '>{productData.name}</h1>
              <div className='flex items-center gap-1 mt-3'>
                 <img src={assets.star_icon} alt="" className="w-3 5" />
                 <img src={assets.star_icon} alt="" className="w-3 5" />
                 <img src={assets.star_icon} alt="" className="w-3 5" />
                 <img src={assets.star_icon} alt="" className="w-3 5" />
                 <img src={assets.star_dull_icon} alt="" className="w-3 5" />
                 <p className='pl-2'>(122)</p>
              </div>
              <p className='mt-2 text-3xl font-medium'>{currency}{productData.price}</p>
              <p className='mt-2 text-gray-500 md:w-4/5 '>{productData.description}</p>
              <div className='flex flex-col gap-4 my-8 '>
                {/* product size */}
                  <p className=''>Select Size</p>
                  <div className='flex gap-2 '>
                     {
                      productData.sizes.map((item, index)=>{
                        return(
                          <button onClick={()=>{setSize(item)}} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
                        )
                      })
                     }
                  </div>
              </div>
              <button onClick={()=>{ addToCart(productData._id, size) }} className='bg-black text-white px-7 py-2 text-sm active:bg-gray-700'>ADD TO CART</button>
              <hr className='mt-3 sm:w-4/5 '/>

              <div className='text-sm text-gray-500 flex flex-col mt-2 gap-1'>
                 <p>100% Original product.</p>
                 <p>Cash on delivery is available on this product</p>
                 <p>Easy return and exchange policy within 7 days</p>
              </div>
          </div>
      </div>

     {/* ------Description & Review Section */}
       <div className='mt-20 '>
            <div className='flex'>
              <b className='border px-5 py-3 text-sm'>Description</b>
              <p className='border px-5 py-3 text-sm border-l-0'>Reviews (122)</p>
            </div>
           
           <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
              <p>Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente culpa ut velit veritatis obcaecati necessitatibus inventore eum! Fugit, obcaecati voluptatibus.amet consectetur adipisicing elit. Saepe numquam non reiciendis ipsa recusandae nemo officiis eum culpa officia sunt!</p>
              <p>Lorem ipsum, dolor Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias neque voluptatum molestias ducimus omnis odio, aperiam incidunt placeat dolores voluptatibus! sit amet consectetur adipisicing elit. Illum quam in eaque iure dolor tempora atque officia praesentium totam nobis!</p>
           </div>
       </div>

       {/* -----display related products (suggestion) */}

       <RelatedProduct category={productData.category} subCategory={productData.subCategory}/>

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
