const express = require('express')
const router = express.Router()
const Cafe = require('../models/cafe')
const Employee = require('../models/employee')

router.get('/', async (req, res) => {
    let cafes;
    let qryLocation = req.query.location;
    let qryId = req.query.id;
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

        if (qryId) {
            cafes = await Cafe.find({ _id: qryId });
        }
        res.status(200).json(cafes)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});


router.post('/', async (req, res) => {
    try {
        const { name, description, location, logo } = req.body;

        // Create a new cafe instance
        const cafe = new Cafe({
            name,
            description,
            location,
            logo
        });

        // Save the cafe to the database
        const savedCafe = await cafe.save();

        res.status(201).json(savedCafe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create cafe' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, location, logo } = req.body;

        // Find the cafe by its ID
        const cafe = await Cafe.findById(id);

        if (!cafe) {
            return res.status(404).json({ error: 'Cafe not found' });
        }

        // Update the cafe details
        cafe.name = name;
        cafe.description = description;
        cafe.location = location;
        cafe.logo = logo

        // Save the updated cafe to the database
        const updatedCafe = await cafe.save();

        res.json(updatedCafe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update cafe' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find the cafe by its ID and remove it
        const deletedCafe = await Cafe.findByIdAndDelete(id);

        if (!deletedCafe) {
            return res.status(404).json({ error: 'Cafe not found' });
        }

        res.json({ message: 'Cafe deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete cafe' });
    }
});


module.exports = router;