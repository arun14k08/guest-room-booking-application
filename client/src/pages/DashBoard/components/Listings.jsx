import PropTypes from "prop-types";
import { DeleteIcon, EditIcon, RoomIcon } from "../assets/SVGAssets";
import { BedIcon, Thumbnail } from "../assets/ImageAssets";

const Listings = ({ places, redirectToEditPage }) => {
    if (!places) return <p>Loading...</p>;
    return (
        <>
            {places.length > 0 &&
                places.map((place) => {
                    return (
                        <div
                            className="flex gap-4 relative  bg-slate-100 px-8 py-6 mx-8 my-4 rounded-lg"
                            key={place._id}
                        >
                            <div className="w-[450px] max-h-[250px] rounded-lg flex flex-col justify-center overflow-hidden">
                                <Thumbnail photo={place.photos[0]} />
                            </div>
                            <div className="w-full flex flex-col justify-between">
                                <div className="flex w-full justify-between">
                                    <div className="flex flex-col gap-2 max-w-[95%] px-4 py-2">
                                        <h2 className="text-[24px] font-semibold capitalize leading-8">
                                            {place.name}
                                        </h2>
                                        <p className="text-[14px] font-normal line-clamp-3">
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            {place.description}
                                        </p>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div
                                            onClick={() => {
                                                redirectToEditPage(place._id);
                                            }}
                                        >
                                            <EditIcon />
                                        </div>
                                        <div>
                                            <DeleteIcon />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex ml-2 mb-2 py-4 px-6 gap-6 bg-slate-300 rounded-full mt-6 font-semibold text-[#525252] w-fit">
                                    <p className="text-[16px]">
                                        $ {place.price}
                                    </p>
                                    <div className="w-[1px] -my-4 bg-slate-500 rounded-md">
                                        &nbsp;
                                    </div>
                                    <p className="text-[16px] flex gap-2">
                                        <RoomIcon />
                                        Rooms: {place.rooms}
                                    </p>
                                    <div className="w-[1px] -my-4 bg-slate-500 rounded-md">
                                        &nbsp;
                                    </div>
                                    <p className="text-[16px] flex gap-2">
                                        <BedIcon />
                                        Beds: {place.beds}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </>
    );
};

Listings.propTypes = {
    places: PropTypes.arrayOf({
        name: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number,
        rooms: PropTypes.number,
        beds: PropTypes.number,
        photos: PropTypes.arrayOf(PropTypes.string),
    }),
    redirectToEditPage: PropTypes.func,
};

export default Listings;
