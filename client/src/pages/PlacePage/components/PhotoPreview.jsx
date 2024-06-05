import PropTypes from "prop-types";
import { PhotoIcon } from "../assets/SVGAssets";
import PhotoGallery from "./PhotoGallery";
import { useState } from "react";

const PhotoPreview = ({ photos }) => {
    const [showGallery, setShowGallery] = useState(false);

    if (showGallery) {
        return <PhotoGallery setShowGallery={setShowGallery} photos={photos} />;
    }

    return (
        <div
            className="rounded-lg overflow-hidden grid grid-cols-2 max-h-[480px] gap-2 cursor-pointer"
            onClick={() => {
                setShowGallery(true);
            }}
        >
            <div className="flex justify-center items-center w-full h-[480px]">
                <img
                    src={`${import.meta.env.VITE_UPLOAD_CARE_URL}${photos[0]}/`}
                    alt="photo"
                    className="object-cover min-h-[480px]"
                />
            </div>
            <div className="grid grid-cols-2 gap-2 relative max-h-[480px]">
                {photos
                    .filter((photo, index) => {
                        return index !== 0 && index <= 4;
                    })
                    .map((photo, index) => {
                        return (
                            <img
                                key={index}
                                src={`${
                                    import.meta.env.VITE_UPLOAD_CARE_URL
                                }${photo}/`}
                                alt="photo"
                                className="h-full aspect-video"
                            />
                        );
                    })}
                <button className="absolute bottom-1 right-1 hover:bg-slate-100 flex gap-2 bg-white px-4 py-2 rounded-md">
                    <PhotoIcon />
                    View all photos
                </button>
            </div>
        </div>
    );
};

// ImagePreview.propTypes = {
//     photos: PropTypes.arrayOf(PropTypes.shape(String)),
// };

export default PhotoPreview;
