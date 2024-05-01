import { BrandLogo, SearchIcon } from "./assets/svgAssets";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContextProvider";

const NavBar = () => {
    const { user, ready } = useContext(UserContext);

    return (
        <header className="relative flex items-center justify-between gap-4 ">
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
            {ready && user && (
                <Link
                    to={"/account"}
                    className="p-2 flex gap-2 text-white rounded-2xl cursor-pointer h-fit bg-primary"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                    </svg> {user.name}
                </Link>
            )}
            {ready && !user && (
                <Link
                    to={"/login"}
                    className="px-4 py-2 text-white rounded-lg cursor-pointer h-fit bg-primary"
                >
                    Login / Register
                </Link>
            )}
        </header>
    );
};

export default NavBar;
