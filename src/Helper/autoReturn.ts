import { pool } from "../Config/db";

export const autoReturnBookings = async () => {

    const query = `
        SELECT * FROM bookings
        WHERE status = 'active'
        AND rent_end_date < NOW()
    `;

    const result = await pool.query(query);

    for (const booking of result.rows) {

        await pool.query(
            `UPDATE bookings SET status='returned' WHERE id=$1`,
            [booking.id]
        );

        await pool.query(
            `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
            [booking.vehicle_id]
        );
    }
};