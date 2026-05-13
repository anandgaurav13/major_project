"use client";

import { useCallback, useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

const STORAGE_KEY = "bbau-theme";

function readTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  const t = document.documentElement.getAttribute("data-theme");
  return t === "dark" ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTheme(readTheme());
  }, []);

  const toggle = useCallback(() => {
    const next: "light" | "dark" = readTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    setTheme(next);
  }, []);

  if (!mounted) {
    return (
      <span className={styles.placeholder} aria-hidden>
        <span className={styles.phIcon} />
      </span>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={styles.btn}
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? <i className="bi bi-sun-fill" aria-hidden /> : <i className="bi bi-moon-stars-fill" aria-hidden />}
    </button>
  );
}
