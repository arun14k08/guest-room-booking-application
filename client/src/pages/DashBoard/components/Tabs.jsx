import { Link, useLocation } from "react-router-dom";
import { ListingsIcon, MenuIcon } from "../assets/SVGAssets";
import { useEffect, useState } from "react";

const Tabs = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.pathname);
    useEffect(() => {
        setActiveTab(location.pathname);
    }, [location]);
    return (
        <div className="flex justify-center">
            <Link
                to={"/dashboard"}
                className={`flex gap-2 bg-primary ${
                    activeTab === "/dashboard"
                        ? "bg-primary text-white"
                        : "bg-slate-300"
                }  rounded-lg px-4 py-2 rounded-r-none`}
            >
                <ListingsIcon />
                <p>My Listings</p>
            </Link>
            <Link
                to={"reservations"}
                className={`flex gap-2 ${
                    activeTab === "/dashboard/reservations"
                        ? "bg-primary text-white"
                        : "bg-slate-300"
                }  rounded-lg px-4 py-2 rounded-l-none`}
            >
                <MenuIcon />
                <p>Reservations</p>
            </Link>
        </div>
    );
};

export default Tabs;
