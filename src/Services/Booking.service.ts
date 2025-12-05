import { Booking } from "../Models/Booking";
import { BookingRepository } from "../Repository/Booking.repository";

export const BookingService = {

    async getAllBookings() {

    },

    async getBookingById() {

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