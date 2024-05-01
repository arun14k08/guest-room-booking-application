// importing required dependencies
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cookieOptions = { sameSite: "none", secure: true };
const jwtSecretKey = "ae7821eas5sc5zx51as4as51sdx5asd15as2x1";
// importing schemas
const User = require("./models/User.js");

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
        return res
            .status(200)
            .json({ message: "User does not exists", type: "warning" });
    }
    // checking the password with the hashed password in the database
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res
            .status(200)
            .json({ message: "Incorrect password", type: "warning" });
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

// starting the server
let PORT = 3000;
app.listen(PORT, () => {
    console.log("listening on port " + PORT);
});
