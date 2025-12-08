import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import userAccount from "@/models/userAccount";
import { connectDB } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie");
    const refreshToken = cookie?.split("refreshToken=")[1]?.split(";")[0];

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: "Tidak ada token, silakan login" },
        { status: 401 }
      );
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(refreshToken, secret);

    await connectDB();
    const user = await userAccount.findById(payload.id).select("-password").lean();

    if (!user) {
      return NextResponse.json({ success: false, message: "User tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Unauthorized atau token tidak valid" },
      { status: 401 }
    );
  }
}
