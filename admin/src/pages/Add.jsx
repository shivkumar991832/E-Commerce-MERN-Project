import React, { useState } from 'react'
import { assets } from '../assets/admin_assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {

    // const [productData, setProductData] = useState({
    //       name : "",
    //       description : "" ,
    //       category : "" ,
    //       subCategory : "" ,
    //       price : "" ,
    //       sizes : [],
          
        

    // })

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("Men")
    const [subCategory, setSubCategory] = useState("Topwear")
    const [bestSeller, setBestSeller] = useState(false)
    const [sizes, setSizes] = useState([])
    

   const [image1, setImage1] = useState(false)
   const [image2, setImage2] = useState(false)
   const [image3, setImage3] = useState(false)
   const [image4, setImage4] = useState(false)

  

    const handleOnSubmit = async (e)=>{
          e.preventDefault();
          try {
            //we cant send array in form data,convert it in a string
            const formData = new FormData()
            formData.append("name", name)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("category", category)
            formData.append("subCategory", subCategory)
            formData.append("bestseller", bestSeller)
            formData.append("sizes", JSON.stringify(sizes))

            // for image
            // customize selection
             image1 && formData.append("image1", image1)
             image2 && formData.append("image2", image2)
             image3 && formData.append("image3", image3)
             image4 && formData.append("image4", image4)


            const response = await axios.post(backendUrl + "/api/product/add", formData, {
              headers : {token}
            })
            console.log(response.data)

           if (response.data) {
              toast.success(response.data.message)

              setName('')
              setDescription("")
              setImage1(false)
              setImage2(false)
              setImage3(false)
              setImage4(false)
              setPrice("")
           }else {
            toast.error("Something wrong while adding product")
           }
          } catch (error) {
            toast.error(error.message)
          }
    }
  return (
    <div>
       <form className='flex flex-col w-full items-start gap-3' onSubmit={handleOnSubmit}>
       <div>
        <p className='mb-2 font-bold text-md'>Upload Image</p>

        <div className='flex gap-2'> 
          <label htmlFor="image1">
            <img className='w-22' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e)=> setImage1(e.target.files[0])} type="file" id='image1' hidden/>
          </label> 
          <label htmlFor="image2">
            <img className='w-22' src={!image2 ?  assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e)=> setImage2(e.target.files[0])} type="file" id='image2' hidden/>
          </label> 
          <label htmlFor="image3">
            <img className='w-22' src={!image3 ?  assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e)=> setImage3(e.target.files[0])} type="file" id='image3' hidden/>
          </label> 
          <label htmlFor="image4">
            <img className='w-22' src={!image4 ?  assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e)=> setImage4(e.target.files[0])} type="file" id='image4' hidden/>
          </label> 
        </div>
       </div>


       {/* product info */}

       <div className='w-full'>
        <p className='mb-2 font-bold text-md'>Product name</p>
        <input name='name' value={name} onChange={(e)=> setName(e.target.value)} className='w-full max-w-[500px] px-3 py-2 ' type="text" placeholder='Type here...' required/>
       </div>

       <div className='w-full'>
        <p className='mb-2 font-bold text-md'>Product description</p>
        <textarea name='description' value={description} onChange={(e)=>setDescription(e.target.value)} className='w-full max-w-[500px] px-3 py-2 ' type="text" placeholder='Write content here...' required/>
       </div>

       <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8 '>

          <div>
            <p className='mb-2 font-bold text-md'>Product category</p>
            <select name='category' value={category} onChange={(e)=>setCategory(e.target.value)} className='w-full px-3 py-2'>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
            </select>
          </div>

           <div>
            <p className='mb-2 font-bold text-md'>Sub category</p>
            <select name='subCategory' value={subCategory} onChange={(e)=> setSubCategory(e.target.value)} className='w-full px-3 py-2'> 
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
            </select>
          </div>


          <div>
            <p className='mb-2'>Product Price</p>
            <input name='price' onChange={(e)=> setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' />
          </div>

       </div>


       <div>
        <p className='mb-2 font-bold text-md'>Product Sizes</p>
        <div className='flex gap-3'>
            <div onClick={()=>setSizes(prev => prev.includes("S") ? prev.filter( item => item !== "S") : [...prev, "S"])}>
                <p className={`${sizes.includes("S") ? "border bg-yellow-500" :" bg-slate-200"  } px-3 py-1 cursor-pointer ` }>S</p>
            </div>
            <div  onClick={()=>setSizes(prev => prev.includes("M") ? prev.filter( item => item !== "M") : [...prev, "M"])}>
                <p className={`${sizes.includes("M") ? "border bg-yellow-500" :" bg-slate-200"  } px-3 py-1 cursor-pointer ` }>M</p>
            </div>
            <div  onClick={()=>setSizes(prev => prev.includes("L") ? prev.filter( item => item !== "L") : [...prev, "L"])}>
                <p className={`${sizes.includes("L") ? "border bg-yellow-500" :" bg-slate-200"  } px-3 py-1 cursor-pointer ` }>L</p>
            </div>
            <div  onClick={()=>setSizes(prev => prev.includes("XL") ? prev.filter( item => item !== "XL") : [...prev, "XL"])}>
                <p className={`${sizes.includes("XL") ? "border bg-yellow-500" :" bg-slate-200"  } px-3 py-1 cursor-pointer ` }>XL</p>
            </div>
            <div  onClick={()=>setSizes(prev => prev.includes("XXl") ? prev.filter( item => item !== "XXL") : [...prev, "XXL"])}>
                <p className={`${sizes.includes("XXL") ? "border bg-yellow-500" :" bg-slate-200"  } px-3 py-1 cursor-pointer ` }>XXL</p>
            </div>
        </div>
       </div>

       <div className='flex gap-2 mt-2'>
        <input onChange={()=>setBestSeller(prev => !prev)} checked={bestSeller} type="checkbox" id='bestSeller' />
        <label className='cursor-pointer ' htmlFor="bestSeller">Add to bestseller</label>
       </div>


       <button className='w-35 py-3 mt-4 bg-gray-600 hover:bg-black text-white hover:scale-102'  type="submit">ADD</button>



    </form>
    </div>
  )
}

export default Add
