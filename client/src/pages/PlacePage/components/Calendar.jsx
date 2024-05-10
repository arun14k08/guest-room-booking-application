import { useEffect, useState } from "react";
import { days, months } from "../lib/calendar";
import { LeftIcon, RightIcon } from "../assets/SVGAssets";
import { format, parseISO } from "date-fns";
import {
    BlankDate,
    CheckInDate,
    CheckOutDate,
    CheckOutOnlyDate,
    ClearDates,
    DisabledDate,
    SelectableDate,
    SelectedDate,
} from "../lib/UIComponents";

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
    bookings,
}) => {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [blankDays, setBlankDays] = useState(
        new Date(year, month - 1, 1).getDay() % 7
    );
    const [numberOfDays, setNumberOfDays] = useState(
        new Date(year, month, 0).getDate()
    );
    const [minimumDateToCheckOut, setMinimumDateToCheckOut] = useState();
    const [maximumDateToCheckOut, setMaximumDateToCheckOut] = useState();
    const [currentMonthBookings, setCurrentMonthBookings] = useState([]);
    const [checkOutOnlyDates, setCheckOutOnlyDates] = useState([]);

    useEffect(() => {
        let days = (parseISO(checkOutDate) - parseISO(checkInDate)) / 86400000;
        setTotalDays(days);
        setTotalPrice(days * price);
    }, [checkInDate, checkOutDate]);

    useEffect(() => {
        if (!bookings) return;
        let checkOutOnlyDates = [];
        bookings
            .filter((booking) => {
                return (
                    parseISO(booking.checkInDate) > new Date(year, month - 1, 1)
                );
            })
            .map((booking) => {
                const { checkInDate, checkOutDate } = booking;
                const checkInDateParsed = parseISO(checkInDate);
                const checkOutDateParsed = parseISO(checkOutDate);
                let checkInDayNumber = Number(format(checkInDateParsed, "dd"));
                let checkOutDayNumber = Number(
                    format(checkOutDateParsed, "dd")
                );
                let checkOutOnlyDate = format(
                    new Date(year, month - 1, checkInDayNumber - 1),
                    "yyyy-MM-dd"
                );
                let bookedDates = [];

                checkOutOnlyDates.push(checkOutOnlyDate);
                for (let i = checkInDayNumber; i < checkOutDayNumber; i++) {
                    let bookedDate = new Date(year, month - 1, i);
                    let bookedDateFormatted = format(bookedDate, "yyyy-MM-dd");
                    bookedDates.push(bookedDateFormatted);
                }
                setCurrentMonthBookings((prev) => {
                    return [...prev, ...bookedDates];
                });
                console.log(currentMonthBookings);
            });
        setCheckOutOnlyDates((prev) => {
            return [...prev, ...checkOutOnlyDates];
        });
        console.log(checkOutOnlyDates);
    }, [bookings, month, year]);

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
        const date = new Date(year, month - 1, day);
        const formattedDate = format(date, "yyyy-MM-dd");
        let minimumCheckOut = "";
        let maximumCheckOut = "";
        let SelectedBeforeOldCheckIn = date < parseISO(checkInDate);
        //  selecting a date before the check-in date (or) check-in is not selected
        if (SelectedBeforeOldCheckIn || !checkInDate) {
            minimumCheckOut = format(
                new Date(year, month - 1, day + minimumBookingDays),
                "yyyy-MM-dd"
            );
            maximumCheckOut = format(
                new Date(year, month - 1, day + maximumBookingDays),
                "yyyy-MM-dd"
            );
            setCheckInDate(formattedDate);
            setMinimumDateToCheckOut(minimumCheckOut);
            setMaximumDateToCheckOut(maximumCheckOut);
            setCheckOutDate(minimumCheckOut);
            return;
        }
        // selecting a date after the current checkout date
        if (date > parseISO(checkOutDate)) {
            setCheckOutDate(formattedDate);
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
                    // blank days
                    return <BlankDate key={index} />;
                })}
                {[...Array(numberOfDays)].map((value, index) => {
                    // past dates disabled by default
                    if (new Date(year, month - 1, index + 1) < new Date()) {
                        return <DisabledDate key={index} index={index} />;
                    }

                    // already booked dates are disabled
                    if (
                        currentMonthBookings.includes(
                            format(
                                new Date(year, month - 1, index + 1),
                                "yyyy-MM-dd"
                            )
                        )
                    ) {
                        return <DisabledDate key={index} index={index} />;
                    }

                    // checkout only dates
                    if (
                        checkOutOnlyDates.includes(
                            format(
                                new Date(year, month - 1, index + 1),
                                "yyyy-MM-dd"
                            )
                        )
                    ) {
                        return <CheckOutOnlyDate key={index} index={index} />;
                    }

                    if (
                        maximumDateToCheckOut &&
                        parseISO(maximumDateToCheckOut) <
                            new Date(year, month - 1, index + 1)
                    ) {
                        // dates beyond maximum selectable date are disabled
                        return <DisabledDate key={index} index={index} />;
                    }

                    // highlight the range of dates

                    // check in date
                    if (
                        format(
                            new Date(year, month - 1, index + 1),
                            "yyyy-MM-dd"
                        ) === checkInDate
                    ) {
                        return <CheckInDate key={index} index={index} />;
                    }

                    // check out date
                    if (
                        format(
                            new Date(year, month - 1, index + 1),
                            "yyyy-MM-dd"
                        ) === checkOutDate
                    ) {
                        return <CheckOutDate key={index} index={index} />;
                    }

                    // between dates

                    if (
                        parseISO(checkInDate) <
                            new Date(year, month - 1, index + 2) &&
                        new Date(year, month - 1, index + 1) <
                            parseISO(checkOutDate)
                    ) {
                        return <SelectedDate key={index} index={index} />;
                    }

                    // selectable dates
                    return (
                        <SelectableDate
                            key={index}
                            index={index}
                            handleDateSelect={handleDateSelect}
                            year={year}
                            month={month}
                        />
                    );
                })}
            </div>
            <ClearDates
                setCheckInDate={setCheckInDate}
                setCheckOutDate={setCheckOutDate}
                setMaximumDateToCheckOut={setMaximumDateToCheckOut}
            />
        </div>
    );
};

export default Calendar;
