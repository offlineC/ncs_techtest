const mongoose = require('mongoose');

const cafeSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        default: generateUniqueId()
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
});


// Pre-save hook to generate a unique ID for the cafe
cafeSchema.pre('save', async function (next) {
    // Check if the cafe already has an ID
    if (this.id) {
        return next();
    }

    try {
        // Generate a unique ID
        let uniqueId = generateUniqueId();

        // Check if the generated ID is already used
        while (await Cafe.exists({ id: uniqueId })) {
            uniqueId = generateUniqueId();
        }

        // Assign the unique ID to the cafe
        this.id = uniqueId;
        next();
    } catch (error) {
        next(error);
    }
});

// Function to generate a unique ID
function generateUniqueId() {
    const prefix = 'CF';
    const randomNumber = Math.floor(Math.random() * 1000000);
    const uniqueId = `${prefix}${randomNumber}`;

    return uniqueId;
}

// Need to specify the naming because it plusralizes the name to "Caves"
module.exports = mongoose.model('Cafe', cafeSchema, 'cafes')

// for testing only

// Cafe Model
const Cafe = mongoose.model('Cafe', cafeSchema, 'cafes');

// // Generate up to 5 dummy cafes
// const dummyCafes = [];

// for (let i = 0; i < 5; i++) {
//     const cafe = new Cafe({
//         id: generateUniqueId(),
//         name: `Cafe ${i + 1}`,
//         description: `Description ${i + 1}`,
//         logo: `Logo ${i + 1}`,
//         location: `Location ${i + 1}`,
//     });

//     dummyCafes.push(cafe);
// }

// // Save the dummy cafes to MongoDB
// Cafe.insertMany(dummyCafes)
//     .then((savedCafes) => {
//         console.log('Dummy cafes saved:', savedCafes);
//     })
//     .catch((error) => {
//         console.error('Error saving dummy cafes:', error);
//     });