import PropTypes from "prop-types";
import { DeleteIcon, EditIcon, RoomIcon } from "../assets/SVGAssets";
import { BedIcon, Thumbnail } from "../assets/ImageAssets";
import Modal from "../../../components/Modals/Modal";
import { useContext, useState } from "react";
import DeletePlaceModal from "./DeletePlaceModal";
import axios from "axios";
import { UserContext } from "../../../context/UserContextProvider";
import LoadingSpinner from "../../../components/Spinner/LoadingSpinner";

const Listings = ({ places, redirectToEditPage, setPlaces, ready }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {
        alert: { setAlertMessage, setAlertType },
    } = useContext(UserContext);

    const deletePlace = (id) => {
        axios
            .delete("/place/" + id)
            .then((response) => {
                if (response.data.type === "success") {
                    const newPlaces = places.filter((place) => {
                        return place._id !== id;
                    });
                    setPlaces(newPlaces);
                }
                setAlertMessage(response.data.message);
                setAlertType(response.data.type);
            })
            .catch((err) => {
                let alertText =
                "Server is not responding, refresh and try again";
            if (err.response) {
                alertText = err.response.data.message;
            }
            setAlertMessage(alertText);
            setAlertType("error");
            });
    };

    if (!ready) {
        return <LoadingSpinner/>;
    }

    if (ready && !places) {
        return <p>No Places Added</p>;
    }

    return (
        <div>
            {places?.length > 0 &&
                places.map((place) => {
                    return (
                        <div
                            className="flex gap-4 relative  bg-slate-100 px-8 py-6 mx-8 my-4 rounded-lg"
                            key={place._id}
                        >
                            <div className="w-[450px] max-h-[250px] rounded-lg flex flex-col justify-center items-center overflow-hidden">
                                {place.photos.length === 0 ? (
                                    "No photos added"
                                ) : (
                                    <Thumbnail photo={place.photos[0]} />
                                )}
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
                                        <div
                                            onClick={() => setIsModalOpen(true)}
                                        >
                                            <DeleteIcon />
                                        </div>
                                        <Modal
                                            open={isModalOpen}
                                            setOpen={setIsModalOpen}
                                        >
                                            <DeletePlaceModal
                                                setIsModalOpen={setIsModalOpen}
                                                placeId={place._id}
                                                deletePlace={deletePlace}
                                            />
                                        </Modal>
                                    </div>
                                </div>
                                <div className="flex ml-2 mb-2 py-4 px-6 gap-6 bg-slate-300 rounded-full mt-6 font-semibold text-[#525252] w-fit">
                                    <p className="text-[16px]">
                                        ₹ {place?.price?.toLocaleString()}
                                    </p>
                                    <div className="w-[1px] -my-4 bg-slate-500 rounded-md">
                                        &nbsp;
                                    </div>
                                    <p className="text-[16px] flex gap-2">
                                        <RoomIcon />
                                        Rooms: {place?.rooms}
                                    </p>
                                    <div className="w-[1px] -my-4 bg-slate-500 rounded-md">
                                        &nbsp;
                                    </div>
                                    <p className="text-[16px] flex gap-2">
                                        <BedIcon />
                                        Beds: {place?.beds}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
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
    ready: PropTypes.bool,
};

export default Listings;
