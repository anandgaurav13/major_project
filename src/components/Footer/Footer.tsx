import Link from "next/link";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
            <div className={styles.brandRow}>
              <div className={styles.logo}>BBAU</div>
              <span>Campus Navigator</span>
            </div>
            <p className={styles.muted}>
              Your smart guide to navigating Babasaheb Bhimrao Ambedkar University campus.
            </p>
          </div>
          <div>
            <h6 className={styles.heading}>Quick Links</h6>
            <div className={styles.stack}>
              <Link href="/map">Campus Map</Link>
              <Link href="/departments">Departments</Link>
              <Link href="/facilities">Facilities</Link>
              <Link href="/bus">Bus Schedule</Link>
              <Link href="/bbau">BBAU Info Hub</Link>
            </div>
          </div>
          <div>
            <h6 className={styles.heading}>University</h6>
            <div className={styles.stack}>
              <Link href="/about">About BBAU</Link>
              <Link href="/contact">Contact Us</Link>
              <a href="https://www.bbau.ac.in/admissionspg.aspx" target="_blank" rel="noopener noreferrer">Admissions</a>
              <a href="https://www.bbau.ac.in/Career.aspx" target="_blank" rel="noopener noreferrer">Careers</a>
              <a href="https://www.bbau.ac.in/PublicNotices.aspx" target="_blank" rel="noopener noreferrer">Notices</a>
            </div>
          </div>
          <div>
            <h6 className={styles.heading}>Contact</h6>
            <p className={styles.muted}>
              Vidya Vihar, Raebareli Road
              <br />
              Lucknow - 226025, UP
              <br />
              Toll Free: 1800-180-5789
              <br />
              Fax: +91-522-2440821
            </p>
            <a
              href="https://www.bbau.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "0.78rem", color: "var(--footer-muted)", marginTop: "6px", display: "inline-block" }}
            >
              www.bbau.ac.in ↗
            </a>
          </div>
        </div>
        <div className={styles.copy}>
          © 2026 Babasaheb Bhimrao Ambedkar University, Lucknow. All rights reserved. &nbsp;|&nbsp;
          <a href="https://www.bbau.ac.in/Disclaimer.aspx" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", opacity: 0.7 }}>Disclaimer</a>
        </div>
      </div>
    </footer>
  );
}
