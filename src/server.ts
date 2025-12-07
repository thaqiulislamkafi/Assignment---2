import express, { Request, Response } from 'express'
import { initDB } from './Config/db';
import { VehicleController } from './Controllers/Vehicle.controller';
import cors from 'cors'
import { userController } from './Controllers/User.controller';
import { BookingController } from './Controllers/Booking.controller';
import { verifyAuth } from './Middleware/VerifyAuth';
import { VerifyAdmin } from './Middleware/VerifyAdmin';
import { VerifyAdminOrOwner } from './Middleware/VerifyAdminOrOwner';
import { RoleBasedView } from './Middleware/RoleBasedView';
import { VerifyAdminOrCustomer } from './Middleware/VerifyAdminOrCustomer';
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

app.get('/api/v1/users',verifyAuth,VerifyAdmin,userController.getAllUsers);
app.put('/api/v1/users/:userId',verifyAuth,VerifyAdminOrOwner,userController.userUpdate);
app.delete('/api/v1/users/:userId',verifyAuth,VerifyAdmin,userController.deleteUser)

app.get('/api/v1/vehicles',VehicleController.getVehicles);
app.get(`/api/v1/vehicles/:vehicleId`,VehicleController.getVehicleById)

app.post('/api/v1/vehicles',verifyAuth,VerifyAdmin,VehicleController.addVehicle);
app.put('/api/v1/vehicles/:vehicleId',verifyAuth,VerifyAdmin,VehicleController.updateVehicle)
app.delete('/api/v1/vehicles/:vehicleId',verifyAuth,VerifyAdmin,VehicleController.deleteVehicle) ;

app.get('/api/v1/bookings',verifyAuth,RoleBasedView) ;
app.post('/api/v1/bookings',verifyAuth,BookingController.addBooking) ;
app.put('/api/v1/bookings/:bookingId',verifyAuth,VerifyAdminOrCustomer);


app.listen(PORT,()=>{
    console.log(`Server is going on ${PORT}`)
}) ; 