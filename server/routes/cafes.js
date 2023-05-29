const express = require('express')
const router = express.Router()
// const Cafe = require('../models/cafe')


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