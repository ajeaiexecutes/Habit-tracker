import { connectDB } from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json({ error: "Email and password required" }, { status: 400 });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return Response.json({ error: "User already exists with this email" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });

    return Response.json({ success: true, user });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// import { connectDB } from "@/lib/mongoose";
// import User from "@/models/User";
// import bcrypt from "bcryptjs";

// export async function POST(req:Request) {
//     await connectDB();
//     const {email,password}=await req.json();
     
//     const userExists=await User.findOne({email});
//     if (userExists)return Response.json({
//         error:"User already exists with this email"
//     })

//     const hashed= await  bcrypt.hash(password,10);
//     const user= await User.create({email,password:hashed});

//     return Response.json(user)

// }