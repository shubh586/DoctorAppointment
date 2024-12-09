import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminContext } from "../../context/AdminContextProvider";

const AllDoctors = () => {
  const { speciality } = useParams(null);
  const { doctors } = useContext(AdminContext);
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
        <p>Loading the data</p>
      </>
    );
  }

  return (
    <div className="p-4">
      <p>Browse through the doctors specialist.</p>
      <div className="flex sm:flex-row flex-col items-start gap-5 mt-5">
        <div>
          <ul className="flex flex-col gap-5 py-5 md:w-[200px] text-gray-600">
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
                    ? navigate("/admin/all-doctors")
                    : navigate(`/admin/all-doctors/${item}`)
                }
                className={` w-[94vw] sm:w-auto py-1.5 border px-2 border-blue-200 rounded transition-all cursor-pointer  ${
                  speciality === item ? "bg-blue-300" : ""
                }`}
                key={index}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="gap-4 gap-y-5 grid grid-cols-auto px-3 sm:px-0 pt-5 w-full">
          {selectedDoctors.map((item, index) => (
            <div
              className="border border-blue-200 rounded-xl transition-all hover:translate-y-[-10px] duration-500 hover:cursor-pointer overflow-hidden"
              key={index}
            >
              <img
                className="bg-blue-50 hover:bg-primary"
                src={`http://localhost:5000${item.image}`}
                alt=""
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-center text-green-500 text-sm">
                  <p className="bg-green-500 rounded-full w-2 h-2"></p>
                  <p></p>
                  {item.availability}
                </div>
                <p className="font-medium text-gray-900 text-lg">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllDoctors;
