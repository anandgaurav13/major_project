import Link from "next/link";
import styles from "./app.module.css";

export default function DepartmentsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Academic departments</h1>
        <p>Explore the diverse academic departments at BBAU.</p>
      </header>

      <section className={styles.card}>
        <div className={`${styles.catHead} ${styles.gradBlue}`}>
          <div className={styles.catIcon}>
            <i className="bi bi-radioactive" />
          </div>
          <div>
            <h2>Science</h2>
            <p>Four flagship science departments</p>
          </div>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.deptGrid}>
            {["Physics", "Chemistry", "Mathematics", "Environmental Sciences"].map((name) => (
              <article key={name} className={styles.dept}>
                <div className={`${styles.deptIcon} ${styles.gradBlue}`}>
                  <i className="bi bi-building" />
                </div>
                <div>
                  <h3>{name}</h3>
                  <p>Research-led programmes and modern laboratories.</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.card}>
        <div className={`${styles.catHead} ${styles.gradPurple}`}>
          <div className={styles.catIcon}>
            <i className="bi bi-laptop" />
          </div>
          <div>
            <h2>Engineering and technology</h2>
            <p>UIET and allied programmes</p>
          </div>
        </div>
        <div className={styles.uietBanner} role="img" aria-label="UIET campus visual placeholder" />
        <div className={styles.cardBody}>
          <div className={styles.deptGrid}>
            <article className={styles.dept}>
              <div className={`${styles.deptIcon} ${styles.gradPurple}`}>
                <i className="bi bi-building" />
              </div>
              <div>
                <h3>Computer Science and IT</h3>
                <p>Software engineering, AI, and data science tracks.</p>
              </div>
            </article>
            <article className={styles.dept}>
              <div className={`${styles.deptIcon} ${styles.gradPurple}`}>
                <i className="bi bi-building" />
              </div>
              <div>
                <h3>Electronics</h3>
                <p>VLSI, embedded systems, and communication engineering.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <div className={styles.stats}>
        <div className={`${styles.stat} ${styles.gradBlue}`}>
          <h3>24+</h3>
          <span>Departments</span>
        </div>
        <div className={`${styles.stat} ${styles.gradGreen}`}>
          <h3>6</h3>
          <span>Academic categories</span>
        </div>
        <div className={`${styles.stat} ${styles.gradPurple}`}>
          <h3>12</h3>
          <span>Academic blocks</span>
        </div>
      </div>

      <p className={styles.footerNote}>
        Need directions? <Link href="/map">Open the campus map</Link> or <Link href="/routes">plan a route</Link>.
      </p>
    </div>
  );
}
