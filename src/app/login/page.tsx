"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import styles from "./app.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<"student" | "admin" | null>(null);

  async function submit(e: FormEvent<HTMLFormElement>, role: "student" | "admin") {
    e.preventDefault();
    setError(null);
    setLoading(role);
    const form = e.currentTarget;
    const username = (form.elements.namedItem("username") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, role }),
    });
    setLoading(null);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError((data as { error?: string }).error ?? "Login failed");
      return;
    }
    router.push(role === "admin" ? "/admin" : "/student");
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
          <form className={styles.card} onSubmit={(e) => submit(e, "student")}>
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
              {loading === "student" ? "Signing in…" : "Login"}
            </button>
            <div className={styles.links}>
              <span>Forgot password?</span>
              <span>Register</span>
              <span>Help</span>
            </div>
          </form>

          <form className={styles.card} onSubmit={(e) => submit(e, "admin")}>
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
