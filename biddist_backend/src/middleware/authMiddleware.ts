import {Request, Response,NextFunction} from 'express';
const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    if(req.session.accountId) {
        next();
    }
    else{
        res.status(401).send('Not authorized');
        return;
    }
}
export {checkAuth};