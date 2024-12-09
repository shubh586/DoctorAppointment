import { useState } from "react";
import { MdOutlineAddHomeWork } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { FaCcDiscover } from "react-icons/fa6";
import { TiShoppingBag } from "react-icons/ti";
import { CiWallet } from "react-icons/ci";
import { FaSave } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { IoIosColorPalette } from "react-icons/io";
import { TbMenuDeep } from "react-icons/tb";
import { FaCalendarPlus } from "react-icons/fa";
import { GrLogout } from "react-icons/gr";
const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={` z-10 top-0 left-0 flex flex-col justify-between bg-black p-4 h-[100vh] text-white transition-all duration-300 ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="mb-6 font-bold text-2xl cursor-pointer">
          <div className="flex justify-between items-center">
            <p className={`text-pink-500 ${!isExpanded ? "hidden" : "block"}`}>
              Prescripto
            </p>
            <TbMenuDeep className="inline mr-1 rounded text-xl text-yellow-500 cursor-pointer" />
          </div>
        </div>

        {/* Profile Section */}
        <div
          className={`flex items-center hover:bg-blue-500 mb-6 p-2 rounded-lg transition duration-300 ease-in-out ${
            !isExpanded && "justify-center"
          }`}
        >
          <div className="bg-gray-500 rounded-full w-10 h-10"></div>
          {isExpanded && (
            <div className="ml-3">
              <p className="text-sm">Jane Smith</p>
              <p className="text-gray-400 text-xs">Independent</p>
            </div>
          )}
        </div>

        {/* Portfolio Section */}
        <div
          className={`flex justify-between items-center gap-1 hover:bg-blue-500 my-5 py-4 pr-2 border-t border-b border-blue-300 rounded-lg text-sm transition duration-300 ease-in-out ${
            !isExpanded && "justify-center"
          }`}
        >
          <div className="flex items-center">
            <IoIosColorPalette className="inline mr-1 rounded text-xl text-yellow-500" />
            {isExpanded && <p className="text-pink-500">Your Portfolio</p>}
          </div>
          {isExpanded && (
            <FaArrowRight className="inline mr-1 rounded text-xl text-yellow-500" />
          )}
        </div>

        {/* Nav Links */}
        <ul className="flex flex-col gap-3 py-4 text-sm">
          <NavLink
            to={"/admin"}
            className={`flex items-center gap-2 bg-gray-800 hover:bg-blue-500 p-3 rounded-lg text-white transition duration-300 ease-in-out ${
              !isExpanded && "justify-center"
            }`}
          >
            <MdOutlineAddHomeWork className="text-xl text-yellow-500" />
            {isExpanded && <span>Dashboard</span>}
          </NavLink>
          <NavLink
            to={"/admin/all-appointment"}
            className={`flex items-center gap-2 bg-gray-800 hover:bg-blue-500 p-3 rounded-lg text-white transition duration-300 ease-in-out ${
              !isExpanded && "justify-center"
            }`}
          >
            <FaCcDiscover className="text-xl text-yellow-500" />
            {isExpanded && <span>Appoinments</span>}
          </NavLink>
          <NavLink
            to={"/admin/add-doctor"}
            className={`flex items-center gap-2 bg-gray-800 hover:bg-blue-500 p-3 rounded-lg text-white transition duration-300 ease-in-out ${
              !isExpanded && "justify-center"
            }`}
          >
            <FaCalendarPlus className="text-xl text-yellow-500" />
            {isExpanded && <span>Add Doctor</span>}
          </NavLink>
          <NavLink
            to={"/admin/all-doctors"}
            className={`flex items-center gap-2 bg-gray-800 hover:bg-blue-500 p-3 rounded-lg text-white transition duration-300 ease-in-out ${
              !isExpanded && "justify-center"
            }`}
          >
            <TiShoppingBag className="text-xl text-yellow-500" />
            {isExpanded && <span>Doctors List</span>}
          </NavLink>
        </ul>
      </div>

      {/* Bottom Section */}
      <div>
        {/* Wallet Section */}
        <div
          className={`flex justify-between items-center gap-1 border-y hover:bg-blue-500 mb-4 py-4 pr-2 border-blue-300 rounded-lg text-sm transition duration-300 ease-in-out ${
            !isExpanded && "justify-center"
          }`}
        >
          <div className="flex items-center">
            <CiWallet className="inline mr-1 rounded text-xl text-yellow-500" />
            {isExpanded && <p>Wallet</p>}
          </div>
          {isExpanded && <p className="font-bold text-lg">$0.00</p>}
        </div>

        {/* Saved and Settings */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 hover:bg-blue-500 p-2 rounded-lg text-gray-400 text-sm transition duration-300 ease-in-out">
            <FaSave className="inline mr-1 rounded text-xl text-yellow-500" />
            {isExpanded && <span>Saved</span>}
          </div>
          <div className="flex items-center gap-2 hover:bg-blue-500 p-2 rounded-lg text-gray-400 text-sm transition duration-300 ease-in-out">
            <GrLogout className="inline mr-1 rounded text-xl text-yellow-500" />
            {isExpanded && <span>Logout</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
