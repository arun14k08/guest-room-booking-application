// importing required dependencies
const express = require("express");
const cors = require("cors");
const app = express();

// middleware functions
app.use(cors());
app.use(express.json());

//defining routes

// initial test route
app.get("/", (req, res) => {
    res.status(200).json("ok");
});


// starting the server
let PORT = 3000;
app.listen(PORT, () => {
    console.log("listening on port " + PORT);
});
