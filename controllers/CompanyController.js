import Company from "../models/Company.js";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const createCompany = async (req, res) => {
  const { name, tests } = req.body;
  const company = await Company.create({ name, tests });
  res.status(201).json({ company });
};
const getCompanies = async (req, res) => {
  const allCompanies = await Company.find({});
  res.status(200).json({ allCompanies });
};
const editCompany = async (req, res) => {
  const { name, tests, _id } = req.body;
  const company = await Company.findOne({ _id: _id });
  if (!company) {
    throw new NotFoundError(`No company with id :${_id}`);
  }
  const updatedCompany = await Company.findOneAndUpdate(
    { _id: _id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({ updatedCompany });
};

export { getCompanies, createCompany, editCompany };
