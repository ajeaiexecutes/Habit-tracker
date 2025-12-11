import mongoose from "mongoose";


export async function connectDB() {
  if (mongoose.connection.readyState>=1){
    return 
  }
  const uri=process.env.DATABASE_URL!;

  // if(!uri) throw new Error("DATABASE_URL not found in .env")
    return mongoose.connect(uri)
  }