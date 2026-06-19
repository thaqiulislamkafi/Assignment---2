import cron from "node-cron";
import { autoReturnBookings } from "../Helper/autoReturn";

cron.schedule("0 * * * *", async () => {
    console.log("Running auto return job...");
    await autoReturnBookings();
});