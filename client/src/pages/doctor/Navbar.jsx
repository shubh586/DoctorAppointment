import { useNavigate } from "react-router-dom";
import { ProtectedContext } from "./Protected";
import { useContext } from "react";
import ThemeToggle from "../../Components/ThemeToggle";

const Navbar = () => {
  const { setIsLogined } = useContext(ProtectedContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("doctorToken");
    setIsLogined(false);
    navigate("/doctor/login");
  };
  return (
    <div className="flex justify-between items-center border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-md px-6 py-3 border-b text-blue-900 dark:text-white transition-colors">
      <div className="font-bold text-xl sm:text-2xl">Prescripto</div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <button
          className="bg-blue-700 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-500 px-3 sm:px-4 py-2 rounded-md text-sm text-white transition-colors"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
