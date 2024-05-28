import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import { LocationIcon } from "../../assets/SVGAssets";
import PhotoPreview from "./components/PhotoPreview";
import { UserContext } from "../../context/UserContextProvider";
import BookingForm from "./components/BookingForm";
import { ProfileIconBig } from "./assets/SVGAssets";
import { RoomIcon } from "../DashBoard/assets/SVGAssets";
import { BedIcon } from "../DashBoard/assets/ImageAssets";
import LoadingSpinner from "../../components/Spinner/LoadingSpinner";
const PlacePage = () => {
    const { id } = useParams();
    const [place, setPlace] = useState();
    const [checkInDate, setCheckInDate] = useState("");
    const [isCheckInSelected, setIsCheckInSelected] = useState(false);
    const [name, setName]= useState("");
    const [address, setAddress] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [totalDays, setTotalDays] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [guests, setGuests] = useState();
    const [bookings, setBookings] = useState([]);
    const [redirect, setRedirect] = useState("");
    const [isBookingsReady, setIsBookingsReady] = useState(false);
    const {
        ready,
        setReady,
        user,
        alert: { setAlertMessage, setAlertType },
    } = useContext(UserContext);
    useEffect(() => {
        if (!id) return;
        setReady(false);
        axios
            .get("/places/" + id)
            .then((response) => {
                setPlace(response.data.place);
            })
            .catch((err) => {
                let alertText =
                    "Server is not responding, refresh and try again";
                if (err.response) {
                    alertText = err.response.data.message;
                }
                setAlertMessage(alertText);
                setAlertType("error");
            })
            .finally(() => {
                setReady(true);
            });
        setIsBookingsReady(false);
        axios
            .get(`/old-bookings/${id}`)
            .then((response) => {
                setBookings(response.data.bookings);
            })
            .catch((err) => {
                let alertText =
                    "Server is not responding, refresh and try again";
                if (err.response.data.message) {
                    alertText = err.response.data.message;
                }
                setAlertMessage(alertText);
                setAlertType("error");
            })
            .finally(() => {
                setIsBookingsReady(true);
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
                name,
                address,
                place: id,
            })
            .then((response) => {
                const { data } = response;
                setAlertMessage(data.message);
                setAlertType(data.type);
                setTimeout(() => {
                    if (data.type === "success") {
                        setRedirect("/account");
                    }
                }, 1000);
            });
    };

    if (!ready) {
        return <LoadingSpinner/>;
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

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
            <div className="grid grid-cols-3 gap-4 justify-between mt-8">
                <div className="col-span-2">
                    <div className="flex flex-col gap-3 px-4 py-2">
                        <p className="text-slate-400">Rented By</p>
                        <div className="flex gap-3 px-4 py-2  border-b-2 border-slate-300 max-w-[80%]">
                            <ProfileIconBig />
                            <div>
                                <p className="font-bold text-lg">
                                    {place?.owner?.name}
                                </p>
                                <p>Host</p>
                            </div>
                        </div>
                        <p className="max-w-[80%] text-justify">
                            {place?.description}
                        </p>
                    </div>
                    <div className="flex ml-2 mb-2 py-4 px-6 gap-6 bg-slate-300 rounded-full mt-6 font-semibold text-[#525252] w-fit">
                        <p className="text-[16px]">
                            ₹ {place?.price?.toLocaleString()}
                        </p>
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
                    <div className="font-semibold text-lg">
                        <p>
                            Minimum No. of Days to Book: {place?.minimumBooking}
                        </p>
                        <p>
                            Maximum No. of Days can be Booked:
                            {place?.maximumBooking}
                        </p>
                    </div>
                </div>
                <div className="px-6 py-8 rounded-lg shadow-2xl ring-1 ring-slate-300">
                    <div className="mb-6">
                        <p>
                            <span className="text-3xl font-bold">
                                ₹ {place?.price?.toLocaleString()}
                            </span>
                            night
                        </p>
                    </div>
                    {isBookingsReady ? (
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
                            isCheckInSelected={isCheckInSelected}
                            name={name}
                            address={address}
                            setName={setName}
                            setAddress={setAddress}
                            user={user}
                        />
                    ) : (
                        <LoadingSpinner/>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PlacePage;
