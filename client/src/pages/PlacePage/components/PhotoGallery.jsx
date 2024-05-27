import { X } from "../../../components/Modals/SVGAssets";
import { BackIcon } from "../assets/SVGAssets";

const PhotoGallery = ({ setShowGallery, photos }) => {
    return (
        <div className="absolute top-0 left-0 w-full bg-white z-[9999]  overflow-auto transition-all">
            <button
                className="fixed top-2 left-2  p-2 hover:bg-slate-200 rounded-lg flex justify-center items-center"
                onClick={() => {
                    setShowGallery(false);
                }}
            >
                <BackIcon />
            </button>
            <div className="flex flex-col gap-4 rounded-lg p-16 pl-18 px-56 pb-4">
                {photos.map((photos, index) => {
                    return (
                        <img
                            key={index}
                            src={
                                "https://guest-room-booking-application-5akp.onrender.com//uploads/" +
                                photos
                            }
                            className="rounded-lg object-cover"
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default PhotoGallery;
