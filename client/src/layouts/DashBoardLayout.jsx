import { Outlet } from "react-router";
import NavBar from "../components/NavBar/NavBar";
import Tabs from "../pages/DashBoard/components/Tabs";

const DashBoardLayout = () => {
    return (
        <>
            <NavBar />
            <Tabs />
            <Outlet />
        </>
    );
};

export default DashBoardLayout;
