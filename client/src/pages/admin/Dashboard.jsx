import { useContext } from "react";
import { AdminContext } from "../../context/AdminContextProvider";
const Dashboard = () => {
  const { doctors, bookedAppoinment } = useContext(AdminContext);

  const getDoctor = (docId) => {
    return doctors.find((doctor) => doctor._id === docId);
  };
  return (
    <div className="flex-1 bg-gray-50 p-4 sm:p-6">
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 mb-6">
        <div className="bg-white shadow p-4 rounded-lg text-center">
          <h3 className="font-bold text-xl">{doctors.length}</h3>
          <p className="text-gray-600">Doctors</p>
        </div>
        <div className="bg-white shadow p-4 rounded-lg text-center">
          <h3 className="font-bold text-xl">{bookedAppoinment.length}</h3>
          <p className="text-gray-600">Total Appointments</p>
        </div>
        <div className="bg-white shadow p-4 rounded-lg text-center">
          <h3 className="font-bold text-xl">5</h3>
          <p className="text-gray-600">Patients</p>
        </div>
      </div>

      <div className="bg-white shadow p-4 sm:p-6 rounded-lg">
        <h3 className="mb-4 font-bold text-lg">Latest Appointment</h3>
        <ul>
          {bookedAppoinment
            .reverse()
            .slice(0, 10)
            .map((appointment, index) => (
              <li
                key={index}
                className="flex sm:flex-row flex-col justify-between items-start sm:items-center mb-3"
              >
                <div className="flex items-center">
                  <div className="bg-gray-300 mr-4 rounded-full w-12 h-13">
                    <img
                      src={`http://localhost:5000${
                        getDoctor(appointment.doctor).image
                      }`}
                      alt=""
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700">
                      {appointment.doctorName}
                    </h4>
                    <p className="text-gray-500 text-sm">
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
