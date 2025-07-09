import express from 'express'
import cors from 'cors'

import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';

import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


// import path from 'path'
//App Config

const app = express()
const port = process.env.PORT || 5000;

//setting for deploye
// const _dirname = path.resolve();



connectDB()
connectCloudinary()

// middleware
app.use(express.json()) //data parse into json
app.use(cors({
  origin : ["http://localhost:5000", "https://forever-project.netlify.app"]
}))




//api endpoints
app.use('/api/user', userRouter)
app.use('/api/product',  productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter )

//now serve frontend file
// app.use(express.static(path.join(_dirname, "/ecoomerce2-client/dist")))
// app.get('*', (_, res)=>{
//     res.sendFile(path).resolve(_dirname, "ecoomerce2-client", "dist", "index.html")
// })

app.get('/', (req, res)=> {
  res.send('API Working')
})

app.listen(port, ()=>{
 console.log("Server Started on PORT : " + port)
})