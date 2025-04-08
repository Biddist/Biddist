import mongoose from "mongoose";
import paramStore from "../paramManager.js";

export default async function setupMongo(): Promise<mongoose.Mongoose> {
    let params = await paramStore.getAllParams();
    return await mongoose.connect(params.db_conn);
}