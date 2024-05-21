import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: [true, "Please provide platform"],
  },
  contact: {
    type: String,
    required: [true, "Please provide contact"],
  },
  text: {
    type: String,
    required: [true, "Please provide text"],
  },
  date: {
    type: String,
    required: [true, "Please provide date"],
  },
  time: {
    type: String,
    required: [true, "Please provide time"],
  },
  subject: {
    type: String,
    required: [true, "Please provide subject"],
  },
  status: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId : {
    type: String,
    required: true
  }
});

const ScheduledMessages =
  mongoose.models.scheduledMessages ||
  mongoose.model("scheduledMessages", scheduleSchema);

export default ScheduledMessages;

export interface ScheduleFormProps {
  platform: string;
  contact: string;
  text: string;
  date: string;
  time: string;
  subject: string;
}
