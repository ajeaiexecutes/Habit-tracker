import mongoose, { Schema, models } from "mongoose";

const HabitDaySchema = new Schema({
  habitId: { type: mongoose.Schema.Types.ObjectId, ref: "Habit", required: true },
  date: { type: String, required: true },  
  completed: { type: Boolean, default: false },
});

export default models.HabitDay || mongoose.model("HabitDay", HabitDaySchema);
