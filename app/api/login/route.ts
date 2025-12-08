import { connectDB } from "@/lib/db";
import userAccount from "@/models/userAccount";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { usernameOrEmail, password } = await req.json();

    if (!usernameOrEmail || !password) {
      return NextResponse.json(
        { success: false, message: "Email/Password tidak boleh kosong" },
        { status: 400 }
      );
    }

    const user = await userAccount.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    });

    if (!user || user.password !== password) {
      return NextResponse.json(
        { success: false, message: "Email atau password salah" },
        { status: 401 }
      );
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

    // Access token 1 hari
    const accessToken = await new SignJWT({ id: user._id.toString() })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1d")
      .sign(secret);

    // Refresh token 30 hari
    const refreshToken = await new SignJWT({ id: user._id.toString() })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("30d")
      .sign(secret);

    const res = NextResponse.json({
      success: true,
      message: "Login Berhasil",
      accessToken,
    });

    // Simpan accessToken di cookie (bisa diakses middleware)
    res.cookies.set("token", accessToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 hari
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    // Simpan refreshToken di cookie
    res.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 hari
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
