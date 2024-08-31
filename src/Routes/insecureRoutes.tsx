import { RouteObject } from "react-router-dom";
import LoginPage from "../Pages/login";

export const insecureRoutes: RouteObject[] = [
  {
    path: "/signup",
    element: <p>Signup</p>,
  },
  {
    path: "login",
    element: <LoginPage/>
  },
];
