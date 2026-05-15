import puppeteer from "puppeteer";

export const maxDuration = 60;

const BASE      = "https://bbau.samarth.edu.in";
const LOGIN_URL = `${BASE}/index.php/site/login`;
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

export async function POST(req) {
  let browser = null;

  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return Response.json(
        { success: false, error: "Username and password are required." },
        { status: 400 }
      );
    }

    // ── Launch Puppeteer ──────────────────────────────────────────────────────
    browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--disable-extensions",
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.setUserAgent(UA);

    // ── Open Login Page ───────────────────────────────────────────────────────
    await page.goto(LOGIN_URL, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForSelector("#loginform-username", { visible: true, timeout: 15000 });

    // Set values directly — no per-character delay
    await page.$eval("#loginform-username", (el, v) => { el.value = v; }, username);
    await page.$eval("#loginform-password", (el, v) => { el.value = v; }, password);
    await page.$eval("#loginform-username", (el) =>
      el.dispatchEvent(new Event("input", { bubbles: true }))
    );
    await page.$eval("#loginform-password", (el) =>
      el.dispatchEvent(new Event("input", { bubbles: true }))
    );

    // ── Submit ────────────────────────────────────────────────────────────────
    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 30000 }),
      page.click('button[type="submit"]'),
    ]);

    // ── Check Login Failure ───────────────────────────────────────────────────
    if (
      page.url().includes("/site/login") ||
      (await page.content()).includes("Incorrect username or password")
    ) {
      await browser.close();
      return Response.json(
        { success: false, error: "Invalid credentials. Login failed." },
        { status: 401 }
      );
    }

    // ── Scrape Profile Only ───────────────────────────────────────────────────
    await page.goto(`${BASE}/index.php/vidhyarthi/profile`, {
      waitUntil: "domcontentloaded",
      timeout: 25000,
    });

    const profile = await page.evaluate(() => {
      const getText = (sel) => document.querySelector(sel)?.innerText?.trim() ?? null;

      const imgEl =
        document.querySelector(".profile-photo img") ??
        document.querySelector(".student-photo img") ??
        document.querySelector(".user-image img") ??
        document.querySelector(".profile-img img") ??
        document.querySelector("img[alt*='photo' i]") ??
        document.querySelector("img[alt*='profile' i]") ??
        document.querySelector(".panel .thumbnail img") ??
        null;

      const category =
        getText(".category") ??
        getText(".admission-category") ??
        (() => {
          const match = Array.from(document.querySelectorAll("table tr")).find((r) =>
            r.querySelector("th, td:first-child")?.innerText?.toLowerCase().includes("category")
          );
          return match?.querySelector("td:last-child")?.innerText?.trim() ?? null;
        })();

      return {
        name:         getText(".student-name") ?? getText("h2") ?? null,
        enrollmentNo: getText(".enroll-no")    ?? null,
        course:       getText(".course-name")  ?? null,
        department:   getText(".dept-name")    ?? null,
        semester:     getText(".semester")     ?? null,
        email:        getText(".student-email") ?? null,
        mobile:       getText(".student-mobile") ?? null,
        category,
        imageUrl: imgEl?.src ?? null,
        tableData: Array.from(document.querySelectorAll("table tr")).map((row) => ({
          label: row.querySelector("th, td:first-child")?.innerText?.trim(),
          value: row.querySelector("td:last-child")?.innerText?.trim(),
        })),
      };
    });

    await browser.close();

    return Response.json({
      success: true,
      data: {
        profile,
        attendance: null,
        notices:    null,
        scrapedAt:  new Date().toISOString(),
      },
    });

  } catch (err) {
    if (browser) await browser.close();
    console.error("[scrape/route.js]", err.message);
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}