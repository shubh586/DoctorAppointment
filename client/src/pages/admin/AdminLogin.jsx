import { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form } from "react-router-dom";
const AdminLogin = () => {
  const { setIsLogined } = useContext(AdminContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/admin/login",
        {
          email,
          password,
        }
      );
      console.log(response);
      const token = response.data.token;
      localStorage.setItem("adminToken", token);
      console.log("user is loged in");
      setIsLogined(true);
      navigate("/admin");
    } catch (error) {
      setError(error.response?.data?.msg || "Login failed. Please try again.");
      console.error("Error login user:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border-gray-300 bg-white shadow-2xl p-8 border rounded-lg w-full max-w-md">
        <div>
          <Form
            method="post"
            action="/api/auth/user/login"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <h1 className="mb-6 font-bold text-3xl text-center text-gray-700">
              Log In
            </h1>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block font-medium text-gray-700 text-sm"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@example.com"
                required
                className="block border-gray-300 focus:border-green-500 shadow-sm mt-1 px-3 py-2 border rounded-md focus:ring-green-500 w-full sm:text-sm focus:outline-none"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block font-medium text-gray-700 text-sm"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required
                className="block border-gray-300 focus:border-green-500 shadow-sm mt-1 px-3 py-2 border rounded-md focus:ring-green-500 w-full sm:text-sm focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-teal-500 hover:from-teal-600 via-green-500 hover:via-green-600 to-lime-500 hover:to-lime-600 shadow-md px-4 py-2 rounded-md focus:ring-2 focus:ring-green-400 focus:ring-offset-2 w-full text-white transform transition-transform hover:scale-105 focus:outline-none"
            >
              Log In
            </button>

            {error && <p className="mt-3 text-red-500">{error}</p>}
            <p className="mt-6 text-center text-gray-500 text-xs">
              © 2021-2024 prescripto
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
