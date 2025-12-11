import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/mongoose";
import Habit from "@/models/Habit";

export async function POST(req: Request) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json();
  console.log("body", body);

  const habit = await Habit.create({
    name: body.name,
    description: body.description,
    userId: session.user.id,  
  });

  return Response.json(habit);
}
