import express from "express";
import "express-async-errors";
import path from "path";
import cors from "cors";
import connectDB from "./db/connect.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import userAuthRoutes from "./routes/userAuthRoutes.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import doctorAuthRoutes from "./routes/doctorAuthRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import startCleanupJob from "./jobs/cleanupExpiredAppointments.js";
import notFoundMiddleware from "./middleware/notFoundMiddleware.js";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATCH",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("Hey there HEllllooooo");
});
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/auth/user", userAuthRoutes);
app.use("/api/auth/admin", adminAuthRoutes);
app.use("/api/auth/doctor", doctorAuthRoutes);
app.use("/api/payment", paymentRoutes);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    // Start cleanup job for expired appointments
    startCleanupJob();

    app.listen(port, () => {
      console.log(`server is connected on the ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
