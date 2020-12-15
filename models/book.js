//schema to store books name
const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema

const bookSchema = new mongoose.Schema({
    
    name: {
        type: String,
        trim: true,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        trim: true,
        required: true
    },

    category: {
        type: ObjectId,
        ref: 'Category',
        required: true,
    },

    quantity: {
        type: Number,
        required: true
    },

    image: {
        data: Buffer,
        contentType: String
    },


    author: {
        type: String,
        required: true,
    },

    publication: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    }
},{ timestamps: true });


module.exports = mongoose.model("Books",bookSchema);