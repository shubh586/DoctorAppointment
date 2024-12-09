import { useContext } from "react";
import { AdminContext } from "../../context/AdminContextProvider";

const AllAppointments = () => {
  const { bookedAppoinment } = useContext(AdminContext);

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="mb-4 font-bold text-xl">All Appointments</h2>
      <table className="border-collapse border-gray-200 border w-full text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="border-gray-300 p-3 border">#</th>
            <th className="border-gray-300 p-3 border">Patient</th>
            <th className="border-gray-300 p-3 border">Department</th>
            <th className="border-gray-300 p-3 border">BirthDate</th>
            <th className="border-gray-300 p-3 border">Date & Time</th>
            <th className="border-gray-300 p-3 border">Doctor</th>
            <th className="border-gray-300 p-3 border">Fees</th>
            <th className="border-gray-300 p-3 border">Status</th>
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
                {appointment.speciality}
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
              <td className="border-gray-300 p-3 border">
                {appointment.doctorName}
              </td>
              <td className="border-gray-300 p-3 border">{appointment.fees}</td>
              <td className="border-gray-300 p-3 border">
                <button
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
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllAppointments;
