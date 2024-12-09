import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_admin/assets";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="flex sm:flex-row flex-col bg-primary my-20 px-6 sm:px-10 md:px-20 rounded-lg lg:h-[400px]">
      <div className="flex-1 py-8 sm:py10 md:py-16 lg:py-24 lg:pl-5">
        <div className="font-semibold text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          <p>Book Appointment </p>
          <p className="mt-4">With 100+ Trusted Doctors</p>
        </div>
        <button
          onClick={() => {
            navigate("/login");
            scrollBy(0, 0);
          }}
          className="bg-white mt-6 px- py-3 rounded-full text-gray-600 text-sm sm:text-base hover:scale-105 transition-all"
        >
          Create Account
        </button>
      </div>

      <div className="md:block relative hidden md:w-1/2 lg:w-[370px]">
        <img
          className="right-0 bottom-0 absolute w-full max-w-md md:h-[300px] lg:h-[400px]"
          src={assets.appointment_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default Banner;
