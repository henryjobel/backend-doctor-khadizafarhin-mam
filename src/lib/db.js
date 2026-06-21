import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/doctor_khadiza_farhin";
  mongoose.set("bufferCommands", false);
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 });
  console.log("MongoDB connected");
}
