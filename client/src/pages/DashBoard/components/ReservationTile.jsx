import { CalendarIcon, MobileIcon, UserIconSmall } from "../assets/SVGAssets";

const ReservationTile = ({ reservation, place, user }) => {
    console.log(reservation, place, user);
    return (
        <div className="bg-slate-200 px-8 py-6 rounded-lg flex gap-6">
            <div className="w-[300px] h-[200px] flex justify-center items-center rounded-lg overflow-hidden m-1">
                <img
                    src={
                        "http://localhost:3000/uploads/" +
                        reservation?.place?.photos[0]
                    }
                    alt="thumbnail object-contain rounded-lg"
                />
            </div>
            <div className="flex flex-col gap-1">
                <h2 className="font-bold text-xl">{place.name}</h2>
                <p className="flex gap-2">
                    <UserIconSmall /> {user.name}
                </p>
                <p className="flex gap-2">
                    <MobileIcon /> {user.phone}
                </p>
                <p className="flex gap-2">
                    <CalendarIcon />
                    {reservation.checkInDate +
                        " -> " +
                        reservation.checkOutDate}
                </p>
                <p>
                    {`${reservation.days} ${
                        reservation.days === 1 ? "night" : "nights"
                    }`}
                </p>

                <div className="flex gap-2 font-bold px-2 py-1  bg-primary rounded-lg text-white w-fit">
                    {"₹ " + reservation.price}
                </div>
            </div>
        </div>
    );
};

export default ReservationTile;
