import mongoose from 'mongoose';
interface IBid {
    _id: mongoose.Types.ObjectId;
    Item: mongoose.Types.ObjectId,
    Bidder: mongoose.Types.ObjectId;
    Money: Number,
    PaymentMethodId: String,
}
interface IItem{
    _id: mongoose.Types.ObjectId;
    StartDate: Date,
    EndDate: Date,
    Seller: mongoose.Types.ObjectId,
    Sealed: Boolean,
    MinBid: Number,
    TopBid: mongoose.Types.ObjectId,

}
interface IAccount{
    _id: mongoose.Types.ObjectId;
    Username: Boolean,
    Password: String,
    Email: String,
    ShippingAddress: String,
    Activated: Boolean,

}
export type {IBid,IItem,IAccount};