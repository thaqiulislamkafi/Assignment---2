import { Request, Response } from "express";
import { VehicleService } from "../Services/Vehicle.service";

export const VehicleController = {

    async getVehicles(req:Request,res:Response){

        try {
            
            const result = await VehicleService.getVehicles();

            res.status(200).send({
                success : true,
                message : `Vehicles retrieved successfully`,
                data : result
            })
        } catch (error) {
            console.error(`Failed to retrieve Vehicles`,error);
            res.status(500).send({
                success : false,
                message : `Failed to retrieve Vehicles data`,
                error : error
            })
        
    
        }
    },
    async getVehicleById(req:Request,res:Response){

        try {
            
            const result = await VehicleService.getVehicleById(Number(req.params.vehicleId));

            res.status(200).send({
                success : true,
                message : `Vehicle retrieved successfully`,
                data : result
            })
        } catch (error) {
            console.error(`Failed to retrieve Vehicle`,error);
            res.status(500).send({
                success : false,
                message : `Failed to retrieve Vehicle data`,
                error : error
            })
        
    
        }
    },

    async addVehicle(req:Request,res:Response){

        try {
            
            const result = await VehicleService.addVehicle(req.body);

            res.status(201).send({
                success : true,
                message : `Vehicle created successfully`,
                data : result
            })
        } catch (error) {
            console.error(`Failed to add Vehicle`,error);
            res.status(500).send({
                success : false,
                message : `Failed to add Vehicle data`,
                error : error
            })
        }
    },
    async updateVehicle(req:Request,res:Response){

        try {
            
            const result = await VehicleService.updateVehicle(req.body,Number(req.params.vehicleId));

            res.status(200).send({
                success : true,
                message : `Vehicle updated successfully`,
                data : result
            })
        } catch (error) {
            console.error(`Failed to updated Vehicle`,error);
            res.status(500).send({
                success : false,
                message : `Failed to updated Vehicle data`,
                error : error
            })
        }
    },

    async deleteVehicle(req:Request,res:Response){
        
        try {
            
            const result = await VehicleService.deleteVehicle(Number(req.params.vehicleId));

            res.status(200).send({
                success : true,
                message : `Vehicle deleted successfully`,
                data : result
            })
        } catch (error) {
            console.error(`Failed to delete Vehicle`,error);
            res.status(500).send({
                success : false,
                message : `Failed to delete Vehicle data`,
                error : error
            })
        }
    },
}