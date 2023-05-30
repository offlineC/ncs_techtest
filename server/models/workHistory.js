const mongoose = require('mongoose')
const cafe = require('./cafe')

// Work History Schema
const workHistorySchema = new mongoose.Schema({
    cafeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cafe',
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    }
});


const workHistory = mongoose.model('workHistory', workHistorySchema);
module.exports = workHistory;
module.exports.workHistorySchema = workHistorySchema