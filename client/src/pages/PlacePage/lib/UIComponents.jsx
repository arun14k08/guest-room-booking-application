export const BlankDate = () => {
    return <div className="px-2 py-1">&nbsp;</div>;
};

export const DisabledDate = ({ index }) => {
    return (
        <p className="py-3 flex transition-all  justify-center items-center cursor-pointer rounded-full ring-black">
            <s className="text-slate-300">{index + 1}</s>
        </p>
    );
};

export const SelectableDate = ({ index, month, year, handleDateSelect }) => {
    return (
        <button
            className="py-3 flex transition-all  justify-center items-center cursor-pointer rounded-full hover:bg-slate-200  hover:ring-1 hover:ring-black"
            onClick={(event) => {
                event.preventDefault();
                handleDateSelect({
                    day: index + 1,
                    month,
                    year,
                    options: { isCheckOutOnly: false },
                });
            }}
        >
            {index + 1}
        </button>
    );
};

export const SelectedDate = ({ index }) => {
    return (
        <p className="py-3 flex transition-all  justify-center items-center cursor-pointer -mx-2 bg-slate-400 text-white">
            {index + 1}
        </p>
    );
};

export const CheckInDate = ({ index }) => {
    return (
        <p className="py-3 flex transition-all  justify-center items-center cursor-pointer rounded-full bg-gradient-to-r from-black to-slate-400 text-white rounded-r-none">
            {index + 1}
        </p>
    );
};

export const CheckOutDate = ({ index }) => {
    return (
        <p
            key={index}
            className="py-3 flex transition-all  justify-center items-center cursor-pointer rounded-full bg-gradient-to-l from-black to-slate-400 text-white rounded-l-none"
        >
            {index + 1}
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

export const CheckOutOnlyDate = ({ index, handleDateSelect, month, year }) => {
    return (
        <button
            onClick={(event) => {
                event.preventDefault();
                handleDateSelect({
                    day: index + 1,
                    month,
                    year,
                    options: { isCheckOutOnly: true },
                });
            }}
            className="py-3 flex transition-all  justify-center items-center cursor-pointer rounded-full bg-slate-200 ring-1 ring-slate-300 text-slate-400"
        >
            {index + 1}
        </button>
    );
};

export const BookedDate = ({ index }) => {
    return (
        <p className="py-3 flex transition-all  justify-center items-center cursor-pointer rounded-full ring-black bg-primary">
            <s className="text-white">{index + 1}</s>
        </p>
    );
};
