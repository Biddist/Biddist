import { Request, Response, Router } from "express";
import {generateSecret,totp} from 'speakeasy'
const userRouter = Router();
userRouter.get('/:userId/otp/',async(req: Request,res: Response)=>{
    if(req.session.otp){
        const secret = generateSecret();
        const otp = totp({
            secret: secret.ascii,
            encoding: 'ascii'
        });
        req.session.otp = otp;
        req.session.secret = secret.ascii;
    }
})