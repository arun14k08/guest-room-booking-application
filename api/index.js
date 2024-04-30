// importing required dependencies
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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

// register a new user
app.post("/v1/register", async (req, res) => {
    const { name, email, phone, password } = req.body;
    const isUserExists = await User.findOne({ email: email });
    if (isUserExists) {
        return res
            .status(200)
            .json({ message: "User already exists", type: "warning" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
    });
    console.log("New user created");
    res.status(200).json({
        user,
        message: "User created successfully",
        type: "success",
    });
});

// login user
app.post("/login", async (req, res) => {
    const { name, password } = req.body;
});

// starting the server
let PORT = 3000;
app.listen(PORT, () => {
    console.log("listening on port " + PORT);
});
