import { useContext } from "react";
import { AdminContext } from "../../context/AdminContextProvider";

const AllAppointments = () => {
  const { bookedAppoinment } = useContext(AdminContext);

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 transition-colors">
      <div className="bg-white dark:bg-gray-800 shadow-lg p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors">
        <h2 className="mb-6 font-bold text-2xl text-gray-900 dark:text-white">All Appointments</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 border-b-2 border-gray-300 dark:border-gray-600">
                <th className="p-3 font-semibold text-gray-700 dark:text-gray-200">#</th>
                <th className="p-3 font-semibold text-gray-700 dark:text-gray-200">Patient</th>
                <th className="p-3 font-semibold text-gray-700 dark:text-gray-200">Department</th>
                <th className="p-3 font-semibold text-gray-700 dark:text-gray-200">Birth Date</th>
                <th className="p-3 font-semibold text-gray-700 dark:text-gray-200">Date & Time</th>
                <th className="p-3 font-semibold text-gray-700 dark:text-gray-200">Doctor</th>
                <th className="p-3 font-semibold text-gray-700 dark:text-gray-200">Fees</th>
                <th className="p-3 font-semibold text-gray-700 dark:text-gray-200">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {bookedAppoinment.length > 0 ? (
                bookedAppoinment.map((appointment, index) => (
                  <tr
                    key={appointment._id || index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="p-3 text-gray-900 dark:text-gray-100">{index + 1}</td>
                    <td className="p-3 font-medium text-gray-900 dark:text-gray-100">
                      {appointment.userName}
                    </td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">
                      {appointment.speciality}
                    </td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">
                      {new Date(appointment.userBithdate).toLocaleDateString("en-GB")}
                    </td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">
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
                    <td className="p-3 font-medium text-gray-900 dark:text-gray-100">
                      {appointment.doctorName}
                    </td>
                    <td className="p-3 font-semibold text-gray-900 dark:text-gray-100">
                      ₹{appointment.fees}
                    </td>
                    <td className="p-3">
                      <span
                        className={`py-1 px-3 rounded-full text-sm font-semibold inline-block transition-colors ${appointment.status === "Pending"
                            ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                            : appointment.status === "Confirmed"
                              ? "bg-blue-500 hover:bg-blue-600 text-white"
                              : appointment.status === "Completed"
                                ? "bg-green-500 hover:bg-green-600 text-white"
                                : appointment.status === "Cancelled"
                                  ? "bg-red-500 hover:bg-red-600 text-white"
                                  : "bg-gray-500 hover:bg-gray-600 text-white"
                          }`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-gray-500 dark:text-gray-400">
                    No appointments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;
