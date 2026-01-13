import Doctor from "../models/Docter.js";
import Appointment from "../models/Appointment.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import error from "../error/index.js";
const { NotFoundError, BadRequestError } = error;
import mongoose from "mongoose";

const getAllDoctors = async (req, res) => {
  const doctors = await Doctor.find().sort("createdAt");
  res.status(StatusCodes.OK).json({ success: true, doctors });
};
//doctor
const getDoctorsBySpeciality = async (req, res) => {
  const { speciality } = req.params;

  if (!speciality) {
    throw new BadRequestError("Speciality parameter is required");
  }
  const doctors = await Doctor.find({ speciality });
  if (doctors.length === 0) {
    throw new NotFoundError(`No doctors found with speciality: ${speciality}`);
  }
  res.status(StatusCodes.OK).json({ success: true, doctors });
};

//docid
const getDoctorById = async (req, res) => {
  const { docId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(docId)) {
    throw new BadRequestError("Invalid doctor ID");
  }
  const doctor = await Doctor.findById(docId);
  if (!doctor) {
    throw new NotFoundError(`No doctor found with ID: ${docId}`);
  }
  res.status(StatusCodes.OK).json({ success: true, doctor });
};
//book appoinment
const bookAppointment = async (req, res) => {
  const { docId, slotTime } = req.body;
  const userId = req.user.userId;

  const doctor = await Doctor.findById(docId);
  if (!doctor) {
    throw new BadRequestError(`No doctor found with id ${docId}`);
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError(`No user found with ID: ${userId}`);
  }

  // Convert slotTime to Date object for comparison
  const requestedSlot = new Date(slotTime);

  // Check if slot is already booked (excluding cancelled appointments)
  const alreadyBooked = await Appointment.findOne({
    doctor: docId,
    slotTime: requestedSlot,
    status: { $in: ["Pending", "Confirmed", "Completed"] }, // All active statuses
  });

  if (alreadyBooked) {
    throw new BadRequestError(
      `This time slot is already booked. Please select another time.`
    );
  }

  const appointment = await Appointment.create({
    doctor: docId,
    user: userId,
    slotTime: requestedSlot,
    fees: doctor.fees,
    userName: user.name,
    doctorName: doctor.name,
    userBithdate: user.birthdate,
    speciality: doctor.speciality,
  });

  res.status(StatusCodes.CREATED).json({ success: true, appointment });
};
//edit
const editProfile = async (req, res) => {
  const { name, phone, address, gender, birthdate } = req.body;
  const userId = req.user.userId;

  if (!name || !phone || !gender || !birthdate) {
    throw new BadRequestError(
      "name,phone,gender,birthdate fields are required"
    );
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { name, phone, address, gender, birthdate },
    { new: true, runValidators: true }
  );

  if (!updatedUser) {
    throw new NotFoundError("User not found");
  }

  res.status(StatusCodes.OK).json({ success: true, user: updatedUser });
};
//get all apoinments
const getAllAppoinmentsByUser = async (req, res) => {
  const user = req.user.userId;
  const appointment = await Appointment.find({ user }).sort("createdAt");
  res.status(StatusCodes.OK).json({ success: true, appointment });
};
const cancelAppointment = async (req, res) => {
  const { appointmentId } = req.body;
  const userId = req.user.userId;

  const appointment = await Appointment.findOne({
    _id: appointmentId,
    user: userId,
    status: "Pending",
  });

  if (!appointment) {
    throw new NotFoundError("Appointment not found or already canceled");
  }

  appointment.status = "Cancelled";
  await appointment.save();

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Appointment cancelled successfully",
    appointment,
  });
};

const confirmAppointment = async (req, res) => {
  const { appointmentId } = req.body;
  const userId = req.user.userId;

  const appointment = await Appointment.findOne({
    _id: appointmentId,
    user: userId,
    status: "Pending",
  });

  if (!appointment) {
    throw new NotFoundError("Appointment not found or cannot be confirmed");
  }

  appointment.status = "Confirmed";
  await appointment.save();

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Appointment confirmed successfully",
    appointment,
  });
};

const getUserById = async (req, res) => {
  const userId = req.user.userId;

  const user = await User.findById(userId);
  if (!user) {
    throw new NotFoundError(`No user found with ID: ${user}`);
  }
  res.status(StatusCodes.OK).json({ success: true, user });
};

// Get all appointments for a specific doctor (to check booked slots)
const getAppointmentsByDoctor = async (req, res) => {
  const { docId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(docId)) {
    throw new BadRequestError("Invalid doctor ID");
  }

  const appointments = await Appointment.find({
    doctor: docId,
    status: { $ne: "Cancelled" }, // Exclude cancelled appointments
  }).select('slotTime status');

  res.status(StatusCodes.OK).json({ success: true, appointments });
};

export default {
  getAllDoctors,
  getUserById,
  getDoctorsBySpeciality,
  getDoctorById,
  bookAppointment,
  editProfile,
  getAllAppoinmentsByUser,
  cancelAppointment,
  confirmAppointment,
  getAppointmentsByDoctor,
};
