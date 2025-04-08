import {Router} from "express";
import {getAccountBids} from "../controllers/auctionController.js";
import {checkAuth, setPayments} from "../middleware/authMiddleware.js";
const auctionRouter = Router();
auctionRouter.get('/accountBids',checkAuth, setPayments, getAccountBids);
export {auctionRouter};