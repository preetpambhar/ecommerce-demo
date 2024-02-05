import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Cart from "./Cart/Cart";
import Account from "./Account/Account";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductView from "./Products/ProductView";
import Layout from "./Layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <App /> },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "productview",
        element: <ProductView />,
      }
    ],
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
