const express = require('express')
const router = express.Router()
const Cafe = require('../models/cafe')
const Employee = require('../models/employee')
const workHistory = require('../models/workHistory')

router.get('/', async (req, res) => {
    let cafes;
    let qryLocation = req.query.location;
    try {
        if (qryLocation) {
            // Get Cafes when location specified
            cafes = await Cafe.aggregate([
                {
                    $match: { location: qryLocation } // Filter cafes by location
                },
                {
                    $lookup: {
                        from: 'employees',
                        let: { cafeId: '$_id' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ['$workHistory.cafeId', '$$cafeId'] // Match employee's cafeId with the cafe's _id
                                    }
                                }
                            },
                            {
                                $project: {
                                    name: 1,
                                    workHistory: {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: '$workHistory',
                                                    as: 'wh',
                                                    cond: { $eq: ['$$wh.cafeId', '$$cafeId'] } // Filter work history by cafe ID
                                                }
                                            },
                                            -1 // Get the latest work history entry
                                        ]
                                    }
                                }
                            },
                            {
                                $match: { 'workHistory': { $ne: null } } // Exclude employees without matching work history
                            },
                            {
                                $group: {
                                    _id: null,
                                    employeeCount: { $sum: 1 } // Count the matching employees
                                }
                            }
                        ],
                        as: 'employees'
                    }
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        description: 1,
                        logo: 1,
                        location: 1,
                        employeeCount: { $ifNull: [{ $arrayElemAt: ['$employees.employeeCount', 0] }, 0] } // Set employeeCount to the count value, or 0 if it doesn't exist
                    }
                },
                {
                    $sort: { employeeCount: -1 } // Sort by descending order of employee count
                }
            ]);

        } else if (qryLocation === '' || qryLocation == null) {
            // Get all when location is not specified
            cafes = await Cafe.aggregate([
                {
                    $lookup: {
                        from: 'employees', // Replace 'employees' with the actual collection name for employees
                        localField: '_id',
                        foreignField: 'workHistory.cafeId',
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