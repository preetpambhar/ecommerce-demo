import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Cart from "./Cart";
import CreateAccount from "./Account/CreateAccount";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductView from "./Products/ProductView";
import Layout from "./Layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        path: "productview",
        element: <ProductView />,
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
