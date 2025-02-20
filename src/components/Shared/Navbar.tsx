import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FiShoppingCart } from "react-icons/fi";
import { MdAccountCircle } from "react-icons/md";
import { NavLink } from "react-router-dom";

const links = [
  {
    title: "Home",
    path: "/",
  },

  {
    title: "Products",
    path: "/products",
  },
  {
    title: "About Us",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];

const Navbar = () => {
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const unreadCount = 1;

  return (
    <Disclosure as="nav">
      <div className="custom-container text-white">
        <div className="relative  flex h-[70px] items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-1 md:p-2  bg-primary  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-10 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-10 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          {/* Logo for all screens */}
          <a
            href="/"
            className="ml-[50px] md:ml-0  flex flex-shrink-0 items-center"
          >
            <img
              src={"https://i.ibb.co.com/1Y9ztf5X/Red-Simple-Geometric.png"}
              alt="Logo"
              width={250}
              height={100}
              className="w-[140px] md:w-[200px]"
            />
          </a>

          {/* Centered Navigation Links for larger screens */}
          <div className="hidden sm:flex sm:items-center sm:justify-center flex-1">
            <div className="flex space-x-3 lg:space-x-4">
              {links.map((link) => (
                <NavLink
                  key={link?.path}
                  to={link?.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-secondary text-base font-medium px-2"
                      : "text-base px-2 hover:text-secondary font-medium transition-all duration-300 ease-in-out"
                  }
                >
                  {link.title}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right Section ( Profile ) */}
          <div className="relative inset-y-0 right-0 flex  items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Account dropdown */}
            <Menu as="div" className="relative ml-3">
              {user ? (
                <>
                  <div>
                    <MenuButton>
                      <span className="sr-only">Open user menu</span>
                      <div className="flex gap-1 mt-2">
                        <MdAccountCircle className="text-3xl  cursor-pointer" />
                      </div>
                    </MenuButton>
                  </div>
                  <MenuItems className="absolute border right-0 z-50 mt-4 w-[250px] origin-top-right rounded-md bg-white py-1 shadow-lg ring- ring-blac ring-opacity-5 focus:outline-none">
                    <div className="px-3">
                      <MenuItem>
                        <a
                          href="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                        >
                          My Dashboards
                        </a>
                      </MenuItem>
                      {/* Divider */}
                      <div className="border-t border-gray-200"></div>
                      <MenuItem>
                        <button
                          onClick={() => dispatch(logout())}
                          className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-start hover:text-red-800 transition-colors duration-200"
                        >
                          Logout
                        </button>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </>
              ) : (
                <>
                  <a
                    href={"/login"}
                    className="px-3 md:px-6 py-[7px] brder bg-secondary  rounded-full"
                  >
                    Login
                  </a>
                </>
              )}
            </Menu>

            {/* Cart dropdown */}
            <Menu as="div" className="relative ml-3">
              <>
                <div>
                  <MenuButton className="relative flex justify-center items-center rounded-full  text-sm">
                    <span className="sr-only">Open user menu</span>
                    <div className="md:mt-[5px] relative">
                      <FiShoppingCart className="text-2xl  cursor-pointer" />
                      {unreadCount > 0 && (
                        <p className=" bg-secondary px-[6px] -top-2 absolute rounded-full text-[10px]">
                          {unreadCount}
                        </p>
                      )}
                    </div>
                  </MenuButton>
                </div>
                <MenuItems className="absolute text-gray-800  text-sm bg-accent -right-[0px] md:right-0 z-50 mt-[24px] md:mt-[20px] w-[300px] h-[300px] overflow-y-auto rounded-md shadow-lg">
                  <MenuItem>
                    <div>
                      <h1>hello</h1>
                    </div>
                  </MenuItem>
                </MenuItems>
              </>
            </Menu>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Links */}
      <DisclosurePanel className="sm:hidden">
        <div className="flex flex-col space-y-1 px-2 pb-3 pt-2 text-white">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive
                  ? "text-secondary text-base"
                  : "text-base hover:text-secondary transition-all duration-300 ease-in-out"
              }
            >
              {link.title}
            </NavLink>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navbar;
