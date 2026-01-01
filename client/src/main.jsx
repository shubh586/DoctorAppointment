import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/user/Home.jsx";
import Appointment from "./pages/user/Appointment.jsx";
import Doctors from "./pages/user/Doctors.jsx";
import Login from "./pages/user/Login.jsx";
import SignUp from "./pages/user/SignUp.jsx";
import About from "./pages/user/About.jsx";
import MyProfile from "./pages/user/MyProfile.jsx";
import Contact from "./pages/user/Contact.jsx";
import MyAppoinment from "./pages/user/MyAppoinment.jsx";
import ProfileCompletion from "./pages/user/ProfileCompletion.jsx";
import UserProtectedRoute from "./pages/user/UserProtectedRoute.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import AllAppointments from "./pages/admin/AllAppoinments.jsx";
import AddDoctor from "./pages/admin/AddDoctor.jsx";
import AllDoctors from "./pages/admin/AllDoctors.jsx";
import DocterLayout from "./pages/doctor/DocterLayout.jsx";
import Appointments from "./pages/doctor/Appointments.jsx";
import Docterdashboard from "./pages/doctor/Docterdashboard.jsx";
import Docterprofile from "./pages/doctor/Docterprofile.jsx";
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AdminContextProvider from "./context/AdminContextProvider.jsx";
import DocterContextProvider from "./context/DocterContextProvider.jsx";
import DoctorLogin from "./pages/doctor/DocterLogin.jsx";
import ProtectedRoute from "./pages/doctor/Protected.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/doctors", element: <Doctors /> },
      { path: "/doctors/:speciality", element: <Doctors /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/complete-profile", element: <ProfileCompletion /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      {
        path: "/my-profile",
        element: (
          <UserProtectedRoute redirectPath="/login">
            <MyProfile />
          </UserProtectedRoute>
        ),
      },
      {
        path: "/my-appoinments",
        element: (
          <UserProtectedRoute redirectPath="/login">
            <MyAppoinment />
          </UserProtectedRoute>
        ),
      },
      {
        path: "/appoinments/:docId",
        element: (
          <UserProtectedRoute redirectPath="/login">
            <Appointment />
          </UserProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminContextProvider>
        <AdminLayout />
      </AdminContextProvider>
    ),
    children: [
      { path: "/admin", element: <Dashboard /> },
      { path: "/admin/all-appointment", element: <AllAppointments /> },
      { path: "/admin/add-doctor/", element: <AddDoctor /> },
      { path: "/admin/all-doctors/:speciality", element: <AllDoctors /> },
      { path: "/admin/all-doctors", element: <AllDoctors /> },
    ],
  },
  {
    path: "/doctor",
    element: (
      <ProtectedRoute redirectPath="/doctor/login">
        <DocterContextProvider>
          <DocterLayout />
        </DocterContextProvider>
      </ProtectedRoute>
    ),
    children: [
      { path: "/doctor/appointment", element: <Appointments /> },
      { path: "/doctor", element: <Docterdashboard /> },
      { path: "/doctor/doctorprofile", element: <Docterprofile /> },
    ],
  },
  {
    path: "/doctor/login",
    element: <DoctorLogin />,
  },

  {
    path: "/admin/login",
    element: (
      <AdminContextProvider>
        <AdminLogin />
      </AdminContextProvider>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
