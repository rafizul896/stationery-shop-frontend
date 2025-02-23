import { IconType } from "react-icons/lib";
import { NavLink } from "react-router-dom";

type TMenuItem = {
  label: string;
  address: string;
  icon: IconType;
};

const MenuItem = ({ label, address, icon: Icon }: TMenuItem) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-2  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
          isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
        }`
      }
    >
      <Icon className="w-5 h-5" />

      <span className="mx-4 font-medium">{label}</span>
    </NavLink>
  );
};

export default MenuItem;
