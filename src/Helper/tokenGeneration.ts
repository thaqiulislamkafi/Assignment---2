
import jwt from 'jsonwebtoken'
import { User } from '../Models/User'
import dotenv from 'dotenv'
dotenv.config() ;

 export const tokenGeneration = (data:User)=>{

    const secret_key = process.env.SECRET_KEY ;

    const token = jwt.sign({data},`${secret_key}`,{
        expiresIn : "1h"
    })

    return token
}