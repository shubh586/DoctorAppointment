import express from "express";
import docter from "../controller/docter.js";
const {
  getDoctorById,
  getAllAppoinmentsByDocter,
  updateDoctor,
  updateStatus,
  getAllUsers,
} = docter;
const router = express.Router();
import authenticationMiddleware from "../middleware/authenticationMiddleware.js";

router.get("/", authenticationMiddleware, getDoctorById);
router.post("/user", authenticationMiddleware, getAllUsers);

router.get(
  "/appointments",
  authenticationMiddleware,
  getAllAppoinmentsByDocter
);
router.patch("/profile", authenticationMiddleware, updateDoctor);
router.patch(
  "/appointments/:appointmentId/status",
  authenticationMiddleware,
  updateStatus
);
export default router;
