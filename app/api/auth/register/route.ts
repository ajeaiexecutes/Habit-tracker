import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req:Request) {
    await connectDB();
    const {email,password}=await req.json();
     
    const userExists=await User.findOne({email});
    if (userExists)return Response.json({
        error:"User already exists with this email"
    })

    const hashed= await  bcrypt.hash(password,10);
    const user= await User.create({email,password:hashed});

    return Response.json(user)

}