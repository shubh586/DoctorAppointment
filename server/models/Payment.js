import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
    {
        appointment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            default: "inr",
        },
        paymentIntentId: {
            type: String,
            required: true,
            unique: true,
        },
        status: {
            type: String,
            enum: ["pending", "succeeded", "failed", "refunded"],
            default: "pending",
        },
        paymentMethod: {
            type: String, // card, upi, etc.
        },
        failureReason: {
            type: String,
        },
    },
    { timestamps: true }
);

// Index for faster queries
PaymentSchema.index({ user: 1, createdAt: -1 });
PaymentSchema.index({ appointment: 1 });

export default mongoose.model("Payment", PaymentSchema);
