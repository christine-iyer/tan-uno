import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/api/userRoutes.js"; // Ensure correct file path

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2028;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
app.use('/api', userRoutes);
app.use('/users', newUser)

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
