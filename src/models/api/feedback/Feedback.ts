import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  rating: {
    type: String,
    required: [true, "Please provide rating"],
  },
  comment: {
    type: String,
  },
});

const Feedback =
  mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);
export default Feedback;

export interface FeedbackFormProps {
  rating: string;
  comment: string;
}