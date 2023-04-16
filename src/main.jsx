import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import Home from "./components/Home/Home";
import Shop from "./components/Shop/Shop";
import Order from "./components/Order/Order";
import Inventory from "./components/Inventory/Inventory";
import Login from "./components/Login/Login";
import CartProduct from "./components/CartProduct/CartProduct";
import cartLoader from "./components/productCartLoader/CartLoader";
import ReviewOrder from "./components/ReviewOrder/ReviewOrder";
import CheckOut from "./components/CheckOut/CheckOut";
import "./App.css";
import Register from "./components/Register/Register";
import AuthProviders from "./components/Providers/AuthProviders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children: [
      {
        path: "/",
        element: <Shop></Shop>,
      },
      {
        path: "order",
        element: <Order></Order>,
        loader: cartLoader,
        // loader:()=> fetch("products.json"),
      },
      {
        path: "order",
        element: <ReviewOrder></ReviewOrder>,
      },
      {
        path: "checkout",
        element: <CheckOut></CheckOut>,
      },
      {
        path: "inventory",
        element: <Inventory></Inventory>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProviders>
    <RouterProvider router={router} />
  </AuthProviders>
);
