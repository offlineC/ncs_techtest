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

// POST /employees
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



module.exports = router;