import connectDB from "./db/connect.js";
import dotenv from "dotenv";
dotenv.config();
import User from "./models/User.js";

const start = async (req, res) => {
  try {
    await connectDB(process.env.MONGO_URI);
    await User.deleteMany();
    const response = await User.create({
      name: "Shubham",
      email: "admin@example.com",
      role: "Admin",
      password: "admin123",
      phone: "1234567890",
      gender: "Male",
      birthdate: new Date("1980-01-01T00:00:00.000Z"),
      address: {
        line1: "123 Admin St",
        line2: "Administration Building",
      },
      appointments: [],
      doctor: [],
    });
    console.log("Success!!!!");
    console.log(response);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
