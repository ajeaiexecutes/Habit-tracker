import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
export async function POST(req:Request) {
    await connectDB();
    const {email,password}=await req.json();
    const user=await User.findOne({email});

    if(!user)return Response.json({
        error:"Invalid email"
    })

    const ok=await bcrypt.compare(password,user.password);
    if(!ok) return Response.json({
        error:"Invalid password"
    })

    const token =jwt.sign({id:user._id},process.env.JWT_SECRET!,{expiresIn:"7d"})

    return Response.json({token})
}