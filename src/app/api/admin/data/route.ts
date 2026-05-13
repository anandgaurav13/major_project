import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getDb, seedDefaultAdminIfEmpty } from "@/lib/db";

export async function GET() {
  const jar = cookies();
  if (jar.get("bbau_role")?.value !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  seedDefaultAdminIfEmpty();
  const db = getDb();
  const departments = db.prepare("SELECT id, name, location FROM departments ORDER BY id DESC").all();
  const internships = db.prepare("SELECT id, title, company FROM internships ORDER BY id DESC").all();
  const announcements = db.prepare("SELECT id, message FROM announcements ORDER BY id DESC").all();
  return NextResponse.json({ departments, internships, announcements });
}
