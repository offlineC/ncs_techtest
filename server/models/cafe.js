const mongoose = require('mongoose');

const cafeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: true,
    },
})


module.exports = mongoose.model('Cafe', cafeSchema)