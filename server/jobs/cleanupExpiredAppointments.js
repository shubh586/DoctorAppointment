import cron from "node-cron";
import Appointment from "../models/Appointment.js";

// This job runs every 30 seconds to check for expired pending appointments
const startCleanupJob = () => {
    // Run every 30 seconds: "*/30 * * * * *"
    // For production, consider running every 1-5 minutes: "*/1 * * * *"
    cron.schedule("*/30 * * * * *", async () => {
        try {
            const now = new Date();

            // Find appointments that have expired
            const expiredAppointments = await Appointment.find({
                paymentStatus: "pending",
                expiresAt: { $lte: now },
                status: { $ne: "Cancelled" },
            });

            if (expiredAppointments.length > 0) {
                console.log(
                    `🔄 Found ${expiredAppointments.length} expired appointment(s). Cleaning up...`
                );

                // Update all expired appointments
                for (const appointment of expiredAppointments) {
                    appointment.paymentStatus = "expired";
                    appointment.status = "Cancelled";
                    await appointment.save();

                    console.log(
                        `❌ Expired appointment ${appointment._id} - Slot: ${appointment.slotTime}`
                    );
                }

                console.log(`✅ Cleanup completed. ${expiredAppointments.length} slots now available.`);
            }
        } catch (error) {
            console.error("❌ Error in cleanup job:", error);
        }
    });

    console.log("🚀 Appointment cleanup job started (runs every 30 seconds)");
};

export default startCleanupJob;
