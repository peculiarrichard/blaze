import { connect } from "@/lib/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import ScheduledMessages from "@/models/api/schedule/scheduleModel";
import { getTokenData } from "@/helpers/getTokenData";

connect();

export async function GET(request: NextRequest) {
  try {
    const isAuthenticated = getTokenData(request);
    let userId;
    if (isAuthenticated.status === 401) {
      return NextResponse.json(
        { message: isAuthenticated.message },
        { status: isAuthenticated.status }
      );
    } else {
      userId = isAuthenticated.data.id;
    }

    const userMessages = await ScheduledMessages.find({ userId: userId });
    return NextResponse.json(
      { message: "Contacts selected successfully", userMessages },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
