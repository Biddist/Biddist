import {Request, Response,NextFunction} from 'express';
import {Bid} from "../models/bidSchema";

/**
 * Checks if the incoming request is logged in, refusing the request if it is not..
 */
const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    if(req.session.accountId) {
        next();
    }
    else{
        res.status(401).json({message:"Not authorized"});
        return;
    }
}
/**
 * Queries the database to see if the current Account has unpaid  winning Bids,
 * setting session data field unpaidBids to the number of such bids.
 */
const setPayments = async (req: Request, res: Response, next: NextFunction) => {
    if(req.params.accountId){
        res.status(401).json({message: 'Not authorized'});
        return;
    }
    const currAccountId = req.params.accountId;
    req.session.unpaidBids = await Bid.countDocuments({Bidder: currAccountId, Paid: false, IsWinningBid: true});
    if(req.session.unpaidBids &&  req.session.unpaidBids > 0){
        res.status(402).json({message: "Unpaid Bids"});
        return;
    }
    else{
        next();
    }
}
export {checkAuth, setPayments};