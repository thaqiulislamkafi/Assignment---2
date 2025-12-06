import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "./VerifyAuth";
import { BookingController } from "../Controllers/Booking.controller";

export const RoleBasedView = (req:AuthRequest,res:Response,next:NextFunction)=>{

    if(req.user.data.role == 'admin'){
        BookingController.getAllBookings(req,res);
    }
    else if(!(req.user.data.role == 'admin') && (req.user.data.id)){
        BookingController.getBookingById(req,res,Number(req.user.data.id))
    }
    else {
        res.status(403).send({
            success : false,
            message : `Not allowed to Access`
        })
    }
        
}