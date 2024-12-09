import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContextProvider";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-4 md:mx-10 my-16 text-900 text-gray-900">
      <h1 className="font-medium text-3xl">Top Doctors To Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="gap-4 gap-y-6 grid grid-cols-auto px-3 sm:px-0 pt-5 w-full">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => navigate(`/appoinments/${item._id}`)}
            className="border border-blue-200 rounded-xl transition-all hover:translate-y-[-10px] duration-500 hover:cursor-pointer overflow-hidden"
            key={index}
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
              <p className="font-medium text-gray-900 text-lg">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-blue-50 mt-10 px-12 py-4 rounded-full text-gray-600"
      >
        More..
      </button>
    </div>
  );
};

export default TopDoctors;
