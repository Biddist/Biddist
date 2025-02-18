import {Bid} from "../models/bidSchema.js";
import {IBid} from "../interfaces/Imodels.js";
import {Item} from "../models/itemSchema.js";
import {IItem} from "../interfaces/Imodels.js";
import {Request, Response} from "express";
import {Readable} from "node:stream";

/**
 * Gets all bids made by this Account, ommiting whether or not this bid is the winning one
 * @param req
 * @param res
 */
const getAccountBids = async (req: Request, res: Response) => {
    const bidWatcher = Bid.watch([{
        $match: {
            $and: [
                {'fullDocument.Bidder': req.session.accountId},
                {'operationType': {$in: ['insert','update']}}
            ]
        },
    }],{fullDocument: 'updateLookup'});
    const bidStream = new Readable();
    const bids = await Bid.find({Bidder: req.session.accountId}).lean().exec();
    for (const bid of bids) {
        const item = await Item.findById(bid.Item).lean().exec();
        if(item.Sealed){
            delete bid.IsWinningBid;
        }
        bidStream.push(bid);
    }
    bidWatcher.on('change',next=>{
        bidStream.push(next.fullDocument);
    })
    bidStream.pipe(res);
}
export {getAccountBids};