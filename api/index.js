// importing required dependencies
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const fs = require("fs");

const cookieOptions = { sameSite: "none", secure: true };
const jwtSecretKey = process.env.JWT_SECRET_KEY;
// importing schemas
const User = require("./models/User.js");
const Place = require("./models/Place.js");
const Booking = require("./models/Booking.js");

// initialize express
const app = express();

// * middleware functions
// cross-origin middleware
app.use(
    cors({
        credentials: true,
        origin: "https://main--elite-bookings.netlify.app/",
    })
);

app.use("/uploads", express.static(__dirname + "/uploads"));

// json middleware
app.use(express.json());

// cookie parser middleware
app.use(cookieParser());

// connecting with mongodb atlas
mongoose
    .connect(process.env.MONGOOSE_CONNECTION_URI)
    .then(() => console.log("connected with database"))
    .catch((err) => {
        console.error(err);
    });

const errorJSON = {
    message: "Server Error, Please try again",
    type: "error",
};

//defining various routes
app.get("/", (req, res) => {
    res.json("ok");
});

// ** Owner routes **

// register a new user
app.post("/register", async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;
        // checking if there is an user with the same email
        const user = await User.findOne({ email: email });
        if (user) {
            console.log("User already exists");
            return res.status(200).json({
                message: "User with the same email already exists",
                type: "warning",
            });
        }
        // if user is new then,
        // the password is hashed with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        // saving the new user into the database
        const newUser = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            role,
        });
        console.log("New user created");
        res.status(200).json({
            name: newUser.name,
            email: newUser.email,
            message: "User created successfully",
            type: "success",
        });
    } catch (err) {
        res.status(500).json(errorJSON);
        console.log(err);
    }
});

// login user
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        // checking if the email is correct or not
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(200).json({
                message: "User does not exists",
                type: "warning",
                user: null,
            });
        }
        // checking the password with the hashed password in the database
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(200).json({
                message: "Incorrect password",
                type: "warning",
                user: null,
            });
        }
        // if everything is ok then letting the user to log in
        jwt.sign(
            { name: user.name, email: user.email, id: user._id },
            jwtSecretKey,
            {},
            async (err, token) => {
                if (err) throw err;
                const { name, email, role } = await User.findById(user.id);
                res.cookie("authToken", token, cookieOptions)
                    .status(200)
                    .json({
                        message: "Logged in as " + user.name,
                        type: "success",
                        user: {
                            name,
                            email,
                            role,
                        },
                    });
            }
        );
    } catch (err) {
        res.status(500).json(errorJSON);
        console.log(err);
    }
});

// get profile of the user by jwt token
app.get("/profile", (req, res) => {
    try {
        const { authToken } = req.cookies;
        if (!authToken) {
            return res.status(200).json(null);
        }
        jwt.verify(
            authToken,
            jwtSecretKey,
            cookieOptions,
            async (err, user) => {
                if (err) throw err;
                const { name, email, role } = await User.findById(user.id);
                res.status(200).json({ name, email, role });
            }
        );
    } catch (err) {
        res.status(500).json(errorJSON);
        console.error(err);
    }
});

// logout user
app.post("/logout", (req, res) => {
    try {
        res.cookie("authToken", "", {
            sameSite: "none",
            secure: true,
            expires: new Date(0),
        }).json({ message: "Logged out successfully", type: "success" });
    } catch (err) {
        res.status(500).json(errorJSON);
        console.log(err);
    }
});

// upload photos of places
// middleware for uploading photos
const upload = multer({
    dest: "uploads",
});
app.post("/upload", upload.array("photos", 100), (req, res) => {
    try {
        const { authToken } = req.cookies;
        if (!authToken) {
            return res.status(200).json({
                message: "You are not authorized to upload photos",
                type: "warning",
            });
        }
        jwt.verify(authToken, jwtSecretKey, cookieOptions, (err, data) => {
            if (err) throw err;
            const files = req.files;
            const links = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const [name, ext] = file.originalname.split(".");
                const newName = `${file.filename}.${ext}`;
                fs.renameSync(file.path, `uploads/${newName}`);
                links.push(newName);
            }
            let message = "";
            if (links.length === 1) {
                message = "Photo Uploaded successfully";
            } else {
                message = "Photos Uploaded successfully";
            }

            res.status(200).json({
                links,
                message: message,
                type: "success",
            });
        });
    } catch (err) {
        res.status(500).json(errorJSON);
        console.log(err);
    }
});

