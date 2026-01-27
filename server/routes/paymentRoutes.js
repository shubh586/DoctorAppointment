import express from "express";
const router = express.Router();
import payment from "../controller/payment.js";
const {
    createPaymentIntent,
    verifyPayment,
    getPaymentHistory,
    getPaymentById,
    handleWebhook,
} = payment;
import authenticationMiddleware from "../middleware/authenticationMiddleware.js";

// Payment routes (protected)
router.post("/create-intent", authenticationMiddleware, createPaymentIntent);
router.post("/verify", authenticationMiddleware, verifyPayment);
router.get("/history", authenticationMiddleware, getPaymentHistory);
router.get("/:id", authenticationMiddleware, getPaymentById);

// Webhook route (unprotected - Stripe sends the request)
// Note: This needs raw body parser, will configure in App.js
router.post("/webhook", handleWebhook);

export default router;
