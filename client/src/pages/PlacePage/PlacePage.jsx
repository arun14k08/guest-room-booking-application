import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { LocationIcon } from "../../assets/SVGAssets";
import PhotoPreview from "./components/PhotoPreview";
import Calendar from "./components/Calendar";
// import { UserContext } from "../../context/UserContextProvider";
import { format } from "date-fns";
const PlacePage = () => {
    const { id } = useParams();
    const [place, setPlace] = useState();
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [totalDays, setTotalDays] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [guests, setGuests] = useState();
    // const [isCheckInDateValid, setIsCheckInDateValid] = useState();
    // const {
    //     alert: { setAlertMessage, setAlertType },
    // } = useContext(UserContext);
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get("places/" + id).then((response) => {
            setPlace(response.data.place);
        });
    }, []);

    return (
        <div className="mx-24">
            <div className="flex flex-col gap-3">
                <h1 className="text-[24px] font-semibold">{place?.name}</h1>
                <p className="underline flex">
                    <LocationIcon /> {place?.location}
                </p>
                {/* image gallery */}
                {place && <PhotoPreview photos={place.photos} />}
            </div>
            <div className="grid grid-cols-3 gap-8 justify-between mt-8">
                <div className="mb-96 col-span-2">
                    <div>More Details</div>
                </div>
                <div>
                    <form method="post" className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <label htmlFor="check-in">
                                Check In:
                                <input
                                    id="check-in"
                                    type="text"
                                    name="checkIn"
                                    value={checkInDate}
                                    placeholder="YYYY-MM-DD"
                                    disabled
                                    onChange={(event) => {
                                        setCheckInDate(event.target.value);
                                    }}
                                    required
                                />
                            </label>
                            <label htmlFor="checkout">
                                Check Out:
                                <input
                                    id="checkout"
                                    type="text"
                                    name="checkOut"
                                    value={checkOutDate}
                                    placeholder="YYYY-MM-DD"
                                    disabled
                                    onChange={(event) => {
                                        setCheckOutDate(event.target.value);
                                    }}
                                    required
                                />
                            </label>
                        </div>
                        <div>
                            {/*Availability  Calendar */}
                            <Calendar
                                checkInDate={checkInDate}
                                setCheckInDate={setCheckInDate}
                                checkOutDate={checkOutDate}
                                setCheckOutDate={setCheckOutDate}
                                setTotalDays={setTotalDays}
                                setTotalPrice={setTotalPrice}
                                price={place?.price}
                                minimumBookingDays={place?.minimumBooking}
                                maximumBookingDays={place?.maximumBooking}
                            />
                        </div>
                        <div
                            className={`${checkOutDate ? "visible" : "hidden"}`}
                        >
                            <label htmlFor="guests">
                                No of Guests: <b>(Max- {place?.maxGuests})</b>
                                <input
                                    id="guests"
                                    type="number"
                                    name="guests"
                                    placeholder={`Max: ${place?.maxGuests} Members`}
                                    required
                                    min={1}
                                    max={place?.maxGuests}
                                    onChange={(event) => {
                                        setGuests(event.target.value);
                                    }}
                                    value={guests}

                                />
                            </label>
                            <p className="font-bold text-xl ">{`₹ ${totalPrice} for ${totalDays} ${
                                totalDays === 1 ? "night" : "nights"
                            }`}</p>
                        </div>
                        <button className="button" type="submit">
                            Book
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PlacePage;
