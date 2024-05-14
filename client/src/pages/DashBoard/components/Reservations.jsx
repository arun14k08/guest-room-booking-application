import axios from "axios";
import { useEffect, useState } from "react";
import ReservationTile from "./ReservationTile";

const Reservations = () => {
    const [reservations, setReservations] = useState(null);

    useEffect(() => {
        if (!reservations) {
            axios.get("/reservations").then((response) => {
                setReservations(response.data.reservations);
                console.log(response.data.reservations[0].place.photos[0]);
            });
        }
    }, []);

    return (
        <div className="mt-12 mx-24 flex flex-col gap-4">
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
