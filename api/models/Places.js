const mongoose = require("mongoose");
const { createSchema } = mongoose;

const placeSchema = createSchema({
    name: {
        type: String,
        required: true,
    },
    images: [String],
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
    checkIn: {
        type: Number,
        required: true,
    },
    checkOut: {
        type: Number,
        required: true,
    },
    maxGuests: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    Beds: {
        type: Number,
        required: true,
    },
    Rooms: {
        type: Number,
        required: true,
    },
    BathRooms: {
        type: Number,
        required: true,
    },
});

const place = mongoose.model("Place", placeSchema);

module.exports = place;
