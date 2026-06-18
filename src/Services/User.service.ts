import { Response } from "express";
import { User } from "../Models/User";
import { UserRepository } from "../Repository/User.repository";
import { BookingService } from "./Booking.service";

export const userService = {

    async userRegistration(data:User) {
        if (!data.email || !data.password)
            throw new Error(`Email and Password are required`);

        return await UserRepository.userRegister(data);
    },

    async userLogin(data:User,res:Response){
        return await UserRepository.loginUser(data,res);
    },

    async getAllUsers(){
        return await UserRepository.getAllUsers() ;
    },

    async userUpdate(data:User,id:number){
        return await UserRepository.updateUser(data,id);
    },

    async deleteUser(id:number){

        const ifUserExist = await BookingService.getBookingsByUserId(id) ;
        if(ifUserExist) 
            throw new Error('Users have booking, dont deleted')
        return await UserRepository.deleteUser(id) ;
    }


}