import express from 'express';
import { placeOrder, placeOrderRazorpay, placeOrderStripe , allOrders, userOrders, updateStatus, verifyStripe, verifyRazorpay } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

//Admin Features
//all orders data from admin panel || so used admin auth middleware
orderRouter.post('/list', adminAuth, allOrders);
//its also admin panel feature
orderRouter.post('/status', adminAuth, updateStatus);



//Payment Features
//placing order using COD Methods
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe',authUser, placeOrderStripe);
orderRouter.post('/razorpay',authUser, placeOrderRazorpay);

//User Features
orderRouter.post('/userorders',authUser, userOrders);


//for verify payment failed or success
orderRouter.post('/verifyStripe', authUser, verifyStripe )
orderRouter.post('/verifyRazorpay', authUser, verifyRazorpay)

export default orderRouter;