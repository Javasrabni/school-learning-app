import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({
    success: true,
    message: "Logout berhasil",
  });

  // Hapus access token
  res.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  // Hapus refresh token
  res.cookies.set("refreshToken", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return res;
}
