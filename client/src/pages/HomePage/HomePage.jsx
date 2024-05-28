import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { Navigate } from "react-router";
import axios from "axios";
import PlaceTile from "./components/PlaceTile";
import LoadingSpinner from "../../components/Spinner/LoadingSpinner";

const HomePage = () => {
    const {
        user,
        ready,
        setReady,
        alert: { setAlertMessage, setAlertType },
    } = useContext(UserContext);
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        setReady(false);
        axios
            .get("/places")
            .then((response) => {
                setPlaces(response.data.places);
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

    if (!ready) {
        return <LoadingSpinner/>;
    }
    if (user?.role === "owner") {
        return <Navigate to={"/dashboard"} />;
    }
    return (
        <div className="px-16 py-4 -mx-8">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {places?.map((place) => {
                    return (
                        <div key={place._id}>
                            <PlaceTile place={place} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HomePage;
