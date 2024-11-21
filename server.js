import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = 2028;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(encodeURIComponent("mongodb://localhost:27017//edithbird:C0nfidenceClub!@cluster0.w3guwmj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"))
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Schema and Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

const User = mongoose.model("User", userSchema);

// Routes
app.post("/users", async (req, res) => {
  try {
    const { name, age } = req.body;
    const newUser = new User({ name, age });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
