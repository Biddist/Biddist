import wt = require("wtfnode");
import {Server} from "http";
import {setupServer} from "../src/initialization/setupServer";
import {Express} from "express";
import mongoose from "mongoose";
import setupMongo from "../src/initialization/setupMongo";

describe("setupMongo", () => {
    test("basic connection testing", async() => {
        const connection = await setupMongo();
        expect(mongoose.connections.length).toBe(1);
        await mongoose.connection.close();
        expect(mongoose.connection.readyState).toBe(0);
    })
})