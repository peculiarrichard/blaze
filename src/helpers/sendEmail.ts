import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import ScheduledMessages from "@/models/api/schedule/scheduleModel";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const APP_PASSWORD = process.env.APP_PASSWORD;

export async function updateStatusInDB(id: string, status: string) {
  try {
    const message = await ScheduledMessages.findOneAndUpdate(
      { _id: id },
      { status: status }
    );
  } catch (error) {
    throw new Error("Error updating status:" + error);
  }
}

export async function sendEmail(
  contact: string,
  text: string,
  firstName: string,
  email: string,
  subject: string,
  id: string
) {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: ADMIN_EMAIL,
      pass: APP_PASSWORD,
    },
  });

  try {
    const mailOptions = {
      from: email,
      to: contact,
      subject: subject,
      replyTo: email,
      html: ` 
    <p>${text}</p>
    <p>With Love,</p>
    <p> ${firstName}</p>`,
    };

    const info = await transport.sendMail(mailOptions);
    if (info) {
      await updateStatusInDB(id, "success");
    }
    return NextResponse.json({ message: "Email Sent" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
