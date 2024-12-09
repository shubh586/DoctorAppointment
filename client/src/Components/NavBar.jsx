import { useContext, useState } from "react";
import { assets } from "../assets/assets_admin/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContextProvider";
const NavBar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken } = useContext(AppContext);

  return (
    <div className="flex justify-between items-center mb-5 py-4 border-b border-b-gray-400 text-sm">
      <img className="w-44 cursor-pointer" src={assets.logo} alt="" />
      <ul className="md:flex items-start gap-5 hidden font-medium">
        <NavLink to="/">
          <li className="py-1">Home</li>
          <hr className="hidden bg-primary m-auto border-none w-3/5 h-0.5 outline-none" />
        </NavLink>

        <NavLink to="/doctors">
          <li className="py-1">All Doctors</li>
          <hr className="hidden bg-primary m-auto border-none w-3/5 h-0.5 outline-none" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">About</li>
          <hr className="hidden bg-primary m-auto border-none w-3/5 h-0.5 outline-none" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">Contact</li>
          <hr className="hidden bg-primary m-auto border-none w-3/5 h-0.5 outline-none" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4 cursor-pointer">
        {token ? (
          <div className="relative flex items-center gap-4 group">
            <img className="rounded w-8 full" src={assets.profile_pic} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />

            <div className="group-hover:block top-0 right-0 z-20 absolute hidden pt-14 font-medium text-base text-gray-600">
              <div className="flex flex-col gap-4 bg-stone p-4 rounded min-w-48">
                <p
                  className="hover:text-black cursor-pointer"
                  onClick={() => {
                    navigate("/my-profile");
                  }}
                >
                  My Profile
                </p>
                <p
                  className="hover:text-black cursor-pointer"
                  onClick={() => {
                    navigate("/my-appoinments");
                  }}
                >
                  My Appoinments
                </p>
                <p
                  className="hover:text-black cursor-pointer"
                  onClick={() => {
                    navigate("/");
                    localStorage.removeItem("userToken");
                    setToken(false);
                  }}
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            className="bg-primary px-8 py-4 rounded-full font-light text-white"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Create account
          </button>
        )}
        <div>
          <img
            className="md:hidden w-6"
            src={assets.menu_icon}
            alt=""
            onClick={() => {
              setShowMenu(true);
            }}
          />
          <div
            className={`md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white  transition-all ${
              showMenu ? "fixed w-full" : "h-0 w-0"
            }`}
          >
            <div className="flex justify-between items-center px-5 py-6">
              <img className="w-36" src={assets.logo} alt="" />
              <img
                className="w-7"
                onClick={() => {
                  setShowMenu(false);
                }}
                src={assets.cross_icon}
                alt=""
              />
            </div>
            <ul className="flex flex-col justify-center items-center gap-6 bg-blue-800 px-6 py-6 h-full text-white">
              <NavLink
                to="/"
                className="w-full font-medium text-lg transition-colors duration-300"
              >
                <li
                  onClick={() => setShowMenu(false)}
                  className="bg-blue-700 hover:bg-blue-600 shadow-md py-2 rounded w-full text-center"
                >
                  Home
                </li>
              </NavLink>
              <NavLink
                to="/doctors"
                className="w-full font-medium text-lg transition-colors duration-300"
              >
                <li
                  onClick={() => setShowMenu(false)}
                  className="bg-green-700 hover:bg-green-600 shadow-md py-2 rounded w-full text-center"
                >
                  All Doctors
                </li>
              </NavLink>
              <NavLink
                to="/about"
                className="w-full font-medium text-lg transition-colors duration-300"
              >
                <li
                  onClick={() => setShowMenu(false)}
                  className="bg-yellow-700 hover:bg-yellow-600 shadow-md py-2 rounded w-full text-center"
                >
                  About
                </li>
              </NavLink>
              <NavLink
                to="/contact"
                className="w-full font-medium text-lg transition-colors duration-300"
              >
                <li
                  onClick={() => setShowMenu(false)}
                  className="bg-red-700 hover:bg-red-600 shadow-md py-2 rounded w-full text-center"
                >
                  Contact
                </li>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
