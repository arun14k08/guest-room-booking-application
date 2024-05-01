import { createBrowserRouter } from "react-router-dom";
import MasterLayout from "./layouts/MasterLayout";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import DashBoard from "./pages/DashBoard/DashBoard";
import AccountPage from "./pages/AccountPage/AccountPage";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <MasterLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/register",
                element: <RegisterPage />,
            },
            {
                path: "/dashboard",
                element: <DashBoard />,
            },
            {
                path: "/account",
                element: <AccountPage />,
            },
        ],
    },
]);
