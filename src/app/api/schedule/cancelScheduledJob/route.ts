import { updateStatusInDB } from "@/helpers/sendEmail";
import { connect } from "@/lib/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import ScheduledJobs from "@/models/api/schedule/scheduledJobs";
import schedule from "node-schedule";
// import { getJob, removeJob } from "@/lib/jobStorage";

connect();

export async function POST(request: NextRequest) {
  const { messageId } = await request.json();
  try {
    // const job = getJob(messageId);
    const jobinDb = await ScheduledJobs.findOne({ jobIdentifier: messageId });
    if (jobinDb) {
      const name = jobinDb.jobName;
      const jobtoCancel = schedule.scheduledJobs[name].cancel();
      await updateStatusInDB(messageId, "cancelled");
      // removeJob(messageId);
      return NextResponse.json(
        { message: "Scheduled message cancelled successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Scheduled message not found" },
        { status: 404 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
