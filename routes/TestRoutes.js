import express from "express";
const router = express.Router();

import {
  createTest,
  getTests,
  getTest,
} from "../controllers/TestController.js";

router.route("/").post(createTest).get(getTests);
router.route("/:id").get(getTest);

export default router;
