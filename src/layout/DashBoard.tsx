import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const DashBoard = () => {
  return (
    <div className="relative min-h-screen md:flex">
      {/* Sidebar */}
      <div>
        <Sidebar />
      </div>
      {/* Outlet */}
      <div className="flex-1 md:ml-64">
        <div className="p-5 md:py-10">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
