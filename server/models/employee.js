const mongoose = require('mongoose');
const cafe = require('cafe');

// Basic UserSchema
const employeeSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    email_address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true
    },
    // Store the work history as an array
    workHistory: {
        type: [workHistorySchema],
        required: true,
        validate: {
            validator: function (value) {
                const workHistoryIds = value.map((item) => item.cafeId.toString());
                return new Set(workHistoryIds).size === workHistoryIds.length;
            },
            message: 'Each work history entry must be unique.',
        },
    },

});

// Work History Schema
const workHistoryList = new mongoose.Schema({
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

// Define a pre-save hook to generate the "id" field value
employeeSchema.pre('save', function (next) {
    // Only generate the "id" if it's a new document
    if (!this.isNew) {
        return next();
    }

    // Generate the alphanumeric value for the "id" field
    const alphanumericValue = generateAlphanumericValue();

    // Assign the generated value to the "id" field
    this.id = `UI${alphanumericValue}`;

    return next();
});

// Custom function to generate alphanumeric value
function generateAlphanumericValue() {
    // Generate a random alphanumeric string of length 7
    const alphanumericString = Math.random()
        .toString(36)
        .replace(/[^a-z0-9]+/g, '')
        .substr(0, 7);

    return alphanumericString;
}

const workHistory = mongoose.model('workHistoryList', workHistoryListSchema);

module.exports = mongoose.model('Employee', employeeSchema)