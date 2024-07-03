import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ReservationTile from "./ReservationTile";
import { UserContext } from "../../../context/UserContextProvider";
import ReservationsShimmer from "./ReservationsShimmer";

const Reservations = () => {
    const [reservations, setReservations] = useState(null);
    const { ready, setReady } = useContext(UserContext);
    useEffect(() => {
        if (!reservations) {
            setReady(false);
            axios.get("/reservations").then((response) => {
                setReservations(response.data.reservations);
                setReady(true);
            });
        }
    }, []);

    if (!ready) return <ReservationsShimmer />;

    return (
        <div className="mt-12 mx-24 flex flex-col gap-4 fade-in">
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
