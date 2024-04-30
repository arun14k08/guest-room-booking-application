// importing required dependencies
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
app.post("/v1/register", async (req, res) => {
    const { name, email, phone, password, type } = req.body;
    // checking if there is an user with the same email
    const user = await User.findOne({ email: email });
    if (user) {
        console.log("User already exists");
        return res
            .status(200)
            .json({ message: "User already exists", type: "warning" });
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
        type,
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
app.post("/v1/login", async (req, res) => {
    const { email, password } = req.body;
    // checking if the email is correct or not
    const user = await User.findOne({ email: email });
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
        { name: user.name, email: user.email },
        jwtSecretKey,
        {},
        (err, token) => {
            res.cookie("authToken", token, { sameSite: "none", secure: true })
                .status(200)
                .json({
                    message: "Logged in successfully",
                    type: "success",
                    name: user.name,
                    email: user.email,
                });
        }
    );
});

// starting the server
let PORT = 3000;
app.listen(PORT, () => {
    console.log("listening on port " + PORT);
});
