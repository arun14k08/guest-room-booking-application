import { LeftIcon, RightIcon } from "../assets/SVGAssets";
import {
    add,
    areIntervalsOverlapping,
    differenceInDays,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isEqual,
    isPast,
    isWithinInterval,
    parse,
    parseISO,
    startOfMonth,
    startOfToday,
    startOfWeek,
} from "date-fns";
import {
    CheckInDate,
    CheckOutDate,
    CheckOutOnlyDate,
    ClearDates,
    DayName,
    DisabledDate,
    SelectableDate,
    SelectedDate,
} from "../lib/UIComponents";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContextProvider";
const CalendarV2 = ({
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    setTotalDays,
    setTotalPrice,
    price,
    minimumBookingDays,
    maximumBookingDays,
    bookings,
}) => {
    let today = startOfToday();
    const [month, setMonth] = useState(format(today, "MMM-yyyy"));
    const [maximumDateToBook, setMaximumDateToBook] = useState();
    const [checkOutOnlyDates, setCheckOutOnlyDates] = useState([]);
    const {
        alert: { setAlertMessage, setAlertType },
    } = useContext(UserContext);

    // go to next month
    const handleNextMonth = (event) => {
        event.preventDefault();
        let currentMonth = parse(month, "MMM-yyyy", new Date());
        let nextMonth = add(currentMonth, { months: 1 });
        setMonth(format(nextMonth, "MMM-yyyy"));
    };
    // go to previous month
    const handlePreviousMonth = (event) => {
        event.preventDefault();
        let currentMonth = parse(month, "MMM-yyyy", new Date());
        let nextMonth = add(currentMonth, { months: -1 });
        setMonth(format(nextMonth, "MMM-yyyy"));
    };
    // generate dates of the current month
    const days = eachDayOfInterval({
        start: startOfWeek(startOfMonth(parse(month, "MMM-yyyy", new Date()))),
        end: endOfWeek(endOfMonth(parse(month, "MMM-yyyy", new Date()))),
    });

    useEffect(() => {
        const totalDays = differenceInDays(checkOutDate, checkInDate);
        const maxDateToBeBooked = add(checkInDate, {
            days: maximumBookingDays,
        });
        setTotalDays(totalDays);
        setTotalPrice(totalDays * price);
        setMaximumDateToBook(maxDateToBeBooked);
        // if checkout date beyond max date is selected
        if (parseISO(checkOutDate) > maxDateToBeBooked) {
            setCheckOutDate(format(maxDateToBeBooked, "yyyy-MM-dd"));
        }
        // change max date when selecting check out only date
        if (checkOutOnlyDates?.includes(checkOutDate)) {
            setMaximumDateToBook(new Date(checkOutDate));
        }
        setDays();
    }, [checkInDate, checkOutDate]);

    const setDays = () => {
        // ** setDays function is to add usable {keys:value} pairs in the generated dates array **
        // Eg: isDisabled, isBooked, isCheckOutOnly, etc ...

        // block already booked dates
        bookings.forEach((booking, index) => {
            days.forEach((day) => {
                // handle check out only dates
                if (isEqual(new Date(day), parseISO(booking.checkInDate))) {
                    day["isCheckOutOnly"] = true;
                    if (
                        !checkOutOnlyDates.includes(format(day, "yyyy-MM-dd"))
                    ) {
                        setCheckOutOnlyDates([
                            ...checkOutOnlyDates,
                            format(day, "yyyy-MM-dd"),
                        ]);
                    }
                }

                // handle overlapping of ranges and dates
                if (
                    isWithinInterval(day, {
                        start: add(booking.checkInDate, { days: 0 }),
                        end: booking.checkOutDate,
                    })
                ) {
                    day["isBooked"] = true;
                }
            });
            if (
                areIntervalsOverlapping(
                    { start: checkInDate, end: checkOutDate },
                    { start: booking.checkInDate, end: booking.checkOutDate }
                )
            ) {
                setCheckOutDate(
                    format(add(booking.checkInDate, { days: 0 }), "yyyy-MM-dd")
                );
            }
            if (
                isWithinInterval(new Date(checkInDate), {
                    start: new Date(booking.checkInDate),
                    end: new Date(booking.checkOutDate),
                })
            ) {
                setCheckInDate(
                    format(add(booking.checkOutDate, { days: 1 }), "yyyy-MM-dd")
                );
            }
            if (
                isWithinInterval(new Date(checkOutDate), {
                    start: new Date(booking.checkInDate),
                    end: new Date(booking.checkOutDate),
                })
            ) {
                setCheckOutDate(format(booking.checkInDate, "yyyy-MM-dd"));
            }
        });
        // iterate over all the days and add required {key:value} pairs
        days.forEach((day, index) => {
            // assign date to the object
            day["date"] = day.getDate();
            // check if it is past date
            if (isPast(day)) {
                day["isDisabled"] = true;
            }
            // check in date
            if (isEqual(new Date(day), parseISO(checkInDate))) {
                day["isCheckIn"] = true;
            }
            // checkout date
            if (isEqual(new Date(day), parseISO(checkOutDate))) {
                day["isCheckOut"] = true;
            }
            // between check-in and check-out date
            if (
                isWithinInterval(day, {
                    start: new Date(checkInDate),
                    end: add(new Date(checkOutDate), { days: -1 }),
                })
            ) {
                // if between day is beyond a check-out only date
                if (checkOutOnlyDates?.includes(format(day, "yyyy-MM-dd"))) {
                    setCheckOutDate(format(day, "yyyy-MM-dd"));
                }
                day["isSelected"] = true;
            }
            // dates beyond maximum booking date will be disabled
            if (day > maximumDateToBook) {
                day["isDisabled"] = true;
            }
            // a special edge case for checkout-only date
            if (day?.isCheckOutOnly && index < days.length - 1) {
                const yesterday = days[index - 1];
                const tomorrow = days[index + 1];
                if (
                    (yesterday?.isDisabled ||
                        yesterday?.isBooked ||
                        yesterday?.isCheckOutOnly) &&
                    (tomorrow?.isDisabled ||
                        tomorrow?.isBooked ||
                        tomorrow?.isCheckOutOnly)
                ) {
                    day["isDisabled"] = true;
                }
            }
        });
    };
    setDays();

    const handleDateSelect = (event, day, options) => {
        event.preventDefault();
        if (options?.checkOutOnly && !checkInDate) {
            setAlertMessage("Check Out Only");
            setAlertType("warning");
            return;
        }
        if (options?.checkOutOnly && new Date(checkInDate) > new Date(day)) {
            setAlertMessage("Check Out Only");
            setAlertType("warning");
            return;
        }
        if (!checkInDate) {
            setCheckInDate(format(day, "yyyy-MM-dd"));
            const checkOut = add(day, {
                days:
                    Number(minimumBookingDays) -
                    (minimumBookingDays === 1 ? 0 : -1),
            });
            setCheckOutDate(format(checkOut, "yyyy-MM-dd"));
            return;
        }
        if (!checkOutDate) {
            setCheckOutDate(format(day, "yyyy-MM-dd"));
            return;
        }
        if (day < parseISO(checkInDate)) {
            setCheckInDate(format(day, "yyyy-MM-dd"));
        }
        if (day > parseISO(checkOutDate)) {
            setCheckOutDate(format(day, "yyyy-MM-dd"));
        }
    };

    return (
        <div>
            <div className="flex gap-3 justify-between items-center py-2 px-4 transition-all">
                <button
                    className="rounded-full p-2 hover:bg-slate-200 cursor-pointer"
                    onClick={(event) => {
                        handlePreviousMonth(event);
                    }}
                >
                    <LeftIcon />
                </button>
                <div className="flex gap-2 font-bold text-xl">
                    <p>{format(parse(month, "MMM-yyyy", new Date()), "MMM")}</p>
                    <p>
                        {format(parse(month, "MMM-yyyy", new Date()), "yyyy")}
                    </p>
                </div>
                <button
                    className="rounded-full p-2 hover:bg-slate-200 cursor-pointer"
                    onClick={(event) => {
                        handleNextMonth(event);
                    }}
                >
                    <RightIcon />
                </button>
            </div>
            <div className="grid gap-2">
                <div className="grid grid-cols-7 rounded-lg rounded-b-none overflow-hidden mt-2">
                    {dayNames.map((dayName, index) => {
                        return (
                            <DayName key={index}>
                                <p>{dayName}</p>
                            </DayName>
                        );
                    })}
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {days.map((day, index) => {
                        if (day?.isDisabled) {
                            return (
                                <DisabledDate key={index}>
                                    {day.date}
                                </DisabledDate>
                            );
                        }

                        if (day > maximumDateToBook) {
                            return (
                                <DisabledDate key={index}>
                                    {day.date}
                                </DisabledDate>
                            );
                        }

                        if (day?.isBooked) {
                            return (
                                <DisabledDate key={index}>
                                    {day.date}
                                </DisabledDate>
                            );
                        }

                        if (day?.isCheckIn) {
                            return (
                                <CheckInDate key={index}>
                                    {day.date}
                                </CheckInDate>
                            );
                        }
                        if (day?.isSelected) {
                            return (
                                <SelectedDate key={index}>
                                    {day.date}
                                </SelectedDate>
                            );
                        }

                        if (day?.isCheckOut) {
                            return (
                                <CheckOutDate key={index}>
                                    {day.date}
                                </CheckOutDate>
                            );
                        }

                        if (day?.isCheckOutOnly) {
                            return (
                                <CheckOutOnlyDate
                                    key={index}
                                    handleDateSelect={handleDateSelect}
                                    day={day}
                                >
                                    {day.date}
                                </CheckOutOnlyDate>
                            );
                        }

                        return (
                            <SelectableDate
                                key={index}
                                handleDateSelect={handleDateSelect}
                                day={day}
                            >
                                <p>{day.date}</p>
                            </SelectableDate>
                        );
                    })}
                </div>
            </div>
            <ClearDates
                setCheckInDate={setCheckInDate}
                setCheckOutDate={setCheckOutDate}
                setMaximumDateToBook={setMaximumDateToBook}
            />
        </div>
    );
};

export default CalendarV2;

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
