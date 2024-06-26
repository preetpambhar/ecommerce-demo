import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Cart from "./Cart";
import CreateAccount from "./Account/CreateAccount";
import Account from "./Account/account";
import Login from "./Account/login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductView from "./Products/ProductView";
import Layout from "./Layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./Account/logout";

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
        path: "createaccount",
        element: <CreateAccount />,
      },
      {
        path: "productview/:prodId",
        element: <ProductView />,
      },
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />

    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </React.StrictMode>
);
