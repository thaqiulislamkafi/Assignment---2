import { pool } from "../Config/db";
import { Vehicle } from "../Models/Vehicles";


export const VehicleRepository = {

    async getVehicles(): Promise<Vehicle[]>{

        const query = `SELECT * FROM vehicles ORDER BY id ASC`
        const result = await pool.query(query);
        return result.rows;

    },

    async addVehicle(data:Vehicle):Promise<Vehicle|null>{
        
        const {vehicle_name,type,registration_number,daily_rent_price,availability_status} = data

        const query = `INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES($1,$2,$3,$4,$5) RETURNING *` ;

        const result = await pool.query(query,[vehicle_name,type,registration_number,daily_rent_price,availability_status]) ;

        return result.rows[0];
    },

    async updateVehicle(data:Vehicle,id:number):Promise<Vehicle|null>{
        
        const {vehicle_name,type,registration_number,daily_rent_price,availability_status} = data

        const query = `UPDATE vehicles SET vehicle_name = $1,type = $2 ,registration_number = $3, daily_rent_price = $4,availability_status = $5 WHERE id = $6 RETURNING *` ;

        const result = await pool.query(query,[vehicle_name,type,registration_number,daily_rent_price,availability_status,id]) ;

        return result.rows[0];
    }
}