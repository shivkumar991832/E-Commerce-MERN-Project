import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import Title from '../components/Title'
import ProductsItem from '../components/ProductsItem'

const Collection = () => {
 const { products, search , showSearch } = useContext(ShopContext)
   const [showFilter, setShowFilter] = useState(false)

   // before map create a state variable
   const [filterProduct, setFilterProduct] = useState([])

   const [category, setCategory] = useState([]);
   const [subCategory, setSubCategory] = useState([]);

   //for sorting
   const [sortType, setSortType] = useState('relavent')

   // for man , women and kids category
   const toggleCategory = (e) => {
      if (category.includes(e.target.value)) {
         setCategory(category.filter(item=>item !== e.target.value ))
   }else {
      // if not include then add to category
      setCategory([...category, e.target.value])
   }
 }



 const toggleSubCategory = (e) => {
   if(subCategory.includes(e.target.value)) {
      setSubCategory(subCategory.filter((item)=>{
         return (
             item !== e.target.value
         )
      }))
   }else {
       // if not include then add to subcategory
       setSubCategory([...subCategory, e.target.value])

   }
 }

 const applyFilter = () =>{
   //1st create copy of the all products
   // let productsCopy  = products.slice();
   let productsCopy  = [...products];

   if (showSearch && search) {
      productsCopy = productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
   }



   if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category))}

      if (subCategory.length > 0) {
         productsCopy = [...products];
         productsCopy = productsCopy.filter(item=> subCategory.includes(item.subCategory) && category.includes(item.category) )}
         setFilterProduct(productsCopy)
 }


 // logic for the sort products

 const sortProduct = () => {
   //create copy of filtered products

     let filterProductCopy = [...filterProduct];

   switch (sortType) {
      case 'low-high':
         setFilterProduct(filterProductCopy.sort((a, b)=>a.price - b.price))
         break;

      case 'high-low':
         setFilterProduct(filterProductCopy.sort((a, b)=>b.price - a.price))   
         break;

      default:
         applyFilter();
         break;
   }

 }


   useEffect(() => {
       applyFilter()
       //search(userText)
   },[category, subCategory , search, showSearch, products])
   
   
 useEffect(() => {
   sortProduct()
 }, [sortType])
 
 
   // useEffect(() => {
   //   console.log(subCategory)
   // }, [subCategory])
   

  return (
    <>
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* leftSide--filter */}

      <div className='min-w-60  '>
         <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTER</p>
         <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} alt="" />
         {/* Category filter */}

         <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter? '' : 'hidden'} sm:block`}>

          <p className='mb-3 text-sm font-medium '>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
               <p className='flex gap-2'>
                 <input className='w-3' type="checkbox" value={"Men"} onChange={toggleCategory} /> Men
               </p>
              

               <p className='flex gap-2'>
                <input className='w-3' type="checkbox" value={"Women"} onChange={toggleCategory}/> Women
               </p>
               

               <p className='flex gap-2'>
                   <input className='w-3' type="checkbox" value={"Kids"}onChange={toggleCategory} /> kids
               </p>
              
          </div>

         </div>
          {/* SubCategory Filter */}

             <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter? '' : 'hidden'} sm:block`}>

          <p className='mb-3 text-sm font-medium '>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
               <p className='flex gap-2'>
                   <input className='w-3' type="checkbox" value={"Topwear"}  onChange={toggleSubCategory}/>Topwear
               </p>
              

               <p className='flex gap-2'>
                  <input className='w-3' type="checkbox" value={"Bottomwear"} onChange={toggleSubCategory} />Bottomwear
               </p>
               

               <p className='flex gap-2'>
                  <input className='w-3' type="checkbox" value={"Winterwear"} onChange={toggleSubCategory} />Winterwear
               </p>
              
          </div>

         </div>
   
      </div>

        {/* right side */}
    <div className='flex-1 '>

       <div className='flex justify-between text-base sm:text-2xl mb-4'>
           <Title text1={'ALL'} text2={'COLLECTIONS'}/>

           {/* Product sorts */}
    
           <select onChange={(e)=>{setSortType(e.target.value)}} className='border-2 border-gray-300 text-sm px-2'>
              <option value="relavent">Sort by : Relavent</option>
              <option value="low-high">Sort by : Low to High</option>
              <option value="high-low">Sort by : High to Low</option>
           </select>
       </div>

       {/* Map Product */}

       <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProduct.map((item, index)=>{
               return (
                 <ProductsItem key={index} name={item.name} id={item._id} price={item.price} image={item.image}/>
               )
            })
          }
       </div>
    </div>

    </div>
    </>
  )
}

export default Collection
