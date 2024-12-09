import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "../../Components/Footer";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { DocterContext } from "../../context/DocterContextProvider";
import { useContext } from "react";

const DocterLayout = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isLogined } = useContext(DocterContext);
  if (!isLogined) {
    return <Navigate to="/doctor/login" />;
  }

  return (
    <div className="flex sm:w-full h-screen">
      <div
        className={`fixed top-0 left-0 transition-all duration-300 ${
          isExpanded ? "w-64" : "w-20"
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <Sidebar />
      </div>
      <div
        className={`flex flex-col flex-1 ml-20 transition-all duration-300 ${
          isExpanded ? "ml-64" : "ml-20"
        } overflow-y-scroll`}
      >
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default DocterLayout;
