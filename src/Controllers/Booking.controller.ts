import { Request, Response } from "express";
import { BookingService } from "../Services/Booking.service";

export const BookingController = {

    async getAllBookings(req: Request, res: Response) {

        try {

            const result = await BookingService.getAllBookings();
            res.status(200).send({
                success: true,
                message: `Bookings retrieve successfully`,
                data: result
            })

        } catch (error) {
            console.error(`Failed to retrieve Bookings`, error);
            res.status(500).send({
                success: false,
                message: `Failed to retrieve Bookings data`,
                error: error
            })
        }
    },

    async getBookingById(req: Request, res: Response, id: number) {

        try {
            const result = await BookingService.getBookingById(id);
            res.status(200).send({
                success: true,
                message: `Booking retrieve successfully`,
                data: result
            })

        } catch (error) {
            console.error(`Failed to retrieve Bookings`, error);
            res.status(500).send({
                success: false,
                message: `Failed to retrieve Bookings data`,
                error: error
            })
        }
    },

    async addBooking(req: Request, res: Response) {

        try {

            const result = await BookingService.addBooking(req.body);

            res.status(201).send({
                success: true,
                message: `Booking created successfully`,
                data: result
            })
        } catch (error: any) {

            console.error(`Failed to add Booking`, error);
            res.status(500).send({
                success: false,
                message: `Failed to add Booking data`,
                error: error.message
            })
        }
    },

    async updateBooking() {


    },
    async deleteBooking() {

    }
}