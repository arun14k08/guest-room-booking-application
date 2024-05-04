import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import { UserContext } from "../../../context/UserContextProvider";
import { DeleteIcon, UploadIcon } from "../assets/SVGAssets";

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
    const [submitText, setSubmitText] = useState("Add Place");
    const {
        user,
        ready,
        alert: { setAlertMessage, setAlertType },
    } = useContext(UserContext);
    const { id } = useParams();

    useEffect(() => {
        if (!id) {
            return;
        }
        setSubmitText("Save");
        axios.get(`/places/edit/${id}`).then((response) => {
            const { data } = response;
            setName(data.name);
            setDescription(data.description);
            setPhotos(data.photos);
            setLocation(data.location);
            setPrice(data.price);
            setMinimumBooking(data.minimumBooking);
            setMaximumBooking(data.maximumBooking);
            setRooms(data.rooms);
            setBeds(data.beds);
            setBathRooms(data.bathRooms);
        });
    }, [id]);

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

    const handleDeletePhoto = (event, photo) => {
        event.preventDefault();
        axios.delete("/photo/" + photo).then((response) => {
            const {
                data: { message, type },
            } = response;
            setAlertMessage(message);
            setAlertType(type);
            setPhotos((prev) =>
                prev.filter((prevPhoto) => prevPhoto !== photo)
            );
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (id) {
            // update place
            axios
                .put("/places/edit", {
                    id,
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
                    const { data } = response;
                    setAlertMessage(data.message);
                    setAlertType(data.type);
                    setTimeout(() => {
                        if (data.type === "success") {
                            setRedirect("/dashboard");
                        }
                    }, 1000);
                });
        } else {
            // create new place
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
                    const { data } = response;
                    setAlertMessage(data.message);
                    setAlertType(data.type);
                    setTimeout(() => {
                        if (data.type === "success") {
                            setRedirect("/dashboard");
                        }
                    }, 1000);
                });
        }
    };

    if (!ready) {
        return <p>Loading...</p>;
    }
    if (ready && !user) {
        return <Navigate to="/" />;
    }

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
                className="px-64 py-6 flex flex-col gap-3 "
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
                <div className="grid grid-cols-4 lg:grid-cols-4 gap-4">
                    <label htmlFor="photo" className="cursor-pointer h-32">
                        <div className="w-full h-full gap-4 flex justify-center items-center border-2 border-slate-500 rounded-lg">
                            <UploadIcon />
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
                                    className="flex justify-center items-center h-32 overflow-hidden rounded-lg relative"
                                >
                                    <img
                                        src={
                                            "http://localhost:3000/uploads/" +
                                            photo
                                        }
                                        className="rounded-lg object-cover"
                                        alt={"photo" + index}
                                    />
                                    <button
                                        className="absolute bottom-1 right-1 rounded-full bg-slate-200"
                                        onClick={(event) => {
                                            handleDeletePhoto(event, photo);
                                        }}
                                    >
                                        <DeleteIcon />
                                    </button>
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
                    {submitText}
                </button>
            </form>
        </div>
    );
};

export default PlaceForm;
