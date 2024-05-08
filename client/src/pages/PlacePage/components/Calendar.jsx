import { useEffect, useState } from "react";
import { days, months } from "../lib/calendar";
import { LeftIcon, RightIcon } from "../assets/SVGAssets";

const Calendar = () => {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [date, setDate] = useState(new Date().getDate());
    const [blankDays, setBlankDays] = useState(
        new Date(year, month - 1, 1).getDay() % 7
    );
    const [numberOfDays, setNumberOfDays] = useState(
        new Date(year, month, 0).getDate()
    );

    const handleRightClick = () => {
        const nextMonth = month === 12 ? 1 : month + 1;
        const nextYear = month === 12 ? year + 1 : year;
        setDays(nextMonth, nextYear);
        if (month === 12) {
            setMonth(1);
            setYear((prev) => prev + 1);
        } else {
            setMonth((prev) => prev + 1);
        }
    };
    const handleLeftClick = () => {
        const prevMonth = month === 1 ? 12 : month - 1;
        const prevYear = month === 1 ? year - 1 : year;
        setDays(prevMonth, prevYear);
        if (month === 1) {
            setMonth(12);
            setYear((prev) => prev - 1);
        } else {
            setMonth((prev) => prev - 1);
        }
    };

    const setDays = (month, year) => {
        setBlankDays(new Date(year, month - 1, 1).getDay());
        setNumberOfDays(new Date(year, month, 0).getDate());
    };

    return (
        <div>
            <div className="flex gap-3 justify-between items-center py-2 px-4 transition-all">
                <button
                    className="rounded-full p-2 hover:bg-slate-200 cursor-pointer"
                    onClick={() => {
                        handleLeftClick();
                    }}
                >
                    <LeftIcon />
                </button>
                <div className="flex gap-2 font-bold text-xl">
                    <p>
                        {months.filter((value, index) => {
                            return index + 1 === month;
                        })}
                    </p>
                    <p>{year}</p>
                </div>
                <button
                    className="rounded-full p-2 hover:bg-slate-200 cursor-pointer"
                    onClick={() => {
                        handleRightClick();
                    }}
                >
                    <RightIcon />
                </button>
            </div>
            <div className="grid grid-cols-7 gap-2">
                {days.map((day, index) => {
                    return (
                        <p key={index} className="px-2 py-1 text-slate-500">
                            {day.name}
                        </p>
                    );
                })}
                {[...Array(blankDays)].map((value, index) => {
                    return (
                        <div key={index} className="px-2 py-1">
                            &nbsp;
                        </div>
                    );
                })}
                {[...Array(numberOfDays)].map((value, index) => {
                    if (new Date(year, month - 1, index + 1) < new Date()) {
                        return (
                            <p
                                key={index}
                                className="py-3 flex transition-all  justify-center items-center cursor-pointer rounded-full ring-black"
                            >
                                <s className="text-slate-300">{index + 1}</s>
                            </p>
                        );
                    }
                    return (
                        <>
                            <p
                                key={index}
                                className="py-3 flex transition-all  justify-center items-center cursor-pointer rounded-full hover:bg-slate-200 ring-black"
                            >
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
