import { NextResponse } from "next/server";
import { searchCampus } from "@/lib/searchKnowledge";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const query = String(body.query ?? "");
  const result = searchCampus(query);
  return NextResponse.json({ result });
}
