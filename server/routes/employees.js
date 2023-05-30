const express = require('express')
const router = express.Router()
const Employee = require('../models/employee')
const Cafe = require('../models/cafe')
const moment = require('moment')


router.get('/', async (req, res) => {
    let employees;
    let qryCafe = req.query.cafe;
    try {
        const cafe = await Cafe.findOne({ name: qryCafe });

        if (!cafe) {
          // Cafe not found
          return [];
        }
    
        const employees = await Employee.find({ cafeId: cafe._id });
    
        const currentDate = moment();
    
        // Calculate working days for each employee
        const employeesWithWorkingDays = employees.map((employee) => {
          const startDate = moment(employee.startDate);
          const workingDays = currentDate.diff(startDate, 'days');
    
          return {
            ...employee.toObject(),
            workingDays
          };
        });
    
        // Sort employees by working days in descending order
        const sortedEmployees = employeesWithWorkingDays.sort((a, b) => b.workingDays - a.workingDays);

        res.status(200).json(sortedEmployees)
    } catch (err) {
        console.log(err);
    }
});

// //ONLY FOR TESTING PURPOSES
// // POST endpoint for an array of employee objects
// router.post('/employees', async (req, res) => {
//     const employees = req.body; // Array of employee objects

//     try {
//         // Save multiple employees to MongoDB
//         const savedEmployees = await Employee.create(employees);

//         res.status(200).json({ message: 'Employees successfully saved.', savedEmployees });
//     } catch (error) {
//         console.error('Error saving employees:', error);
//         res.status(500).json({ error: 'Internal server error.' });
//     }
// });


module.exports = router;