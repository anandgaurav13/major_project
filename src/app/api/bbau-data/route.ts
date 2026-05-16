import { NextResponse } from "next/server";
import { BBAU_STATIC_NOTICES, BBAU_STATIC_EVENTS } from "@/lib/bbauData";

export const runtime = "nodejs";
export const revalidate = 3600; // cache 1 hour

interface Notice {
  date: string;
  title: string;
  url: string;
}

interface Event {
  title: string;
  url: string;
  date?: string;
}

async function fetchBBAUPage(): Promise<string | null> {
  try {
    const res = await fetch("https://www.bbau.ac.in/", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
          "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

function parseNotices(html: string): Notice[] {
  const notices: Notice[] = [];
  // Match the Latest News section pattern: date + link
  const noticeRegex =
    /<li[^>]*>\s*(?:<[^>]+>)*\s*((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|MAR|MAY|APR|FEB|JAN)\s*\d{1,2}(?:,?\s*\d{4})?)\s*(?:<[^>]+>)*\s*<a\s+href="([^"]+)"[^>]*>([^<]+)<\/a>/gi;

  let m: RegExpExecArray | null;
  while ((m = noticeRegex.exec(html)) !== null && notices.length < 20) {
    const date = m[1].trim();
    const url = m[2].startsWith("http") ? m[2] : `https://www.bbau.ac.in/${m[2].replace(/^\//, "")}`;
    const title = m[3].replace(/\s+/g, " ").trim();
    if (title.length > 5 && url.includes(".pdf") || url.includes(".aspx")) {
      notices.push({ date, title, url });
    }
  }
  return notices;
}

function parseEvents(html: string): Event[] {
  const events: Event[] = [];
  // Find links inside the Events/Announcement section
  const sectionMatch = html.match(/Events\s*\/\s*Announcement([\s\S]{0,6000}?)More\.\./i);
  if (!sectionMatch) return events;

  const section = sectionMatch[1];
  const linkRegex = /<a\s+href="([^"]+)"[^>]*>([^<]{10,200})<\/a>/gi;
  let m: RegExpExecArray | null;
  while ((m = linkRegex.exec(section)) !== null && events.length < 15) {
    const url = m[1].startsWith("http") ? m[1] : `https://www.bbau.ac.in/${m[1].replace(/^\//, "")}`;
    const title = m[2].replace(/\s+/g, " ").trim();
    if (title.length > 10) {
      events.push({ title, url });
    }
  }
  return events;
}

function parseAdmissions(html: string): { name: string; url: string }[] {
  const admissions: { name: string; url: string }[] = [];
  // Look for admission-related links in the scrolling ticker area
  const admRegex = /<a\s+href="([^"]+)"[^>]*>([^<]*[Aa]dmission[^<]*)<\/a>/gi;
  let m: RegExpExecArray | null;
  while ((m = admRegex.exec(html)) !== null && admissions.length < 8) {
    const url = m[1].startsWith("http") ? m[1] : `https://www.bbau.ac.in/${m[1].replace(/^\//, "")}`;
    const name = m[2].replace(/\s+/g, " ").trim();
    if (name.length > 5) {
      admissions.push({ url, name });
    }
  }
  return admissions;
}

export async function GET() {
  const html = await fetchBBAUPage();

  if (!html) {
    // Return static fallback
    return NextResponse.json({
      success: true,
      source: "static",
      notices: BBAU_STATIC_NOTICES,
      events: BBAU_STATIC_EVENTS,
      admissions: [],
      fetchedAt: new Date().toISOString(),
    });
  }

  const liveNotices = parseNotices(html);
  const liveEvents = parseEvents(html);
  const liveAdmissions = parseAdmissions(html);

  return NextResponse.json({
    success: true,
    source: "live",
    notices: liveNotices.length > 0 ? liveNotices : BBAU_STATIC_NOTICES,
    events: liveEvents.length > 0 ? liveEvents : BBAU_STATIC_EVENTS,
    admissions: liveAdmissions,
    fetchedAt: new Date().toISOString(),
  });
}
