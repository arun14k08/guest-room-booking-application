import { Outlet } from "react-router";
import NavBar from "../components/NavBar/NavBar";

const MasterLayout = () => {
    return (
        <>
            <div className="w-full px-8 py-2">
                <NavBar />
                <Outlet />
            </div>
        </>
    );
};

export default MasterLayout;
