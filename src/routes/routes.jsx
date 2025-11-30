import { createBrowserRouter } from "react-router";
import Rootslayout from "../layout/Rootslayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import Sendparcel from "../pages/Sendparcel/Sendparcel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Rootslayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "coverage",
        Component: Coverage,
        loader: () => fetch("/ServiceCenter.json"),
      },
      {
        path: "sendparcel",
        Component: Sendparcel,
        loader: () => fetch("/ServiceCenter.json"),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        index: true,
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
]);
