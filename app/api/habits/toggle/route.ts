import { connectDB } from "@/lib/mongoose";
import HabitDay from "@/models/HabitDay";

export async function POST(req: Request) {
  await connectDB();

  const { habitId, date } = await req.json();

  let record = await HabitDay.findOne({ habitId, date });

  if (!record) {
    record = await HabitDay.create({ habitId, date, completed: true });
  } else {
    record.completed = !record.completed;
    await record.save();
  }

  return Response.json(record);
}
