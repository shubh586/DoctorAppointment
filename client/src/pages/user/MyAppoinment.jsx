import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContextProvider";
import axios from "axios";
const MyAppoinment = () => {
  const [error, setError] = useState(null);
  const getDoctor = (docId) => {
    return doctors.find((doctor) => doctor._id === docId);
  };
  const [bookedAppoinment, setBookedAppoint] = useState([]);
  const { doctors, Months } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const getAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/appointments/user",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      setBookedAppoint(response.data.appointment);
    } catch (error) {
      setError(
        error.response?.data?.msg || "Booking failed. Please try again."
      );
    }
  };

  const confirmStatus = async (appointmentId) => {
    try {
      const response = await axios.patch(
        "http://localhost:5000/api/users/appointments/confirm",
        {
          appointmentId: appointmentId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      console.log(response.data.appointment.status);
      getAppointments();
    } catch (error) {
      setError(
        error.response?.data?.msg || "Booking failed. Please try again."
      );
    }
  };

  const cancleAppointment = async (appointmentId) => {
    try {
      const response = await axios.patch(
        "http://localhost:5000/api/users/appointments/cancel",
        {
          appointmentId: appointmentId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      console.log(response.data.appointment.status);
      getAppointments();
    } catch (error) {
      setError(
        error.response?.data?.msg || "Booking failed. Please try again."
      );
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);
  return (
    <div className="p-4">
      <h1 className="mb-4 font-semibold text-2xl">My Appointments</h1>
      {error && <p className="mt-3 text-red-500">{error}</p>}

      {bookedAppoinment.length > 0 ? (
        <div className="space-y-6">
          {bookedAppoinment.length > 0 &&
            bookedAppoinment.map((item, index) => {
              const doctor = getDoctor(item.doctor);
              const dateObj = new Date(item.slotTime);
              const date = dateObj.getDate();
              const month = Months[dateObj.getMonth()];
              const year = dateObj.getFullYear();
              const day = daysOfWeek[dateObj.getDay()];
              const formattedTime = dateObj.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={index}
                  className={`flex md:flex-row flex-col items-start md:items-center shadow-md p-4 md:p-6 rounded-lg ${
                    item.status === "Pending"
                      ? "bg-yellow-100 border-l-4 border-yellow-500"
                      : item.status === "Confirmed"
                      ? "bg-blue-100 border-l-4 border-blue-500"
                      : item.status === "Completed"
                      ? "bg-green-100 border-l-4 border-green-500"
                      : "bg-red-100 border-l-4 border-red-500"
                  }`}
                >
                  {/* Doctor Image */}
                  <img
                    src={`http://localhost:5000${doctor.image}`}
                    alt={doctor.name}
                    className="bg-indigo-50 rounded-full w-24 md:w-32 h-24 md:h-32 object-cover"
                  />

                  {/* Appointment Details */}
                  <div className="flex-1 mt-4 md:mt-0 md:ml-6">
                    <h2 className="font-semibold text-lg">{doctor.name}</h2>
                    <p className="text-gray-600 text-sm">{doctor.speciality}</p>
                    <p className="mt-2 text-gray-600 text-sm">
                      <span className="font-medium">Address:</span>{" "}
                      {doctor.address.line1}, {doctor.address.line2}
                    </p>

                    <p className="mt-2 text-gray-600 text-sm">
                      <span className="font-medium">Date & Time:</span> {day},{" "}
                      {date} {month} {year} at {formattedTime}
                    </p>
                  </div>

                  {/* Buttons ["Pending", "Confirmed", "Completed", "Cancelled"]*/}
                  <div className="mt-4 md:mt-0 md:ml-6">
                    {item.status === "Pending" ? (
                      <>
                        <button
                          onClick={() => {
                            confirmStatus(item._id);
                          }}
                          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white"
                        >
                          Pay Online
                        </button>
                        <button
                          className="bg-gray-100 hover:bg-gray-200 ml-2 px-4 py-2 rounded-lg text-gray-600"
                          onClick={() => {
                            cancleAppointment(item._id);
                          }}
                        >
                          Cancel Appointment
                        </button>
                      </>
                    ) : (
                      <button className="bg-gray-100 hover:bg-gray-200 ml-2 px-4 py-2 rounded-lg text-gray-600">
                        {item.status}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div>
          <p className="p-6 text-gray-900 text-start">
            No appointments booked yet
          </p>
        </div>
      )}
    </div>
  );
};

export default MyAppoinment;
