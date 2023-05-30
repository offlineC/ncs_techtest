const express = require('express')
const router = express.Router()
const Employee = require('../models/employee')
const Cafe = require('../models/cafe')


router.get('/', async(req,res)=>{
    let employees;
    let qryCafe = req.query.cafe;
    try{
        if(qryCafe){
            employees = await Employee.aggregate([
                {
                  $match: {
                    name: qryCafe // Match employees by cafe name
                  }
                },
                {
                  $lookup: {
                    from: 'workhistories', // Replace 'workhistories' with the actual collection name for work histories
                    localField: '_id',
                    foreignField: 'employeeId',
                    as: 'workHistories'
                  }
                },
                {
                  $addFields: {
                    latestWorkHistory: {
                      $arrayElemAt: ['$workHistories', -1] // Get the latest work history for each employee
                    },
                    daysWorked: {
                      $divide: [
                        {
                          $subtract: [new Date(), { $arrayElemAt: ['$workHistories.startDate', -1] }] // Calculate the number of days worked
                        },
                        1000 * 60 * 60 * 24 // Convert milliseconds to days
                      ]
                    }
                  }
                },
                {
                  $sort: {
                    daysWorked: 1 // Sort by ascending order of days worked
                  }
                },
                {
                  $project: {
                    _id: 1,
                    name: 1,
                    email_address: 1,
                    phone: 1,
                    gender: 1,
                    daysWorked: 1,
                    cafe: qryCafe
                  }
                }
              ]);
        }

        res.status(200).json(employees)
    } catch(err){
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