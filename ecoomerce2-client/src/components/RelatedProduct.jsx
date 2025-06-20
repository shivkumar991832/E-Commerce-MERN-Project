import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductsItem from './ProductsItem';

const RelatedProduct = ({category, subCategory}) => {

    const {products} = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
       if (products.length > 0) {
          let productCopy = [...products] 
          productCopy = productCopy.filter((item)=>{
            return(
                category === item.category
            )
          })

          productCopy = productCopy.filter((item)=>{
            return(
                subCategory === item.subCategory
            )
          })

          setRelated(productCopy.slice(0,5))
          
       }
    }, [products])
    

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
          <Title text1={"RELATED"} text2={'PRODUCTS'}/>
      </div>
       <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
         {
            related.map((item, index)=>{
                return(
                    <ProductsItem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
                )
            })
         }
       </div>
    </div>
  )
}

export default RelatedProduct
