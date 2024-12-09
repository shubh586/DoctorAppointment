import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";
import { ProtectedContext } from "../pages/doctor/Protected";
export const DocterContext = createContext();

const DocterContextProvider = ({ children }) => {
  const [doctor, setDoctor] = useState([]);
  const [error, setError] = useState(null);
  const { isLogined, setIsLogined } = useContext(ProtectedContext);
  const [alluser, setAllusers] = useState([]);
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
  const getDoctor = async () => {
    try {
      setError(null);
      const response = await axios.get("http://localhost:5000/api/doctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("doctorToken")}`,
        },
      });
      setDoctor(response.data.doctor);
    } catch (error) {
      setError(error.response?.data?.msg || "Login failed. Please try again.");
      console.error("Error login user:", error);
    }
  };
  const getAllAppointments = async () => {
    try {
      setError(null);
      const response = await axios.get(
        "http://localhost:5000/api/doctors/appointments",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("doctorToken")}`,
          },
        }
      );
      setBookedAppointment(response.data.appointment);
      // console.log(bookedAppoinment);
    } catch (error) {
      setError(error.response?.data?.msg || "Login failed. Please try again.");
      console.error("Error login user:", error);
    }
  };

  const getAllUsers = async () => {
    try {
      if (bookedAppoinment.length > 0) {
        const userIds = bookedAppoinment.map((appointment) => appointment.user);
        console.log(localStorage.getItem("doctorToken"));
        const response = await axios.post(
          "http://localhost:5000/api/doctors/user",
          {
            userIds,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("doctorToken")}`,
            },
          }
        );

        if (response.data.success) {
          setAllusers(response.data.users);
          console.log(response.data.users);
        } else {
          console.error("No users found.");
        }
      }
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  useEffect(() => {
    getDoctor();
  }, []);
  useEffect(() => {
    getAllAppointments();
  }, [doctor]);
  useEffect(() => {
    getAllUsers();
  }, [bookedAppoinment]);

  const value = {
    doctor,
    setDoctor,
    bookedAppoinment,
    Months,
    isLogined,
    setIsLogined,
    error,
    alluser,
    setBookedAppointment,
  };

  return (
    <DocterContext.Provider value={value}>{children}</DocterContext.Provider>
  );
};
DocterContextProvider.propTypes = { children: PropTypes.node.isRequired };
export default DocterContextProvider;
