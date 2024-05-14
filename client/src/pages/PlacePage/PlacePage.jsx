import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { LocationIcon } from "../../assets/SVGAssets";
import PhotoPreview from "./components/PhotoPreview";
import Calendar from "./components/Calendar";
import { UserContext } from "../../context/UserContextProvider";
import { format } from "date-fns";
import BookingForm from "./components/BookingForm";
import { ProfileIcon } from "../../components/NavBar/assets/SVGAssets";
import { ProfileIconBig } from "./assets/SVGAssets";
import { RoomIcon } from "../DashBoard/assets/SVGAssets";
import { BedIcon } from "../DashBoard/assets/ImageAssets";
const PlacePage = () => {
    const { id } = useParams();
    const [place, setPlace] = useState();
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [totalDays, setTotalDays] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [guests, setGuests] = useState();
    const [bookings, setBookings] = useState([]);
    // const [isCheckInDateValid, setIsCheckInDateValid] = useState();
    const {
        alert: { setAlertMessage, setAlertType },
    } = useContext(UserContext);
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get("/places/" + id).then((response) => {
            setPlace(response.data.place);
            axios.get(`/old-bookings/${id}`).then((response) => {
                setBookings(response.data.bookings);
            });
        });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post("/book-place", {
                checkInDate,
                checkOutDate,
                totalDays,
                totalPrice,
                guests,
                place: id,
            })
            .then((response) => {
                const { data } = response;
                setAlertMessage(data.message);
                setAlertType(data.type);
            });
    };

    return (
        <div className="mx-24 mb-12">
            <div className="flex flex-col gap-3">
                <h1 className="text-[24px] font-semibold">{place?.name}</h1>
                <p className="underline flex">
                    <LocationIcon /> {place?.location}
                </p>
                {/* image gallery */}
                {place && <PhotoPreview photos={place.photos} />}
            </div>
            <div className="grid grid-cols-3 gap-8 justify-between mt-8">
                <div className="col-span-2">
                    <div className="flex flex-col gap-3 px-4 py-2">
                        <p className="text-slate-400">Rented By</p>
                        <div className="flex gap-3 px-4 py-2 rounded-lg bg-slate-300 max-w-[80%]">
                            <ProfileIconBig />
                            <div>
                                <p className="font-bold text-lg">
                                    {place?.owner?.name}
                                </p>
                                <p>{place?.owner?.email}</p>
                            </div>
                        </div>
                        <p className="max-w-[80%] text-justify">{place?.description}</p>
                    </div>
                    <div className="flex ml-2 mb-2 py-4 px-6 gap-6 bg-slate-300 rounded-full mt-6 font-semibold text-[#525252] w-fit">
                        <p className="text-[16px]">₹ {place?.price}</p>
                        <div className="w-[1px] -my-4 bg-slate-500 rounded-md">
                            &nbsp;
                        </div>
                        <p className="text-[16px] flex gap-2">
                            <RoomIcon />
                            Rooms: {place?.rooms}
                        </p>
                        <div className="w-[1px] -my-4 bg-slate-500 rounded-md">
                            &nbsp;
                        </div>
                        <p className="text-[16px] flex gap-2">
                            <BedIcon />
                            Beds: {place?.beds}
                        </p>
                    </div>
                </div>
                <div>
                    <BookingForm
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                        totalDays={totalDays}
                        totalPrice={totalPrice}
                        guests={guests}
                        setCheckInDate={setCheckInDate}
                        setCheckOutDate={setCheckOutDate}
                        setGuests={setGuests}
                        setTotalDays={setTotalDays}
                        setTotalPrice={setTotalPrice}
                        place={place}
                        handleSubmit={handleSubmit}
                        bookings={bookings}
                    />
                </div>
            </div>
        </div>
    );
};

export default PlacePage;
