import { Schema, model } from "mongoose";

// User Schema
const userSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

// Export Model
export default model("User", userSchema);
