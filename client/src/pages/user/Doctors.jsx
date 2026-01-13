import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContextProvider";

const Doctors = () => {
  const { speciality } = useParams(null);
  const { doctors } = useContext(AppContext);
  const [selectedDoctors, setSelectedDoctors] = useState([]);

  const checkSpeciality = useCallback(() => {
    if (!speciality) {
      setSelectedDoctors(doctors);
    } else {
      setSelectedDoctors(
        doctors.filter((item) => item.speciality === speciality)
      );
    }
  }, [speciality, doctors]);

  useEffect(() => {
    checkSpeciality();
  }, [checkSpeciality, doctors]);

  const navigate = useNavigate();
  if (doctors.length === 0) {
    return (
      <>
        <p className="text-gray-900 dark:text-white">Loading the data</p>
      </>
    );
  }
  return (
    <div className="py-6">
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-5">Browse through the doctors specialist.</p>
      <div className="flex sm:flex-row flex-col items-start gap-5 mt-5">
        {/* Filter Sidebar */}
        <div className="flex-shrink-0">
          <ul className="flex flex-col gap-2 py-5 md:w-[200px] text-sm">
            {[
              "General physician",
              "Gynecologist",
              "Dermatologist",
              "Pediatricians",
              "Neurologist",
              "Gastroenterologist",
            ].map((item, index) => (
              <li
                onClick={() =>
                  item === speciality
                    ? navigate("/doctors")
                    : navigate(`/doctors/${item}`)
                }
                className={`w-[94vw] sm:w-auto py-2 px-3 border rounded-lg transition-all cursor-pointer ${speciality === item
                    ? "bg-primary text-white border-primary"
                    : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                key={index}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Doctor Cards Grid - MATCHING TopDoctors.jsx style */}
        <div className="gap-4 gap-y-6 grid grid-cols-auto px-3 sm:px-0 pt-5 w-full">
          {selectedDoctors.map((item, index) => (
            <div
              onClick={() => {
                navigate(`/appoinments/${item._id}`), scrollTo(0, 0);
              }}
              className="border border-blue-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl transition-all hover:translate-y-[-10px] duration-500 hover:cursor-pointer overflow-hidden"
              key={index}
            >
              <img
                className="bg-blue-50 dark:bg-gray-700"
                src={`http://localhost:5000${item.image}`}
                alt=""
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-center text-green-500 text-sm">
                  <p className="bg-green-500 rounded-full w-2 h-2"></p>
                  <p></p>
                  Available
                </div>
                <p className="font-medium text-gray-900 dark:text-white text-lg">{item.name}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
