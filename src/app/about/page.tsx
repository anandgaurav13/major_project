import styles from "./app.module.css";

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>About BBAU</h1>
        <p>Babasaheb Bhimrao Ambedkar University, Lucknow</p>
      </header>

      <section className={styles.heroCard}>
        <div className={styles.heroImg} role="img" aria-label="Campus visual" />
        <div className={styles.heroBody}>
          <div className={styles.titleRow}>
            <div className={`${styles.round} ${styles.gradBlue}`}>
              <i className="bi bi-bank2" />
            </div>
            <div>
              <h2>Babasaheb Bhimrao Ambedkar University</h2>
              <p className={styles.loc}>
                <i className="bi bi-geo-alt" aria-hidden /> Vidya Vihar, Raebareli Road, Lucknow, Uttar Pradesh
              </p>
            </div>
          </div>
          <p className={styles.text}>
            Babasaheb Bhimrao Ambedkar University (BBAU) is a Central University located in Lucknow. Established in
            1996 and upgraded under the Central Universities Act, it advances teaching, research, and social justice in
            line with Dr. B.R. Ambedkar&apos;s vision.
          </p>
        </div>
      </section>

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <i className="bi bi-award" aria-hidden />
          <h3>1996</h3>
          <small>Established</small>
        </div>
        <div className={styles.metric}>
          <i className="bi bi-people" aria-hidden />
          <h3>15,000+</h3>
          <small>Students</small>
        </div>
        <div className={styles.metric}>
          <i className="bi bi-book" aria-hidden />
          <h3>24+</h3>
          <small>Departments</small>
        </div>
        <div className={styles.metric}>
          <i className="bi bi-person-badge" aria-hidden />
          <h3>500+</h3>
          <small>Faculty</small>
        </div>
      </div>

      <div className={styles.two}>
        <article className={styles.panel}>
          <div className={styles.panelHead}>
            <div className={`${styles.roundSm} ${styles.gradBlue}`}>
              <i className="bi bi-bullseye" />
            </div>
            <h3>Mission</h3>
          </div>
          <p>
            Provide quality education and foster research with a focus on inclusivity, empowerment, and social justice
            for marginalized communities.
          </p>
        </article>
        <article className={styles.panel}>
          <div className={styles.panelHead}>
            <div className={`${styles.roundSm} ${styles.gradPurple}`}>
              <i className="bi bi-eye" />
            </div>
            <h3>Vision</h3>
          </div>
          <p>
            Emerge as a center of excellence committed to equality, nation-building, and global knowledge creation.
          </p>
        </article>
      </div>

      <div className={styles.trio}>
        <div className={`${styles.tile} ${styles.gradBlue}`}>
          <i className="bi bi-geo-alt" aria-hidden />
          <h4>Location</h4>
          <small>Vidya Vihar, Lucknow 226025, UP, India</small>
        </div>
        <div className={`${styles.tile} ${styles.gradPurple}`}>
          <i className="bi bi-globe" aria-hidden />
          <h4>Website</h4>
          <small>www.bbau.ac.in · info@bbau.ac.in</small>
        </div>
        <div className={`${styles.tile} ${styles.gradGreen}`}>
          <i className="bi bi-award" aria-hidden />
          <h4>Accreditation</h4>
          <small>NAAC A+ · UGC recognized · Central University</small>
        </div>
      </div>
    </div>
  );
}
