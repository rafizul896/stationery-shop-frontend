import { useState, useEffect } from "react";
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
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { FiShoppingCart } from "react-icons/fi";
import { MdAccountCircle, MdSchool, MdBrush, MdComputer } from "react-icons/md";
import { BsPen, BsBuilding } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";

const links = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Products",
    path: "/products",
    hasDropdown: true,
  },
  {
    title: "About Us",
    path: "/about",
  },
  {
    title: "Blog",
    path: "/blog",
  },
  {
    title: "Contact Us",
    path: "/contact",
  },
];

const megaMenuCategories = [
  {
    title: "Writing Supplies",
    icon: <BsPen className="text-xl text-blue-600" />,
    items: [
      { name: "Pens & Pencils", path: "/products?category=writing&type=pens" },
      {
        name: "Markers & Highlighters",
        path: "/products?category=writing&type=markers",
      },
      {
        name: "Notebooks & Journals",
        path: "/products?category=writing&type=notebooks",
      },
      {
        name: "Sticky Notes",
        path: "/products?category=writing&type=sticky-notes",
      },
    ],
  },
  {
    title: "Office Supplies",
    icon: <BsBuilding className="text-xl text-green-600" />,
    items: [
      { name: "Files & Folders", path: "/products?category=office&type=files" },
      {
        name: "Staplers & Clips",
        path: "/products?category=office&type=staplers",
      },
      {
        name: "Desk Organizers",
        path: "/products?category=office&type=organizers",
      },
      {
        name: "Calculators",
        path: "/products?category=office&type=calculators",
      },
    ],
  },
  {
    title: "Art Supplies",
    icon: <MdBrush className="text-xl text-purple-600" />,
    items: [
      {
        name: "Drawing Materials",
        path: "/products?category=art&type=drawing",
      },
      { name: "Paints & Brushes", path: "/products?category=art&type=paints" },
      { name: "Craft Supplies", path: "/products?category=art&type=crafts" },
      { name: "Sketchbooks", path: "/products?category=art&type=sketchbooks" },
    ],
  },
  {
    title: "Educational",
    icon: <MdSchool className="text-xl text-orange-600" />,
    items: [
      {
        name: "School Supplies",
        path: "/products?category=educational&type=school",
      },
      {
        name: "Learning Tools",
        path: "/products?category=educational&type=tools",
      },
      {
        name: "Educational Games",
        path: "/products?category=educational&type=games",
      },
      {
        name: "Reference Materials",
        path: "/products?category=educational&type=reference",
      },
    ],
  },
  {
    title: "Technology",
    icon: <MdComputer className="text-xl text-red-600" />,
    items: [
      {
        name: "Computer Accessories",
        path: "/products?category=technology&type=computer",
      },
      {
        name: "Digital Tools",
        path: "/products?category=technology&type=digital",
      },
      {
        name: "Cables & Adapters",
        path: "/products?category=technology&type=cables",
      },
      {
        name: "Storage Solutions",
        path: "/products?category=technology&type=storage",
      },
    ],
  },
];

