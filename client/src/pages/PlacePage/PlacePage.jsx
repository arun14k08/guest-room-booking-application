import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { LocationIcon } from "../../assets/SVGAssets";
import PhotoPreview from "./components/PhotoPreview";
import Calendar from "./components/Calendar";

const PlacePage = () => {
    const { id } = useParams();
    const [place, setPlace] = useState();
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();

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
            <div className="flex gap-8 justify-between mt-8">
                <div className="mb-96">
                    <div>More Details</div>
                    <div>
                        {/*Availability  Calendar */}
                        <Calendar
                            fromDate={fromDate}
                            setFromDate={setFromDate}
                            toDate={toDate}
                            setToDate={setToDate}
                        />
                    </div>
                </div>
                <div>
                    <form method="post">
                        {/* <p>{fromDate?.toISOString().split("T")[0]}</p>
                        <p>{toDate?.toISOString().split("T")[0]}</p> */}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PlacePage;
