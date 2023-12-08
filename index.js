import TestRoutes from "./routes/TestRoutes.js";
import CompanyRoutes from "./routes/CompanyRoutes.js";

import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import express from "express";
const app = express();
app.use(cors());

app.use(express.json());
app.use("/tests", TestRoutes);
app.use("/companies", CompanyRoutes);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
