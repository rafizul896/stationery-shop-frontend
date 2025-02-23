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
]);
