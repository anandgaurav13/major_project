import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDb, seedDefaultAdminIfEmpty } from "@/lib/db";

function assertAdmin() {
  const jar = cookies();
  if (jar.get("bbau_role")?.value !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  return null;
}

export async function POST(request: Request) {
  const denied = assertAdmin();
  if (denied) return denied;
  const body = await request.json();
  const message = String(body.message ?? "").trim();
  if (!message) return NextResponse.json({ error: "Message required" }, { status: 400 });
  seedDefaultAdminIfEmpty();
  const db = getDb();
  db.prepare("INSERT INTO announcements (message) VALUES (?)").run(message);
  return NextResponse.json({ ok: true });
}
