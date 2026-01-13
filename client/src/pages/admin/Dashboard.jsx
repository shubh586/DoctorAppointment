import { useContext } from "react";
import { AdminContext } from "../../context/AdminContextProvider";
const Dashboard = () => {
  const { doctors, bookedAppoinment } = useContext(AdminContext);

  const getDoctor = (docId) => {
    return doctors.find((doctor) => doctor._id === docId);
  };
  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 transition-colors">
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 mb-6">
        <div className="bg-white dark:bg-gray-800 shadow-lg p-4 rounded-lg text-center border border-gray-200 dark:border-gray-700 transition-colors">
          <h3 className="font-bold text-3xl text-gray-900 dark:text-white">{doctors.length}</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Doctors</p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-lg p-4 rounded-lg text-center border border-gray-200 dark:border-gray-700 transition-colors">
          <h3 className="font-bold text-3xl text-gray-900 dark:text-white">{bookedAppoinment.length}</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Total Appointments</p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-lg p-4 rounded-lg text-center border border-gray-200 dark:border-gray-700 transition-colors">
          <h3 className="font-bold text-3xl text-gray-900 dark:text-white">5</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Patients</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-lg p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors">
        <h3 className="mb-4 font-bold text-lg text-gray-900 dark:text-white">Latest Appointment</h3>
        <ul>
          {bookedAppoinment
            .reverse()
            .slice(0, 10)
            .map((appointment, index) => (
              <li
                key={index}
                className="flex sm:flex-row flex-col justify-between items-start sm:items-center mb-3 pb-3 border-b border-gray-200 dark:border-gray-700 last:border-0"
              >
                <div className="flex items-center">
                  <div className="bg-gray-300 dark:bg-gray-600 mr-4 rounded-full w-12 h-13 overflow-hidden">
                    <img
                      src={`http://localhost:5000${getDoctor(appointment.doctor).image
                        }`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-200">
                      {appointment.doctorName}
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {new Date(appointment.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      on{" "}
                      {new Date(appointment.createdAt).toLocaleDateString([], {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                    <div className="mt-2">
                      <button
                        className={`py-1 px-3 rounded-full text-sm font-semibold transition-colors ${appointment.status === "Pending"
                            ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                            : appointment.status === "Confirmed"
                              ? "bg-blue-500 hover:bg-blue-600 text-white"
                              : appointment.status === "Completed"
                                ? "bg-green-500 hover:bg-green-600 text-white"
                                : appointment.status === "Canceled"
                                  ? "bg-red-500 hover:bg-red-600 text-white"
                                  : "bg-gray-500 hover:bg-gray-600 text-white"
                          }`}
                      >
                        {appointment.status}
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
