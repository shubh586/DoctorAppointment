# Doctor Appointment Booking System

A full-stack doctor appointment booking platform with three distinct user roles: **Users**, **Doctors**, and **Admins**. Built with modern web technologies for a seamless healthcare appointment management experience.

## 🚀 Features

### User Features
- **User Registration & Authentication**: Secure signup and login with JWT tokens
- **Profile Completion Flow**: New users must complete their profile (phone, gender, birthdate, address) before accessing protected routes
- **Browse Doctors**: View all available doctors or filter by speciality
- **Book Appointments**: Schedule appointments with preferred doctors
- **Manage Appointments**: View, confirm, or cancel appointments
- **Profile Management**: Update personal information and profile picture

### Doctor Features
- **Doctor Dashboard**: View all appointments assigned to the doctor
- **Appointment Management**: Mark appointments as Completed or Cancelled
- **Patient Information**: Access patient details for appointments
- **Profile Management**: Update doctor profile, speciality, fees, and availability

### Admin Features
- **Doctor Management**: Add new doctors to the system
- **View All Appointments**: Monitor all appointments across the platform
- **View All Doctors**: Manage and view all registered doctors
- **Dashboard Analytics**: Overview of platform statistics

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **JWT Decode** - Token management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **Bcryptjs** - Password hashing
- **Multer** - File upload handling

## 📁 Project Structure

```
DoctorAppointment/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── Components/    # Reusable UI components
│   │   ├── context/       # React context providers
│   │   ├── pages/         # Page components
│   │   │   ├── user/      # User-facing pages
│   │   │   ├── doctor/    # Doctor dashboard pages
│   │   │   └── admin/     # Admin dashboard pages
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   └── package.json
│
└── server/                 # Express backend API
    ├── controller/         # Route controllers
    ├── models/            # MongoDB models
    ├── routes/            # API routes
    ├── middleware/        # Custom middleware
    ├── db/                # Database connection
    ├── error/             # Error handling
    ├── public/            # Static files (images)
    ├── populate.js        # Database seeding script
    ├── AddAdmin.js        # Admin user creation script
    └── App.js             # Server entry point
```

## 📋 Prerequisites

- **Node.js** v18+ (v25.1.0 tested)
- **MongoDB** instance (local or MongoDB Atlas)
- **npm** or **yarn** package manager

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd DoctorAppointment
```

### 2. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Environment Configuration

Create a `.env` file in the `server/` directory:

```env
# MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/doctorappointment
# Or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/doctorappointment

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_LIFETIME=30d

# Server Port (optional, defaults to 3000)
PORT=5000
```

### 4. Populate Database

Run the populate script to add sample doctors:

```bash
cd server
node populate.js
```

This will create 15 sample doctors with different specialities.

### 5. Create Admin User (Optional)

Create an admin user for testing:

```bash
cd server
node AddAdmin.js
```

## 🚀 Running the Application

### Development Mode

Open two terminal windows:

**Terminal 1 - Start Backend Server:**
```bash
cd server
npm run dev
```

The server will run on `http://localhost:5000` (or your configured PORT)

**Terminal 2 - Start Frontend Client:**
```bash
cd client
npm run dev
```

The client will run on `http://localhost:5173`

### Production Build

Build the frontend for production:

```bash
cd client
npm run build
npm run preview
```

## 🔐 Authentication & Authorization

### Authentication Flow

1. **User Registration**: Users sign up with name, email, and password
2. **Profile Completion**: After registration, users are automatically logged in and redirected to complete their profile
3. **Login**: Existing users log in and are redirected based on profile completion status
4. **Protected Routes**: Routes are protected based on:
   - Authentication status (valid JWT token)
   - Profile completion status (for user routes)

### Token Storage

Tokens are stored in `localStorage`:
- `userToken` - For regular users
- `doctorToken` - For doctors
- `adminToken` - For administrators

### Protected Routes

- **User Protected Routes**: Require authentication AND complete profile
  - `/my-profile`
  - `/my-appoinments`
  - `/appoinments/:docId`

- **Doctor Protected Routes**: Require doctor authentication
  - `/doctor/*`

- **Admin Routes**: Require admin authentication
  - `/admin/*`

## 📡 API Endpoints

### Base URL: `http://localhost:5000`

### User Authentication
- `POST /api/auth/user/register` - Register new user
- `POST /api/auth/user/login` - User login (returns `token` and `isProfileComplete`)

