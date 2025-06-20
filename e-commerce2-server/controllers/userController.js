import userModel from "../models/user.model.js";
import validator from 'validator'
import bcrypt, { genSalt } from 'bcrypt'
import jwt from 'jsonwebtoken'


const createToken = (_id)=>{
   return jwt.sign({_id}, process.env.JWT_SECRET)
}

//Route for user Login

const loginUser = async (req, res) => {
    try{
        const {email , password} = req.body;

        if(!(email || password)) {
            return res.json({
                message : "All fields is required"
            })
        }


       const user = await userModel.findOne({email})

       if(!user){
          return res.json({
                success : false,
                message : "User does not exist. Please Registered !!"
            })
       }

       const isMatchPassword = await bcrypt.compare(password, user?.password );

       if(!isMatchPassword){
            return res.json({
                success : false,
                message : "Please enter correct password !!"
            })
       }
          
       const token = createToken(user._id) 

       res.json({
        success : true,
        loggedUser : user,
        token : token,
        message : "user logged in successfully"
       })



    }catch(error){
      res.json({
        success : false,
        error : error.message,
        message : "Problem in logging user"
       })

    }
}



//Route for user registration

const registerUser = async (req , res ) => {
      try {
        
        const {name , email, password} = req.body;
        //checking user already exist or not


        if(!name || !email || !password){
            return res.json({
                message : "all feilds are required"
            })
        }
        const existUser = await userModel.findOne({email})
        if(existUser) {
            return res.json({success : false, message : "User already exists"})
        }

        // validating email formate & strong password
        // npm i validator
        if (!validator.isEmail(email)){
             return res.json({success : false, message : "Please enter a valid email"})
        }

        if (password.length < 8){
             return res.json({success : false, message : "Please enter a strong password"})
        }

        const salt = await bcrypt.genSalt(10)
        
        const hashedPassword = await bcrypt.hash(password, salt);

        const user ={
            name : name,
            email : email,
            password : hashedPassword
        };


        const newUser = await userModel.create(user)

        // const data = {
        //     _id : newUser._id
        // }
       
        const token = createToken(newUser._id);

        res.json({
            success : true,
            registeredUser: newUser,
            token : token,
            message : "User Registered Successfully"
        })


      }catch (error){
          
        res.json({
            success : false,
            message : "Problem in Registering user ",
            error : error.message
        })
      }
}


//Route for admin login
//admin authontication
const adminLogin = async (req, res) =>{
   try {
      const { email , password} = req.body;

      if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        //create token
        const token = jwt.sign(email+password, process.env.JWT_SECRET)
        res.json({
           success : true,
           token,
           message : "admin login successfully"
        })
      }else {
        res.json({
            success : false,
            message : "Invalid credentials"
        })
      }
   } catch (error) {
       res.json({
            success : false,
            message :  error.message
        })
   }
}


export {loginUser , registerUser, adminLogin}