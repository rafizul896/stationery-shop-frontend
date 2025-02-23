import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../pages/errorPage/ErrorPage";
import Home from "../pages/Root/home/Home";
import Login from "../pages/Root/auth/Login";
import Register from "../pages/Root/auth/Register";
import Products from "../pages/Root/Products/Products";
import About from "@/pages/Root/about/About";
import Contact from "@/pages/Root/contact/Contact";
import ProductDetails from "@/pages/Root/Products/ProductDetails";
import DashBoard from "@/layout/DashBoard";
import Profile from "@/pages/Dashboard/user/Profile";
import Orders from "@/pages/Dashboard/user/Orders";
import ManageUsers from "@/pages/Dashboard/admin/user/ManageUsers";
import ManageProducts from "@/pages/Dashboard/admin/product/ManageProducts";
import CreateProduct from "@/pages/Dashboard/admin/product/CreateProduct";
import ManageOrders from "@/pages/Dashboard/admin/order/ManageOrders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:productId",
        element: <ProductDetails />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
    children: [
      // user
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      // admin
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
      {
        path: "manage-products",
        element: <ManageProducts />,
      },
      {
        path: "create-product",
        element: <CreateProduct />,
      },
      {
        path: "manage-orders",
        element: <ManageOrders />,
      },
    ],
  },
]);
