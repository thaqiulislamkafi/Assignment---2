import { Response } from "express";
import { pool } from "../Config/db";
import { User } from "../Models/User";

export const UserRepository = {

    async userRegister(data:User):Promise<User|null>{

        const {name,email,password,phone,role} = data ;

        const query = `INSERT INTO users(name,email,password,phone,role) VALUES ($1,$2,$3,$4,$5) RETURNING *`

        const result = await pool.query(query,[name,email,password,phone,role]) ;

        return result.rows[0] ;
    },

    async loginUser (data:User,res:Response){
        const {email,password} = data ;
        const query  = `SELECT * FROM users WHERE email = $1` ;

        const result = await pool.query(query,[email]) ;

        if(result.rowCount ===0)
            return res.status(404).send({
                success:false,
                message : `Email doesn't match`
            })

        else if (result.rows[0].password == password) {
            return result.rows[0];
        }
    },

    async getAllUsers ():Promise<User[]>{

        const query = `SELECT * FROM users`
        const result = await pool.query(query) ;
        return result.rows ;

    },

    async updateUser (data:User,id:number){

        const {name,email,phone,role} = data ;

        const query = `UPDATE users SET name=$1,email=$2,phone=$3,role=$4 WHERE id=$5 RETURNING *`

        const result = await pool.query(query,[name,email,phone,role,id]) ;

        return result.rows[0] ;

    },

    async deleteUser(id:number){
        const query = `DELETE FROM users WHERE id = $1 RETURNING *` ;
        const result = await pool.query(query,[id]) ;
        return result.rows[0];
    }
}