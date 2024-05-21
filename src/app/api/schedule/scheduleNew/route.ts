import schedule from "node-schedule";
import { sendEmail } from "@/helpers/sendEmail";
import { connect } from "@/lib/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/helpers/getTokenData";
import { extractDateComponents } from "@/helpers/extractDateToCron";
import ScheduledMessages from "@/models/api/schedule/scheduleModel";
// import { addJob } from "@/lib/jobStorage";
import ScheduledJobs from "@/models/api/schedule/scheduledJobs";

connect();

export async function POST(request: NextRequest) {
  const { platform, contact, text, date, time, subject } = await request.json();
  try {
    const isAuthenticated = getTokenData(request);
    if (isAuthenticated.status === 401) {
      return NextResponse.json(
        { message: isAuthenticated.message },
        { status: isAuthenticated.status }
      );
    }
    let { id, firstName, email } = isAuthenticated.data;
    const scheduleDate = extractDateComponents(date, time);
    const presentDate = new Date();

    const newScheduledMessage = new ScheduledMessages({
      platform: platform,
      contact: contact,
      text: text,
      date: date,
      time: time,
      subject: subject,
      status: "pending",
      userId: id,
      createdAt: presentDate.toISOString(),
    });
    const savedMessage = await newScheduledMessage.save();
    if (!savedMessage) {
      return NextResponse.json(
        { message: "Error saving text to DB" },
        { status: 400 }
      );
    }
    const messageId = newScheduledMessage._id;
    const job = schedule.scheduleJob(scheduleDate, async () => {
      await sendEmail(contact, text, firstName, email, subject, messageId);
    });
    // addJob(messageId, job);
    const scheduledJob = new ScheduledJobs({
      jobIdentifier: messageId,
      jobName: job.name,
    });
    const savedJob = await scheduledJob.save();

    if (!savedJob) {
      return NextResponse.json(
        { message: "Error saving job to DB" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Text scheduled successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
