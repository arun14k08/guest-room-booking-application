import { useState } from "react";
import { days, months } from "../lib/calendar";
import { LeftIcon, RightIcon } from "../assets/SVGAssets";
import { format } from "date-fns";

const Calendar = ({
    checkInDate,
    checkOutDate,
    setCheckInDate,
    setCheckOutDate,
    setTotalDays,
    setTotalPrice,
    price,
    minimumBookingDays,
    maximumBookingDays,
}) => {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [blankDays, setBlankDays] = useState(
        new Date(year, month - 1, 1).getDay() % 7
    );
    const [numberOfDays, setNumberOfDays] = useState(
        new Date(year, month, 0).getDate()
    );
    const [maximumDateToCheckOut, setMaximumDateToCheckOut] = useState();

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

    const handleDateSelect = ({ day, month, year }) => {
        const formattedDate = format(
            new Date(year, month - 1, day),
            "yyyy-MM-dd"
        );

        if (!checkInDate) {
            setCheckInDate(formattedDate);
            // set maximum date that can be selected
            if (!maximumDateToCheckOut) {
                let maxDate = new Date(
                    year,
                    month - 1,
                    day + maximumBookingDays
                );
                setMaximumDateToCheckOut(format(maxDate, "yyyy-MM-dd"));
            }

            // select minimum date to check out by default
            const minimumDateToCheckOut = format(
                new Date(year, month - 1, day + minimumBookingDays),
                "yyyy-MM-dd"
            );
            setCheckOutDate(minimumDateToCheckOut);
            const days =
                (new Date(minimumDateToCheckOut) - new Date(formattedDate)) /
                86400000;
            setTotalDays(days);
            setTotalPrice(days * price);
            return;
        }

        if (new Date(formattedDate) < new Date(checkInDate)) {
            let maxDate = new Date(
                year,
                month - 1,
                new Date(formattedDate).getDate() + maximumBookingDays
            );
            setMaximumDateToCheckOut(format(maxDate, "yyyy-MM-dd"));
            setCheckInDate(formattedDate);
            if (maxDate < new Date(checkOutDate)) {
                setCheckOutDate(format(maxDate, "yyyy-MM-dd"));
            }
            let minimumDateToCheckOut = "";
            if (!checkOutDate) {
                minimumDateToCheckOut = format(
                    new Date(year, month - 1, day + minimumBookingDays),
                    "yyyy-MM-dd"
                );
                setCheckOutDate(minimumDateToCheckOut);
            }
            const days =
                (new Date(checkOutDate || minimumDateToCheckOut || maxDate) -
                    new Date(formattedDate)) /
                86400000;
            setTotalDays(days);
            setTotalPrice(days * price);
            return;
        }

        if (formattedDate > checkOutDate) {
            setCheckOutDate(formattedDate);
            const days =
                (new Date(formattedDate) - new Date(checkInDate)) / 86400000;
            setTotalDays(days);
            setTotalPrice(days * price);
            return;
        }
    };

    return (
        <div>
            <div className="flex gap-3 justify-between items-center py-2 px-4 transition-all">
                <button
                    className="rounded-full p-2 hover:bg-slate-200 cursor-pointer"
                    onClick={(event) => {
                        event.preventDefault();
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
                    onClick={(event) => {
                        event.preventDefault();
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
                    // past dates disabled by default
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

                    // highlight the range of dates

                    // check in date without checkOutDate selected
                    if (
                        format(
                            new Date(year, month - 1, index + 1),
                            "yyyy-MM-dd"
                        ) === checkInDate &&
                        checkOutDate
                    ) {
                        return (
                            <p
                                key={index}
                                className="py-3 flex transition-all  justify-center items-center cursor-pointer rounded-full rounded-r-none bg-black text-white bg-gradient-to-r from-black to-slate-400"
                            >
                                {index + 1}
                            </p>
                        );
                    }

                    // check in date with checkOutDate selected

                    // check in date
                    if (
                        format(
                            new Date(year, month - 1, index + 1),
                            "yyyy-MM-dd"
                        ) === checkInDate
                    ) {
                        return (
                            <p
                                key={index}
                                className="py-3 flex transition-all  justify-center items-center cursor-pointer rounded-full bg-black text-white"
                            >
                                {index + 1}
                            </p>
                        );
                    }

                    // check out date
                    if (
                        format(
                            new Date(year, month - 1, index + 1),
                            "yyyy-MM-dd"
                        ) === checkOutDate
                    ) {
                        return (
                            <p
                                key={index}
                                className="py-3 flex transition-all  justify-center items-center cursor-pointer rounded-full bg-gradient-to-l from-black to-slate-400 text-white rounded-l-none"
                            >
                                {index + 1}
                            </p>
                        );
                    }

                    // between dates

                    if (
                        maximumDateToCheckOut &&
                        new Date(maximumDateToCheckOut) <
                            new Date(year, month - 1, index + 1)
                    ) {
                        return (
                            <p
                                key={index}
                                className="py-3 flex transition-all  justify-center items-center cursor-pointer rounded-full ring-black"
                            >
                                <s className="text-slate-300">{index + 1}</s>
                            </p>
                        );
                    }
                    if (
                        new Date(checkInDate) <
                            new Date(year, month - 1, index + 2) &&
                        new Date(year, month - 1, index + 1) <
                            new Date(checkOutDate)
                    ) {
                        return (
                            <p
                                key={index}
                                className="py-3 flex transition-all  justify-center items-center cursor-pointer -mx-2 bg-slate-400 text-white"
                            >
                                {index + 1}
                            </p>
                        );
                    }

                    // selectable dates
                    return (
                        <>
                            <button
                                key={index}
                                className="py-3 flex transition-all  justify-center items-center cursor-pointer rounded-full hover:bg-slate-200  hover:ring-1 hover:ring-black"
                                onClick={(event) => {
                                    event.preventDefault();
                                    handleDateSelect({
                                        day: index + 1,
                                        month,
                                        year,
                                    });
                                }}
                            >
                                {index + 1}
                            </button>
                        </>
                    );
                })}
            </div>
            <button
                onClick={(event) => {
                    setCheckInDate("");
                    setCheckOutDate("");
                    setMaximumDateToCheckOut("");
                    event.preventDefault();
                }}
                className="underline font-semibold mt-2 hover:bg-slate-200 rounded-lg px-2 py-1"
            >
                Clear Dates
            </button>
        </div>
    );
};

export default Calendar;
