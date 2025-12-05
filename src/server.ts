import express, { Request, Response } from 'express'
import { initDB } from './Config/db';
import { VehicleController } from './Controllers/Vehicle.controller';
import cors from 'cors'
import { userController } from './Controllers/User.controller';
import { BookingController } from './Controllers/Booking.controller';
const app = express();
app.use(cors());
app.use(express.json())
const PORT = 5000;

initDB()

app.get('/',(req:Request,res:Response)=>{
    res.status(200).send(`Server is on going Successfully`);
})

app.post('/api/v1/auth/signup',userController.userRegistration);
app.post('/api/v1/auth/signin',userController.userLogin);
app.put('/api/v1/users/:userId',userController.userUpdate);
app.delete('/api/v1/users/:userId',userController.deleteUser)

app.get('/api/v1/vehicles',VehicleController.getVehicles);
app.get(`/api/v1/vehicles/:vehicleId`,VehicleController.getVehicleById)

app.post('/api/v1/vehicles',VehicleController.addVehicle);
app.put('/api/v1/vehicles/:vehicleId',VehicleController.updateVehicle)
app.delete('/api/v1/vehicles/:vehicleId',VehicleController.deleteVehicle) ;

app.post('/api/v1/bookings',BookingController.addBooking);


app.listen(PORT,()=>{
    console.log(`Server is going on ${PORT}`)
}) ; 