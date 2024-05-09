import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { LocationIcon } from "../../assets/SVGAssets";
import PhotoPreview from "./components/PhotoPreview";
import Calendar from "./components/Calendar";
import { UserContext } from "../../context/UserContextProvider";
import { format } from "date-fns";
const PlacePage = () => {
    const { id } = useParams();
    const [place, setPlace] = useState();
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [isCheckInDateValid, setIsCheckInDateValid] = useState();
    const {
        alert: { setAlertMessage, setAlertType },
    } = useContext(UserContext);
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
                    <form method="post">
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
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PlacePage;
