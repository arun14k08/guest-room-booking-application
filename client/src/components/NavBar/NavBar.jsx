import { BrandLogo, SearchIcon } from "./assets/svgAssets";
import React, from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
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
              <Link to={"/login"}
                className="px-4 py-2 text-white rounded-lg cursor-pointer h-fit bg-primary"
            >
                Login / Register
            </Link>
        </header>
    );
};

export default NavBar;
