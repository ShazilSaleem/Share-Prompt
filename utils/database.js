import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strict", true);
  if (isConnected) {
    console.log("Already Connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      dbName: "promptify",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Mongo DB Connected !   ");
  } catch (error) {
    console.log(error);
  }
};
