import { useState, useRef, useEffect } from "react";
import axios from "axios";
const MyProfile = () => {
  const [userData, setUserData] = useState(null);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const lineOne = useRef(null);
  const lineTwo = useRef(null);
  const gender = useRef(null);
  const birthday = useRef(null);
  const [edited, setEdited] = useState(false);

  const getUser = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      console.error("No token found");
      return (
        <>
          <p className="bg-black p-4 text-red-500">Please Loged in agin</p>
        </>
      );
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

      setUserData({
        name: response.data.user.name,
        image: response.data.user.image,
        email: response.data.user.email,
        phone: response.data.user.phone,
        address: response.data.user.address
          ? {
              line1:
                response.data.user.address.line1 || "set the line 1 address",
              line2:
                response.data.user.address.line2 || "set the line 2 address",
            }
          : {
              line1: "Unknown Address Line 1",
              line2: "Unknown Address Line 2",
            },
        gender: response.data.user.gender || "Other",
        birthdate: new Date(response.data.user.birthdate).toLocaleDateString(
          "en-GB"
        ),
      });
    } catch (error) {
      console.error(
        "error has been occured",
        error?.response?.data || error.message
      );
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem("userToken");
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
        "http://localhost:5000/api/users/profile",

        {
          name: nameRef.current.value,
          phone: phoneRef.current.value,
          address: {
            line1: lineOne.current.value,
            line2: lineTwo.current.value,
          },
          gender: gender.current.value,
          birthdate: birthday.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setUserData((prev) => ({
        ...prev,
        name: nameRef.current.value,
        phone: phoneRef.current.value,
        address: {
          line1: lineOne.current.value,
          line2: lineTwo.current.value,
        },
        gender: gender.current.value,
        birthdate: birthday.current.value,
      }));
      setEdited(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  if (!userData) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="flex flex-col bg-gray-100 px-6 py-8 min-h-screen">
      <div className="bg-white shadow-md mx-auto p-6 rounded-lg max-w-4xl">
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <img
            src={`http://localhost:5000${userData.image}`}
            alt="Profile"
            className="rounded-full w-24 h-24 object-cover"
          />
        </div>

        {/* Name Section */}
        <div className="mb-6">
          {edited ? (
            <input
              type="text"
              defaultValue={userData.name}
              ref={nameRef}
              className="border-gray-300 p-2 border rounded-md w-full"
            />
          ) : (
            <p className="font-semibold text-2xl">{userData.name}</p>
          )}
        </div>

        <hr className="mb-6" />

        {/* Contact and Basic Information Sections */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-4">
            <p className="font-medium text-xl">Contact Information</p>
            <div>
              <p className="font-semibold text-sm">Email id</p>
              <p className="text-blue-600">{userData.email}</p>
            </div>
            <div>
              <p className="font-semibold text-sm">Phone</p>
              {edited ? (
                <input
                  type="tel"
                  defaultValue={userData.phone}
                  ref={phoneRef}
                  className="border-gray-300 p-2 border rounded-md w-full"
                />
              ) : (
                <p>{userData.phone}</p>
              )}
            </div>
            <div>
              <p className="font-semibold text-sm">Address</p>
              {edited ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    defaultValue={userData.address.line1}
                    ref={lineOne}
                    className="border-gray-300 p-2 border rounded-md w-full"
                  />
                  <input
                    type="text"
                    defaultValue={userData.address.line2}
                    ref={lineTwo}
                    className="border-gray-300 p-2 border rounded-md w-full"
                  />
                </div>
              ) : (
                <p>
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </p>
              )}
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <p className="font-medium text-xl">Basic Information</p>
            <div>
              <p className="font-semibold text-sm">Gender</p>
              {edited ? (
                <select
                  name="Gender"
                  id="Gender"
                  ref={gender}
                  className="border-gray-300 p-2 border rounded-md w-full"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <p>{userData.gender}</p>
              )}
            </div>

            <div>
              <p className="font-semibold text-sm">Birthday</p>
              {edited ? (
                <input
                  type="date"
                  defaultValue={userData.birthdate}
                  ref={birthday}
                  className="border-gray-300 p-2 border rounded-md w-full"
                />
              ) : (
                <p>{userData.birthdate}</p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={() => setEdited(true)}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white transition"
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              handleSave(e);
            }}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md text-white transition"
          >
            Save Information
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
