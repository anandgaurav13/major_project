"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoutButton } from "@/components/LogoutButton/LogoutButton";
import styles from "./app.module.css";

type Department = { id: number; name: string; location: string };
type Internship = { id: number; title: string; company: string };
type Announcement = { id: number; message: string };

type AdminPayload = {
  departments: Department[];
  internships: Internship[];
  announcements: Announcement[];
};

export default function AdminPage() {
  const [data, setData] = useState<AdminPayload | null>(null);

  async function load() {
    const res = await fetch("/api/admin/data", { credentials: "include" });
    if (res.ok) {
      setData(await res.json());
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function postJson(url: string, body: Record<string, string>) {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });
    await load();
  }

  return (
    <div>
      <nav className={styles.nav}>
        <span className={styles.brand}>BBAU Admin Panel</span>
        <div className={styles.navActions}>
          <Link href="/" className={styles.btn}>
            Home
          </Link>
          <LogoutButton className={styles.btnOut} />
        </div>
      </nav>

      <header className={styles.hero}>
        <h1>Admin dashboard</h1>
        <p>Manage campus navigation content (SQLite-backed).</p>
      </header>

      <div className={styles.container}>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <h2>{data?.departments.length ?? "—"}</h2>
            <span>Departments</span>
          </div>
          <div className={styles.stat}>
            <h2>{data?.internships.length ?? "—"}</h2>
            <span>Internships</span>
          </div>
          <div className={styles.stat}>
            <h2>{data?.announcements.length ?? "—"}</h2>
            <span>Announcements</span>
          </div>
        </div>

        <section className={styles.section}>
          <h2>Add department</h2>
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              void postJson("/api/admin/department", {
                name: String(fd.get("name") ?? ""),
                location: String(fd.get("location") ?? ""),
              });
              e.currentTarget.reset();
            }}
          >
            <input name="name" placeholder="Department name" required />
            <input name="location" placeholder="Location" />
            <button type="submit">Add department</button>
          </form>
        </section>

        <section className={styles.section}>
          <h2>Add internship</h2>
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              void postJson("/api/admin/internship", {
                title: String(fd.get("title") ?? ""),
                company: String(fd.get("company") ?? ""),
              });
              e.currentTarget.reset();
            }}
          >
            <input name="title" placeholder="Title" required />
            <input name="company" placeholder="Company" />
            <button type="submit">Add internship</button>
          </form>
        </section>

        <section className={styles.section}>
          <h2>Post announcement</h2>
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              void postJson("/api/admin/announcement", {
                message: String(fd.get("message") ?? ""),
              });
              e.currentTarget.reset();
            }}
          >
            <textarea name="message" rows={3} placeholder="Announcement text" required />
            <button type="submit">Post</button>
          </form>
        </section>

        <section className={styles.section}>
          <h2>Departments</h2>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {data?.departments.map((d) => (
                  <tr key={d.id}>
                    <td>{d.name}</td>
                    <td>{d.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Internships</h2>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Company</th>
                </tr>
              </thead>
              <tbody>
                {data?.internships.map((i) => (
                  <tr key={i.id}>
                    <td>{i.title}</td>
                    <td>{i.company}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Announcements</h2>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {data?.announcements.map((a) => (
                  <tr key={a.id}>
                    <td>{a.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
        <p>© 2026 Babasaheb Bhimrao Ambedkar University</p>
      </footer>
    </div>
  );
}
