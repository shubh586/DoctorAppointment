import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
dotenv.config();

const DoctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Plese provide name"],
      minlength: 3,
      maxlength: 50,
    },
    image: {
      type: String,
      required: [true, "Plese provide name"],
    },
    speciality: {
      type: String,
      required: [true, "Please provide speciality"],
    },
    experience: {
      type: Number,
      required: [true, "Please provide years of experience"],
      min: 0,
    },
    degree: {
      type: String,
      required: [true, "Please provide degree details"],
    },
    about: {
      type: String,
      maxlength: 500,
    },
    fees: {
      type: Number,
      required: [true, "Please provide consultation fees"],
      min: 0,
    },
    email: {
      type: String,
      required: [true, "Please provide the email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide valid email",
      ],
      unique: true,
      immutable: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 4,
    },
    phone: {
      type: String,
      required: [true, "Please provide phone number"],
      match: [/^\d{10}$/, "Please provide a valid phone number with 10 digits"],
    },
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    address: {
      line1: { type: String, required: [true, "Address line 1 is required"] },
      line2: { type: String },
    },
    availability: {
      type: String,
      enum: ["Available", "Unavailable"],
      default: "Available",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);
DoctorSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
DoctorSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

DoctorSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};
export default mongoose.model("Doctor", DoctorSchema);
