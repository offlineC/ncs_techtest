const mongoose = require('mongoose')
const Cafe = require('./cafe')

// Basic employee Schema
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
    cafeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
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

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;

//testing only

const generateDummyEmployees = async () => {
    const cafeIds = await Cafe.find({}, '_id'); // Retrieve all cafe IDs from the Cafe collection

    const dummyEmployees = [];
    for (let i = 0; i < 10; i++) {
        const randomCafeIndex = Math.floor(Math.random() * cafeIds.length);
        const cafeId = cafeIds[randomCafeIndex]._id;

        const employee = new Employee({
            id: generateAlphanumericValue(),
            name: 'Employee ' + (i + 1),
            email_address: 'employee' + (i + 1) + '@example.com',
            phone: '9876543' + i,
            gender: i % 2 === 0 ? 'Male' : 'Female',
            cafeId: cafeId,
            startDate: new Date('2022-01-0' + (i + 1))
        });

        dummyEmployees.push(employee);
    }

    return dummyEmployees;
};

generateDummyEmployees()
    .then((dummyEmployees) => {
        console.log(dummyEmployees);
        // Save the dummyEmployees to the employee collection or perform any other operations
        Employee.create(dummyEmployees)
            .then((savedEmployees) => {
                console.log('Employees saved:', savedEmployees);
                // Perform any additional operations after saving the employees
            })
            .catch((error) => {
                console.error('Error saving employees:', error);
            });
    })
    .catch((error) => {
        console.error(error);
    });