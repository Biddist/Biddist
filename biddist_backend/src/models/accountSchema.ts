import { Schema } from "mongoose";
import {IAccount} from '../interfaces/Imodels'
const accountSchema = new Schema<IAccount>({
    Username: {
        type: String,
        required: true,
        unique: true,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    Password: {
        type: String,
        required: true
    },
})
accountSchema.methods.charge = (paymentId: String)=>{

}