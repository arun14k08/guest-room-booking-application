import React from "react";
import { LeftIcon, RightIcon } from "../assets/SVGAssets";

const CalendarV2 = () => {
    return (
        <div>
            <div className="flex gap-3 justify-between items-center py-2 px-4 transition-all">
                <button className="rounded-full p-2 hover:bg-slate-200 cursor-pointer">
                    <LeftIcon />
                </button>
                <div className="flex gap-2 font-bold text-xl">
                    <p>month</p>
                    <p>year</p>
                </div>
                <button className="rounded-full p-2 hover:bg-slate-200 cursor-pointer">
                    <RightIcon />
                </button>
            </div>
        </div>
    );
};

export default CalendarV2;
