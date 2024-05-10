import mongoose from "mongoose";
import { Schema } from "mongoose";

const bookingSchema = new Schema({
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    checkInDate: {
        type: String,
        required: true,
    },
    checkOutDate: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    guests: {
        type: Number,
        required: true,
    },
});
