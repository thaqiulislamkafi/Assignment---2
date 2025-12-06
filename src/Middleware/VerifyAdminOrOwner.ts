import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "./VerifyAuth";

export const VerifyAdminOrOwner = (req: AuthRequest, res: Response, next: NextFunction) => {

    if (req.params.userId == req.user.data.id) {
        next();
    }
    else if (req.user.data.role == 'admin') {
        next()
    }
    else {
        res.status(403).send({
            success : false,
            message : `Not allowed to Access`
        })
    }
}