import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "./VerifyAuth";


export const VerifyAdmin = (req:AuthRequest,res:Response,next:NextFunction)=>{

    if(!(req.user.data.role == 'admin')){
        res.status(403).send({
            success : false,
            message : `Not allowed to Access`
        })
    }
    else {
        next() ;
    }


}