import { NextResponse } from "next/server";
import { getDb, seedDefaultAdminIfEmpty } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = String(body.username ?? "").trim();
    const password = String(body.password ?? "");
    const role = String(body.role ?? "student") as "student" | "admin";

    if (!username || !password) {
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
    }

    seedDefaultAdminIfEmpty();
    const db = getDb();
    const row = db
      .prepare("SELECT id, username FROM users WHERE username = ? AND password = ?")
      .get(username, password) as { id: number; username: string } | undefined;

    if (!row) {
      return NextResponse.json({ error: "Invalid login" }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true, role });
    res.cookies.set("bbau_user", row.username, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    res.cookies.set("bbau_role", role, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
