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
  const name = String(body.name ?? "").trim();
  const location = String(body.location ?? "").trim();
  if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 });
  seedDefaultAdminIfEmpty();
  const db = getDb();
  db.prepare("INSERT INTO departments (name, location) VALUES (?, ?)").run(name, location);
  return NextResponse.json({ ok: true });
}
