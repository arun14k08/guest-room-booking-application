import { LeftIcon, RightIcon } from "../assets/SVGAssets";
import {
    eachDayOfInterval,
    endOfMonth,
    startOfMonth,
    startOfToday,
} from "date-fns";
import { DayName, DisabledDate, SelectableDate } from "../lib/UIComponents";
const CalendarV2 = () => {
    let today = startOfToday();
    let days = eachDayOfInterval({
        start: startOfMonth(today),
        end: endOfMonth(today),
    });
    console.log(days);
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
                        return (
                            <SelectableDate key={index}>
                                <p>{day.getDate()}</p>
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
