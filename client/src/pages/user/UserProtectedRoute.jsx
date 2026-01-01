import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContextProvider";
import axios from "axios";

const UserProtectedRoute = ({ children, redirectPath }) => {
  const { token, isProfileComplete, setIsProfileComplete } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthAndProfile = async () => {
      const savedToken = localStorage.getItem("userToken");
      
      if (!savedToken) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      setIsAuthenticated(true);

      // Always fetch profile completion status to ensure it's up to date
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/getuser",
          {
            headers: {
              Authorization: `Bearer ${savedToken}`,
            },
          }
        );
        const user = response.data.user;
        const profileComplete = !!(
          user.phone &&
          user.birthdate &&
          user.address?.line1 &&
          user.address?.line2
        );
        if (setIsProfileComplete) {
          setIsProfileComplete(profileComplete);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
    };

    checkAuthAndProfile();
  }, [setIsProfileComplete]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated || !token) {
    return <Navigate to={redirectPath || "/login"} />;
  }

  // Only redirect if we know the profile is incomplete (not null/undefined)
  if (isProfileComplete === false) {
    return <Navigate to="/complete-profile" />;
  }

  // If still loading or profile status is unknown, show loading
  if (isProfileComplete === null || isProfileComplete === undefined) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return children;
};

UserProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectPath: PropTypes.string,
};

export default UserProtectedRoute;
