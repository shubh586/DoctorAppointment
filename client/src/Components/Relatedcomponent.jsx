import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContextProvider";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
const Relatedcomponent = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext);
  const [relatedDoctors, setRelatedDoctors] = useState([]);
  const getRelatedDoctors = useCallback(() => {
    const relatedDoctors = doctors.filter(
      (doctor) => doctor.speciality === speciality && doctor._id != docId
    );
    setRelatedDoctors(relatedDoctors);
  }, [doctors, speciality, docId]);

  useEffect(() => {
    getRelatedDoctors();
  }, [getRelatedDoctors]);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-6 my-6 px-6">
      <p className="font-semibold text-gray-900 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
        Related Doctors
      </p>
      <p className="text-gray-600 text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {
        <div className="gap-4 gap-y-5 grid grid-cols-auto px-3 sm:px-0 pt-5 w-full">
          {relatedDoctors.length > 0 ? (
            relatedDoctors.map((item) => (
              <div
                onClick={() => {
                  navigate(`/appoinments/${item._id}`), scrollTo(0, 0);
                }}
                className="border border-blue-200 rounded-xl transition-all hover:translate-y-[-10px] duration-500 hover:cursor-pointer overflow-hidden"
                key={item._id}
              >
                <img
                  className="bg-blue-50"
                  src={`http://localhost:5000${item.image}`}
                  alt=""
                />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-center text-green-500 text-sm">
                    <p className="bg-green-500 rounded-full w-2 h-2"></p>
                    <p></p>Available
                  </div>
                  <p className="font-medium text-gray-900 text-lg">
                    {item.name}
                  </p>
                  <p className="text-gray-600 text-sm">{item.speciality}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No related doctors found.
            </p>
          )}
        </div>
      }
    </div>
  );
};
Relatedcomponent.propTypes = {
  docId: PropTypes.string.isRequired,
  speciality: PropTypes.string.isRequired,
};

export default Relatedcomponent;
