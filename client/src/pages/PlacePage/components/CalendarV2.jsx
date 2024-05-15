import { LeftIcon, RightIcon } from "../assets/SVGAssets";
import {
    add,
    differenceInDays,
    eachDayOfInterval,
    endOfMonth,
    endOfToday,
    endOfWeek,
    endOfYesterday,
    format,
    getMonth,
    getYear,
    isEqual,
    isFuture,
    isPast,
    isWithinInterval,
    parse,
    parseISO,
    startOfMonth,
    startOfToday,
    startOfWeek,
    startOfYesterday,
} from "date-fns";
import {
    BookedDate,
    CheckInDate,
    CheckOutDate,
    DayName,
    DisabledDate,
    SelectableDate,
    SelectedDate,
} from "../lib/UIComponents";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
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

    const handleNextMonth = (event) => {
        event.preventDefault();
        let currentMonth = parse(month, "MMM-yyyy", new Date());
        let nextMonth = add(currentMonth, { months: 1 });
        setMonth(format(nextMonth, "MMM-yyyy"));
    };
    const handlePreviousMonth = (event) => {
        event.preventDefault();
        let currentMonth = parse(month, "MMM-yyyy", new Date());
        let nextMonth = add(currentMonth, { months: -1 });
        setMonth(format(nextMonth, "MMM-yyyy"));
    };

    const days = eachDayOfInterval({
        start: startOfWeek(startOfMonth(parse(month, "MMM-yyyy", new Date()))),
        end: endOfWeek(endOfMonth(parse(month, "MMM-yyyy", new Date()))),
    });
    // console.log(days);

    useEffect(() => {
        setDays();
        const totalDays = differenceInDays(checkOutDate, checkInDate);
        setTotalDays(totalDays);
        setTotalPrice(totalDays * price);
    }, [checkInDate, checkOutDate]);

    const setDays = () => {
        // block already booked dates
        // bookings.forEach((booking, index) => {
        //     console.log(booking);
        //     const checkInDate = booking.checkInDate;
        //     const checkOutDate = booking.checkOutDate;
        //     days.forEach((day) => {
        //         console.log(day);
        //         if (
        //             isWithinInterval(day, {
        //                 start: checkInDate,
        //                 end: checkOutDate,
        //             })
        //         ) {
        //             day["isBooked"] = true;
        //         }
        //     });
        //     console.log(days);
        // });
        days.forEach((day) => {
            // assign date to the object
            day["date"] = day.getDate();
            // check if it is past date
            if (isPast(day)) {
                day["isDisabled"] = true;
            }
            console.log(day, checkInDate);
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
                day["isSelected"] = true;
            }
        });
    };
    setDays();

    const handleDateSelect = (event, day) => {
        event.preventDefault();
        if (!checkInDate) {
            setCheckInDate(format(day, "yyyy-MM-dd"));
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

    console.log(days);

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
                        if (day.isDisabled) {
                            return (
                                <DisabledDate key={index}>
                                    {day.date}
                                </DisabledDate>
                            );
                        }

                        if (day.isBooked) {
                            return (
                                <BookedDate key={index}>{day.date}</BookedDate>
                            );
                        }

                        if (day.isCheckIn) {
                            return (
                                <CheckInDate key={index}>
                                    {day.date}
                                </CheckInDate>
                            );
                        }
                        if (day.isSelected) {
                            return (
                                <SelectedDate key={index}>
                                    {day.date}
                                </SelectedDate>
                            );
                        }

                        if (day.isCheckOut) {
                            return (
                                <CheckOutDate key={index}>
                                    {day.date}
                                </CheckOutDate>
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
        </div>
    );
};

export default CalendarV2;

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
