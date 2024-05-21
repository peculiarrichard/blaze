import { connect } from "@/lib/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Contacts from "@/models/api/contacts/contactModel";
import { getTokenData } from "@/helpers/getTokenData";

connect();

export async function POST(request: NextRequest) {
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
    const { name, email, phone, isOnWhatsapp } = await request.json();
    const timeStamp = new Date().toISOString();
    const existingContact = await Contacts.findOne({ email });
    if (existingContact) {
      return NextResponse.json(
        { message: "Contact already exists" },
        { status: 400 }
      );
    }
    const contact = new Contacts({
      name,
      email,
      phone,
      isOnWhatsapp,
      userId: userId,
      createdAt: timeStamp,
      updatedAt: timeStamp,
    });
    await contact.save();
    return NextResponse.json(
      { message: "Contact created successfully", contact },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
