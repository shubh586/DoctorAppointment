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
    <div className="p-4 min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <h1 className="mb-6 font-semibold text-2xl text-gray-900 dark:text-white">My Appointments</h1>
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
                  className={`flex md:flex-row flex-col items-start md:items-center shadow-lg p-4 md:p-6 rounded-lg border-l-4 transition-colors ${item.status === "Pending"
                      ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500 dark:border-yellow-400"
                      : item.status === "Confirmed"
                        ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500 dark:border-blue-400"
                        : item.status === "Completed"
                          ? "bg-green-50 dark:bg-green-900/20 border-green-500 dark:border-green-400"
                          : "bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-400"
                    }`}
                >
                  {/* Doctor Image */}
                  <img
                    src={`http://localhost:5000${doctor.image}`}
                    alt={doctor.name}
                    className="bg-indigo-50 dark:bg-indigo-900/30 rounded-full w-24 md:w-32 h-24 md:h-32 object-cover"
                  />

                  {/* Appointment Details */}
                  <div className="flex-1 mt-4 md:mt-0 md:ml-6">
                    <h2 className="font-semibold text-lg text-gray-900 dark:text-white">{doctor.name}</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{doctor.speciality}</p>
                    <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                      <span className="font-medium">Address:</span>{" "}
                      {doctor.address.line1}, {doctor.address.line2}
                    </p>

                    <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                      <span className="font-medium">Date & Time:</span> {day},{" "}
                      {date} {month} {year} at {formattedTime}
                    </p>
                  </div>

                  {/* Buttons ["Pending", "Confirmed", "Completed", "Cancelled"]*/}
                  <div className="mt-4 md:mt-0 md:ml-6 flex gap-2">
                    {item.status === "Pending" ? (
                      <>
                        <button
                          onClick={() => {
                            confirmStatus(item._id);
                          }}
                          className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition-colors"
                        >
                          Pay Online
                        </button>
                        <button
                          className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg text-gray-600 dark:text-gray-200 transition-colors"
                          onClick={() => {
                            cancleAppointment(item._id);
                          }}
                        >
                          Cancel Appointment
                        </button>
                      </>
                    ) : (
                      <span className={`px-4 py-2 rounded-lg font-semibold ${item.status === "Confirmed"
                          ? "bg-blue-500 dark:bg-blue-600 text-white"
                          : item.status === "Completed"
                            ? "bg-green-500 dark:bg-green-600 text-white"
                            : "bg-red-500 dark:bg-red-600 text-white"
                        }`}>
                        {item.status}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div>
          <p className="p-6 text-gray-900 dark:text-gray-100 text-start">
            No appointments booked yet
          </p>
        </div>
      )}
    </div>
  );
};

export default MyAppoinment;
