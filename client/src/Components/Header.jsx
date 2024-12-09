import { Link } from "react-router-dom";
import { assets } from "../assets/assets_admin/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContextProvider";

const Header = () => {
  const { token } = useContext(AppContext);
  return (
    <div className="flex md:flex-row flex-col flex-wrap bg-primary px-6 md:px-10 lg:px-20 rounded-lg">
      <div className="flex flex-col justify-center items-start gap-4 m-auto md:mb-[-30px] py-10 md:py-[10vw] md:w-1/2">
        <p className="font-semibold text-3xl text-white md:text-4xl lg:text-5xl leading-tight md:leading-tight">
          Book Appointment
          <br />
          With Trusted Doctors
        </p>

        <div className="flex md:flex-row flex-col items-center gap-3 font-light text-sm text-white">
          <img
            className="w-28"
            src={assets.group_profiles}
            alt="Group Profiles"
          />
          <p>
            Simply browse through our extensive list of trusted doctors,
            <br className="sm:block hidden" />
            schedule your appointment hassle-free.
          </p>
        </div>

        <Link
          to={token ? "/doctors" : "/signup"}
          className="flex items-center gap-2 bg-white md:m-0 px-8 py-3 rounded-full text-gray-600 text-sm transition-all duration-300 hover:scale-105"
        >
          Book Appointment
          <img className="w-3" src={assets.arrow_icon} alt="Arrow Icon" />
        </Link>
      </div>

      <div className="relative md:w-1/2">
        <img
          className="right-0 bottom-0 md:absolute rounded-lg w-full h-auto"
          src={assets.header_img}
          alt="Header Image"
        />
      </div>
    </div>
  );
};

export default Header;
