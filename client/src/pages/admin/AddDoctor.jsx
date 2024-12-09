import axios from "axios";
import { useState } from "react";
const AddDoctor = () => {
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData.get("docname"));
    try {
      setError(null);
      const response = await axios.post(
        "http://localhost:5000/api/admin/add-doctor",
        {
          name: formData.get("name"),
          image: formData.get("image"),
          email: formData.get("email"),
          speciality: formData.get("speciality"),
          experience: formData.get("experience"),
          degree: formData.get("education"),
          about: formData.get("about"),
          fees: formData.get("fees"),
          password: formData.get("password"),
          phone: formData.get("phone"),
          address: {
            line1: formData.get("address1"),
            line2: formData.get("address2"),
          },
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      console.log(response.data.doctor);
      alert("Docter added sucessfully");

      e.target.reset();
    } catch (error) {
      setError(error.response?.data?.msg || "Login failed. Please try again.");
      console.error("Error login user:", error);
    }
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="mb-4 font-bold text-xl">Add Doctor</h2>
      {error && <p className="mt-3 text-red-500">{error}</p>}
      <form
        method="POST"
        encType="multipart/form-data"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="space-y-4"
      >
        <div className="gap-4 grid grid-cols-2">
          <div>
            <label className="block font-medium text-gray-700 text-sm">
              Profile Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 text-sm">
              Doctor Name
            </label>
            <input
              type="text"
              name="name"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Name"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 text-sm">
              Specialty
            </label>
            <input
              type="text"
              name="speciality"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Specialty"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 text-sm">
              Doctor Email
            </label>
            <input
              type="email"
              name="email"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Your email"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 text-sm">
              Doctor Password
            </label>
            <input
              type="password"
              name="password"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Password"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 text-sm">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Phone Number"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 text-sm">
              Experience
            </label>
            <input
              type="number"
              name="experience"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Experience"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 text-sm">
              Fees
            </label>
            <input
              type="number"
              name="fees"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Your fees"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 text-sm">
              Education
            </label>
            <input
              type="text"
              name="education"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Education"
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700 text-sm">
              Address
            </label>
            <div className="gap-4 grid grid-cols-2">
              <input
                type="text"
                name="address1"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Line 1"
              />
              <input
                type="text"
                name="address2"
                className="mt-1 p-2 border rounded w-full"
                placeholder="Line 2"
              />
            </div>
          </div>
        </div>
        <div>
          <label className="block font-medium text-gray-700 text-sm">
            About Me
          </label>
          <textarea
            name="about"
            className="mt-1 p-2 border rounded w-full"
            placeholder="Write about yourself"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;
