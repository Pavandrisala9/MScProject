import mongoose from "mongoose";

const connectDB = async (URI) => {
  try {
    await mongoose.connect(URI);
  } catch (err) {
    console.log(err.message);
  }
};

export default connectDB;
