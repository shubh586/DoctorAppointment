import { useContext, useState, useRef } from "react";
import { DocterContext } from "../../context/DocterContextProvider";
import axios from "axios";
const Docterprofile = () => {
  const { doctor, setDoctor } = useContext(DocterContext);

  const aboutRef = useRef(null);
  const feeRef = useRef(null);
  const lineOne = useRef(null);
  const lineTwo = useRef(null);
  const availabilityRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(doctor);

  const handleSave = async () => {
    const token = localStorage.getItem("doctorToken");
    if (!token) {
      console.error("No token found");
      return (
        <>
          <p className="bg-black p-4 text-red-500">Please Loged in agin</p>
        </>
      );
    }
    try {
      const response = await axios.patch(
        "http://localhost:5000/api/doctors/profile",

        {
          fees: feeRef.current.value,
          about: aboutRef.current.value,
          address: {
            line1: lineOne.current.value,
            line2: lineTwo.current.value,
          },
          availability: availabilityRef.current.checked
            ? "Available"
            : "Unavailable",
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDoctor(response.data.doctor);
      console.log(response.data);
      console.log(response.data.doctor, "printing updated doctor");
      setProfileData((prev) => ({
        ...prev,
        fees: feeRef.current.value,
        about: aboutRef.current.value,
        address: {
          line1: lineOne.current.value,
          line2: lineTwo.current.value,
        },
        availability: availabilityRef.current.checked
          ? "Available"
          : "Unavailable",
      }));
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (!profileData) {
    return <p className="text-gray-900 dark:text-white">Loading doctor profile...</p>;
  }

  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-900 px-6 py-8 min-h-screen transition-colors">
      <div className="bg-white dark:bg-gray-800 shadow-md mx-auto p-6 rounded-lg max-w-4xl transition-colors">
        <div className="flex justify-center mb-6">
          <img
            src={`http://localhost:5000${profileData.image}`}
            alt="Profile"
            className="rounded-full w-24 h-24 object-cover"
          />
        </div>

        <div className="mb-6">
          <p className="font-semibold text-2xl text-gray-900 dark:text-white">{profileData.name}</p>
        </div>

        <hr className="mb-6 border-gray-300 dark:border-gray-600" />

        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
          <div className="space-y-4">
            <p className="font-medium text-xl text-gray-900 dark:text-white">Doctor Information</p>
            <div>
              <p className="font-semibold text-sm text-gray-700 dark:text-gray-300">Degree</p>
              <p className="text-gray-900 dark:text-gray-100">{profileData.degree}</p>
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-700 dark:text-gray-300">Speciality</p>
              <p className="text-gray-900 dark:text-gray-100">{profileData.speciality}</p>
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-700 dark:text-gray-300">Experience</p>
              <p className="text-gray-900 dark:text-gray-100">{profileData.experience} years</p>
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-700 dark:text-gray-300">About</p>
              {isEditing ? (
                <textarea
                  ref={aboutRef}
                  defaultValue={profileData.about}
                  className="border-gray-300 dark:border-gray-600 p-2 border rounded-md w-full bg-white dark:bg-gray-700"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100">{profileData.about}</p>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <p className="font-medium text-xl text-gray-900 dark:text-white">Additional Details</p>
            <div>
              <p className="font-semibold text-sm text-gray-700 dark:text-gray-300">Appointment Fee</p>
              {isEditing ? (
                <input
                  ref={feeRef}
                  type="number"
                  defaultValue={profileData.fees}
                  className="border-gray-300 dark:border-gray-600 p-2 border rounded-md w-full bg-white dark:bg-gray-700"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100">₹{profileData.fees}</p>
              )}
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-700 dark:text-gray-300">Address</p>
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    ref={lineOne}
                    defaultValue={profileData.address.line1}
                    className="border-gray-300 dark:border-gray-600 p-2 border rounded-md w-full bg-white dark:bg-gray-700"
                  />
                  <input
                    ref={lineTwo}
                    defaultValue={profileData.address.line2}
                    className="border-gray-300 dark:border-gray-600 p-2 border rounded-md w-full bg-white dark:bg-gray-700"
                  />
                </div>
              ) : (
                <p className="text-gray-900 dark:text-gray-100">
                  {profileData.address.line1}
                  <br />
                  {profileData.address.line2}
                </p>
              )}
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-700 dark:text-gray-300">Availability</p>
              {isEditing ? (
                <input
                  ref={availabilityRef}
                  type="checkbox"
                  defaultChecked={profileData.availability}
                  className="ml-2"
                />
              ) : (
                <p className="text-gray-900 dark:text-gray-100">
                  {profileData.availability === "Available"
                    ? "Available"
                    : "Unavailable"}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700 px-4 py-2 rounded-md text-white transition-colors"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 px-4 py-2 rounded-md text-white transition-colors"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Docterprofile;
