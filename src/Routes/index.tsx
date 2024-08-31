import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../components/Layout/appLayout";
import { AuthLayout } from "../components/Layout/authLayout";
import { insecureRoutes } from "./insecureRoutes";
import HousePage from "../Pages/properties";
import DashboardPage from "../Pages/dashboard";
import TenentsPage from "../Pages/tenents";
import PaymentsPage from "../Pages/payments";
import UsersPage from "../Pages/users";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [...insecureRoutes, { path: "", element: <AuthLayout />,children:[	{
      path: '/',
      element: <DashboardPage/>,
    },{
      path: '/properties',
      element: <HousePage/>,
    },{
      path: '/tenents',
      element: <TenentsPage/>,
    },{
      path: '/payments',
      element: <PaymentsPage/>,
    },{
      path: '/users',
      element: <UsersPage/>,
    }] }],
  },
]);
