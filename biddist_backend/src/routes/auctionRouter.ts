import {Router} from "express";
import {getAccountBids} from "../controllers/auctionController";
import {checkAuth, setPayments} from "../middleware/authMiddleware";
const auctionRouter = Router();
auctionRouter.get('/accountBids',checkAuth, setPayments, getAccountBids);