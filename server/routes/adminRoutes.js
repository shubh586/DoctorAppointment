import express from "express";
import admin from "../controller/admin.js";
import multer from "multer";
import path from "path";
import authenticationMiddleware from "../middleware/authenticationMiddleware.js";
const { getAllAppoinments, getAllDoctors, addDoctor } = admin;
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const router = express.Router();
router.get("/all-doctors", authenticationMiddleware, getAllDoctors);
router.get("/all-appointments", authenticationMiddleware, getAllAppoinments);
router.post(
  "/add-doctor",
  authenticationMiddleware,
  upload.single("image"),
  addDoctor
);
export default router;
