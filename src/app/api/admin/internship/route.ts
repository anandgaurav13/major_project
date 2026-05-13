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
  const title = String(body.title ?? "").trim();
  const company = String(body.company ?? "").trim();
  if (!title) return NextResponse.json({ error: "Title required" }, { status: 400 });
  seedDefaultAdminIfEmpty();
  const db = getDb();
  db.prepare("INSERT INTO internships (title, company) VALUES (?, ?)").run(title, company);
  return NextResponse.json({ ok: true });
}
