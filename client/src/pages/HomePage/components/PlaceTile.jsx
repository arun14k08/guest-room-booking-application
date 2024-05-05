import PropTypes from "prop-types";
import { LocationIcon } from "../assets/SVGAssets";

const PlaceTile = ({ place }) => {
    return (
        <div className="shadow-lg px-4 py-4 rounded-md flex flex-col justify-center cursor-pointer hover:scale-105 transition-all bg-white">
            <img
                src={`http://localhost:3000/uploads/${place.photos[0]}`}
                alt={"thumbnail-" + place.photos[0]}
                className="w-full aspect-square rounded-lg object-cover"
            />
            <div className="text-left pl-2 pt-2 mt-2">
                <p className="underline underline-offset-1 capitalize flex gap-1 items-center">
                    <LocationIcon /> {place.location}
                </p>
                <h2 className="font-bold capitalize text-[20px] text-slate-600">
                    {place.name}
                </h2>
                <p className="text-[16px]">
                    <span className="font-bold">${place.price} </span> night
                </p>
            </div>
        </div>
    );
};

PlaceTile.propTypes = {
    place: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PlaceTile;