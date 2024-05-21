import { connect } from "@/lib/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Contacts from "@/models/api/contacts/contactModel";
import { getTokenData } from "@/helpers/getTokenData";

connect();

export async function PUT(request: NextRequest) {
  try {
    const isAuthenticated = getTokenData(request);
    if (isAuthenticated.status === 401) {
      return NextResponse.json(
        { message: isAuthenticated.message },
        { status: isAuthenticated.status }
      );
    }
    let userId = isAuthenticated.data.id;
    const { _id, name, email, phone } = await request.json();
    const timeStamp = new Date().toISOString();

    const contact = await Contacts.findOneAndUpdate(
      { _id: _id, userId: userId },
      { name: name, email: email, phone: phone, updatedAt: timeStamp },
      { new: true }
    );
    if (!contact) {
      return NextResponse.json(
        { message: "Contact not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Contact updated successfully", contact },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "internal server error" },
      { status: 500 }
    );
  }
}
