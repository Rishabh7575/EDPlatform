// api route: user login
import { NextResponse } from "next/server";
import { signToken } from "@/lib/auth";
import { mockTeacher, mockStudent } from "@/lib/mockData";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, role } = body;

    const user = role === "student" ? mockStudent : mockTeacher;
    const token = signToken({ id: user.id, email: user.email, role: user.role });

    const res = NextResponse.json({
      ok: true,
      token,
      user,
      message: "Login successful",
    });

    if (token) {
      res.cookies.set("authToken", token, { httpOnly: false, path: "/" });
      res.cookies.set("lms_role", user.role, { httpOnly: false, path: "/" });
    }

    return res;
  } catch (err) {
    return NextResponse.json({ ok: false, message: "Auth error" }, { status: 500 });
  }
}
