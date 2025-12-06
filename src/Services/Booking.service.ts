import { Booking } from "../Models/Booking";
import { BookingRepository } from "../Repository/Booking.repository";

export const BookingService = {

    async getAllBookings() {
        return await BookingRepository.getAllBookings() ;
    },

    async getBookingById(id:number) {
        return await BookingRepository.getBookingById(id)
    },

    async addBooking(data: Booking) {
        if (!data.customer_id || !data.vehicle_id)
            throw new Error(`Vehicle id and customer id are required`);

        return await BookingRepository.addBooking(data);
    },

    async updateBooking() {

    },
    async deleteBooking() {

    }
}