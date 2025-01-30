import mongoose, { Schema } from "mongoose";
import {IAccount} from '../interfaces/Imodels'
const accountSchema = new Schema<IAccount>({
    Username: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
    },
    Activated: {
        type: Boolean,
        default: false,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        minlength: 1,
    },
    Password: {
        type: String,
        required: true,
        minlength: 1,
    },
    ShippingAddress: {
        type: String,
        required: true,
        minlength: 1,
    }
})
const Account = mongoose.model("Account", accountSchema);
export default Account;