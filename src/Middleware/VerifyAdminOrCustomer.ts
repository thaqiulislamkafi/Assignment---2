import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "./VerifyAuth";
import { BookingController } from "../Controllers/Booking.controller";

export const VerifyAdminOrCustomer = (req:AuthRequest,res:Response,next:NextFunction)=>{

    if(req.user.data.role=='admin')
        BookingController.updateBooking(req,res)

    else if(req.user.data.role=='customer')
        BookingController.cancelBooking(req,res);

    else {
        res.status(403).send({
            success : false,
            message : `Not allowed to Access`
        })
    }
}