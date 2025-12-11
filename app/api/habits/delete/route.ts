import { connectDB } from "@/lib/mongoose";
import Habit from "@/models/Habit";

export  async function DELETE(req:Request) {
    await connectDB();

    const {searchParams}=new URL(req.url)
    const habitId=searchParams.get("habitId");

    const res=await Habit.findOneAndDelete({_id:habitId})

    return Response.json({
        msg:"deleted",
        habit:res
    },{status:200})
}
