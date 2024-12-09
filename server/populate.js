import connectDB from "./db/connect.js";
import dotenv from "dotenv";
dotenv.config();
import Docter from "./models/Docter.js";
import mongoose from "mongoose";

const doctorsData = [
  {
    name: "Dr. Richard James",
    image: "/images/doc1.png",
    speciality: "General physician",
    degree: "MBBS",
    experience: 4,
    about:
      "Dr. James has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 50,
    email: "doctor1@example.com",
    password: "password123",
    phone: "1234567890",
    address: {
      line1: "123 Main St",
      line2: "Richmond, London",
    },
    createdBy: new mongoose.Types.ObjectId("67533bf4b1b84a2c6c0ceba1"),
    availability: "Available",
  },
  {
    name: "Dr. Emily Larson",
    image: "/images/doc2.png",
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: 3,
    about:
      "Dr. Larson specializes in women's health and has extensive experience in prenatal care.",
    fees: 60,
    email: "doctor2@example.com",
    password: "password456",
    phone: "2345678901",
    address: {
      line1: "456 Oak Avenue",
      line2: "Greenwich, London",
    },
    createdBy: new mongoose.Types.ObjectId("67533bf4b1b84a2c6c0ceba1"),
    availability: "Available",
  },
  {
    name: "Dr. Ava Smith",
    image: "/images/doc3.png",
    speciality: "Dermatologist",
    degree: "MD Dermatology",
    experience: 6,
    about:
      "Dr. Smith is a highly skilled dermatologist specializing in both medical and cosmetic treatments.",
    fees: 80,
    email: "doctor3@example.com",
    password: "password789",
    phone: "3456789012",
    address: {
      line1: "789 Birch Rd",
      line2: "Cambridge, UK",
    },
    createdBy: new mongoose.Types.ObjectId("67533bf4b1b84a2c6c0ceba1"),
    availability: "Available",
  },
  {
    name: "Dr. William Brown",
    image: "/images/doc4.png",
    speciality: "Neurologist", // Changed from "Cardiologist"
    degree: "MD, FACC",
    experience: 10,
    about:
      "Dr. Brown has extensive experience in the diagnosis and treatment of heart-related conditions.",
    fees: 120,
    email: "doctor4@example.com",
    password: "password101",
    phone: "4567890123",
    address: {
      line1: "101 Maple Lane",
      line2: "New York, NY",
    },
    createdBy: new mongoose.Types.ObjectId("67533bf4b1b84a2c6c0ceba1"),
    availability: "Available",
  },
  {
    name: "Dr. Sophia Williams",
    image: "/images/doc5.png",
    speciality: "Pediatricians", // Changed from "Orthopedic surgeon"
    degree: "MS Orthopedics",
    experience: 7,
    about:
      "Dr. Williams specializes in bone and joint health, including advanced surgeries for sports injuries.",
    fees: 90,
    email: "doctor5@example.com",
    password: "password102",
    phone: "5678901234",
    address: {
      line1: "202 Pine St",
      line2: "San Francisco, CA",
    },
    createdBy: new mongoose.Types.ObjectId("67533bf4b1b84a2c6c0ceba1"),
    availability: "Available",
  },
  {
    name: "Dr. Henry Johnson",
    image: "/images/doc6.png",
    speciality: "Neurologist",
    degree: "MD, Neurology",
    experience: 12,
    about:
      "Dr. Johnson is an expert in neurological disorders and specializes in treating complex brain and spinal conditions.",
    fees: 150,
    email: "doctor6@example.com",
    password: "password103",
    phone: "6789012345",
    address: {
      line1: "303 Cedar Ave",
      line2: "Los Angeles, CA",
    },
    createdBy: new mongoose.Types.ObjectId("67533bf4b1b84a2c6c0ceba1"),
    availability: "Available",
  },
  {
    name: "Dr. Olivia Martin",
    image: "/images/doc7.png",
    speciality: "Pediatricians",
    degree: "MBBS, DCH",
    experience: 5,
    about:
      "Dr. Martin is passionate about children’s health, providing both preventive care and treatment for common pediatric illnesses.",
    fees: 70,
    email: "doctor7@example.com",
    password: "password104",
    phone: "7890123456",
    address: {
      line1: "404 Elm St",
      line2: "Chicago, IL",
    },
    createdBy: new mongoose.Types.ObjectId("67533bf4b1b84a2c6c0ceba1"),
    availability: "Available",
  },
  {
    name: "Dr. Lucas Moore",
    image: "/images/doc8.png",
    speciality: "Dermatologist", // Changed from "Ophthalmologist"
    degree: "MBBS, MS Ophthalmology",
    experience: 8,
    about:
      "Dr. Moore specializes in vision correction surgeries and advanced treatments for eye diseases.",
    fees: 110,
    email: "doctor8@example.com",
    password: "password105",
    phone: "8901234567",
    address: {
      line1: "505 Oak Blvd",
      line2: "San Diego, CA",
    },
    createdBy: new mongoose.Types.ObjectId("67533bf4b1b84a2c6c0ceba1"),
    availability: "Available",
  },
  {
    name: "Dr. Mia Wilson",
    image: "/images/doc9.png",
    speciality: "General physician", // Changed from "Dentist"
    degree: "BDS",
    experience: 9,
    about:
      "Dr. Wilson is a highly skilled dentist, specializing in cosmetic dentistry and dental implants.",
    fees: 100,
    email: "doctor9@example.com",
    password: "password106",
    phone: "9012345678",
    address: {
      line1: "606 Pine St",
      line2: "Dallas, TX",
    },
    createdBy: new mongoose.Types.ObjectId("67533bf4b1b84a2c6c0ceba1"),
    availability: "Available",
  },
  {
    name: "Dr. Ethan Davis",
    image: "/images/doc10.png",
    speciality: "Neurologist", // Changed from "Psychiatrist"
    degree: "MD Psychiatry",
    experience: 15,
    about:
      "Dr. Davis specializes in mental health care, including therapy and counseling for anxiety, depression, and other psychological disorders.",
    fees: 130,
    email: "doctor10@example.com",
    password: "password107",
    phone: "0123456789",
    address: {
      line1: "707 Birch St",
      line2: "Austin, TX",
    },
    createdBy: new mongoose.Types.ObjectId("67533bf4b1b84a2c6c0ceba1"),
    availability: "Available",
  },
  {
    name: "Dr. Isabella Moore",
    image: "/images/doc11.png",
    speciality: "Gynecologist", // Changed from "Endocrinologist"
    degree: "MD Endocrinology",
    experience: 10,
    about:
      "Dr. Moore is dedicated to diagnosing and treating conditions related to hormones and metabolism.",
    fees: 140,
    email: "doctor11@example.com",
    password: "password108",
    phone: "1230987654",
    address: {
      line1: "808 Maple St",
      line2: "Phoenix, AZ",
    },
    createdBy: new mongoose.Types.ObjectId("67533bf4b1b84a2c6c0ceba1"),
    availability: "Available",
  },
  {
    name: "Dr. Ava Green",
    image: "/images/doc12.png",
    speciality: "Dermatologist", // Changed from "Gastroenterologist"
    degree: "MD Gastroenterology",
    experience: 11,
    about:
      "Dr. Green specializes in the treatment of digestive system diseases and conditions.",
    fees: 115,
    email: "doctor12@example.com",
    password: "password109",
    phone: "2345678903",
    address: {
      line1: "909 Cedar Rd",
      line2: "Seattle, WA",
    },
    createdBy: new mongoose.Types.ObjectId("67533bf4b1b84a2c6c0ceba1"),
    availability: "Available",
  },
  {
    name: "Dr. Noah Taylor",
    image: "/images/doc13.png",
    speciality: "General physician",
    degree: "MBBS",
    experience: 4,
    about:
      "Dr. Taylor has a strong focus on preventive healthcare and patient education.",
    fees: 50,
    email: "doctor13@example.com",
    password: "password110",
    phone: "3456789012",
    address: {
      line1: "123 Pine Ave",
      line2: "Boston, MA",
    },
    createdBy: new mongoose.Types.ObjectId("67533bf4b1b84a2c6c0ceba1"),
    availability: "Available",
  },
  {
    name: "Dr. Charlotte White",
    image: "/images/doc14.png",
    speciality: "Gynecologist",
    degree: "MBBS, MD Obstetrics",
    experience: 8,
    about:
      "Dr. White has a special interest in managing high-risk pregnancies and complex gynecological conditions.",
    fees: 95,
    email: "doctor14@example.com",
    password: "password111",
    phone: "4567890123",
    address: {
      line1: "234 Maple St",
      line2: "Miami, FL",
    },
    createdBy: new mongoose.Types.ObjectId("67533bf4b1b84a2c6c0ceba1"),
    availability: "Available",
  },
  {
    name: "Dr. Elijah Martinez",
    image: "/images/doc15.png",
    speciality: "Neurologist", // Changed from "Oncologist"
    degree: "MD Oncology",
    experience: 13,
    about:
      "Dr. Martinez specializes in cancer treatment and patient care during oncology treatments.",
    fees: 160,
    email: "doctor15@example.com",
    password: "password112",
    phone: "5678901234",
    address: {
      line1: "345 Birch St",
      line2: "Denver, CO",
    },
    createdBy: new mongoose.Types.ObjectId("67533bf4b1b84a2c6c0ceba1"),
    availability: "Available",
  },
];

const start = async (req, res) => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Docter.deleteMany();
    await Docter.create(doctorsData);
    console.log("Success!!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
start();
