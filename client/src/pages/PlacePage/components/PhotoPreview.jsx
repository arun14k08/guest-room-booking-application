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
            className="rounded-lg overflow-hidden grid grid-cols-2 h-[480px] gap-2 cursor-pointer"
            onClick={() => {
                setShowGallery(true);
            }}
        >
            <img
                src={"http://localhost:3000/uploads/" + photos[0]}
                alt="photo"
                className="h-[480px] object-cover"
            />
            <div className="grid grid-cols-2 gap-2 relative">
                {photos
                    .filter((photo, index) => {
                        return index !== 0 && index <= 4;
                    })
                    .map((photo, index) => {
                        return (
                            <img
                                key={index}
                                src={"http://localhost:3000/uploads/" + photo}
                                alt="photo"
                                className="h-full object-cover"
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
