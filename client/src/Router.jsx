import { createBrowserRouter } from "react-router-dom";
import MasterLayout from "./layouts/MasterLayout";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import DashBoard from "./pages/DashBoard/DashBoard";
import AccountPage from "./pages/AccountPage/AccountPage";
import PlaceForm from "./pages/DashBoard/components/PlaceForm";
import PlacePage from "./pages/PlacePage/PlacePage";
import DashBoardLayout from "./layouts/DashBoardLayout";
import Reservations from "./pages/DashBoard/components/Reservations";

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
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "register",
                element: <RegisterPage />,
            },
            {
                path: "account",
                element: <AccountPage />,
            },
        ],
    },
    {
        path: "/places",
        element: <MasterLayout />,
        children: [
            {
                path: "new",
                element: <PlaceForm />,
            },
            {
                path: "edit/:id",
                element: <PlaceForm />,
            },
            {
                path:":id",
                element: <PlacePage />
            }
        ],
    },
    {
        path:"/dashboard",
        element:<DashBoardLayout/>,
        children:[
            {
                path:"/dashboard",
                element:<DashBoard/>
            },
            {
                path:"reservations",
                element:<Reservations/>
            }
        ]
    }
]);
