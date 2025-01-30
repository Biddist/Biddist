import express from 'express';
import session from 'express-session'
import {randomBytes} from 'crypto'
import cors from 'cors'
import connectMongo from 'connect-mongodb-session';
import paramStore from "./paramManager.js";
import mongoose from "mongoose";
let params = await paramStore.getAllParams();
await mongoose.connect(params.db_conn);
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
const app = express();
const policy = cors({
    origin: params.frontend_domain,
})
app.use(policy);
app.use(express_session);
app.listen(8000,()=>{
    console.log('Server started on port 8080')
})