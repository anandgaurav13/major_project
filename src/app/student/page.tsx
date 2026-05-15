"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./app.module.css";

/* ── Types ───────────────────────────────────────────────────────────────── */
interface TableRow { label?: string; value?: string }
interface Profile {
  name?: string | null;
  enrollmentNo?: string | null;
  course?: string | null;
  department?: string | null;
  semester?: string | null;
  yearOfStudy?: number | null;
  admissionYear?: number | null;
  email?: string | null;
  mobile?: string | null;
  category?: string | null;
  imageUrl?: string | null;
  tableData?: TableRow[];
}
interface AttendanceRow { subject?: string; held?: string; present?: string; percent?: string }
interface Notice       { title?: string; date?: string; link?: string | null }
interface StudentData  { profile: Profile; attendance: AttendanceRow[] | null; notices: Notice[] | null; scrapedAt: string }

/* ── Helpers ─────────────────────────────────────────────────────────────── */
function pct(str?: string) {
  const n = parseFloat(str ?? "0");
  return isNaN(n) ? 0 : Math.min(n, 100);
}
function attendanceColor(p: number) {
  if (p >= 75) return "#059669";
  if (p >= 60) return "#ca8a04";
  return "#b91c1c";
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function StudentPage() {
  const router  = useRouter();
  const [data,      setData]      = useState<StudentData | null>(null);
  const [activeTab, setActiveTab] = useState<"profile" | "attendance" | "notices">("profile");

  useEffect(() => {
    const raw = sessionStorage.getItem("bbau_student_data");
    if (!raw) { router.replace("/login"); return; }
    try { setData(JSON.parse(raw)); } catch { router.replace("/login"); }
  }, [router]);

  async function logout() {
    sessionStorage.removeItem("bbau_student_data");
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  /* ── Loading ── */
  if (!data) return (
    <div className={styles.loadingWrap}>
      <div className={styles.spinner} />
      <p>Loading your dashboard…</p>
    </div>
  );

  const { profile, attendance, notices, scrapedAt } = data;
  const attendanceRows = (attendance ?? []).filter(r => r.subject);
  const noticeRows     = (notices     ?? []).filter(n => n.title);
  const extraRows      = (profile.tableData ?? []).filter(
    r => r.label && r.value && r.label.trim() !== r.value.trim()
  );
  const avgAttendance  = attendanceRows.length
    ? Math.round(attendanceRows.reduce((s, r) => s + pct(r.percent), 0) / attendanceRows.length)
    : null;

  return (
    <div>
      {/* ── Navbar ── */}
      <nav className={styles.nav}>
        <span className={styles.brand}>Student Dashboard</span>
        <div className={styles.navActions}>
          <Link href="/"   className={styles.btn}>Home</Link>
          <Link href="/map" className={styles.btn}>Campus Map</Link>
          <button className={styles.btnOut} onClick={logout}>Logout</button>
        </div>
      </nav>

      {/* ── Hero / Profile banner ── */}
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          {/* Avatar */}
          {profile.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.imageUrl} alt="Profile" className={styles.avatar} />
          ) : (
            <div className={styles.avatarFallback}>
              {(profile.name ?? "S")[0].toUpperCase()}
            </div>
          )}
          <div>
            <h1 className={styles.heroName}>Welcome, {profile.name ?? "Student"}</h1>
            <p className={styles.heroMeta}>
              {[profile.course, profile.department, profile.semester ? `Semester ${profile.semester}` : null]
                .filter(Boolean).join(" · ")}
            </p>
            <div className={styles.badges}>
              {profile.enrollmentNo && <span className={styles.badge}>🎓 {profile.enrollmentNo}</span>}
              {profile.category     && <span className={styles.badge}>📋 {profile.category}</span>}
              {profile.email        && <span className={styles.badge}>✉️ {profile.email}</span>}
            </div>
          </div>
        </div>
      </header>

      {/* ── Stat strip ── */}
      <div className={styles.statsStrip}>
        <div className={styles.stat}>
          <span className={styles.statValue}>{attendanceRows.length || "—"}</span>
          <span className={styles.statLabel}>Subjects</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue} style={{ color: avgAttendance !== null ? attendanceColor(avgAttendance) : undefined }}>
            {avgAttendance !== null ? `${avgAttendance}%` : "—"}
          </span>
          <span className={styles.statLabel}>Avg Attendance</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{noticeRows.length || "—"}</span>
          <span className={styles.statLabel}>Notices</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>{profile.semester ?? "—"}</span>
          <span className={styles.statLabel}>Semester</span>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className={styles.tabs}>
        {(["profile", "attendance", "notices"] as const).map(t => (
          <button
            key={t}
            className={`${styles.tab} ${activeTab === t ? styles.tabActive : ""}`}
            onClick={() => setActiveTab(t)}
          >
            {t === "profile"    && "👤 Profile"}
            {t === "attendance" && `📊 Attendance${attendanceRows.length ? ` (${attendanceRows.length})` : ""}`}
            {t === "notices"    && `🔔 Notices${noticeRows.length ? ` (${noticeRows.length})` : ""}`}
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      <div className={styles.container}>

        {/* Profile tab */}
        {activeTab === "profile" && (
          <div className={styles.grid}>
            {/* Primary info card */}
            <div className={`${styles.panel} ${styles.infoCard}`}>
              <h2 className={styles.panelTitle}>Personal Information</h2>
              <dl className={styles.dl}>
                {([
                  ["Full Name",     profile.name],
                  ["Enrollment No", profile.enrollmentNo],
                  ["Course",        profile.course],
                  ["Department",    profile.department],
                  ["Year of Study", profile.yearOfStudy != null ? String(profile.yearOfStudy) : null],
                  ["Semester",      profile.semester],
                  ["Category",      profile.category],
                  ["Email",         profile.email],
                  ["Mobile",        profile.mobile],
                ] as [string, string | null | undefined][]).filter(([, v]) => v).map(([label, value]) => (
                  <div key={label} className={styles.dlRow}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Extra table rows card */}
            {extraRows.length > 0 && (
              <div className={`${styles.panel} ${styles.infoCard}`}>
                <h2 className={styles.panelTitle}>Additional Details</h2>
                <dl className={styles.dl}>
                  {extraRows.map((r, i) => (
                    <div key={i} className={styles.dlRow}>
                      <dt>{r.label}</dt>
                      <dd>{r.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        )}

        {/* Attendance tab */}
        {activeTab === "attendance" && (
          <div className={styles.block}>
            <h2>Attendance Overview</h2>
            {attendanceRows.length === 0 ? (
              <div className={styles.empty}>No attendance data available.</div>
            ) : (
              <div className={styles.panel}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Subject</th>
                      <th>Held</th>
                      <th>Present</th>
                      <th>Percentage</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceRows.map((row, i) => {
                      const p = pct(row.percent);
                      const color = attendanceColor(p);
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td><strong>{row.subject}</strong></td>
                          <td>{row.held ?? "—"}</td>
                          <td>{row.present ?? "—"}</td>
                          <td>
                            <div className={styles.barWrap}>
                              <div className={styles.barBg}>
                                <div className={styles.barFill} style={{ width: `${p}%`, background: color }} />
                              </div>
                              <span style={{ color, fontWeight: 600, minWidth: "3.5rem" }}>{row.percent ?? "—"}</span>
                            </div>
                          </td>
                          <td>
                            <span className={styles.pill} style={{
                              background: p >= 75 ? "#d1fae5" : p >= 60 ? "#fef3c7" : "#fee2e2",
                              color,
                            }}>
                              {p >= 75 ? "✅ Good" : p >= 60 ? "⚠️ Low" : "❌ Short"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Notices tab */}
        {activeTab === "notices" && (
          <div className={styles.block}>
            <h2>Notices &amp; Announcements</h2>
            {noticeRows.length === 0 ? (
              <div className={styles.empty}>No notices available.</div>
            ) : (
              noticeRows.map((n, i) => (
                <div key={i} className={styles.note}>
                  <div className={styles.noticeRow}>
                    <span className={styles.noticeIcon}>📢</span>
                    <div>
                      <p className={styles.noticeTitle}>{n.title}</p>
                      {n.date && <p className={styles.noticeDate}>{n.date}</p>}
                    </div>
                    {n.link && (
                      <a href={n.link} target="_blank" rel="noreferrer" className={styles.btn} style={{ marginLeft: "auto" }}>
                        View →
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <p>
          Data sourced from Samarth ERP &nbsp;·&nbsp;
          Fetched: {new Date(scrapedAt).toLocaleString("en-IN")}
        </p>
      </footer>
    </div>
  );
}
