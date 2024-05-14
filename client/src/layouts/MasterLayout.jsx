import { Outlet } from "react-router";
import NavBar from "../components/NavBar/NavBar";

const MasterLayout = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
};

export default MasterLayout;
