import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ReservationTile from "./ReservationTile";
import { UserContext } from "../../../context/UserContextProvider";

const Reservations = () => {
    const [reservations, setReservations] = useState(null);
    const { ready, setReady } = useContext(UserContext);
    useEffect(() => {
        if (!reservations) {
            setReady(false);
            axios.get("/reservations").then((response) => {
                setReservations(response.data.reservations);
                console.log(response.data.reservations[0].place.photos[0]);
            });
            setReady(true);
        }
    }, []);

    if (!ready) return <p>Loading...</p>;

    return (
        <div className="mt-12 mx-24 flex flex-col gap-4">
            {reservations?.length === 0 ? (
                <span className="text-2xl font-semibold">No Reservations</span>
            ) : (
                <span className="text-2xl font-semibold">
                    My Reservations ({reservations?.length})
                </span>
            )}
            {reservations?.map((reservation) => {
                return (
                    <ReservationTile
                        key={reservation._id}
                        reservation={reservation}
                        place={reservation?.place}
                        user={reservation?.user}
                    />
                );
            })}
        </div>
    );
};

export default Reservations;
