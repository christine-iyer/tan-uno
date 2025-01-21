import express from "express";
import User from "../../models/User.js";

const router = express.Router();

// GET /
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// DELETE /:id
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// POST /
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message }); // Return specific validation errors
  }
});


// PUT /:id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, password },
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