### User Routes
- `GET /api/users/docters` - Get all doctors (public)
- `GET /api/users/doctors/:speciality` - Get doctors by speciality (public)
- `GET /api/users/doctor/:docId` - Get doctor by ID (public)
- `GET /api/users/getuser` - Get current user profile (auth required)
- `PATCH /api/users/profile` - Update user profile (auth required)
- `POST /api/users/bookappointments` - Book appointment (auth required)
- `GET /api/users/appointments/user` - Get user appointments (auth required)
- `PATCH /api/users/appointments/cancel` - Cancel appointment (auth required)
- `PATCH /api/users/appointments/confirm` - Confirm appointment (auth required)

### Doctor Routes (Auth Required)
- `GET /api/doctors` - Get doctor profile
- `GET /api/doctors/appointments` - Get doctor's appointments
- `PATCH /api/doctors/profile` - Update doctor profile
- `PATCH /api/doctors/appointments/:appointmentId/status` - Update appointment status
- `POST /api/doctors/user` - Get user profiles by IDs

### Admin Routes (Auth Required)
- `GET /api/admin/all-doctors` - Get all doctors
- `GET /api/admin/all-appointments` - Get all appointments
- `POST /api/admin/add-doctor` - Add new doctor (multipart form data)

## 📊 Data Models

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ["Admin", "NormalUser"]),
  phone: String (optional),
  gender: String (enum: ["Male", "Female", "Other"]),
  birthdate: Date (optional),
  address: {
    line1: String,
    line2: String
  },
  image: String,
  appointments: [ObjectId]
}
```

### Doctor Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  image: String,
  speciality: String (required),
  degree: String,
  experience: Number,
  about: String,
  fees: Number (required),
  phone: String,
  address: Object,
  availability: String,
  createdBy: ObjectId
}
```

### Appointment Model
```javascript
{
  doctor: ObjectId (required, ref: "Doctor"),
  user: ObjectId (required, ref: "User"),
  slotTime: Date (required),
  status: String (enum: ["Pending", "Confirmed", "Completed", "Cancelled"]),
  fees: Number (required),
  userName: String,
  doctorName: String,
  userBithdate: Date,
  speciality: String
}
```

## 🎨 Frontend Routes

### Public Routes
- `/` - Home page
- `/doctors` - Browse all doctors
- `/doctors/:speciality` - Filter doctors by speciality
- `/login` - User login
- `/signup` - User registration
- `/about` - About page
- `/contact` - Contact page

### Protected User Routes
- `/complete-profile` - Profile completion form
- `/my-profile` - User profile management
- `/my-appoinments` - User appointments list
- `/appoinments/:docId` - Book appointment with specific doctor

### Doctor Routes
- `/doctor/login` - Doctor login
- `/doctor` - Doctor dashboard
- `/doctor/appointment` - Doctor appointments
- `/doctor/doctorprofile` - Doctor profile

### Admin Routes
- `/admin/login` - Admin login
- `/admin` - Admin dashboard
- `/admin/all-appointment` - All appointments
- `/admin/add-doctor` - Add new doctor
- `/admin/all-doctors` - All doctors list

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes with middleware
- Profile completion validation
- CORS configuration
- Input validation

## 🐛 Troubleshooting

### Server Issues

**Permission Denied Error:**
```bash
chmod +x server/node_modules/.bin/*
```

**MongoDB Connection Error:**
- Verify `MONGO_URI` in `.env` file
- Ensure MongoDB is running
- Check connection string format

**Node.js Compatibility:**
- Tested with Node.js v25.1.0
- If you encounter `buffer-equal-constant-time` errors, reinstall dependencies:
```bash
cd server
rm -rf node_modules package-lock.json
npm install
```

### Client Issues

**Dependencies Not Found:**
```bash
cd client
npm install
```

**Port Already in Use:**
- Change PORT in server `.env`
- Update CORS origin in `server/App.js` if needed

## 📝 Development Notes

- Profile completion is enforced for users accessing protected routes
- Doctors are seeded using `populate.js` script
- Image uploads are handled via Multer and stored in `server/public/`
- All API responses follow a consistent format: `{ success: boolean, data: ... }`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License

## 👨‍💻 Author

Doctor Appointment Booking System

---

**Current Status**: ✅ Fully functional with profile completion flow, three-role authentication, and appointment management system.
