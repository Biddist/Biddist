import {Request, Response} from "express";
import speakeasy from 'speakeasy'
import {Services} from "../services.js";
import {Account} from "../models/accountSchema.js";
import {IAccount} from "../interfaces/Imodels.js";
import {compare,hashSync} from "bcrypt";
import {Readable} from "node:stream";
import {SessionModel, sessionSchema} from "../interfaces/Iserver.js";

/**
 * Gets the accountId of the current session.
 * @param req
 * @param res
 */
const getCheckAuth = async (req: Request, res: Response) => {
    try {
        const authStream = new Readable();
        const changeStream = SessionModel.watch([{
            $match: {
                "fullDocument._id": req.session._id,
                "operationType": {$in: ["delete", "update"]},
            }
        }]);
        changeStream.on("change", (change) => {
            if (change.operationType === "delete") {
                res.end({message: "Session Ended", accountId: ""})
            }
            if (change.operationType === "update") {
                authStream.push({message: "Session Update", accountId: req.session.accountId});
            }
        })
        authStream.pipe(res);
    }
    catch(err) {
        console.log(err);
        res.status(500).json("Unknown Server Error");
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
    try {
        const user: IAccount = await Account.findOne({$or: [{Username: {$eq: req.body.user}}, {Email: {$eq: req.body.user}}]}).exec();
        if (user) {
            const userPassword = user.Password;
            if (await compare(req.body.password, userPassword.toString())) {
                if (!req.session.secret) {
                    req.session.secret = speakeasy.generateSecretASCII();
                }
                if (req.body.intent != "login" && req.body.intent != "signup") {
                    res.status(400).json({message: "Intent must be either login or signup."});
                    return;
                }
                const secret = req.session.secret;
                if (req.body.intent == "login") {
                    if (user.Activated) {
                        const login_otp = speakeasy.totp({
                            secret: secret,
                        });
                        req.session.otp = hashSync(login_otp, 3)
                        await Services.sendMessage(user.Email.toString(), `One time Password for login: ` + login_otp, `OTP for login attempt at ` + new Date().toString());
                    } else {
                        res.status(401).json({message: "Account cannot request login otp before activation."});
                    }
                }
                if (req.body.intent == "signup") {
                    const signup_otp = speakeasy.totp({
                        secret: secret,
                    });
                    req.session.signup_otp = hashSync(signup_otp, 5);
                    req.session.save();
                    await Services.sendMessage(user.Email.toString(), `One time Password for signup: ` + signup_otp, `OTP for signup attempt at ` + new Date().toString());
                }
                res.status(201).json({"Message": "Successfully authenticated username/email and password."});
                return;
            } else {
                res.status(401).json({"Message": "Incorrect Email/Username or Password."});
                return;
            }
        }
    }catch(err) {
        console.log(err);
        res.status(500).json("Unknown Server Error");
        return;
    }
}
/**
 * Checks the One Time Password supplied in the body against the one in the session.
 * @param req
 * @param res
 */
const postOTPLogin = async (req: Request, res: Response) => {
    try {
        if (await compare(req.body.otp, req.session.otp)) {
            const user: IAccount = await Account.findOne({$or: [{Username: {$eq: req.body.user}}, {Email: {$eq: req.body.user}}]}).exec();
            if (!user.Activated) {
                res.status(401).json({"Message": "Account must be verified before logging in."});
            }
            req.session.accountId = user._id;
            req.session.otp = null;
            req.session.save();
            res.status(201).json({"Message": "Successfully authenticated OTP."});
            return;
        } else {
            res.status(401).json({"Message": "Incorrect OTP."});
            return;
        }
    }catch(err) {
        console.log(err);
        res.status(500).json("Unknown Server Error");
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
    try {
        if (await compare(req.body.signup_otp, req.session.signup_otp)) {
            const user = await Account.findOne({$or: [{Username: {$eq: req.body.user}}, {Email: {$eq: req.body.user}}]}).exec();
            if (user.Activated) {
                res.status(409).json({"Message": "Email is already in use."});
                return;
            }
            user.Activated = true;
            await user.save();
            res.status(201).json({"Message": "Successfully activated Account."});
        }
    }catch(err){
        console.log(err);
        res.status(500).json("Unknown Server Error");
        return;
    }
}
export {postOTP, postOTPLogin,postOTPSignup, postSignup, getCheckAuth}