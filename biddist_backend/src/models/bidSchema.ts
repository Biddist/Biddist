import mongoose, {Schema} from 'mongoose'
import {IBid} from '../interfaces/Imodels';
import {Services} from "../services";

const bidSchema = new Schema<IBid>({
    Bidder: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Account",
    },
    Item: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "Item"
    },
    Money: {
        type: Number,
        required: true,
    },
    PaymentMethodId: {
        type: String,
        required: true,
    }
});
const Bid = mongoose.model("Bid",bidSchema);
export default Bid;
export type {IBid};