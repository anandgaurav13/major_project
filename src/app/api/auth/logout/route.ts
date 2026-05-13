import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("bbau_user", "", { path: "/", maxAge: 0 });
  res.cookies.set("bbau_role", "", { path: "/", maxAge: 0 });
  return res;
}
