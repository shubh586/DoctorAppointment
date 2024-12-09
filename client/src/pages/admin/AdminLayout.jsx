import { Navigate, Outlet } from "react-router-dom";
import Footer from "../../Components/Footer";
import AdminNavbar from "./AdminNavbar.jsx";
import Sidebar from "./Sidebar";
import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContextProvider";

const AdminLayout = () => {
  const { isLogined } = useContext(AdminContext);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  useEffect(() => {}, [isLogined]);

  if (!isLogined) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div className="flex sm:w-full h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full transition-all duration-300 ${
          isSidebarExpanded ? "w-64" : "w-20"
        }`}
        onMouseEnter={() => setIsSidebarExpanded(true)}
        onMouseLeave={() => setIsSidebarExpanded(false)}
      >
        <Sidebar />
      </div>

      <div
        className={`flex flex-col flex-1 ml-20 transition-all duration-300 ${
          isSidebarExpanded ? "ml-64" : "ml-20"
        } overflow-y-scroll`}
      >
        <AdminNavbar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
