import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.use("/api/v1", chatRoutes);

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
};

const startServer = async () => {
  try {
    await connectDB();
    console.log("DB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
};

startServer();