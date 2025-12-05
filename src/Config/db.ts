import pg, { Pool } from 'pg'
import dotenv from 'dotenv'
dotenv.config()

export const pool = new Pool({
    connectionString : process.env.CONN_STRING 
}) ;

export const initDB = async()=>{

    try {

        const query1 = `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE CHECK(email=LOWER(email)),
        password VARCHAR(250) NOT NULL CHECK(LENGTH(password)>=6),
        phone VARCHAR(20) NOT NULL ,
        role VARCHAR(20) NOT NULL CHECK(role IN ('admin','customer'))
        )`
        await pool.query(query1);

        const query2 = `CREATE TABLE IF NOT EXISTS vehicles(
        id SERIAL PRIMARY KEY,
        vehicle_name VARCHAR(25) NOT NULL,
        type VARCHAR(20) NOT NULL CHECK(type IN ('car','bike','van','SUV')),
        registration_number VARCHAR(20) NOT NULL UNIQUE,
        daily_rent_price INT NOT NULL CHECK(daily_rent_price > 0),
        availability_status VARCHAR(20) NOT NULL CHECK(availability_status IN ('available','bookd'))
        )`

        await pool.query(query2);
        console.log(`Table Created`)
        
    } catch (error) {
        console.log(`Filed to connect with neonDB`,error)
    }
}