// delete a photo
app.delete("/photo/:filename", async (req, res) => {
    try {
        const { authToken } = req.cookies;
        const { filename } = req.params;
        if (!authToken) {
            return res.status(200).json({
                message: "You are not authorized to delete photos",
                type: "warning",
            });
        }
        jwt.verify(
            authToken,
            jwtSecretKey,
            cookieOptions,
            async (err, data) => {
                if (err) throw err;
                fs.unlink(`uploads/${filename}`, (err) => {
                    if (err) throw err;
                    res.status(200).json({
                        message: "Photo deleted successfully",
                        type: "warning",
                    });
                });
            }
        );
    } catch (err) {
        res.status(500).json(errorJSON);
        console.log(err);
    }
});

// add a new place
app.post("/places/new", async (req, res) => {
    try {
        const {
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
            maxGuests,
        } = req.body;

        const { authToken } = req.cookies;
        jwt.verify(
            authToken,
            jwtSecretKey,
            cookieOptions,
            async (err, data) => {
                if (err) throw err;
                const { id } = data;
                const user = await User.findById(id);
                if (user.role !== "owner") {
                    return res.status(200).json({
                        message: "You are not authorized to add a new place",
                        type: "warning",
                    });
                }
                const newPlace = await Place.create({
                    owner: user._id,
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
                    maxGuests,
                });
                res.status(200).json({
                    message: "Place created successfully",
                    type: "success",
                    newPlace,
                });
            }
        );
    } catch (err) {
        res.status(500).json(errorJSON);
        console.log(err);
    }
});

// get all listing of the particular user
app.get("/listings", (req, res) => {
    try {
        const { authToken } = req.cookies;
        jwt.verify(
            authToken,
            jwtSecretKey,
            cookieOptions,
            async (err, data) => {
                if (err) throw err;
                const { id } = data;
                const user = await User.findById(id);
                if (user.role !== "owner") {
                    return res.status(200).json({
                        message: "You are not authorized",
                        type: "warning",
                    });
                }
                const places = await Place.find({ owner: id });
                if (places.length === 0) {
                    return res.status(200).json({
                        places: null,
                        message: "No places found",
                        type: "info",
                    });
                }
                // console.log(places);
                res.status(200).json({ places });
            }
        );
    } catch (err) {
        res.status(500).json(errorJSON);
        console.log(err);
    }
});

// get details of a place

app.get("/places/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const place = await Place.findById(id);
        res.status(200).json(place);
    } catch (err) {
        res.status(500).json(errorJSON);
        console.log(err);
    }
});

// update details of a place
app.put("/places/edit", async (req, res) => {
    try {
        const { authToken } = req.cookies;
        const placeData = req.body;
        jwt.verify(
            authToken,
            jwtSecretKey,
            cookieOptions,
            async (err, data) => {
                if (err) throw err;
                const { id } = data;
                const place = await Place.findById(placeData.id);
                if (place.owner.toString() !== id) {
                    return res.status(200).json({
                        message: "You are not authorized to edit this place",
                        type: "warning",
                    });
                }
                place.set(placeData);
                place.save();
                res.status(200).json({
                    message: "Your place has been updated",
                    type: "success",
                });
            }
        );
    } catch (err) {
        res.status(500).json(errorJSON);
        console.log(err);
    }
});

