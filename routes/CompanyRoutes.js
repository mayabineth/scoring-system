import express from "express";
const router = express.Router();

import {
  getCompanies,
  createCompany,
  editCompany,
} from "../controllers/CompanyController.js";

router.route("/").post(createCompany).get(getCompanies).patch(editCompany);
export default router;
