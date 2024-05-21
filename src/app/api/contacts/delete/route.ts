import { connect } from "@/lib/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Contacts from "@/models/api/contacts/contactModel";
import { getTokenData } from "@/helpers/getTokenData";

connect();

export async function DELETE(request: NextRequest) {
  try {
    const isAuthenticated = getTokenData(request);
    if (isAuthenticated.status === 401) {
      return NextResponse.json(
        { message: isAuthenticated.message },
        { status: isAuthenticated.status }
      );
    }

    let userId = isAuthenticated.data.id;
    const { _id } = await request.json();

    const deletedContact = await Contacts.findOneAndDelete({ _id, userId });

    if (!deletedContact) {
      return NextResponse.json(
        { message: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Contact deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "internal server error" },
      { status: 500 }
    );
  }
}
