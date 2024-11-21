// Import dependencies
const express = require('express');

// Assuming you already have a User model
const User = require('./models/User'); // Replace with the correct path to your User model
const router = express.Router();

// GET /users route
router.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;
