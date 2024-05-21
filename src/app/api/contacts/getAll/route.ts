import { connect } from "@/lib/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Contacts from "@/models/api/contacts/contactModel";
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

    const userContacts = await Contacts.find({ userId: userId });
    return NextResponse.json(
      { message: "Contacts selected successfully", userContacts },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
