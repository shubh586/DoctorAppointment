import { useContext, useState } from "react";
import { DocterContext } from "../../context/DocterContextProvider";
import axios from "axios";
const Appointments = () => {
  const [error, setError] = useState(null);
  const { bookedAppoinment, setBookedAppointment } = useContext(DocterContext);

  const updateStatus = async (appointmentId, newStatus) => {
    setError(null);
    const token = localStorage.getItem("doctorToken");
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/doctors/appointments/${appointmentId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatBookedAppointment = bookedAppoinment.map((appointment) =>
        appointment._id === response.data.appointment._id
          ? response.data.appointment
          : appointment
      );
      setBookedAppointment(updatBookedAppointment);
    } catch (error) {
      setError(error.response?.data?.msg || "Login failed. Please try again.");
      console.error("Error login user:", error);
    }
  };

  if (!bookedAppoinment.length) {
    return (
      <>
        <p>No Appointments</p>
      </>
    );
  }
  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="mb-4 font-bold text-xl">All Appointments</h2>
      {error && <p className="mt-3 text-red-500">{error}</p>}
      <table className="border-collapse border-gray-200 border w-full text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="border-gray-300 p-3 border">#</th>
            <th className="border-gray-300 p-3 border">Patient</th>
            <th className="border-gray-300 p-3 border">Status</th>
            <th className="border-gray-300 p-3 border">BirthDate</th>
            <th className="border-gray-300 p-3 border">Date & Time</th>
            <th className="border-gray-300 p-3 border">Fees</th>
            <th className="border-gray-300 p-3 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookedAppoinment.map((appointment, index) => (
            <tr key={appointment.id} className="hover:bg-gray-50">
              <td className="border-gray-300 p-3 border">{index + 1}</td>
              <td className="border-gray-300 p-3 border">
                {appointment.userName}
              </td>
              <td className="border-gray-300 p-3 border">
                <span
                  className={`py-1 px-3 rounded-full text-sm font-semibold ${
                    appointment.status === "Pending"
                      ? "bg-yellow-500 text-white"
                      : appointment.status === "Confirmed"
                      ? "bg-blue-500 text-white"
                      : appointment.status === "Completed"
                      ? "bg-green-500 text-white"
                      : appointment.status === "Canceled"
                      ? "bg-red-500 text-white"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  {appointment.status}
                </span>
              </td>
              <td className="border-gray-300 p-3 border">
                {new Date(appointment.userBithdate).toLocaleDateString("en-GB")}
              </td>
              <td className="border-gray-300 p-3 border">
                {new Date(appointment.slotTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                on{" "}
                {new Date(appointment.slotTime).toLocaleDateString([], {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td className="border-gray-300 p-3 border">{appointment.fees}</td>

              <td className="flex gap-2 border-gray-300 p-3 border">
                {["Pending", "Confirmed"].includes(appointment.status) ? (
                  <>
                    <button
                      className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded-full font-semibold text-sm text-white"
                      onClick={() => {
                        updateStatus(appointment._id, "Completed");
                      }}
                    >
                      Completed
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full font-semibold text-sm text-white"
                      onClick={() => {
                        updateStatus(appointment._id, "Cancelled");
                      }}
                    >
                      Canceled
                    </button>
                  </>
                ) : (
                  <span>-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Appointments;
