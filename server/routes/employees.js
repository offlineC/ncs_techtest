const express = require('express')
const router = express.Router()
const Employee = require('../models/employee')


//ONLY FOR TESTING PURPOSES
// POST endpoint for an array of employee objects
router.post('/employees', async (req, res) => {
    const employees = req.body; // Array of employee objects

    try {
        // Save multiple employees to MongoDB
        const savedEmployees = await Employee.create(employees);

        res.status(200).json({ message: 'Employees successfully saved.', savedEmployees });
    } catch (error) {
        console.error('Error saving employees:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});


module.exports = router;