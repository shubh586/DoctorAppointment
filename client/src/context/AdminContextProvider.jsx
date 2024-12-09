import { createContext } from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";
export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [isLogined, setIsLogined] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);
  const [bookedAppoinment, setBookedAppointment] = useState([]);
  const Months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const getDoctors = async () => {
    try {
      setError(null);
      const response = await axios.get(
        "http://localhost:5000/api/admin/all-doctors",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      setDoctors(response.data.doctors);
    } catch (error) {
      setError(error.response?.data?.msg || "Login failed. Please try again.");
      console.error("Error login user:", error);
    }
  };

  const getAllAppointments = async () => {
    try {
      setError(null);
      const response = await axios.get(
        "http://localhost:5000/api/admin/all-appointments",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      setBookedAppointment(response.data.appointment);
    } catch (error) {
      setError(error.response?.data?.msg || "Login failed. Please try again.");
      console.error("Error login user:", error);
    }
  };

  useEffect(() => {
    getDoctors();
    getAllAppointments();
  }, [doctors]);

  const value = {
    doctors,
    bookedAppoinment,
    setBookedAppointment,
    Months,
    isLogined,
    setIsLogined,
    error,
  };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
AdminContextProvider.propTypes = { children: PropTypes.node.isRequired };
export default AdminContextProvider;
