// importing required dependencies
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");

// middleware functions

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
app.post("/v1/register", (req, res) => {
    const { name, email, phone, password } = req.body;
    res.status(200).json({ name, email, phone, password });
});

// starting the server
let PORT = 3000;
app.listen(PORT, () => {
    console.log("listening on port " + PORT);
});
