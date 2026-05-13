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
            </div>
          </div>
          <div>
            <h6 className={styles.heading}>University</h6>
            <div className={styles.stack}>
              <Link href="/about">About BBAU</Link>
              <Link href="/contact">Contact Us</Link>
              <span className={styles.disabled}>Admissions</span>
              <span className={styles.disabled}>Careers</span>
            </div>
          </div>
          <div>
            <h6 className={styles.heading}>Contact</h6>
            <p className={styles.muted}>
              Vidya Vihar, Raebareli Road
              <br />
              Lucknow - 226025, UP
              <br />
              Phone: +91-522-2440821
              <br />
              Email: info@bbau.ac.in
            </p>
          </div>
        </div>
        <div className={styles.copy}>
          © 2026 Babasaheb Bhimrao Ambedkar University, Lucknow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
