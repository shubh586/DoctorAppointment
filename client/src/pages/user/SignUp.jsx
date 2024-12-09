import { Link, Form, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/user/register",
        {
          name,
          email,
          password,
        }
      );
      console.log("User registered successfully:", response.data);
      navigate("/login");
      scrollTo(0, 0);
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed. Please try again.");
      console.error("Error registering user:", err);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border-gray-300 bg-white shadow-2xl p-8 border rounded-lg w-full max-w-md">
        <div>
          <Form
            method="post"
            action="/api/auth/user/register"
            onSubmit={handleSubmit}
          >
            <h1 className="mb-6 font-bold text-3xl text-center text-gray-700">
              Sign Up
            </h1>

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block font-medium text-gray-700 text-sm"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                required
                className="block border-gray-300 focus:border-green-500 shadow-sm mt-1 px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-green-500 sm:text-sm"
              />
            </div>

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
                className="block border-gray-300 focus:border-green-500 shadow-sm mt-1 px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-green-500 sm:text-sm"
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
                className="block border-gray-300 focus:border-green-500 shadow-sm mt-1 px-3 py-2 border rounded-md w-full focus:outline-none focus:ring-green-500 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-teal-500 hover:from-teal-600 via-green-500 hover:via-green-600 to-lime-500 hover:to-lime-600 shadow-md px-4 py-2 rounded-md focus:ring-2 focus:ring-green-400 focus:ring-offset-2 w-full text-white transform transition-transform hover:scale-105 focus:outline-none"
            >
              Sign Up
            </button>

            {error && <p className="mt-3 text-danger">{error}</p>}
            <Link
              to="/login"
              className="block mt-4 text-center text-green-600 text-sm hover:underline"
            >
              Already have an account? Log In
            </Link>
            <p className="mt-6 text-center text-gray-500 text-xs">
              © 2021-2024 prescripto Company
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
