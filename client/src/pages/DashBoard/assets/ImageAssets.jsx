import PropTypes from "prop-types";

export const BedIcon = () => {
    return (
        <img
            width="16"
            height="16"
            src="https://img.icons8.com/ios/50/bed.png"
            alt="bed"
        />
    );
};

export const Thumbnail = ({ photo }) => {
    return (
        <img
            src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${photo}`}
            alt="thumbnail"
            className="rounded-lg object-cover"
        />
    );
};

Thumbnail.propTypes = {
    photo: PropTypes.string,
};
