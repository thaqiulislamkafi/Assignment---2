import express, { Request, Response } from 'express'
import { initDB } from './Config/db';
import { VehicleController } from './Controllers/Vehicle.controller';
import cors from 'cors'
const app = express();
app.use(cors());
app.use(express.json())
const PORT = 5000;

initDB()

app.get('/',(req:Request,res:Response)=>{
    res.status(200).send(`Server is on going Successfully`);
})

app.get('/api/v1/vehicles',VehicleController.getVehicles);
app.post('/api/v1/vehicles',VehicleController.addVehicle);
app.put('/api/v1/vehicles/:vehicleId',VehicleController.updateVehicle)


app.listen(PORT,()=>{
    console.log(`Server is going on ${PORT}`)
}) ; 