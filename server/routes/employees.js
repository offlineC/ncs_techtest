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

router.post('/', async (req, res) => {
    try {
        const { name, email_address, phone, gender, cafeId, startDate } = req.body;

        // Create a new employee instance
        const employee = new Employee({
            name,
            email_address,
            phone,
            gender,
            cafeId,
            startDate
        });

        employee.startDate = Date(employee.startDate);

        // Save the employee to the database
        const savedEmployee = await employee.save();

        res.status(201).json(savedEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create employee' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email_address, phone, gender } = req.body;

        // Find the employee by their ID
        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // Update the employee details
        employee.name = name;
        employee.email_address = email_address;
        employee.phone = phone;
        employee.gender = gender;

        // Save the updated employee to the database
        const updatedEmployee = await employee.save();

        res.json(updatedEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update employee' });
    }
});




module.exports = router;