import https from 'https'
import express from 'express';
import session from 'express-session'
import {randomBytes} from 'crypto'
import cors from 'cors'
import { MongoDBStore } from 'connect-mongodb-session';
import { GetParametersCommand, SSMClient } from '@aws-sdk/client-ssm';
import {init} from 'greenlock-express'
import paramStore from './paramManager';
await paramStore.setAllParams();
import { createCertificate } from 'pem';
let params = paramStore.params;

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
if(process.env.NODE_ENV == "production"){
    init({
        packageRoot: __dirname,
        configDir: './greenlock.d',
        maintainerEmail: params.maintainer,
        cluster: true,
    }).serve(app);
}
else{
    let key: string;
    let cert: any;
    createCertificate({ days: 365, selfSigned: true }, (err, keys) => {
        if (err) {
          console.error(err);
          return;
        }
        else{
            key = keys.serviceKey;
            cert = keys.certificate;
        }
        const server = https.createServer({
            key: key,
            cert: cert,
        },app);
        server.listen(443, () => {
            console.log('Server listening on https://localhost:443');
          });
           
    })
}