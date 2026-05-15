import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { getStudyInfo } from "@/lib/studyInfo";

export const maxDuration = 60;

const BASE = "https://bbau.samarth.edu.in";
const LOGIN_URL = `${BASE}/index.php/site/login`;
const PROFILE_URL = `${BASE}/index.php/vidhyarthi/profile/index`;
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};

async function fillAndSubmitLogin(page, username, password) {
  await page.goto(LOGIN_URL, { waitUntil: "domcontentloaded", timeout: 30000 });

  const filled = await page.evaluate(
    (user, pass) => {
      const userInput =
        document.querySelector('input[name="LoginForm[username]"]') ??
        document.querySelector("#loginform-username") ??
        document.querySelector('input[name="username"]');
      const passInput =
        document.querySelector('input[name="LoginForm[password]"]') ??
        document.querySelector("#loginform-password") ??
        document.querySelector('input[type="password"]');
      const submit =
        document.querySelector("#login-form button[type='submit']") ??
        document.querySelector('button[type="submit"]');

      if (!userInput || !passInput || !submit) return false;

      userInput.value = user;
      passInput.value = pass;
      userInput.dispatchEvent(new Event("input", { bubbles: true }));
      passInput.dispatchEvent(new Event("input", { bubbles: true }));
      submit.click();
      return true;
    },
    username,
    password
  );

  if (!filled) {
    throw new Error("Could not find Samarth login form on the page.");
  }

  await page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 30000 }).catch(() => {});
  await new Promise((r) => setTimeout(r, 2000));
}

function loginFailed(url, html) {
  return (
    url.includes("/site/login") ||
    html.includes("Incorrect username or password") ||
    html.includes("Invalid login")
  );
}

export async function POST(req) {
  let browser = null;

  try {
    const body = await req.json();
    const username = String(body.username ?? "").trim();
    const password = String(body.password ?? "");

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Enrollment ID and password are required." },
        { status: 400 }
      );
    }

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

    await fillAndSubmitLogin(page, username, password);

    const afterLoginHtml = await page.content();
    if (loginFailed(page.url(), afterLoginHtml)) {
      await browser.close();
      return NextResponse.json(
        { success: false, error: "Invalid credentials. Please check enrollment ID and password." },
        { status: 401 }
      );
    }

    await page.goto(PROFILE_URL, { waitUntil: "networkidle2", timeout: 35000 }).catch(async () => {
      await page.goto(PROFILE_URL, { waitUntil: "domcontentloaded", timeout: 25000 });
    });

    const scraped = await page.evaluate(() => {
      const getText = (sel) => document.querySelector(sel)?.textContent?.trim() ?? null;

      const name =
        getText(
          "body > div.be-wrapper.be-fixed-sidebar > div.be-content > div > div:nth-child(3) > div > div > div:nth-child(1) > div > div.col-md-9.col-sm-12 > strong"
        ) ??
        getText(".student-name") ??
        getText("h2") ??
        null;

      const department =
        getText(
          "body > div.be-wrapper.be-fixed-sidebar > div.be-content > div > div:nth-child(4) > div > div > div.card-body.table-responsive > div > div > div.card-header.text-uppercase > h5"
        ) ??
        getText(".dept-name") ??
        null;

      const imgEl =
        document.querySelector(
          "body > div.be-wrapper.be-fixed-sidebar > div.be-content > div > div:nth-child(3) > div > div > div:nth-child(1) > div > div.col-md-3.col-sm-12 > img"
        ) ??
        document.querySelector(".profile-photo img") ??
        document.querySelector(".student-photo img") ??
        document.querySelector("img[alt*='profile' i]") ??
        null;

      const category =
        getText(".category") ??
        (() => {
          const match = Array.from(document.querySelectorAll("table tr")).find((r) =>
            r.querySelector("th, td:first-child")?.textContent?.toLowerCase().includes("category")
          );
          return match?.querySelector("td:last-child")?.textContent?.trim() ?? null;
        })();

      return {
        name,
        department,
        imageUrl: imgEl?.src ?? null,
        course: getText(".course-name"),
        email: getText(".student-email"),
        mobile: getText(".student-mobile"),
        category,
        tableData: Array.from(document.querySelectorAll("table tr")).map((row) => ({
          label: row.querySelector("th, td:first-child")?.textContent?.trim(),
          value: row.querySelector("td:last-child")?.textContent?.trim(),
        })),
      };
    });

    await browser.close();
    browser = null;

    const study = getStudyInfo(username);
    const profile = {
      name: scraped.name ?? "Not Found",
      enrollmentNo: username,
      course: scraped.course,
      department: scraped.department ?? "Not Found",
      semester: study.semester != null ? String(study.semester) : null,
      yearOfStudy: study.yearOfStudy,
      admissionYear: study.admissionYear,
      email: scraped.email,
      mobile: scraped.mobile,
      category: scraped.category,
      imageUrl: scraped.imageUrl ?? null,
      tableData: scraped.tableData,
    };

    if (profile.name === "Not Found" && profile.department === "Not Found") {
      return NextResponse.json(
        {
          success: false,
          error:
            "Logged in but could not read profile. The portal layout may have changed — try again later.",
        },
        { status: 502 }
      );
    }

    const res = NextResponse.json({
      success: true,
      data: {
        profile,
        attendance: null,
        notices: null,
        scrapedAt: new Date().toISOString(),
      },
    });

    res.cookies.set("bbau_user", username, COOKIE_OPTS);
    res.cookies.set("bbau_role", "student", COOKIE_OPTS);

    return res;
  } catch (err) {
    if (browser) await browser.close();
    console.error("[scrape/route.js]", err.message);
    return NextResponse.json(
      { success: false, error: err.message || "Scrape failed" },
      { status: 500 }
    );
  }
}
