import { pool } from "../Config/db";
import { Booking } from "../Models/Booking";

export const BookingRepository = {
    
    async getAllBookings (){
        
    },

    async getBookingById(){

    },

    async addBooking(data:Booking){
        const {customer_id,vehicle_id,rent_start_date,rent_end_date} = data
        
                const query = `INSERT INTO bookings(customer_id,vehicle_id,rent_start_date,rent_end_date) VALUES($1,$2,$3,$4) RETURNING *` ;
        
                const result = await pool.query(query,[customer_id,vehicle_id,rent_start_date,rent_end_date]) ;
        
                return result.rows[0];
    },

    async updateBooking (){

    },
    async deleteBooking() {

    }
}