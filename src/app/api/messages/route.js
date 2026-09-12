// api route: chat messages
import { NextResponse } from "next/server";
import { mockMessages } from "@/lib/mockData";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const stuId = searchParams.get("studentId");
  const data = stuId ? mockMessages[stuId] || [] : mockMessages;
  return NextResponse.json({ ok: true, data });
}

export async function POST(req) {
  try {
    const { studentId, text, senderId, senderName } = await req.json();
    const msg = {
      id: "m_" + Date.now(),
      senderId: senderId || "user",
      senderName: senderName || "User",
      text,
      ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    return NextResponse.json({ ok: true, message: msg });
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 400 });
  }
}
