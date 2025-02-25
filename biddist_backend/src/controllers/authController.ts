import {Request, Response} from "express";
import {generateSecret, totp} from 'speakeasy'
import {Services} from "../services.js";
import {Account} from "../models/accountSchema.js";
import {IAccount} from "../interfaces/Imodels.js";
import {compare,hashSync} from "bcrypt";

/**
 * Gets the accountId of the current session.
 * @param req
 * @param res
 */
const getAuth = async (req: Request, res: Response) => {
    if(req.session.accountId){
        res.status(200).json({message:"You are logged in", accountId: req.session.accountId});
        return;
    }
    else{
        res.status(401).json({message:"Not logged in"});
        return;
    }
}
/**
 * Requests a One Time Password for authentication.
 * If successful, the OTP will be sent to the supplied email
 * @param req
 * @param res
 */
const postOTP = async (req: Request, res: Response) => {
    const user: IAccount = await Account.findOne({$or: [{Username: {$eq: req.body.user}},{Email: {$eq: req.body.user}}]}).exec();
    if(user && user.Activated){
        const userPassword = user.Password;
        if(await compare(req.body.password, userPassword.toString())){
            if(!req.session.secret){
                req.session.secret = generateSecret().ascii;
            }
            const secret = req.session.secret;
            if(req.body.intent == "login") {
                req.session.otp = hashSync(totp({
                    secret: secret,
                    encoding: 'ascii'
                }), 3);
            }
            if(req.body.intent == "signup") {
                req.session.signup_otp = hashSync(totp({
                    secret: secret,
                    encoding: 'ascii'
                }), 5);
            }
            await Services.sendMessage(req.body.email, `One time Password for ${req.body.intent}: ` + req.session.otp,`OTP for ${req.body.intent} attempt at ` + new Date().toString());
            res.status(201).json({"Message":"Successfully authenticated username/email and password."});
            return;
        }
        else{
            res.status(401).json({"Message":"Incorrect Email/Username or Password."});
            return;
        }
    }
}
/**
 * Checks the One Time Password supplied in the body against the one in the session.
 * @param req
 * @param res
 */
const postOTPLogin = async (req: Request, res: Response) => {
    if(await compare(req.body.otp, req.session.otp)){
        const user: IAccount = await Account.findOne({$or: [{Username: {$eq: req.body.user}},{Email: {$eq: req.body.user}}]}).exec();
        if(!user.Activated){
            res.status(401).json({"Message":"Account must be verified before logging in."});
        }
        req.session.accountId = user._id;
        req.session.otp = null;
        res.status(201).json({"Message":"Successfully authenticated OTP."});
        return;
    }
    else {
        res.status(401).json({"Message": "Incorrect OTP."});
        return;
    }
}
/**
 * Creates an Account in the database but does not Activate it, which requires an OTP.
 * @param req
 * @param res
 */
const postSignup = async (req: Request, res: Response) => {
    try{
        if(await Account.findOne({Email: req.body.email}).lean().exec()){
            res.status(409).json({"Message":"Email is already in use."});
            return;
        }
        if(await Account.findOne({Username: req.body.username}).lean().exec()){
            res.status(409).json({"Message":"Username is already in use."});
            return;
        }
        const newAccount = await Account.create({
            Email: req.body.email,
            Password: hashSync(req.body.password,5),
            Username: req.body.username,
            ShippingAddress: req.body.address,
        });
        res.status(201).json({"Message": "Account was created but needs Activation through login."})
        return;
    }catch(err){
        console.log(err);
        console.log(req.body);
        res.status(500).json({"Message":"Account creation failed."});
        return;
    }
}
/**
 * Checks the supplied One Time Password against session data, activating Account if true.
 * @param req
 * @param res
 */
const postOTPSignup = async (req: Request, res: Response) => {
    if(await compare(req.body.signup_otp, req.session.signup_otp)){
        const user = await Account.findOne({$or: [{Username: {$eq: req.body.user}},{Email: {$eq: req.body.user}}]}).exec();
        if(user.Activated){
            res.status(409).json({"Message":"Email is already in use."});
            return;
        }
        user.Activated = true;
        await user.save();
        res.status(201).json({"Message":"Successfully activated Account."});
    }
}
export {postOTP, postOTPLogin,postOTPSignup, postSignup, getAuth}