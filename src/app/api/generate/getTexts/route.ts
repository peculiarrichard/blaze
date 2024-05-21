import { connect } from "@/lib/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import AiGeneratedText from "@/models/api/aigenerate/aigeneratedtextmodel";
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

    const userAiGeneratedTexts = await AiGeneratedText.find({ userId: userId });
    return NextResponse.json(
      { message: "Contacts selected successfully", userAiGeneratedTexts },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
