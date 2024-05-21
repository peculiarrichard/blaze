import Feedback from "@/models/api/feedback/Feedback";
import { connect } from "@/lib/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  const { rating, comment } = await request.json();
  try {
    const feedback = new Feedback({
      rating,
      comment,
    });
    await feedback.save();
    return NextResponse.json(
      { message: "Feedback submitted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
