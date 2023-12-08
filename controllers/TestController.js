import Test from "../models/Test.js";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const createTest = async (req, res) => {
  const { name, desc, questions } = req.body;
  const test = await Test.create({ name, desc, questions });
  res.status(201).json({ test });
};
const getTests = async (req, res) => {
  const allTests = await Test.find({});
  res.status(200).json({ allTests });
};
const getTest = async (req, res) => {
  const { id: testId } = req.params;
  const test = await Test.findOne({ _id: testId });
  res.status(200).json({ test });
};

export { createTest, getTests, getTest };
