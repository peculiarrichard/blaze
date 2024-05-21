import { connect } from "@/lib/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/helpers/getTokenData";
import AiGeneratedText from "@/models/api/aigenerate/aigeneratedtextmodel";
import { GoogleGenerativeAI } from "@google/generative-ai";

connect();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();
  try {
    const isAuthenticated = getTokenData(request);
    if (isAuthenticated.status === 401) {
      return NextResponse.json(
        { message: isAuthenticated.message },
        { status: isAuthenticated.status }
      );
    }
    let userId = isAuthenticated.data.id;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(
      `Act as a romantic and generate a love text for this user. You can use this prompt as a clue: ${prompt}.`
    );
    const response = await result.response;
    const text = response.text();

    const newGeneratedText = new AiGeneratedText({
      prompt: prompt,
      userId: userId,
      generatedText: text,
    });
    await newGeneratedText.save();
    return NextResponse.json(
      { message: "Text generated successfully", newGeneratedText },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
