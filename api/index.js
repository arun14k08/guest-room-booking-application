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
const jwtSecretKey = "ae7821eas5sc5zx51as4as51sdx5asd15as2x1";
// importing schemas
const User = require("./models/User.js");
const Place = require("./models/Place.js");

// initialize express
const app = express();

// * middleware functions
// cross-origin middleware
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173",
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
        throw err;
    });

//defining various routes
app.get("/", (req, res) => {
    res.json("ok");
});
// register a new user
app.post("/register", async (req, res) => {
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
});

// login user
app.post("/login", async (req, res) => {
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
            res.cookie("authToken", token, cookieOptions).status(200).json({
                message: "Logged in successfully",
                type: "success",
                user: {
                    name,
                    email,
                    role,
                },
            });
        }
    );
});

// get profile of the user by jwt token
app.get("/profile", (req, res) => {
    const { authToken } = req.cookies;
    if (!authToken) {
        return res.status(200).json(null);
    }
    jwt.verify(authToken, jwtSecretKey, cookieOptions, async (err, user) => {
        if (err) throw err;
        const { name, email, role } = await User.findById(user.id);
        res.status(200).json({ name, email, role });
    });
});

// logout user
app.post("/logout", (req, res) => {
    res.cookie("authToken", "", {
        sameSite: "none",
        secure: true,
        expires: new Date(0),
    }).json(true);
});

// upload photos of places
// middleware for uploading photos
const upload = multer({
    dest: "uploads",
});
app.post("/upload", upload.array("photos", 100), (req, res) => {
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
        res.status(200).json(links);
    });
});

// add a new place
app.post("/places/new", async (req, res) => {
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
    } = req.body;

    const { authToken } = req.cookies;
    jwt.verify(authToken, jwtSecretKey, cookieOptions, async (err, data) => {
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
        });
        res.status(200).json({
            message: "Place created successfully",
            type: "success",
            newPlace,
        });
    });
});

// get all listing of the particular user
app.get("/listings", (req, res) => {
    const { authToken } = req.cookies;
    jwt.verify(authToken, jwtSecretKey, cookieOptions, async (err, data) => {
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
        res.status(200).json(places);
    });
});

// get details of a place

app.get("/places/edit/:id", async (req, res) => {
    const { id } = req.params;
    const place = await Place.findById(id);
    res.status(200).json(place);
});

// update details of a place
app.put("/places/edit", async (req, res) => {
    const { authToken } = req.cookies;
    const placeData = req.body;
    jwt.verify(authToken, jwtSecretKey, cookieOptions, async (err, data) => {
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
    });
});

// starting the server
let PORT = 3000;
app.listen(PORT, () => {
    console.log("listening on port " + PORT);
});
