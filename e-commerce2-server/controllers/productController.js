import { v2 as cloudinary} from 'cloudinary'
import productModel from '../models/product.model.js';



// function for add product
const addProducts = async (req, res) => {
   try {
    const {name , description, price, category, subCategory, sizes, bestseller} = req.body;
    const image1 =req.files?.image1 && req.files?.image1[0]
    const image2 =req.files?.image2 && req.files?.image2[0]
    const image3 =req.files?.image3 && req.files?.image3[0]
    const image4 =req.files?.image4 && req.files?.image4[0]

    //if user not uploaded any one or more images then will consider in undefined

    //upload on clodinary

   

    const images = [image1, image2, image3, image4].filter((item)=>item !== undefined)
    
    //geting images url after upload on cloudinary
    const imagesUrl = await Promise.all(
        images.map(async (item)=>{
             let result = await cloudinary.uploader.upload(item?.path, {resource_type : "image"})
             return (
                result.secure_url
             )
        })
   )

    // now save above product data and images cloudinary url in our database

    const productData = {
        name,
        description,
        price: Number(price),
        category,
        subCategory,
        sizes : JSON.parse(sizes), // converting string into array
        bestseller : bestseller === "true" ? true : false,
        image :imagesUrl,
        date : Date.now()

    }
    console.log(productData)

    const product = await productModel.create(productData)
    res.status(200).json({
        message : true,
        message : "Product added success",
        productInfo : productData
    })

  
//    console.log(imagesUrl)

//    res.json({})

   } catch (error) {
    console.log(error)
    res.json({

        success : false,
        message : error.message
    })
   }
}


// function for list product
const listProducts = async (req, res) => {
   //show the product on frontend after upload
   try{
      const products = await productModel.find({});
      res.json({
        success : true,
        listedProduct : products,
        message : "listed product get success"
      })


   }catch (error){
         res.json({
        success : false,
        message : error.message
      })
   }
}


// function for remove product
const removeProducts = async (req, res) => {
   try {
    await productModel.findByIdAndDelete(req.body._id)
    res.json({
        success : true,
        message : "product removed success"
    })
   } catch (error) {
       res.json({
        success : false,
        message : error.message
    })
   }
}


// function for single product information
const singleProducts = async (req, res) => {
    try{

        const { productId } = req.body;
        const product = await productModel.findById(productId)
        res.status(200).json({
        success : true,
        findedProduct : product,
        message : "product find success"
    })

    }catch(error){
      res.status(400).json({
        success : false,
        message : error.message
    })
    }
}


export {listProducts , addProducts, removeProducts, singleProducts}