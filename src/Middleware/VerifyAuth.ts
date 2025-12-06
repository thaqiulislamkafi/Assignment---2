import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken' ;
import dotenv from 'dotenv' ;
dotenv.config() ;

export interface AuthRequest extends Request {
    user?: any
}

export const verifyAuth = (req:AuthRequest,res:Response,next:NextFunction)=>{

    console.log(req.headers.authorization) ;
    const token:any = req.headers.authorization?.split(" ")[1] ;

    if(!token) 
        return res.status(401).send({
            success : false,
            message : 'Unauthorized access'
        })

    const secret_key = process.env.SECRET_KEY

    const decoded = jwt.verify(token,`${secret_key}`)

    req.user = decoded ;
    
    next() ;

}
