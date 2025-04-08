import {Router} from "express";
import {
    postOTP,
    postOTPLogin,
    postSignup,
    postOTPSignup,
    getCheckAuth
} from "../controllers/authController.js";
const authRouter = Router();
authRouter.get("/check", getCheckAuth);
authRouter.post('/otp',postOTP);
authRouter.post('/otp_login',postOTPLogin);
authRouter.post('/signup',postSignup);
authRouter.post('/otp_signup',postOTPSignup);
export { authRouter };