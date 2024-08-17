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
        path: "/menu",
        element: <Menu />,
      },
      {
        path: "/restorant",
        element: <Restorant />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <CheckOut />,
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
