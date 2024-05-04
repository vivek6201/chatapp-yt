import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to mongoDB");
  } catch (err) {
    console.log("Error to Connect mongoDB ", err);
  }
};
export default connectToDB;
