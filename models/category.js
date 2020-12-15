//schema for category of various books
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
}, { timestamps: true }
);

module.exports = mongoose.model("Categories",categorySchema);