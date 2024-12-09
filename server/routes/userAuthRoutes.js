import express from "express";
import userAuth from "../controller/userAuth.js";
const { login, register } = userAuth;

const router = express.Router();
router.post("/register", register);
router.post("/login", login);

export default router;
