import {Router} from "express";
const statusRouter = Router();
/**
 * Basic Health check that clients and container orchestrators can use.
 */
statusRouter.get("/health",(req, res) => {
    res.status(200).json({message: "HEALTHY"});
})
export default statusRouter;