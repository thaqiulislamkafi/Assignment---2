import { Request, Response } from "express";
import { userService } from "../Services/User.service";

export const userController = {

    async userRegistration(req: Request, res: Response) {

        try {

            const result = await userService.userRegistration(req.body);

            res.status(201).send({
                success: true,
                message: `User registered successfully`,
                data: result
            })
        } catch (error) {
            console.error(`Failed to User register`, error);
            res.status(500).send({
                success: false,
                message: `Failed to User register`,
                error: error
            })
        }

    },

    async userLogin(req: Request, res: Response) {

        try {

            const result = await userService.userLogin(req.body, res);

            res.status(201).send({
                success: true,
                message: `Login successful`,
                data: result
            })
        } catch (error) {
            console.error(`Failed to User Login`, error);
            res.status(500).send({
                success: false,
                message: `Failed to User Login`,
                error: error
            })
        }
    },

    async userUpdate(req: Request, res: Response) {

        try {

            const result = await userService.userUpdate(req.body,Number(req.params.userId));

            res.status(201).send({
                success: true,
                message: `User updated successfully`,
                data: result
            })
        } catch (error) {
            console.error(`Failed to Update User`, error);
            res.status(500).send({
                success: false,
                message: `Failed to Update User`,
                error: error
            })
        }
    },

    async deleteUser(req: Request, res: Response) {

        try {

            const result = await userService.deleteUser(Number(req.params.userId));

            res.status(201).send({
                success: true,
                message: `User deleted successfully`,
                data: result
            })
        } catch (error) {
            console.error(`Failed to Delete User`, error);
            res.status(500).send({
                success: false,
                message: `Failed to Delete User`,
                error: error
            })
        }
    },
}