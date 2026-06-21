import mongoose from "mongoose";

let connectionPromise = null;

export async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/doctor_khadiza_farhin";
  mongoose.set("bufferCommands", false);
  mongoose.set("strictQuery", true);
  connectionPromise = mongoose
    .connect(uri, { serverSelectionTimeoutMS: 15000 })
    .then((connection) => {
      console.log("MongoDB connected");
      return connection;
    })
    .catch((error) => {
      connectionPromise = null;
      throw error;
    });

  return connectionPromise;
}
