import express from "express";
import docAuth from "../controller/docAuth.js";
const { login } = docAuth;

const router = express.Router();
router.post("/login", login);

export default router;
