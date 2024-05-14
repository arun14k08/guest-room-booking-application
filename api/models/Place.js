const mongoose = require("mongoose");
const { Schema } = mongoose;

const placeSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
        required: true,
    },
    photos: [String],
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    minimumBooking: {
        type: Number,
        required: true,
    },
    maximumBooking: {
        type: Number,
        required: true,
    },
    // checkIn: {
    //     type: Number,
    //     required: true,
    // },
    // checkOut: {
    //     type: Number,
    //     required: true,
    // },
    maxGuests: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    beds: {
        type: Number,
        required: true,
    },
    rooms: {
        type: Number,
        required: true,
    },
    bathRooms: {
        type: Number,
        required: true,
    },
});

const place = mongoose.model("Place", placeSchema);

module.exports = place;
