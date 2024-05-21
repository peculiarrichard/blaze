import mongoose from "mongoose";

const scheduledJobsSchema = new mongoose.Schema({
  jobIdentifier: {
    type: String,
    required: true,
  },
  jobName: {
    type: String,
    required: true,
  }
});

const ScheduledJobs =
  mongoose.models.scheduledJobs ||
  mongoose.model("scheduledJobs", scheduledJobsSchema);
export default ScheduledJobs;
