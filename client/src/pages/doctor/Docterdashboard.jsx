import { useContext } from "react";
import { DocterContext } from "../../context/DocterContextProvider";

const Docterdashboard = () => {
  const { bookedAppoinment } = useContext(DocterContext);
  const { alluser } = useContext(DocterContext);

  if (!alluser.length > 0) {
    return (
      <>
        <p>Getting the appointments</p>
      </>
    );
  }

  const getUser = (userID) => {
    const user = alluser.find((user) => user._id === userID);
    return user;
  };
  return (
    <div className="bg-gray-100 p-6">
      <div className="gap-4 grid grid-cols-3 mb-6">
        <div className="bg-white shadow p-4 rounded-lg text-center">
          <p className="font-semibold text-2xl">$80</p>
          <p className="text-gray-600">Earnings</p>
        </div>
        <div className="bg-white shadow p-4 rounded-lg text-center">
          <p className="font-semibold text-2xl">4</p>
          <p className="text-gray-600">Appointments</p>
        </div>
        <div className="bg-white shadow p-4 rounded-lg text-center">
          <p className="font-semibold text-2xl">2</p>
          <p className="text-gray-600">Patients</p>
        </div>
      </div>
      <div className="bg-white shadow p-6 rounded-lg">
        <p className="mb-4 font-semibold text-lg">Latest Bookings</p>

        <div className="bg-white shadow p-4 sm:p-6 rounded-lg">
          <h3 className="mb-4 font-bold text-lg">Latest Appointment</h3>
          <ul>
            {bookedAppoinment
              .reverse()
              .slice(0, 10)
              .map((appointment, index) => {
                const user = getUser(appointment.user);
                return (
                  <li
                    key={index}
                    className="flex sm:flex-row flex-col justify-between items-start sm:items-center mb-3"
                  >
                    <div className="flex items-center">
                      <div className="bg-gray-300 mr-4 rounded-full w-12 h-13">
                        <img
                          src={`http://localhost:5000${user.image}`}
                          alt="image"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700">
                          {user.name}
                        </h4>
                        <p className="text-gray-500 text-sm">
                          {new Date(appointment.createdAt).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}{" "}
                          on{" "}
                          {new Date(appointment.createdAt).toLocaleDateString(
                            [],
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )}
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
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Docterdashboard;
