import express from "express";
import adminAuth from "../controller/adminAuth.js";
const { login, register } = adminAuth;
const router = express.Router();
router.post("/register", register);
router.post("/login", login);

export default router;
