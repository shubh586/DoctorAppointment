import Doctor from "../models/Docter.js";
import User from "../models/User.js";
import Appointment from "../models/Appointment.js";
import { StatusCodes } from "http-status-codes";
import error from "../error/index.js";
const { NotFoundError, BadRequestError } = error;

const getDoctorById = async (req, res) => {
  const docId = req.user.userId;

  const doctor = await Doctor.findById(docId);
  console.log(doctor);
  if (!doctor) {
    throw new NotFoundError(`No doctor found with ID: ${id}`);
  }
  res.status(StatusCodes.OK).json({ success: true, doctor });
};

const getAllAppoinmentsByDocter = async (req, res) => {
  const docId = req.user.userId; //doctor id
  const appointment = await Appointment.find({ doctor: docId }).sort(
    "createdAt"
  );
  if (!appointment) {
    throw new NotFoundError(`No appointment found with ID: ${docId}`);
  }
  res.status(StatusCodes.OK).json({ success: true, appointment });
};
const updateDoctor = async (req, res) => {
  const {
    name,
    speciality,
    experience,
    degree,
    about,
    fees,
    password,
    phone,
    address,
    availability,
  } = req.body;
  const docId = req.user.userId;
  const doctor = await Doctor.findById(docId);
  if (!doctor) {
    throw new NotFoundError(`No doctor found with ID: ${id}`);
  }

  doctor.name = name || doctor.name;
  doctor.speciality = speciality || doctor.speciality;
  doctor.experience = experience || doctor.experience;
  doctor.degree = degree || doctor.degree;
  doctor.about = about || doctor.about;
  doctor.fees = fees || doctor.fees;

  doctor.phone = phone || doctor.phone;
  doctor.address = address || doctor.address;
  doctor.availability = availability || doctor.availability;

  if (password) {
    doctor.password = password;
  }

  await doctor.save();
  const updatedDoctor = {
    name: doctor.name,
    speciality: doctor.speciality,
    experience: doctor.experience,
    degree: doctor.degree,
    about: doctor.about,
    fees: doctor.fees,
    phone: doctor.phone,
    address: doctor.address,
    availability: doctor.availability,
  };

  return res
    .status(200)
    .json({ message: "Doctor updated successfully", doctor: updatedDoctor });
};

const updateStatus = async (req, res) => {
  const { appointmentId } = req.params;
  const { status } = req.body;
  const docId = req.user.userId;
  if (!["Completed", "Cancelled"].includes(status)) {
    throw new BadRequestError(
      "Invalid status. Allowed statuses: Completed, Cancelled"
    );
  }
  const appointment = await Appointment.findOne({
    _id: appointmentId,
    doctor: docId,
  });
  if (!appointment) {
    throw new NotFoundError(
      "Appointment not found or not authorized to update"
    );
  }
  appointment.status = status;
  await appointment.save();
  res.status(StatusCodes.OK).json({
    success: true,
    message: `Appointment marked as ${status}`,
    appointment,
  });
};
const getAllUsers = async (req, res) => {
  const userIds = req.body.userIds;
  const users = await User.find({ _id: { $in: userIds } });

  if (!users || users.length === 0) {
    return res.status(404).json({ success: false, message: "No users found." });
  }

  res.status(200).json({ success: true, users });
};

export default {
  getDoctorById,
  getAllAppoinmentsByDocter,
  updateDoctor,
  updateStatus,
  getAllUsers,
};
