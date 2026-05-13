"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import styles from "./Navbar.module.css";

const links = [
  { href: "/", label: "Home", icon: "bi-house-door", page: "home" },
  { href: "/map", label: "Campus Map", icon: "bi-map", page: "map" },
  { href: "/departments", label: "Departments", icon: "bi-building", page: "departments" },
  { href: "/routes", label: "Navigation", icon: "bi-signpost-2", page: "routes" },
  { href: "/facilities", label: "Facilities", icon: "bi-building-gear", page: "facilities" },
  { href: "/bus", label: "Bus Schedule", icon: "bi-bus-front", page: "bus" },
  { href: "/about", label: "About", icon: "bi-info-circle", page: "about" },
  { href: "/contact", label: "Contact", icon: "bi-telephone", page: "contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} onClick={() => setOpen(false)}>
          <div className={styles.logo}>
            <img
              src="https://www.bbau.ac.in/bbau/bbauLogo.png"
              alt="BBAU"
              data-logo="brand"
              width={36}
              height={36}
            />
          </div>
          <div className={styles.brandText}>
            <div className={styles.brandTitle}>BBAU Campus Navigator</div>
            <div className={styles.brandSub}>Smart Navigation System</div>
          </div>
        </Link>

        <ul className={`${styles.links} ${open ? styles.linksOpen : ""}`}>
          {links.map((l) => {
            const active =
              l.href === "/"
                ? pathname === "/"
                : pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`${styles.link} ${active ? styles.linkActive : ""}`}
                  data-page={l.page}
                  onClick={() => setOpen(false)}
                >
                  <i className={`bi ${l.icon} ${styles.linkIcon}`} aria-hidden />
                  {l.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link href="/login" className={styles.login} onClick={() => setOpen(false)}>
              <i className="bi bi-person" aria-hidden />
              Login
            </Link>
          </li>
        </ul>

        <div className={styles.actions}>
          <ThemeToggle />
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={styles.toggleBar} />
            <span className={styles.toggleBar} />
            <span className={styles.toggleBar} />
          </button>
        </div>
      </div>
    </nav>
  );
}
