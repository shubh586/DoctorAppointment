import express from "express";
const router = express.Router();
import user from "../controller/user.js";
const {
  getAllDoctors,
  getUserById,
  getDoctorsBySpeciality,
  getDoctorById,
  bookAppointment,
  editProfile,
  getAllAppoinmentsByUser,
  cancelAppointment,
  confirmAppointment,
} = user;
import authenticationMiddleware from "../middleware/authenticationMiddleware.js";

router.get("/docters", getAllDoctors);
router.get("/doctors/:speciality", getDoctorsBySpeciality);
router.route("/doctor/:docId").get(getDoctorById);
router.get("/getuser", authenticationMiddleware, getUserById);
router.post("/bookappointments", authenticationMiddleware, bookAppointment);
router.patch("/profile", authenticationMiddleware, editProfile);
router.get(
  "/appointments/user",
  authenticationMiddleware,
  getAllAppoinmentsByUser
);

router.patch(
  "/appointments/cancel",
  authenticationMiddleware,
  cancelAppointment
);

router.patch(
  "/appointments/confirm",
  authenticationMiddleware,
  confirmAppointment
);
export default router;
