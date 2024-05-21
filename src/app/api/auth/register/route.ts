import { connect } from "@/lib/dbConfig";
import User from "@/models/api/auth/userModel";

import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  const { firstName, lastName, email, phone, password } = await request.json();
  try {
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { message: "An account with this email already exist", success: false },
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });
    await newUser.save();
    return NextResponse.json(
      {
        message: "Account created successfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
