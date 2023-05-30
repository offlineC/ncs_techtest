const mongoose = require('mongoose')
const cafe = require('./cafe')
const workHistory = require('./workHistory')

// Basic UserSchema
const employeeSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
        default: function () {
            const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let id = 'UI';
            for (let i = 0; i < 7; i++) {
                id += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));
            }
            return id;
        }
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
        type: [workHistory.workHistorySchema],
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

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;

// // for testing only

// const Cafe = cafe; // Assuming you have a Cafe model defined

// // Generate dummy data for employees
// async function generateDummyEmployees(numEmployees) {
//   const dummyEmployees = [];

//   try {
//     const cafes = await Cafe.find(); // Fetch all cafes from the database

//     for (let i = 0; i < numEmployees; i++) {
//       const employee = {
//         name: `Employee ${i + 1}`,
//         email_address: `employee${i + 1}@example.com`,
//         phone: `123456789${i}`,
//         gender: i % 2 === 0 ? 'Male' : 'Female',
//         workHistory: [
//           {
//             cafeId: cafes[Math.floor(Math.random() * cafes.length)]._id, // Randomly select a cafe ID from existing cafes
//             startDate: new Date(),
//           }
//         ]
//       };

//       dummyEmployees.push(employee);
//     }

//     return dummyEmployees;
//   } catch (error) {
//     console.error('Error fetching cafes:', error);
//     throw error;
//   }
// }

// // Generate 10 unique dummy employees
// generateDummyEmployees(10)
//   .then((dummyEmployees) => {
//     console.log('Dummy employees generated:', dummyEmployees);

//     // Save the dummy employees to MongoDB
//     const Employee = mongoose.model('Employee', employeeSchema);
//     return Employee.insertMany(dummyEmployees);
//   })
//   .then((savedEmployees) => {
//     console.log('Dummy employees saved:', savedEmployees);
//   })
//   .catch((error) => {
//     console.error('Error generating or saving dummy employees:', error);
//   });