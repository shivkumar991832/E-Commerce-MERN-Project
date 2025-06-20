import jwt from 'jsonwebtoken'


// middleware for admin authontication
const adminAuth = async (req, res, next)=>{
   try {
       const { token } = req.headers;
       if(!token) {
        return res.json({
            success : false,
            message : "Not Authorized Login Admin || token not provided"
        })
       }


       const token_decode = jwt.verify(token, process.env.JWT_SECRET);
       if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD ) {
             return res.json({
            success : false,
            message : "Not Authorized Login Admin"
        })
       }

       next()

   } catch (error) {
      return res.json({
            success : false,
            message : error.messages
        })
   }
}

export default adminAuth