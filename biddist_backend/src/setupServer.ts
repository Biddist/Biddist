import express, {Express} from "express";
import paramStore from "./paramManager";
import mongoose from "mongoose";
import connectMongo from "connect-mongodb-session";
import session from "express-session";
import {randomBytes} from "crypto";
import cors from "cors";
import statusRouter from "./routes/statusRouter";
async function setupServer(): Promise<Express>{
    const app = express();
    let params = await paramStore.getAllParams();
    const connection = await mongoose.connect(params.db_conn);
    const MongoDBStore = connectMongo(session);
    const sessionStore = new MongoDBStore({
        uri: params.db_conn,
        collection: 'user_sessions'
    });
    const sessionSecret = randomBytes(32).toString('hex');
    const express_session = session({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: true,
            maxAge: 60 * 60 * 1000
        },
        store: sessionStore
    })
    const policy = cors({
        origin: params.frontend_domain,
    })
    app.use(policy);
    app.use(express_session);
    app.use("/status", statusRouter);
    return app;
}
export {setupServer};