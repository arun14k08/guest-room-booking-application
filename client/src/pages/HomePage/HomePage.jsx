import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { Navigate } from "react-router";
import axios from "axios";
import PlaceTile from "./components/PlaceTile";

const HomePage = () => {
    const { user, ready, setReady } = useContext(UserContext);
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        setReady(false);
        axios.get("/places").then((response) => {
            setPlaces(response.data.places);
        });
        setReady(true);
    }, []);

    if (!ready) {
        return <p>Loading...</p>;
    }
    if (user?.role === "owner") {
        return <Navigate to={"/dashboard"} />;
    }
    return (
        <div className="my-8 px-16 py-4 bg-slate-200 -mx-8">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {places.map((place) => {
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
