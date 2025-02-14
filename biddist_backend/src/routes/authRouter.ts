import {Router} from "express";
import {
    postOTP,
    postOTPLogin,
    postInitLogin,
    postInitSignup,
    postOTPSignup,
    getAuth
} from "../controllers/authController";
const authRouter = Router();
authRouter.get("/", getAuth);
authRouter.post('/otp',postOTP);
authRouter.post('/login',postInitLogin);
authRouter.post('/otp_login',postOTPLogin);
authRouter.post('/signup',postInitSignup);
authRouter.post('/otp_signup',postOTPSignup);
export { authRouter };