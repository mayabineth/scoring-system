import mongoose from "mongoose";
const ansSchema = new mongoose.Schema({
  answer: {
    type: String,
  },
  score: {
    type: String,
  },
});
const QuesSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  weight: {
    type: String,
  },
  answers: {
    type: [ansSchema],
  },
});

const TestSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  desc: {
    type: String,
  },
  questions: {
    type: [QuesSchema],
  },
});

export default mongoose.model("Test", TestSchema);
