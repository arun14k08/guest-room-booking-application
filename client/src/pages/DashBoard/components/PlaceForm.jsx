import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router";

const PlaceForm = () => {
    const [photos, setPhotos] = useState([]);
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [location, setLocation] = useState();
    const [price, setPrice] = useState();
    const [minimumBooking, setMinimumBooking] = useState();
    const [maximumBooking, setMaximumBooking] = useState();
    const [rooms, setRooms] = useState();
    const [beds, setBeds] = useState();
    const [bathRooms, setBathRooms] = useState();
    const [redirect, setRedirect] = useState();

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

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post("/places/new", {
                name,
                description,
                location,
                price,
                minimumBooking,
                maximumBooking,
                rooms,
                beds,
                bathRooms,
                photos,
            })
            .then((response) => {
                if (response.data.type === "success") {
                    setRedirect("/dashboard");
                }
            });
    };

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div>
            <form
                method="post"
                onSubmit={(event) => {
                    handleSubmit(event);
                }}
                className="px-8 py-6 flex flex-col gap-3"
            >
                <label htmlFor="name">
                    Name of the Place:
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter your Place Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />
                </label>
                <label htmlFor="description">
                    Description:
                    <input
                        id="description"
                        type="text"
                        placeholder="Enter your Place Description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        required
                    />
                </label>
                <label htmlFor="location">
                    Location:
                    <input
                        id="location"
                        type="text"
                        placeholder="Tamil Nadu, India"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        required
                    />
                </label>
                <label htmlFor="price">
                    Price:
                    <input
                        id="price"
                        type="number"
                        placeholder="Enter the Price"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                        required
                    />
                </label>
                <div className="flex gap-8">
                    <label htmlFor="minimumBooking">
                        Minimum No of Booking Days:
                        <input
                            id="minimumBooking"
                            type="number"
                            placeholder="Enter the Price"
                            value={minimumBooking}
                            onChange={(event) =>
                                setMinimumBooking(event.target.value)
                            }
                            required
                        />
                    </label>
                    <label htmlFor="maximumBooking">
                        Maximum No of Booking Days:
                        <input
                            id="maximumBooking"
                            type="number"
                            placeholder="Enter the Price"
                            value={maximumBooking}
                            onChange={(event) =>
                                setMaximumBooking(event.target.value)
                            }
                            required
                        />
                    </label>
                </div>
                {/* <div className="flex gap-8">
                    <label className="flex flex-col items-center">
                        Enter the Check In Time
                        <div className="flex w-32 items-center gap-2">
                            <input
                                type="number"
                                name="checkInHour"
                                placeholder="HH"
                            />
                            :
                            <input
                                type="text"
                                name="checkInMinute"
                                placeholder="MM"
                            />
                        </div>
                    </label>
                    <label className="flex flex-col items-center">
                        Enter the Check Out Time
                        <div className="flex w-32 items-center gap-2">
                            <input
                                type="text"
                                name="checkOutHour"
                                placeholder="HH"
                            />
                            :
                            <input
                                type="text"
                                name="checkOutMinute"
                                placeholder="MM"
                            />
                        </div>
                    </label>
                </div> */}
                <div className="flex gap-4">
                    <label htmlFor="beds">
                        No of Beds:
                        <input
                            id="beds"
                            type="number"
                            placeholder="Enter the No of Beds"
                            value={beds}
                            onChange={(event) => setBeds(event.target.value)}
                            required
                        />
                    </label>
                    <label htmlFor="rooms">
                        No of Rooms:
                        <input
                            id="rooms"
                            type="number"
                            placeholder="Enter the No of Rooms"
                            value={rooms}
                            onChange={(event) => setRooms(event.target.value)}
                            required
                        />
                    </label>
                    <label htmlFor="bathrooms">
                        No of Bathrooms:
                        <input
                            id="bathrooms"
                            type="number"
                            placeholder="Enter the No of Bathrooms"
                            value={bathRooms}
                            onChange={(event) =>
                                setBathRooms(event.target.value)
                            }
                            required
                        />
                    </label>
                </div>
                <p>Photos:</p>
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
                <button className="button" type="submit">
                    Add Place
                </button>
            </form>
        </div>
    );
};

export default PlaceForm;
