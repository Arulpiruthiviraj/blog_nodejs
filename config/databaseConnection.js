require("dotenv").config();
const mongoose = require("mongoose");

const db = process.env.MONGO_CONNECTION_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.log(err.message);
    //exit on failure
    process.exit(1);
  }
};

module.exports = connectDB;
