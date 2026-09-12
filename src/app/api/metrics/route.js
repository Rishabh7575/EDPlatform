// api route: analytics metrics
import { NextResponse } from "next/server";
import { mockMetrics } from "@/lib/mockData";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role") || "teacher";
  const metrics = role === "student" ? mockMetrics.student : mockMetrics.teacher;
  return NextResponse.json({ ok: true, data: metrics });
}
