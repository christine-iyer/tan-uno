import express from "express";
import User from "../../models/user.js"; // Adjust path as needed

const router = express.Router();

// GET /users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// POST /users
router.post("/users", async (req, res) => {
  try {
    const { name, age } = req.body;
    const newUser = new User({ name, age });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  try {
    // Update user by ID
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, age },
      { new: true, runValidators: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;
