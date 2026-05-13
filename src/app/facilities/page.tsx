import styles from "./app.module.css";

export default function FacilitiesPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Hostels and facilities</h1>
        <p>On-campus accommodation and shared facilities for students.</p>
      </header>

      <h2 className={styles.subheading}>
        <i className="bi bi-building-gear" aria-hidden /> Campus hostels
      </h2>
      <div className={styles.grid}>
        <article className={styles.card}>
          <div className={`${styles.cardTop} ${styles.gradBlue}`}>
            <div className={styles.iconWrap}>
              <i className="bi bi-building-gear" />
            </div>
            <h3>Boys Hostel — Block A</h3>
            <small>Boys hostel</small>
          </div>
          <div className={styles.cardBody}>
            <p>
              <i className="bi bi-people" aria-hidden /> 250 students
            </p>
            <span className={styles.tag}>Wi-Fi</span>
            <span className={styles.tag}>Common room</span>
            <span className={styles.tag}>Reading room</span>
            <span className={styles.tag}>Mess</span>
          </div>
        </article>
        <article className={styles.card}>
          <div className={`${styles.cardTop} ${styles.gradPurple}`}>
            <div className={styles.iconWrap}>
              <i className="bi bi-building-gear" />
            </div>
            <h3>Girls Hostel — Block A</h3>
            <small>Girls hostel</small>
          </div>
          <div className={styles.cardBody}>
            <p>
              <i className="bi bi-people" aria-hidden /> 180 students
            </p>
            <span className={styles.tag}>Wi-Fi</span>
            <span className={styles.tag}>Common room</span>
            <span className={styles.tag}>Security</span>
            <span className={styles.tag}>Mess</span>
          </div>
        </article>
        <article className={styles.card}>
          <div className={`${styles.cardTop} ${styles.gradGreen}`}>
            <div className={styles.iconWrap}>
              <i className="bi bi-building-gear" />
            </div>
            <h3>International students hostel</h3>
            <small>International</small>
          </div>
          <div className={styles.cardBody}>
            <p>
              <i className="bi bi-people" aria-hidden /> 100 students
            </p>
            <span className={styles.tag}>Wi-Fi</span>
            <span className={styles.tag}>Cultural center</span>
            <span className={styles.tag}>Common kitchen</span>
          </div>
        </article>
      </div>

      <h2 className={styles.subheading}>
        <i className="bi bi-trophy" aria-hidden /> Campus facilities
      </h2>
      <div className={styles.splitGrid}>
        <article className={styles.splitCard}>
          <div className={`${styles.media} ${styles.mediaLib}`} />
          <div className={styles.splitBody}>
            <div className={`${styles.roundIcon} ${styles.gradBlue}`}>
              <i className="bi bi-book" />
            </div>
            <h3>Central Library</h3>
            <p>Books, e-journals, and digital learning spaces.</p>
            <small>
              <i className="bi bi-clock" aria-hidden /> Mon–Sat: 8:00 AM – 11:00 PM
            </small>
          </div>
        </article>
        <article className={styles.splitCard}>
          <div className={`${styles.media} ${styles.mediaSports}`} />
          <div className={styles.splitBody}>
            <div className={`${styles.roundIcon} ${styles.gradGreen}`}>
              <i className="bi bi-trophy" />
            </div>
            <h3>Sports complex</h3>
            <p>Outdoor and indoor courts with coaching support.</p>
            <small>
              <i className="bi bi-clock" aria-hidden /> Mon–Sat: 6:00 AM – 8:00 PM
            </small>
          </div>
        </article>
      </div>
    </div>
  );
}
