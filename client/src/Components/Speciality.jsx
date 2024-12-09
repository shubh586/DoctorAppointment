import { Link } from "react-router-dom";
import { specialityData } from "../assets/assets_admin/assets";

const Speciality = () => {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-gray-800">
      <h1 className="font-medium text-3xl">Find by Speciality</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free{" "}
      </p>
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            className="flex flex-col flex-shrink-0 items-center font-semibold text-xs transition-all hover:translate-y-[-10px] duration-500 cursor-pointer"
            key={index}
            to={`/doctors/${item.speciality}`}
          >
            <img className="mb-2 w-16 sm:w-24" src={item.image} alt="" />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Speciality;
