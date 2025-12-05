import { Request, Response } from "express";
import { BookingService } from "../Services/Booking.service";

export const BookingController = {

    async getAllBookings() {

    },

    async getBookingById() {

    },

    async addBooking(req: Request, res: Response) {

        try {

            const result = await BookingService.addBooking(req.body);

            res.status(201).send({
                success: true,
                message: `Booking created successfully`,
                data: result
            })
        } catch (error) {

            console.error(`Failed to add Booking`, error);
            res.status(500).send({
                success: false,
                message: `Failed to add Booking data`,
                error: error
            })
        }
    },

    async updateBooking() {

    },
    async deleteBooking() {

    }
}