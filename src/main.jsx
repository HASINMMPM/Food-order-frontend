import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./Components/Error.jsx";
import Home from "./Components/home/Home.jsx";
import Menu from "./Components/menu/Menu.jsx";
import Restorant from "./Components/restorant/Restorant.jsx";
import ContextListProvider from "./Components/commen/ContextListProvider.jsx";
import Cart from "./Components/cart/Cart.jsx";
import CheckOut from "./Components/cart/CheckOut.jsx";
import SingleFood from "./Components/other/SingleFood.jsx";
import SingleRes from "./Components/other/SingleRes.jsx";
import Order from "./Components/other/Order.jsx";
import AdminSignup from "./Components/commen/AdminSingup.jsx";
import LoginPage from "./Components/commen/LoginPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/account",
        element: <LoginPage />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/restaurant",
        element: <Restorant />,
      },
      {
        path: "/cart/:id",
        element: <Cart />,
      },
      {
        path: "/checkout/:id",
        element: <CheckOut />,
      },
      {
        path:`/dishes/:id`,
        element: <SingleFood />,
      },
      {
        path:`/restaurant/:id`,
        element: <SingleRes />,
      },
      {
        path:`/orders`,
        element: <Order />,
      },
      {
        path:`/admin/signup`,
        element: <AdminSignup />,
      },
      {
        path:`/order`,
        element: <Order />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextListProvider>
      <RouterProvider router={router} />
    </ContextListProvider>
  </React.StrictMode>
);
