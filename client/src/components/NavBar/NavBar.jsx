import { BrandLogo, MenuIcon, ProfileIcon } from "./assets/svgAssets.jsx";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContextProvider";

const NavBar = () => {
    const { user, ready } = useContext(UserContext);

    return (
        <header className="relative flex items-center justify-between gap-4 pb-3 border-b-[1px] border-slate-300 mb-8">
            <Link to={"/"} className="flex justify-between gap-2 p-2">
                <BrandLogo />
                <p className="text-[32px] font-semibold font-dance">
                    Elite Rentals
                </p>
            </Link>
            {/* <div className="flex items-center gap-4">
                <input
                    type="text"
                    placeholder="Search for places..."
                    className="px-4 py-1 rounded-lg ring-2 ring-slate-400"
                />
                <SearchIcon />
            </div> */}
            {ready && (user !== null || undefined) ? (
                <Link
                    to={"/account"}
                    className="p-2 flex gap-2 text-white rounded-2xl cursor-pointer h-fit bg-primary"
                >
                    <MenuIcon />
                    <ProfileIcon />
                    {user?.name}
                </Link>
            ) : null}
            {ready && (user === null || undefined) ? (
                <Link
                    to={"/login"}
                    className="px-4 py-2 text-white rounded-lg cursor-pointer h-fit bg-primary"
                >
                    Login / Register
                </Link>
            ) : null}
        </header>
    );
};

export default NavBar;
