import mongoose from "mongoose";

const TestsSchema = new mongoose.Schema({
  test_id: {
    type: String,
  },
  test_name: {
    type: String,
  },
  score: {
    type: String,
  },
});

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
  },

  tests: {
    type: [TestsSchema],
  },
});

export default mongoose.model("Company", CompanySchema);
