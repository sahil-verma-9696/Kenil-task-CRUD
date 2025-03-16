import mongoose from "mongoose";
import { config } from "dotenv";
config();

export async function connectDB() {
  try {
    const responce = await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB connect Successfully`);
  } catch (error) {
    console.log("Error function connectDB : " + error.message);
  }
}
