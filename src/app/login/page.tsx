"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./app.module.css";

const STEPS = [
  "Opening Samarth portal…",
  "Logging you in…",
  "Fetching your profile…",
  "Almost done…",
];

export default function LoginPage() {
  const router = useRouter();
  const [error,   setError]   = useState<string | null>(null);
  const [loading, setLoading] = useState<"student" | "admin" | null>(null);
  const [stepIdx, setStepIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cycle through progress messages while student login is in flight
  useEffect(() => {
    if (loading === "student") {
      setStepIdx(0);
      intervalRef.current = setInterval(() => {
        setStepIdx((i) => Math.min(i + 1, STEPS.length - 1));
      }, 5000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [loading]);

  // ── Student login: scrape Samarth portal & store data ────────────────────
  async function submitStudent(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading("student");
    const form     = e.currentTarget;
    const username = (form.elements.namedItem("username") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    // Abort after 120 seconds to unblock the UI
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 120_000);

    try {
      const res = await fetch("/api/scrape", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ username, password }),
        signal:  controller.signal,
      });

      clearTimeout(timer);
      const json = await res.json();

      if (!res.ok || !json.success) {
        setError(json.error ?? "Login failed. Please check your credentials.");
        setLoading(null);
        return;
      }

      // Persist scraped data for the student page
      sessionStorage.setItem("bbau_student_data", JSON.stringify(json.data));
      router.push("/student");
    } catch (err: unknown) {
      clearTimeout(timer);
      const isAbort = err instanceof Error && err.name === "AbortError";
      setError(isAbort ? "Request timed out. Please try again." : "Network error. Please try again.");
      setLoading(null);
    }
  }

  // ── Admin login: existing local-auth flow ─────────────────────────────────
  async function submitAdmin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading("admin");
    const form = e.currentTarget;
    const username = (form.elements.namedItem("username") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role: "admin" }),
    });
    setLoading(null);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError((data as { error?: string }).error ?? "Login failed");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className={styles.page}>
      <nav className={styles.topbar}>
        <span className={styles.brand}>BBAU Campus Navigator</span>
        <div className={styles.topLinks}>
          <Link href="/" className={styles.ghost}>
            Home
          </Link>
          <Link href="/contact" className={styles.ghostSec}>
            Contact
          </Link>
        </div>
      </nav>

      <div className={styles.hero}>
        <h1 className={styles.title}>Login portal</h1>
        {error && <div className={styles.alert}>{error}</div>}
        <div className={styles.grid}>
          <form className={styles.card} onSubmit={submitStudent}>
            <h2>Student login</h2>
            <label className={styles.field}>
              <span>Username</span>
              <div className={styles.inputRow}>
                <i className="bi bi-person" aria-hidden />
                <input name="username" placeholder="Student username" required autoComplete="username" />
              </div>
            </label>
            <label className={styles.field}>
              <span>Password</span>
              <div className={styles.inputRow}>
                <i className="bi bi-lock" aria-hidden />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  autoComplete="current-password"
                />
              </div>
            </label>
            <label className={styles.check}>
              <input type="checkbox" /> Remember me
            </label>
            <button type="submit" className={styles.btnPrimary} disabled={loading !== null}>
              {loading === "student" ? (
                <span style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center" }}>
                  <span className={styles.btnSpinner} />
                  {STEPS[stepIdx]}
                </span>
              ) : "Login"}
            </button>
            <div className={styles.links}>
              <span>Forgot password?</span>
              <span>Register</span>
              <span>Help</span>
            </div>
          </form>

          <form className={styles.card} onSubmit={submitAdmin}>
            <h2>Admin login</h2>
            <label className={styles.field}>
              <span>Username</span>
              <div className={styles.inputRow}>
                <i className="bi bi-person-badge" aria-hidden />
                <input name="username" placeholder="Admin username" required autoComplete="username" />
              </div>
            </label>
            <label className={styles.field}>
              <span>Password</span>
              <div className={styles.inputRow}>
                <i className="bi bi-lock" aria-hidden />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  autoComplete="current-password"
                />
              </div>
            </label>
            <button type="submit" className={styles.btnDanger} disabled={loading !== null}>
              {loading === "admin" ? "Signing in…" : "Login"}
            </button>
            <div className={styles.links}>
              <span>Admin help</span>
              <span>Security policy</span>
            </div>
          </form>
        </div>
        <p className={styles.hint}>
          Demo accounts (seeded on first login): <code>student</code> / <code>123</code> and{" "}
          <code>admin</code> / <code>123</code>. Choose the matching card.
        </p>
      </div>
    </div>
  );
}
