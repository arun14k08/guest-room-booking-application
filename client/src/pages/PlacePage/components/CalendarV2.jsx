import { LeftIcon, RightIcon } from "../assets/SVGAssets";
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getMonth,
    getYear,
    isPast,
    parse,
    parseISO,
    startOfMonth,
    startOfToday,
} from "date-fns";
import { DayName, DisabledDate, SelectableDate } from "../lib/UIComponents";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
const CalendarV2 = () => {
    let today = startOfToday();
    const { id } = useParams();
    const [bookings, setBookings] = useState([]);
    const [month, setMonth] = useState(format(today, "MMM-yyyy"));

    useEffect(() => {
        axios.get(`/old-bookings/${id}`).then((response) => {
            setBookings(response.data.bookings);
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

    let days = eachDayOfInterval({
        start: startOfMonth(parseISO(month)),
        end: endOfMonth(parseISO(month)),
    });

    days.forEach((day) => {
        // assign date to the object
        day["date"] = day.getDate();
        // check if it is past date
        if (isPast(day)) {
            day["isDisabled"] = true;
        }
    });
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
                        return (
                            <SelectableDate key={index}>
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
