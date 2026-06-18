import { Booking } from "../Models/Booking";
import { BookingRepository } from "../Repository/Booking.repository";

export const BookingService = {

    async getAllBookings() {
        return await BookingRepository.getAllBookings();
    },

    async getBookingById(id: number) {
        return await BookingRepository.getBookingById(id)
    },

    async getBookingsByVehicleId(vehicleId: number) {
        return await BookingRepository.getBookingsByVehicleId(vehicleId);
    },

    async getBookingsByUserId(userId: number) {
        return await BookingRepository.getBookingsByUserId(userId);
    },

    async addBooking(data: Booking) {
        if (!data.customer_id || !data.vehicle_id)
            throw new Error(`Vehicle id and customer id are required`);

        return await BookingRepository.addBooking(data);
    },

    async updateBooking(id: number) {
        return BookingRepository.updateBooking(id);
    },

    async cancelBooking(id: number) {

        const isBookedExist: Booking = await BookingRepository.getBookingById(id);
        const startDate = new Date(isBookedExist.rent_start_date);

        if (new Date() >= startDate) {
            throw new Error("Cannot cancel after rental period starts");
        }
        
        return BookingRepository.cancelBooking(id)
    }
}