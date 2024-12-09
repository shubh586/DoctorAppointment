import { useNavigate } from "react-router-dom";
import { ProtectedContext } from "./Protected";
import { useContext } from "react";

const Navbar = () => {
  const { setIsLogined } = useContext(ProtectedContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("doctorToken");
    setIsLogined(false);
    navigate("/doctor/login");
  };
  return (
    <div className="flex justify-between items-center border-gray-200 bg-white shadow-md px-6 py-3 border-b text-blue-900">
      <div className="font-bold text-xl sm:text-2xl">Prescripto</div>
      <button
        className="bg-blue-700 hover:bg-blue-600 px-3 sm:px-4 py-2 rounded-md text-sm text-white"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
