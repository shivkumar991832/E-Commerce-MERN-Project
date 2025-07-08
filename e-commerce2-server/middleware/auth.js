//authenticate user when user add product , update product or get product from the cart

import jwt from 'jsonwebtoken'

const authUser = async (req, res , next) => {
    const {token} = req.headers;

    if (!token) {
        return res.status(400).json({
            succuess : false,
            message : "Not authorized user, Please login first"
        })
    }

    try {
        //decoding the token
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET)
        // set userId in request body
        req.body.userId = token_decoded._id;
        next();
    } catch(error) {
        console.log(error)
        res.json({
            success : false,
            message : error.message || "Something went wrong, please try again"
        })
    }
}

export default authUser;