import express, {Express} from "express";
import paramStore from "../paramManager.js";
import connectMongo from "connect-mongodb-session";
import session from "express-session";
import {randomBytes} from "crypto";
import cors from "cors";
import statusRouter from "../routes/statusRouter.js";
import setupMongo from "./setupMongo.js";
import {authRouter} from "../routes/authRouter.js";
import {auctionRouter} from "../routes/auctionRouter.js";
async function setupServer(): Promise<Express>{
    const app = express();
    let params = await paramStore.getAllParams();
    const connection = await setupMongo();
    const MongoDBStore = connectMongo(session);
    const sessionStore = new MongoDBStore({
        uri: params.db_conn,
        collection: 'user_sessions'
    });
    const sessionSecret = randomBytes(32).toString('hex');
    const express_session = session({
        secret: sessionSecret,
        resave: true,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 1000
        },
        store: sessionStore
    })
    const policy = cors({
        origin: params.frontend_domain,
        credentials: true
    })
    app.use(policy);
    app.use(express_session);
    app.use(express.json());
    app.use("/status", statusRouter);
    app.use("/auth",authRouter);
    app.use("/auction", auctionRouter);
    return app;
}
export {setupServer};