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
    return <p>Loading doctor profile...</p>;
  }

  return (
    <div className="flex flex-col bg-gray-100 px-6 py-8 min-h-screen">
      <div className="bg-white shadow-md mx-auto p-6 rounded-lg max-w-4xl">
        <div className="flex justify-center mb-6">
          <img
            src={`http://localhost:5000${profileData.image}`}
            alt="Profile"
            className="rounded-full w-24 h-24 object-cover"
          />
        </div>

        <div className="mb-6">
          <p className="font-semibold text-2xl">{profileData.name}</p>
        </div>

        <hr className="mb-6" />

        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
          <div className="space-y-4">
            <p className="font-medium text-xl">Doctor Information</p>
            <div>
              <p className="font-semibold text-sm">Degree</p>
              <p>{profileData.degree}</p>
            </div>
            <div>
              <p className="font-semibold text-sm">Speciality</p>
              <p>{profileData.speciality}</p>
            </div>
            <div>
              <p className="font-semibold text-sm">Experience</p>
              <p>{profileData.experience} years</p>
            </div>
            <div>
              <p className="font-semibold text-sm">About</p>
              {isEditing ? (
                <textarea
                  ref={aboutRef}
                  defaultValue={profileData.about}
                  className="border-gray-300 p-2 border rounded-md w-full"
                />
              ) : (
                <p>{profileData.about}</p>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <p className="font-medium text-xl">Additional Details</p>
            <div>
              <p className="font-semibold text-sm">Appointment Fee</p>
              {isEditing ? (
                <input
                  ref={feeRef}
                  type="number"
                  defaultValue={profileData.fees}
                  className="border-gray-300 p-2 border rounded-md w-full"
                />
              ) : (
                <p>₹{profileData.fees}</p>
              )}
            </div>
            <div>
              <p className="font-semibold text-sm">Address</p>
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    ref={lineOne}
                    defaultValue={profileData.address.line1}
                    className="border-gray-300 p-2 border rounded-md w-full"
                  />
                  <input
                    ref={lineTwo}
                    defaultValue={profileData.address.line2}
                    className="border-gray-300 p-2 border rounded-md w-full"
                  />
                </div>
              ) : (
                <p>
                  {profileData.address.line1}
                  <br />
                  {profileData.address.line2}
                </p>
              )}
            </div>
            <div>
              <p className="font-semibold text-sm">Availability</p>
              {isEditing ? (
                <input
                  ref={availabilityRef}
                  type="checkbox"
                  defaultChecked={profileData.availability}
                  className="ml-2"
                />
              ) : (
                <p>
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
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-white transition"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white transition"
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
