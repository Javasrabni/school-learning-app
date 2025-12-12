import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { connectDB } from "@/lib/db";
import userAccount from "@/models/userAccount";

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token tidak ditemukan." },
        { status: 401 }
      );
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    const user = await userAccount
      .findById(payload.id)
      .select("-password")
      .lean();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User tidak ditemukan." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar ?? "",
        createdAt: user.createdAt,
        level: user.level ?? 1,
        exp: user.exp ?? 0,
        streak: user.streak ?? 0,
        points: user.points ?? 0,
        grade: user.grade ?? "Kelas 7"
      }
    });

  } catch (error) {
    console.error("ME API ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Token tidak valid." },
      { status: 401 }
    );
  }
}
