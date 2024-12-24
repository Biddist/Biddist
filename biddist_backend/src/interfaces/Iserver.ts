import {Session, SessionData} from 'express-session'
import { IncomingMessage } from 'http';
import { GeneratedSecret } from 'speakeasy';
declare module "express-session"{
    interface SessionData {
        accountId: string;
        secret: string;
        otp: string;
    }
}
interface BiddistParams {
    frontend_domain: string,
    db_conn: string,
    stripe: string;
    mailgun: string;
    mailgun_domain: string;
    maintainer: string,
}
export {SessionData,BiddistParams}