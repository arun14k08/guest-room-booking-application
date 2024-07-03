import axios from "axios";
import { useContext, useEffect, useState } from "react";
import BookingTile from "./BookingTile";
import { UserContext } from "../../../context/UserContextProvider";
import LoadingSpinner from "../../../components/Spinner/LoadingSpinner";
import BookingsShimmer from "./BookingsShimmer";

const UserBookings = () => {
    const {
        ready,
        setReady,
        alert: { setAlertType, setAlertMessage },
    } = useContext(UserContext);
    const [bookings, setBookings] = useState(null);

    useEffect(() => {
        setReady(false);
        axios
            .get("/bookings")
            .then((response) => {
                setBookings(response.data.bookings);
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
    }, []);

    if (!ready) return <BookingsShimmer />;

    return (
        <div className="flex flex-col gap-2 px-8 fade-in">
            {bookings?.length > 0 ? (
                <span className="font-bold text-xl">
                    My Bookings ({bookings?.length})
                </span>
            ) : (
                <span className="font-bold text-xl">No Bookings Found!</span>
            )}
            <div className="px-16 py-4 flex flex-col gap-6">
                {bookings?.map((booking, index) => {
                    return (
                        <BookingTile
                            key={index}
                            booking={booking}
                            place={booking?.place}
                            owner={booking?.owner}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default UserBookings;
