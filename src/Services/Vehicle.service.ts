import { Vehicle } from "../Models/Vehicles";
import { VehicleRepository } from "../Repository/Vehicle.repository";


export const VehicleService = {

    async getVehicles(){
        return await VehicleRepository.getVehicles() ; 
    },

    async addVehicle(data:Vehicle){
        if(!data.vehicle_name)
             throw new Error(`Vehicle name required`);

        return await VehicleRepository.addVehicle(data) ;
    },
    async updateVehicle(data:Vehicle,id:number){

        return await VehicleRepository.updateVehicle(data,id) ;
    }
}