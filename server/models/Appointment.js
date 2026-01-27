import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    slotTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },
    fees: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    userName: {
      type: String,
    },
    doctorName: {
      type: String,
    },
    userBithdate: {
      type: Date,
    },
    speciality: {
      type: String,
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "expired"],
      default: "pending",
    },
    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Prevent duplicate bookings: one doctor can only have one active appointment per slot
// Exclude cancelled and expired appointments from blocking slots
AppointmentSchema.index(
  { doctor: 1, slotTime: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: { $in: ["Pending", "Confirmed", "Completed"] },
      paymentStatus: { $ne: "expired" }
    }
  }
);

export default mongoose.model("Appointment", AppointmentSchema);
