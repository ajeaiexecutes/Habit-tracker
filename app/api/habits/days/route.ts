import { connectDB } from "@/lib/mongoose";
import HabitDay from "@/models/HabitDay";

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const habitId = searchParams.get("habitId");

  if (!habitId) {
    return Response.json({ error: "Missing habitId" }, { status: 400 });
  }

  const days = await HabitDay.find({ habitId });

  return Response.json(days);
}
