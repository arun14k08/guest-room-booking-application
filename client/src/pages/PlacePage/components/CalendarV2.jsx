import { LeftIcon, RightIcon } from "../assets/SVGAssets";
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    endOfToday,
    endOfWeek,
    endOfYesterday,
    format,
    getMonth,
    getYear,
    isEqual,
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
    CheckOutOnlyDate,
    DayName,
    DisabledDate,
    SelectableDate,
} from "../lib/UIComponents";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
const CalendarV2 = () => {
    let today = startOfToday();
    const { id } = useParams();
    const [bookings, setBookings] = useState([]);
    const [month, setMonth] = useState(format(today, "MMM-yyyy"));
    const [checkInDate, setCheckInDate] = useState();
    const [checkOutDate, setCheckOutDate] = useState();
    useEffect(() => {
        axios.get(`/old-bookings/${id}`).then((response) => {
            setBookings(response.data.bookings);
            handleBookings({ bookings: response.data.bookings });
        });
    }, []);

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
    const setDays = () => {
        // block already booked dates
        bookings.forEach((booking, index) => {
            console.log(booking);
            const checkInDate = booking.checkInDate;
            const checkOutDate = booking.checkOutDate;
            days.forEach((day) => {
                console.log(day);
                if (isEqual(day, parseISO(checkInDate))) {
                    day["isCheckOutOnly"] = true;
                }
                if (
                    isWithinInterval(day, {
                        start: add(checkInDate, { days: 0 }),
                        end: add(checkOutDate, { days: -1 }),
                    })
                ) {
                    day["isBooked"] = true;
                }
            });
            console.log(days);
        });
        days.forEach((day) => {
            // assign date to the object
            day["date"] = day.getDate();
            // check if it is past date
            if (isPast(day)) {
                day["isDisabled"] = true;
            }
        });
    };
    setDays();

    const handleBookings = ({ bookings }) => {
        console.log(bookings);
    };

    const handleDateSelect = (event, day) => {
        event.preventDefault();
    };

    // console.log(days);

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
                        if (day.isCheckOutOnly) {
                            return (
                                <CheckOutOnlyDate key={index}>
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
        </div>
    );
};

export default CalendarV2;

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