// delete a place
app.delete("/place/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const place = await Place.findByIdAndDelete(id);

        // delete the photos of the place
        const photos = place.photos;
        for (let i = 0; i < photos.length; i++) {
            const photo = photos[i];
            fs.unlink(`uploads/${photo}`, (err) => {
                if (err) throw err;
            });
        }
        res.status(200).json({
            message: "Place deleted successfully",
            type: "success",
            places: null,
        });
    } catch (err) {
        res.status(500).json(errorJSON);
        console.log(err);
    }
});

// get all the reservations for a particular owner
app.get("/reservations", (req, res) => {
    try {
        const { authToken } = req.cookies;
        if (!authToken) {
            res.status(200).json({
                message: "you are not authorized to access",
                type: "warning",
            });
        }
        jwt.verify(
            authToken,
            jwtSecretKey,
            cookieOptions,
            async (err, data) => {
                if (err) throw err;
                const { id } = data;
                let reservations = await Booking.find({ owner: id })
                    .populate("user")
                    .populate("place");

                res.status(200).json({ reservations });
            }
        );
    } catch (err) {
        res.status(500).json(errorJSON);
        console.log(err);
    }
});

// ** Customer Routes **

// get all places
app.get("/places", async (req, res) => {
    try {
        const places = await Place.find({});
        res.status(200).json({ places });
    } catch (err) {
        res.status(500).json(errorJSON);
        console.log(err);
    }
});

// get details of a place
app.get("/places/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const place = await Place.findById(id);
        let {
            owner: { name, email },
        } = await place.populate("owner");
        place.owner = { name, email };
        if (!place) {
            return res.status(200).json({
                message: "Place not found",
                type: "warning",
            });
        }
        res.status(200).json({ place });
    } catch (err) {
        res.status(500).json(errorJSON);
        console.log(err);
    }
});

// process booking request
app.post("/book-place", async (req, res) => {
    try {
        const {
            checkInDate,
            checkOutDate,
            totalPrice,
            guests,
            place,
            totalDays,
            name,
            address,
        } = req.body;
        const { authToken } = req.cookies;

        if (!authToken) {
            return res.json({ message: "Kindly login to book", type: "info" });
        }

        jwt.verify(
            authToken,
            jwtSecretKey,
            cookieOptions,
            async (err, data) => {
                if (err) throw err;
                const { id } = data;
                const userDoc = await User.findById(id);
                const placeDoc = await Place.findById(place);

                if (!userDoc) {
                    return res.json({
                        message: "Kindly login to book",
                        type: "info",
                    });
                }
                const newBooking = await Booking.create({
                    user: userDoc._id,
                    place,
                    owner: placeDoc.owner,
                    checkInDate,
                    checkOutDate,
                    price: totalPrice,
                    days: totalDays,
                    guests,
                    name,
                    address,
                });
                res.status(200).json({
                    message: "Your booking request has been sent",
                    type: "success",
                    newBooking,
                });
            }
        );
    } catch (err) {
        res.status(500).json(errorJSON);
        console.log(err);
    }
});

// get all bookings of a place
app.get("/old-bookings/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const bookings = await Booking.find({ place: id });
        if (!bookings) {
            return res.status(200).json({
                bookings: null,
                message: "No bookings found",
                type: "info",
            });
        }
        res.status(200).json({
            bookings,
            message: "Bookings found",
            type: "info",
        });
    } catch (err) {
        res.status(500).json(errorJSON);
        console.log(err);
    }
});

app.get("/bookings", (req, res) => {
    try {
        const { authToken } = req.cookies;
        if (!authToken) {
            res.status(200).json({
                message: "you are not authorized to access",
                type: "warning",
            });
        }
        jwt.verify(
            authToken,
            jwtSecretKey,
            cookieOptions,
            async (err, data) => {
                if (err) throw err;
                const { id } = data;
                let bookings = await Booking.find({ user: id })
                    .populate("owner")
                    .populate("place");

                res.status(200).json({ bookings });
            }
        );
    } catch (err) {
        res.status(500).json(errorJSON);
        console.log(err);
    }
});

// starting the server
let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("listening on port " + PORT);
});
