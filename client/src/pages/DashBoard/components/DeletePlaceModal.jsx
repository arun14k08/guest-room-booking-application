import React from "react";

const DeletePlaceModal = ({ setIsModalOpen, deletePlace, placeId }) => {
    return (
        <div className="flex flex-col gap-8 mx-4 my-2">
            <p>Are you sure you want to delete this place?</p>
            <div className="flex gap-4 justify-center">
                <button
                    className="button"
                    onClick={() => {
                        deletePlace(placeId);
                        setIsModalOpen(false);
                    }}
                >
                    Delete
                </button>
                <button
                    className="bg-white ring-1 ring-slate-300 px-4 py-2 rounded-lg"
                    onClick={() => {
                        setIsModalOpen(false);
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default DeletePlaceModal;
