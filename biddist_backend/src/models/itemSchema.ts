import { Schema } from "mongoose";
import mongoose from 'mongoose';
import {Bid} from './bidSchema.js'
import { IItem } from "../interfaces/Imodels.js";

const itemSchema = new Schema<IItem>({
    Seller: {
        type: mongoose.Schema.ObjectId,
        ref: "Account",
        required: true
    },
    Sealed: {
        type: Boolean,
        required: true,
        default: false
    },
    MinBid: {
        type: Number,
        min: [0,'Cannot have negative minimum bid.'],
        default: 0
    },
    TopBid: {
        type: mongoose.Schema.ObjectId,
        ref: "Bid",
        default: null,
    },
    StartDate: {
        type: Date,
        required: true
    },
    EndDate: {
        type: Date,
        required: true,
    }
})
itemSchema.methods.checkBid = async function(bidId: mongoose.Types.ObjectId){
    const bid = await Bid.findById(bidId).exec();
    if(bid == null){
        return false;
    }
    if(this.TopBid == null){
        this.TopBid = bidId;
        await this.save();
        return true;
    }
    else{
        const currentTopBid = await Bid.findById(this.TopBid).exec();
        if(bid.Money >= this.MinBid && bid.Money >  currentTopBid.Money){
            this.TopBid = bidId;
            await this.save();
            return true;
        }
        return false;
    }
}
const Item = mongoose.model("Item",itemSchema);
export {Item};