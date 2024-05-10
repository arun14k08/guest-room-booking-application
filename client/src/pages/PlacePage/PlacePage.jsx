import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { LocationIcon } from "../../assets/SVGAssets";
import PhotoPreview from "./components/PhotoPreview";
import Calendar from "./components/Calendar";
import { UserContext } from "../../context/UserContextProvider";
import { format } from "date-fns";
import BookingForm from "./components/BookingForm";
const PlacePage = () => {
    const { id } = useParams();
    const [place, setPlace] = useState();
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [totalDays, setTotalDays] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [guests, setGuests] = useState();
    // const [isCheckInDateValid, setIsCheckInDateValid] = useState();
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
                    />
                </div>
            </div>
        </div>
    );
};

export default PlacePage;
