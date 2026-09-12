// api route: courses catalog
import { NextResponse } from "next/server";
import { mockCourses } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json({ ok: true, data: mockCourses });
}

export async function POST(req) {
  try {
    const newCrs = await req.json();
    return NextResponse.json({ ok: true, course: newCrs });
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 400 });
  }
}
