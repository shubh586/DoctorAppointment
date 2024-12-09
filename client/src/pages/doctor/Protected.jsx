import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";
export const ProtectedContext = createContext();

const ProtectedRoute = ({ children, redirectPath }) => {
  const [isLogined, setIsLogined] = useState(
    !!localStorage.getItem("doctorToken")
  );
  useEffect(() => {
    const token = localStorage.getItem("doctorToken");
    if (token) {
      setIsLogined(true);
    } else {
      setIsLogined(false);
    }
  }, []);

  if (!isLogined) {
    return <Navigate to={redirectPath} />;
  }
  const value = {
    isLogined,
    setIsLogined,
  };
  return (
    <ProtectedContext.Provider value={value}>
      {children}
    </ProtectedContext.Provider>
  );
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectPath: PropTypes.string.isRequired,
};

export default ProtectedRoute;
