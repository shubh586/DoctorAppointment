import Doctor from "../models/Docter.js";
import Appointment from "../models/Appointment.js";
import { StatusCodes } from "http-status-codes";
import UnauthenticatedError from "../error/unauthenticated.js";
const getAllAppoinments = async (req, res) => {
  if (req.user && req.user.role === "Admin") {
    const appointment = await Appointment.find().sort("createdAt");
    res.status(StatusCodes.OK).json({ success: true, appointment });
  } else {
    throw new UnauthenticatedError("Admin only allowed");
  }
};

const getAllDoctors = async (req, res) => {
  if (req.user && req.user.role === "Admin") {
    const doctors = await Doctor.find().sort("createdAt");
    res.status(StatusCodes.OK).json({ success: true, doctors });
  } else {
    throw new UnauthenticatedError("Admin only allowed");
  }
};
const addDoctor = async (req, res) => {
  if (req.user && req.user.role === "Admin") {
    const imagePath = req.file ? `/images/${req.file.filename}` : null;
    console.log(req.body);
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const newDoctor = await Doctor.create({
      ...req.body,
      image: imagePath,
      createdBy: req.user.userId,
    });
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Doctor added successfully", doctor: newDoctor });
  } else {
    throw new UnauthenticatedError("Admin only allowed");
  }
};
export default { getAllAppoinments, getAllDoctors, addDoctor };
