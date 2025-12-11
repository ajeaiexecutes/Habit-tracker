import mongoose, { Schema, models } from "mongoose";

const HabitSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  description: { type: String },
  frequency: { type: String, default: "Daily" },
});

export default models.Habit || mongoose.model("Habit", HabitSchema);
