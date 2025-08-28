import mongoose from "mongoose";

export default async function connect_db() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB connected successfully");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
