import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { LocationIcon } from "../../assets/SVGAssets";
import PhotoPreview from "./components/PhotoPreview";

const PlacePage = () => {
    const { id } = useParams();
    const [place, setPlace] = useState();

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
        </div>
    );
};

export default PlacePage;