const Navbar = () => {
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);
  const [isProductsExpanded, setIsProductsExpanded] = useState(false);

  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  const totalQuantity = cartItems.reduce(
    (total, item) => total + (item.cartQuantity as number),
    0
  );

  // Close mobile menu when clicking outside or resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setExpandedMobileCategory(null);
        setIsProductsExpanded(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMobileCategory = (categoryKey: any) => {
    if (categoryKey === "products") {
      setIsProductsExpanded(!isProductsExpanded);
      if (!isProductsExpanded) {
        setExpandedMobileCategory(null); // Close any sub-categories when collapsing products
      }
    } else {
      setExpandedMobileCategory(
        expandedMobileCategory === categoryKey ? null : categoryKey
      );
    }
  };

  const closeMobileMenu = () => {
    setExpandedMobileCategory(null);
    setIsProductsExpanded(false);
  };

  return (
    <div className="w-full transition-all duration-300 fixed top-0 z-50 shadow-lg">
      {/* Main Navbar */}
      <Disclosure as="nav" className="bg-primary shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <DisclosureButton className="mobile-menu-container inline-flex items-center justify-center p-2 rounded-md text-white hover:text-secondary hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-200">
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  className="block h-6 w-6 ui-open:hidden"
                  aria-hidden="true"
                />
                <XMarkIcon
                  className="hidden h-6 w-6 ui-open:block"
                  aria-hidden="true"
                />
              </DisclosureButton>
            </div>

            {/* Logo - Responsive sizing */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img
                  src="https://i.ibb.co.com/1Y9ztf5X/Red-Simple-Geometric.png"
                  alt="Stationery Shop Logo"
                  className="h-8 w-auto sm:h-10 md:h-12 lg:h-14 max-w-none"
                />
              </Link>
            </div>

            {/* Desktop Navigation Links - Better spacing control */}
            <div className="hidden sm:flex sm:items-center flex-1 justify-center max-w-4xl mx-4">
              <div className="flex items-center space-x-2 md:space-x-4 lg:space-x-8">
                {links.map((link) => (
                  <div key={link.path} className="relative">
                    {link.hasDropdown ? (
                      <div
                        className="relative group"
                        onMouseEnter={() => setShowMegaMenu(true)}
                        onMouseLeave={() => setShowMegaMenu(false)}
                      >
                        <button className="flex items-center space-x-1 text-white hover:text-secondary font-medium transition-all duration-300 ease-in-out px-2 md:px-3 py-2 text-sm md:text-base whitespace-nowrap">
                          <span>{link.title}</span>
                          <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
                        </button>

                        {/* Mega Menu for Desktop - Better positioning */}
                        {showMegaMenu && (
                          <div className="fixed  left-0 right-0 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="absolute top-full left-0 right-0 z-50">
                              <div className="bg-white shadow-2xl rounded-lg border border-gray-200 overflow-hidden">
                                <div className="p-4 md:p-6 lg:p-8">
                                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                                    {megaMenuCategories.map(
                                      (category, index) => (
                                        <div key={index} className="space-y-3">
                                          <div className="flex items-center space-x-2 pb-2 border-b border-gray-200">
                                            <div className="flex-shrink-0">
                                              {category.icon}
                                            </div>
                                            <h3 className="font-semibold text-gray-800 text-sm lg:text-base leading-tight">
                                              {category.title}
                                            </h3>
                                          </div>
                                          <ul className="space-y-2">
                                            {category.items.map(
                                              (item, itemIndex) => (
                                                <li key={itemIndex}>
                                                  <Link
                                                    to={item.path}
                                                    className="text-gray-600 hover:text-primary transition-colors duration-200 text-xs lg:text-sm hover:font-medium block leading-relaxed"
                                                    onClick={() =>
                                                      setShowMegaMenu(false)
                                                    }
                                                  >
                                                    {item.name}
                                                  </Link>
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        </div>
                                      )
                                    )}
                                  </div>

                                  {/* Featured Products Section */}
                                  <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                                      <div>
                                        <h4 className="text-base lg:text-lg font-semibold text-gray-800 mb-1">
                                          Featured Products
                                        </h4>
                                        <p className="text-gray-600 text-xs lg:text-sm">
                                          Check out our best-selling stationery
                                          items
                                        </p>
                                      </div>
                                      <Link
                                        to="/products"
                                        className="bg-primary text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors duration-200 text-sm whitespace-nowrap"
                                        onClick={() => setShowMegaMenu(false)}
                                      >
                                        View All
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <NavLink
                        to={link.path}
                        className={({ isActive }) =>
                          `px-2 md:px-3 py-2 font-medium transition-all duration-300 ease-in-out text-sm md:text-base whitespace-nowrap ${
                            isActive
                              ? "text-secondary"
                              : "text-white hover:text-secondary"
                          }`
                        }
                      >
                        {link.title}
                      </NavLink>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Section - Cart and Account */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Cart */}
              <Link
                to="/checkout"
                className="relative p-2 text-white hover:text-secondary transition-colors duration-200"
              >
                <FiShoppingCart className="h-5 w-5 lg:h-6 lg:w-6" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-primary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
                    {totalQuantity > 99 ? "99+" : totalQuantity}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Menu as="div" className="relative">
                {user ? (
                  <>
                    <MenuButton className="p-1 text-white hover:text-secondary transition-colors duration-200">
                      <span className="sr-only">Open user menu</span>
                      <MdAccountCircle className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
                    </MenuButton>
                    <MenuItems className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <MenuItem>
                        <Link
                          to={
                            user.role === "user"
                              ? "/dashboard/profile"
                              : "/dashboard/manage-users"
                          }
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        >
                          My Dashboard
                        </Link>
                      </MenuItem>
                      <div className="border-t border-gray-200"></div>
                      <MenuItem>
                        <button
                          onClick={() => dispatch(logout())}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                        >
                          Logout
                        </button>
                      </MenuItem>
                    </MenuItems>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="bg-secondary text-white px-3 sm:px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors duration-200 text-xs sm:text-sm font-medium whitespace-nowrap"
                  >
                    Login
                  </Link>
                )}
              </Menu>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu - Fixed structure */}
        <DisclosurePanel className="sm:hidden mobile-menu-container">
          <div className="px-4 pt-2 pb-3 space-y-1 bg-primary border-t border-white border-opacity-20 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {links.map((link) => (
              <div key={link.path}>
                {link.hasDropdown ? (
                  <div className="space-y-2">
                    <button
                      onClick={() => toggleMobileCategory("products")}
                      className="flex items-center justify-between w-full text-left px-3 py-2 text-base font-medium text-white hover:text-secondary hover:bg-white hover:bg-opacity-10 rounded-md transition-all duration-200"
                    >
                      <span>{link.title}</span>
                      <ChevronDownIcon
                        className={`h-4 w-4 transition-transform duration-200 flex-shrink-0 ${
                          isProductsExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isProductsExpanded && (
                      <div className="ml-4 space-y-3 pb-3">
                        {megaMenuCategories.map((category, index) => (
                          <div key={index} className="space-y-2">
                            <button
                              onClick={() => toggleMobileCategory(index)}
                              className="flex items-center justify-between w-full text-left px-2 py-1 text-sm font-medium text-secondary"
                            >
                              <div className="flex items-center space-x-2">
                                <div className="flex-shrink-0">
                                  {category.icon}
                                </div>
                                <span>{category.title}</span>
                              </div>
                              <ChevronDownIcon
                                className={`h-3 w-3 transition-transform duration-200 flex-shrink-0 ${
                                  expandedMobileCategory === index
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                            </button>

                            {expandedMobileCategory === index && (
                              <div className="ml-6 space-y-1">
                                {category.items.map((item, itemIndex) => (
                                  <Link
                                    key={itemIndex}
                                    to={item.path}
                                    className="block px-2 py-1 text-sm text-gray-300 hover:text-white transition-colors duration-200"
                                    onClick={closeMobileMenu}
                                  >
                                    {item.name}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `block px-3 py-2 text-base font-medium rounded-md transition-all duration-200 ${
                        isActive
                          ? "text-secondary bg-white bg-opacity-10"
                          : "text-white hover:text-secondary hover:bg-white hover:bg-opacity-10"
                      }`
                    }
                    onClick={closeMobileMenu}
                  >
                    {link.title}
                  </NavLink>
                )}
              </div>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
};

export default Navbar;
