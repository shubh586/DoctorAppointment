import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context/AppContextProvider";
import { useContext } from "react";

const ProfileCompletion = () => {
  const navigate = useNavigate();
  const { setToken, setIsProfileComplete } = useContext(AppContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");

  const phoneRef = useRef(null);
  const genderRef = useRef(null);
  const birthdateRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/getuser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const user = response.data.user;
        setUserName(user.name);
        
        // If profile is already complete, redirect to home
        const profileComplete = !!(
          user.phone &&
          user.birthdate &&
          user.address?.line1 &&
          user.address?.line2
        );
        if (profileComplete) {
          if (setIsProfileComplete) {
            setIsProfileComplete(true);
          }
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate, setIsProfileComplete]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const phone = phoneRef.current.value;
    const gender = genderRef.current.value;
    const birthdate = birthdateRef.current.value;
    const line1 = line1Ref.current.value;
    const line2 = line2Ref.current.value;

    if (!phone || !gender || !birthdate || !line1 || !line2) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("userToken");
    if (!token) {
      setError("Please login again");
      setLoading(false);
      navigate("/login");
      return;
    }

    try {
      const response = await axios.patch(
        "http://localhost:5000/api/users/profile",
        {
          name: userName,
          phone,
          gender,
          birthdate,
          address: {
            line1,
            line2,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Profile completed successfully:", response.data);
      if (setIsProfileComplete) {
        setIsProfileComplete(true);
      }
      navigate("/");
      scrollTo(0, 0);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to complete profile. Please try again.");
      console.error("Error completing profile:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border-gray-300 bg-white shadow-2xl p-8 border rounded-lg w-full max-w-md">
        <div>
          <h1 className="mb-6 font-bold text-3xl text-center text-gray-700">
            Complete Your Profile
          </h1>
          <p className="mb-6 text-center text-gray-600 text-sm">
            Please provide the following information to continue
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block font-medium text-gray-700 text-sm"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                ref={phoneRef}
                placeholder="10 digit phone number"
                required
                pattern="[0-9]{10}"
                maxLength="10"
                className="block border-gray-300 focus:border-green-500 shadow-sm mt-1 px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-green-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block font-medium text-gray-700 text-sm"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                ref={genderRef}
                required
                className="block border-gray-300 focus:border-green-500 shadow-sm mt-1 px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-green-500 sm:text-sm"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="birthdate"
                className="block font-medium text-gray-700 text-sm"
              >
                Birthdate
              </label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                ref={birthdateRef}
                required
                className="block border-gray-300 focus:border-green-500 shadow-sm mt-1 px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-green-500 sm:text-sm"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="line1"
                className="block font-medium text-gray-700 text-sm"
              >
                Address Line 1
              </label>
              <input
                type="text"
                id="line1"
                name="line1"
                ref={line1Ref}
                placeholder="Street address, P.O. box"
                required
                className="block border-gray-300 focus:border-green-500 shadow-sm mt-1 px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-green-500 sm:text-sm"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="line2"
                className="block font-medium text-gray-700 text-sm"
              >
                Address Line 2
              </label>
              <input
                type="text"
                id="line2"
                name="line2"
                ref={line2Ref}
                placeholder="Apartment, suite, unit, building, floor, etc."
                required
                className="block border-gray-300 focus:border-green-500 shadow-sm mt-1 px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-green-500 sm:text-sm"
              />
            </div>

            {error && <p className="mb-4 text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-teal-500 hover:from-teal-600 via-green-500 hover:via-green-600 to-lime-500 hover:to-lime-600 shadow-md px-4 py-2 rounded-md focus:ring-2 focus:ring-green-400 focus:ring-offset-2 w-full text-white transform transition-transform hover:scale-105 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Complete Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletion;
