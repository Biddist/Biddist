import {SessionData} from 'express-session'
import mongoose from "mongoose";
declare module "express-session"{
    /**
     * @prop otp is the (hashed) One Time Password expected for login
     * @prop secret is the secret being used to generate one time passwords
     * @prop email is the email the session is attempting to authenticate
     * @prop accountId is the database object id of the account, added to session after authentication
     * @prop hasUnpaidBids is the number of winning bids the account hasn't paid yet..
     */
    interface SessionData {
        accountId?: mongoose.Types.ObjectId;
        secret?: string;
        otp?: string;
        email?: string;
        unpaidBids?: number;
    }
}

/**
 * @prop frontend_domain identifies the expected frontend domain for CORS purposes
 * @prop db_conn is the database connection string
 * @prop stripe is the stripe secret key
 * @prop mailgun is the mailgun API key
 * @prop mailgun_domain is the domain from which mailgun emails are sent
 */
interface BiddistParams {
    frontend_domain: string,
    db_conn: string,
    stripe: string;
    mailgun: string;
    mailgun_domain: string;
}
export {SessionData,BiddistParams}