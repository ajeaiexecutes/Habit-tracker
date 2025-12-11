import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import HabitList from "@/components/HabitList";
import { connectDB } from "@/lib/mongoose";
import Habit from "@/models/Habit";
import { HabitType } from "@/components/HabitList";
import AddHabitModal from "@/components/AddHabitModel";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  await connectDB();

  const rawHabits = await Habit.find({ userId: session.user.id }).lean();

const habits = rawHabits.map((h) => ({
  ...h,
  _id: h._id.toString(),
  userId: h.userId.toString(),
}));

  return (
    <div className="p-6 flex gap-10">
      <div className="w-full  pr-5 flex flex-col gap-5">
        <AddHabitModal />
        <HabitList habit={habits} />
      </div>
      

      {/* <div className="flex-1">
        <h1 className="text-xl font-bold">Select a habit</h1>
      </div> */}
    </div>
  );
}
