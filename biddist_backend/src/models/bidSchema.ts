import mongoose, {Schema} from 'mongoose'
import {IBid} from '../interfaces/Imodels.js';
import {Services} from "../services.js";

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
    Paid: {
        type: Boolean,
        default: false
    },
    IsWinningBid: {
        type: Boolean,
        default: false
    }
});

/**
 * Creates and confirms a Stripe PaymentIntent to pay for a successful bid.
 * @param paymentMethodId the Id of the customer's payment method, used to make the payment intent.
   @return true if the payment succeeded, false otherwise.
 */
bidSchema.methods.payBid = async function(paymentMethodId: string): Promise<boolean> {
    const stripe = await Services.getStripe();
    const result = await stripe.paymentIntents.create({
        currency: 'usd',
        amount: this.Money,
        confirm: true,
        payment_method: paymentMethodId
    });
    if(result.status == 'succeeded'){
        this.Paid = true;
        await this.save();
        return true;
    }
    else{
        return false;
    }
}
const Bid = mongoose.model("Bid",bidSchema);
export  {Bid};