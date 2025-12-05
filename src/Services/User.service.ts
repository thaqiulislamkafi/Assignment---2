import { Response } from "express";
import { User } from "../Models/User";
import { UserRepository } from "../Repository/User.repository";

export const userService = {

    async userRegistration(data:User) {
        if (!data.email || !data.password)
            throw new Error(`Email and Password are required`);

        return await UserRepository.userRegister(data);
    },

    async userLogin(data:User,res:Response){
        return await UserRepository.loginUser(data,res);
    }
}