import { createContext, useState } from "react";
import PropTypes from "prop-types";

import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AppContext = createContext();
import axios from "axios";

const AppContextProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [token, setToken] = useState(false);
  const [doctors, setDoctors] = useState([]);
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
        "http://localhost:5000/api/users/docters"
      );
      setDoctors(response.data.doctors.reverse());
    } catch (error) {
      setError(error.response?.data?.msg || "Login failed. Please try again.");
      console.error("Error login user:", error);
    }
  };
  useEffect(() => {
    getDoctors();
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem("userToken");
    if (savedToken) {
      try {
        const decodeToken = jwtDecode(savedToken);
        console.log(decodeToken);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodeToken.exp && decodeToken.exp > currentTime) {
          setToken(true);
        } else {
          setToken(false);
        }
      } catch (error) {
        setToken(false);
        console.error("Error decoding token:", error);
      }
    } else {
      setToken(false);
    }
  }, []);
  const bookedAppoinment = [];
  const value = {
    doctors,
    bookedAppoinment,
    Months,
    token,
    setToken,
    error,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
AppContextProvider.propTypes = { children: PropTypes.node.isRequired };
export default AppContextProvider;
