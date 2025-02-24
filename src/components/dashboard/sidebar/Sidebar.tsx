import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { AiOutlineBars } from "react-icons/ai";
import AdminMenu from "./Menu/AdminMenu ";
import UserMenu from "./Menu/UserMenu";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

const Sidebar = () => {
  const role = useAppSelector(selectCurrentUser)?.role;
  const [isActive, setActive] = useState(true);
  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <a href="/" className="block cursor-pointer p-4 font-bold">
            <img
              src={
                "https://i.ibb.co.com/TBH1KtPv/stationary-shop-logo-removebg-preview.png"
              }
              alt="Logo"
              width={250}
              height={100}
              className="w-[140px] md:w-[200px]"
            />
          </a>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <a
            href="/"
            className="border-b-2 w-full hidden md:flex justify-center items-center mx-auto"
          >
            <img
              src={
                "https://i.ibb.co.com/TBH1KtPv/stationary-shop-logo-removebg-preview.png"
              }
              alt="Logo"
              width={250}
              height={100}
              className="w-[140px] md:w-[200px]"
            />
          </a>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-5">
            {/*  Menu Items */}
            <nav>
              {role === "user" && <UserMenu />}
              {role === "admin" && <AdminMenu />}
            </nav>
          </div>
        </div>

        <div>
          <hr />
          <button
            // onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
