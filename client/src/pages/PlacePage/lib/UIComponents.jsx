export const BlankDate = () => {
    return <div className="px-2 py-1">&nbsp;</div>;
};

export const DisabledDate = ({ children }) => {
    return (
        <p className="px-5 py-3 flex transition-all  justify-center items-center cursor-pointer rounded-full ring-black">
            <s className="text-slate-300">{children}</s>
        </p>
    );
};

export const SelectableDate = ({ children, handleDateSelect, day }) => {
    return (
        <button
            className="px-5 py-3 flex transition-all  justify-center items-center cursor-pointer rounded-full hover:bg-slate-200  hover:ring-1 hover:ring-black"
            onClick={(event) => {
                handleDateSelect(event, day);
            }}
        >
            {children}
        </button>
    );
};

export const SelectedDate = ({ children }) => {
    return (
        <p className="px-5 py-3 flex transition-all  justify-center items-center cursor-pointer -mx-2 bg-slate-400 text-white">
            {children}
        </p>
    );
};

export const CheckInDate = ({ children }) => {
    return (
        <p className="px-5 py-3 flex transition-all  justify-center items-center cursor-pointer rounded-full bg-gradient-to-r from-black to-slate-400 text-white rounded-r-none">
            {children}
        </p>
    );
};

export const CheckOutDate = ({ children }) => {
    return (
        <p className="px-5 py-3 flex transition-all  justify-center items-center cursor-pointer rounded-full bg-gradient-to-l from-black to-slate-400 text-white rounded-l-none">
            {children}
        </p>
    );
};

export const ClearDates = ({
    setCheckInDate,
    setCheckOutDate,
    setMaximumDateToCheckOut,
}) => {
    return (
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
    );
};

export const CheckOutOnlyDate = ({ children, handleDateSelect, day }) => {
    return (
        <button
            className="px-5 py-3 flex transition-all  justify-center items-center cursor-pointer rounded-full bg-slate-200 ring-1 ring-slate-300 text-slate-400"
            onClick={(event) => {
                handleDateSelect(event, day, { checkOutOnly: true });
            }}
        >
            {children}
        </button>
    );
};

export const BookedDate = ({ children }) => {
    return (
        <p className="px-5 py-3 flex transition-all  justify-center items-center cursor-pointer rounded-full ring-black bg-red-200">
            <s className="text-white">{children}</s>
        </p>
    );
};

export const DayName = ({ children }) => {
    return (
        <p className="px-5 py-3 flex transition-all  justify-center items-center bg-slate-200">
            {children}
        </p>
    );
};
