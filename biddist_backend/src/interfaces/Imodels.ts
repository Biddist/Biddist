import mongoose from 'mongoose';
interface IBid {
    Item: mongoose.Types.ObjectId,
    Bidder: mongoose.Types.ObjectId;
    Money: Number,

}
interface IItem{
    StartDate: Date,
    EndDate: Date,
    Seller: mongoose.Types.ObjectId,
    Sealed: Boolean,
    MinBid: Number,
    TopBid: mongoose.Types.ObjectId,

}
interface IAccount{
    Username: String,
    Password: String,
    Email: String,
    PaymentId: String,
    ShippingAddress: String

}
export type {IBid,IItem,IAccount};