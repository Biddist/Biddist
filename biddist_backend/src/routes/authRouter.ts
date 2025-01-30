import {Router} from "express";
import {postOTP, postOTPLogin, postInitLogin, postInitSignup, postOTPSignup} from "../controllers/authController";
const authRouter = Router();
authRouter.post('/otp',postOTP);
authRouter.post('/login',postInitLogin);
authRouter.post('/otp_login',postOTPSignup);
authRouter.post('/signup',postInitSignup);
authRouter.post('/otp_signup',postOTPSignup);
