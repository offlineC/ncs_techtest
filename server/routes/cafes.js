const express = require('express')
const router = express.Router()
const Cafe = require('../models/cafe')
const Employee = require('../models/employee')

router.get('/', async (req, res) => {
    let cafes;
    let qryLocation = req.query.location;
    try {
        if (qryLocation) {
            // Get Cafes when location specified
            cafes = await Cafe.aggregate([
                {
                  $match: {
                    location: qryLocation // Replace 'Your Location' with the desired location value
                  }
                },
                {
                  $lookup: {
                    from: 'employees', // Replace 'employees' with the actual collection name for employees
                    localField: '_id',
                    foreignField: 'cafeId',
                    as: 'employees'
                  }
                },
                {
                  $addFields: {
                    employeeCount: { $size: '$employees' }
                  }
                },
                {
                  $sort: {
                    employeeCount: -1
                  }
                },
                {
                  $project: {
                    employees: 0 // Exclude the 'employees' field from the query results
                  }
                }
              ]);
        } else if (qryLocation === '' || qryLocation == null) {
            // Get all when location is not specified
            cafes = await Cafe.aggregate([
                {
                  $lookup: {
                    from: 'employees', // Replace 'employees' with the actual collection name for employees
                    localField: '_id',
                    foreignField: 'cafeId',
                    as: 'employees'
                  }
                },
                {
                  $addFields: {
                    employeeCount: { $size: '$employees' }
                  }
                },
                {
                  $sort: {
                    employeeCount: -1
                  }
                },
                {
                  $project: {
                    employees: 0 // Exclude the 'employees' field from the query results
                  }
                }
              ])

        } else {
            // Return empty array when location is invalid
            cafes = [];
        }
        res.status(200).json(cafes)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});


// //ONLY FOR TESTING PURPOSES
// // POST endpoint for an array of cafe objects
// router.post('/cafes', async (req, res) => {
//     const cafes = req.body; // Array of employee objects

//     try {
//         // Save multiple cafe to MongoDB
//         const savedCafes = await Cafe.create(cafes);

//         res.status(200).json({ message: 'Cafes successfully saved.', savedCafes });
//     } catch (error) {
//         console.error('Error saving cafes:', error);
//         res.status(500).json({ error: 'Internal server error.' });
//     }
// });

module.exports = router;