import express from 'express';
import { loginUser, registerUser, adminLogin } from '../controllers/userController.js';
import adminAuth from '../middleware/adminAuth.js';

const userRouter = express.Router();

//using this userRouter will create get and post methods

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)


export default userRouter;
