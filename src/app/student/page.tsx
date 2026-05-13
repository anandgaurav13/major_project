import Link from "next/link";
import { LogoutButton } from "@/components/LogoutButton/LogoutButton";
import styles from "./app.module.css";

export default function StudentPage() {
  return (
    <div>
      <nav className={styles.nav}>
        <span className={styles.brand}>Student dashboard</span>
        <div className={styles.navActions}>
          <Link href="/" className={styles.btn}>
            Home
          </Link>
          <LogoutButton className={styles.btnOut} />
        </div>
      </nav>

      <header className={styles.hero}>
        <h1>Welcome, student</h1>
        <p>Your academic snapshot (demo content).</p>
      </header>

      <div className={styles.container}>
        <div className={styles.grid}>
          {[
            { icon: "bi-file-earmark-text", label: "Results", cls: styles.icBlue },
            { icon: "bi-cash-coin", label: "Semester fees", cls: styles.icGreen },
            { icon: "bi-journal-check", label: "Assignments", cls: styles.icAmber },
            { icon: "bi-lightbulb", label: "Projects", cls: styles.icRed },
            { icon: "bi-calendar-week", label: "Timetable", cls: styles.icCyan },
            { icon: "bi-book", label: "Syllabus", cls: styles.icSlate },
            { icon: "bi-calendar-event", label: "Academic calendar", cls: styles.icDark },
            { icon: "bi-house", label: "Hostel / mess", cls: styles.icBlue },
            { icon: "bi-book-half", label: "Library", cls: styles.icGreen },
            { icon: "bi-bar-chart", label: "Attendance", cls: styles.icGreen },
            { icon: "bi-headset", label: "Help desk", cls: styles.icRed },
          ].map((c) => (
            <div key={c.label} className={styles.card}>
              <i className={`bi ${c.icon} ${c.cls}`} aria-hidden />
              <h3>{c.label}</h3>
            </div>
          ))}
        </div>

        <section className={styles.block}>
          <h2>Attendance overview</h2>
          <div className={styles.panel}>
            <p>Data Structures → 85%</p>
            <p>Operating Systems → 78%</p>
            <p>DBMS → 90%</p>
          </div>
        </section>

        <section className={styles.block}>
          <h2>Recent results</h2>
          <div className={styles.panel}>
            <p>Semester 6 SGPA: 8.2</p>
            <p>Semester 5 SGPA: 7.8</p>
          </div>
        </section>

        <section className={styles.block}>
          <h2>Announcements</h2>
          <div className={styles.note}>Semester exam form last date: 13 May</div>
          <div className={styles.note}>Library open till 11 PM</div>
        </section>
      </div>

      <footer className={styles.footer}>
        <p>© 2026 Babasaheb Bhimrao Ambedkar University</p>
      </footer>
    </div>
  );
}
