import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
type TokenDataResult =
  | { status: 200; data: any; message: string }
  | { status: 401; message: string };

export const getTokenData = (req: NextRequest): TokenDataResult => {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return { status: 401, message: "Unauthorized" };
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);
    return { status: 200, data: decodedToken, message: "Authorized" };
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return { status: 401, message: "Token expired" };
    } else if (error.name === "JsonWebTokenError") {
      return { status: 401, message: "Invalid token" };
    } else {
      return { status: 401, message: "Unauthorized" };
    }
  }
};
