import mongoose from 'mongoose';

/**
 * Interface for simplifying interactions with Bid database objects
 */
interface IBid {
    _id: mongoose.Types.ObjectId;
    Item: mongoose.Types.ObjectId,
    Bidder: mongoose.Types.ObjectId;
    Money: Number,
    Paid: Boolean,
    IsWinningBid: Boolean,
    payBid(paymentMethodId: string): Promise<boolean>,
}
/**
 * Interface for simplifying interactions with Item database objects
 */
interface IItem{
    _id: mongoose.Types.ObjectId;
    StartDate: Date,
    EndDate: Date,
    Seller: mongoose.Types.ObjectId,
    Sealed: Boolean,
    MinBid: Number,
    TopBid: mongoose.Types.ObjectId,

}
/**
 * Interface for simplifying interactions with Account database objects
 */
interface IAccount{
    _id: mongoose.Types.ObjectId;
    Username: Boolean,
    Password: String,
    Email: String,
    ShippingAddress: String,
    Activated: Boolean,

}
export type {IBid,IItem,IAccount};