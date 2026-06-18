import { QueryResult } from "pg";
import { pool } from "../Config/db";
import { formattingAdminView } from "../Helper/formattingAdminView";
import { formattingUserView } from "../Helper/formattingUserView";
import { totalRentCount } from "../Helper/totalRentCount";
import { Booking } from "../Models/Booking";
import { Vehicle } from "../Models/Vehicles";

export const BookingRepository = {

    async getAllBookings(): Promise<Booking[]> {

        const query = `SELECT b.id,b.customer_id,b.vehicle_id, b.rent_start_date, b.rent_end_date, b.total_price, b.status, u.name,u.email, v.vehicle_name,v.registration_number FROM bookings b JOIN vehicles v ON b.vehicle_id = v.id JOIN users u ON b.customer_id = u.id ORDER BY b.id ASC`

        const result = await pool.query(query);
        const finalResult = formattingAdminView(result.rows);
        return finalResult;

    },

    async getBookingById(id: number): Promise<Booking> {

        const query = `SELECT b.id,b.vehicle_id,b.rent_start_date,b.rent_end_date, b.total_price, b.status, v.vehicle_name,v.registration_number,v.type FROM bookings b JOIN vehicles v ON b.vehicle_id = v.id WHERE b.id=$1`;

        const result = await pool.query(query, [id]);
        const finalResult = formattingUserView(result.rows);
        return finalResult[0];

    },

    async getBookingsByVehicleId(vehicleId: number): Promise<Booking[] | null> {

        const query = ` SELECT b.id, b.customer_id, b.vehicle_id, b.rent_start_date, b.rent_end_date, b.total_price, b.status, u.name, u.email, u.phone, v.vehicle_name, v.registration_number, v.type FROM bookings b JOIN vehicles v ON b.vehicle_id = v.id JOIN users u ON b.customer_id = u.id WHERE b.vehicle_id = $1 ORDER BY b.id ASC `;

        const result = await pool.query(query, [vehicleId]);

        return result.rows;
    },

    async getBookingsByUserId(userId: number): Promise<Booking[] | null> {

        const query = `SELECT b.id, b.customer_id, b.vehicle_id, b.rent_start_date, b.rent_end_date, b.total_price, b.status, u.name, u.email, u.phone, v.vehicle_name, v.registration_number, v.type 
        FROM bookings b JOIN users u ON b.customer_id = u.id JOIN vehicles v ON b.vehicle_id = v.id WHERE b.customer_id = $1 ORDER BY b.id DESC`;

        const result = await pool.query(query, [userId]);

        return result.rows;
    },

    async addBooking(data: Booking) {

        const { customer_id, vehicle_id, rent_start_date, rent_end_date } = data

        const query = `SELECT * FROM vehicles WHERE id = $1`;
        let Vehicle: any = await pool.query(query, [vehicle_id]);

        Vehicle = Vehicle.rows[0];

        if (Vehicle.availability_status != 'available')
            throw new Error(`Vehicle is already Booked`)

        const totalRent = totalRentCount(rent_start_date, rent_end_date, Vehicle.daily_rent_price);

        const query1 = `INSERT INTO bookings(customer_id,vehicle_id,rent_start_date,rent_end_date,total_price) VALUES($1,$2,$3,$4,$5) RETURNING *`;

        const result = await pool.query(query1, [customer_id, vehicle_id, rent_start_date, rent_end_date, totalRent]);

        const query2 = `UPDATE vehicles SET availability_status = $1 WHERE id = $2`;

        await pool.query(query2, [`bookd`, vehicle_id]);

        return {
            id: result.rows[0].id,
            customer_id: result.rows[0].customer_id,
            vehicle_id: result.rows[0].vehicle_id,
            rent_start_date: result.rows[0].rent_start_date,
            rent_end_date: result.rows[0].rent_end_date,
            total_price: result.rows[0].total_price,
            status: result.rows[0].status,
            vehicle: {
                vehicle_name: Vehicle.vehicle_name,
                daily_rent_price: Vehicle.daily_rent_price
            }
        };
    },

    async updateBooking(id: number) {

        const query = `UPDATE bookings SET status = $1 WHERE id = $2 RETURNING * `

        let updatedBooking: any = await pool.query(query, ['returned', id]);

        if (updatedBooking.rows.length === 0)
            throw new Error('Booking id doesnt match');

        updatedBooking = updatedBooking.rows[0];

        const query1 = `UPDATE vehicles SET availability_status = $1 WHERE id=$2 RETURNING *`

        const updatedVehicle: Vehicle = (await pool.query(query1, ['available', updatedBooking.vehicle_id])).rows[0];

        return {
            id: updatedBooking.id,
            customer_id: updatedBooking.customer_id,
            vehicle_id: updatedBooking.vehicle_id,
            rent_start_date: updatedBooking.rent_start_date,
            rent_end_date: updatedBooking.rent_end_date,
            total_price: updatedBooking.total_price,
            status: updatedBooking.status,
            vehicle: {
                availability_status: updatedVehicle.availability_status
            }
        }

    },

    async cancelBooking(id: number) {

        const query = `UPDATE bookings SET status = $1 WHERE id = $2 RETURNING * `

        let updatedBooking: any = await pool.query(query, ['cancelled', id]);

        if (updatedBooking.rows.length === 0)
            throw new Error('Booking id doesnt match');

        updatedBooking = updatedBooking.rows[0];

        const query1 = `UPDATE vehicles SET availability_status = $1 WHERE id=$2 RETURNING *`

        const updatedVehicle: Vehicle = (await pool.query(query1, ['available', updatedBooking.vehicle_id])).rows[0];

        return updatedBooking;
    }
}