import { useState } from "react";
import { days, months } from "../lib/calendar";
import { LeftIcon, RightIcon } from "../assets/SVGAssets";

const Calendar = () => {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [blankDays, setBlankDays] = useState(
        new Date(year, month, 1).getDay()
    );
    const [numberOfDays, setNumberOfDays] = useState(
        new Date(year, month, 0).getDate()
    );

    const handleRightClick = () => {
        if (month === 12) {
            setMonth(1);
            setYear((prev) => prev + 1);
            setBlankDays(new Date(year, month, 1).getDay());
            setNumberOfDays(new Date(year, 1, 0).getDate());
            return;
        }
        setMonth((prev) => prev + 1);
        setBlankDays(new Date(year, month, 1).getDay());
        setNumberOfDays(new Date(year, month + 1, 0).getDate());
    };
    const handleLeftClick = () => {
        if (month === 1) {
            setMonth(12);
            setYear((prev) => prev - 1);
            setBlankDays(new Date(year, month, 1).getDay());
            setNumberOfDays(new Date(year, 12, 0).getDate());
            return;
        }
        setMonth((prev) => prev - 1);
        setBlankDays(new Date(year, month, 1).getDay());
        setNumberOfDays(new Date(year, month - 1, 0).getDate());
    };

    return (
        <div>
            <div className="flex gap-3 justify-between items-center py-2 px-4">
                <button
                    className="rounded-full p-2 hover:bg-slate-200 cursor-pointer"
                    onClick={() => {
                        handleLeftClick();
                    }}
                >
                    <LeftIcon />
                </button>
                <p>
                    {months.filter((value, index) => {
                        return index + 1 === month;
                    })}
                </p>
                <p>{year}</p>
                <button
                    className="rounded-full p-2 hover:bg-slate-200 cursor-pointer"
                    onClick={() => {
                        handleRightClick();
                    }}
                >
                    <RightIcon />
                </button>
            </div>
            <div className="grid grid-cols-7">
                {days.map((day, index) => {
                    return (
                        <p key={index} className="px-2 py-1">
                            {day.name}
                        </p>
                    );
                })}

                {[...Array(blankDays)].map((value, index) => {
                    return (
                        <p key={index} className="px-2 py-1">
                            &nbsp;
                        </p>
                    );
                })}

                {[...Array(numberOfDays)].map((value, index) => {
                    return (
                        <>
                            <p key={index} className="px-2 py-1">
                                {index + 1}
                            </p>
                        </>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
