// /api/refresh.ts
import { SignJWT, jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const cookies = Object.fromEntries(cookieHeader.split("; ").map(c => c.split("=")));
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) return NextResponse.json({ success: false, message: "No refresh token" }, { status: 401 });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const payload = await jwtVerify(refreshToken, secret);

    // generate new access token
    const accessToken = await new SignJWT({ id: payload.payload.id })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1d")
      .sign(secret);

    return NextResponse.json({ success: true, accessToken });
  } catch (err) {
    return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
  }
}
