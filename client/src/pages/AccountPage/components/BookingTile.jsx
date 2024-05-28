import {
    CalendarIcon,
    MobileIcon,
    UserIconSmall,
} from "../../DashBoard/assets/SVGAssets";

const BookingTile = ({ booking, place, owner }) => {
    return (
        <div className="bg-slate-200 px-8 py-6 rounded-lg flex gap-6">
            <div className="w-[300px] h-[200px] flex justify-center items-center rounded-lg overflow-hidden m-1">
                <img
                    src={
                        import.meta.env.BACKEND_URL +
                        "/uploads/" +
                        booking?.place?.photos[0]
                    }
                    alt="thumbnail object-contain rounded-lg"
                />
            </div>
            <div className="flex flex-col gap-1">
                <h2 className="font-bold text-xl">{place.name}</h2>
                <p className="flex gap-2">
                    <UserIconSmall /> {owner.name}
                </p>
                <p className="flex gap-2">
                    <MobileIcon /> {owner.phone}
                </p>
                <p className="flex gap-2">
                    <CalendarIcon />

                    {booking.checkInDate + " -> " + booking.checkOutDate}
                </p>
                <p>
                    {`${booking.days} ${
                        booking.days === 1 ? "night" : "nights"
                    }`}
                </p>

                <div className="flex gap-2 font-bold px-2 py-1  bg-primary rounded-lg text-white w-fit">
                    {"₹ " + booking?.price?.toLocaleString()}
                </div>
            </div>
        </div>
    );
};

export default BookingTile;
