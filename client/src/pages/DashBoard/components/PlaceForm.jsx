import axios from "axios";
import { useState } from "react";

const PlaceForm = () => {
    const [photos, setPhotos] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const uploadPhoto = (event) => {
        const data = new FormData();
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            data.append("photos", files[i]);
        }
        axios
            .post("/upload", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                let fileNames = response.data;
                setPhotos((prev) => [...prev, ...fileNames]);
            });
    };
    return (
        <div>
            <form method="post" className="px-8 py-6 flex flex-col gap-3">
                <label htmlFor="name">
                    Name of the Place:
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter your Place Name"
                    />
                </label>
                <label htmlFor="description">
                    Description:
                    <input
                        id="description"
                        type="text"
                        placeholder="Enter your Place Description"
                    />
                </label>
                <label htmlFor="location">
                    Location:
                    <input
                        id="location"
                        type="text"
                        placeholder="Enter your Place Address"
                    />
                </label>
                <label htmlFor="price">
                    Price:
                    <input
                        id="price"
                        type="text"
                        placeholder="Enter the Price"
                    />
                </label>
                <p>Image:</p>
                <div className="grid grid-cols-4 lg:grid-cols-8 h-32 gap-4">
                    <label htmlFor="photo" className="cursor-pointer">
                        <div className="w-full h-full gap-4 flex justify-center items-center border-2 border-slate-500 rounded-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                                />
                            </svg>
                            <input
                                id="photo"
                                type="file"
                                className="hidden"
                                onChange={(event) => {
                                    uploadPhoto(event);
                                }}
                                multiple
                            />
                            <p>Upload</p>
                        </div>
                    </label>
                    {photos.length > 0 ? (
                        photos.map((photo, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex justify-center items-center w-full h-full"
                                >
                                    <img
                                        src={
                                            "http://localhost:3000/uploads/" +
                                            photo
                                        }
                                        alt={"photo" + index}
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <p className="flex justify-center items-center">
                            No photos added
                        </p>
                    )}
                </div>
                <button className="button">Add Place</button>
            </form>
        </div>
    );
};

export default PlaceForm;
