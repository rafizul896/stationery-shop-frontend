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
import Orders from "@/pages/Dashboard/user/Orders";
import ManageUsers from "@/pages/Dashboard/admin/user/ManageUsers";
import ManageProducts from "@/pages/Dashboard/admin/product/ManageProducts";
import ManageOrders from "@/pages/Dashboard/admin/order/ManageOrders";
import AddProduct from "@/pages/Dashboard/admin/product/AddProduct";
import Checkout from "@/pages/Root/cart/Checkout";
import PrivateRoute from "./PrivateRoute";
import ManageProfile from "@/pages/Dashboard/user/ManageProfile";

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
      {
        path: "/Checkout",
        element: (
          <PrivateRoute role="user">
            <Checkout />
          </PrivateRoute>
        ),
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
        element: (
          <PrivateRoute role="user">
            <ManageProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <PrivateRoute role="user">
            <Orders />
          </PrivateRoute>
        ),
      },
      // admin
      {
        path: "manage-users",
        element: (
          <PrivateRoute role="admin">
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-products",
        element: (
          <PrivateRoute role="admin">
            <ManageProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <PrivateRoute role="admin">
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-orders",
        element: (
          <PrivateRoute role="admin">
            <ManageOrders />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
