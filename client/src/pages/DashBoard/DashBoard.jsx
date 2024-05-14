import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { Navigate } from "react-router";
import axios from "axios";
import Listings from "./components/Listings";
import { AddIcon, ListingsIcon, MenuIcon } from "./assets/SVGAssets";

const DashBoard = () => {
    const {
        user,
        ready,
        setReady,
        alert: { setAlertType, setAlertMessage },
    } = useContext(UserContext);
    const [redirect, setRedirect] = useState("");
    const [places, setPlaces] = useState(null);

    useEffect(() => {
        setReady(false);
        axios.get("/listings").then((response) => {
            const { data } = response;
            setPlaces(data.places);
            setAlertMessage(data.message);
            setAlertType(data.type);
            setReady(true);
        });
    }, []);

    const addNewPlace = () => {
        setRedirect("/places/new");
    };

    const redirectToEditPage = (id) => {
        setRedirect("/places/edit/" + id);
    };

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    if (ready && !user) {
        return <Navigate to={"/"} />;
    }

    return (
        <div className="flex flex-col justify-center items-center">
           
            <div className="px-8 mt-8 w-full justify-end">
                <button
                    onClick={() => {
                        addNewPlace();
                    }}
                    className="button ml-auto"
                >
                    <AddIcon />
                    Add a new Place
                </button>
            </div>
            <div className="flex flex-col gap-4">
                <Listings
                    places={places}
                    setPlaces={setPlaces}
                    ready={ready}
                    setReady={setReady}
                    redirectToEditPage={redirectToEditPage}
                />
            </div>
        </div>
    );
};

export default DashBoard;
