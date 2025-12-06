import { pool } from "../Config/db";
import { totalRentCount } from "../Helper/totalRentCount";
import { Booking } from "../Models/Booking";
import { Vehicle } from "../Models/Vehicles";

export const BookingRepository = {

    async getAllBookings() {

    },

    async getBookingById() {

    },

    async addBooking(data: Booking) {

        const { customer_id, vehicle_id, rent_start_date, rent_end_date } = data

        const query = `SELECT * FROM vehicles WHERE id = $1`;
        let Vehicle:any = await pool.query(query,[vehicle_id]) ;

        Vehicle = Vehicle.rows[0] ;

        if(Vehicle.availability_status != 'available')
            throw new Error(`Vehicle is already Booked`)

        const totalRent = totalRentCount(rent_start_date,rent_end_date,Vehicle.daily_rent_price) ;

        const query1 = `INSERT INTO bookings(customer_id,vehicle_id,rent_start_date,rent_end_date,total_price) VALUES($1,$2,$3,$4,$5) RETURNING *`;

        const result = await pool.query(query1, [customer_id, vehicle_id, rent_start_date, rent_end_date,totalRent]);

        const query2 = `UPDATE vehicles SET availability_status = $1 WHERE id = $2` ;

        await pool.query(query2,[`bookd`,vehicle_id]) ;

        return {
            id : result.rows[0].id,
            customer_id : result.rows[0].customer_id,
            vehicle_id : result.rows[0].vehicle_id,
            rent_start_date : result.rows[0].rent_start_date,
            rent_end_date : result.rows[0].rent_end_date,
            total_price : result.rows[0].total_price,
            status : result.rows[0].status,
            vehicle : {
                vehicle_name : Vehicle.vehicle_name,
                daily_rent_price : Vehicle.daily_rent_price
            }
        };
    },

    async updateBooking() {

    },
    async deleteBooking() {

    }
}