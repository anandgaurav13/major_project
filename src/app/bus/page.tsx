import styles from "./app.module.css";

export default function BusPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Campus shuttle schedule</h1>
        <p>Shuttle routes and service notes for BBAU campus.</p>
      </header>

      <section className={`${styles.banner} ${styles.gradGreen}`}>
        <div className={styles.bannerRow}>
          <div className={styles.bannerIcon}>
            <i className="bi bi-bus-front" />
          </div>
          <div>
            <h2>All services active</h2>
            <p>Campus shuttles are running on schedule.</p>
          </div>
        </div>
        <div className={styles.bannerStat}>
          <span className={styles.big}>3</span>
          <small>Active routes</small>
        </div>
      </section>

      <div className={styles.layout}>
        <div>
          <h2 className={styles.sub}>
            <i className="bi bi-bus-front" aria-hidden /> Shuttle routes
          </h2>
          <article className={styles.routeCard}>
            <div className={`${styles.routeHead} ${styles.gradBlue}`}>
              <h3>Route A: Main campus loop</h3>
              <div className={styles.meta}>
                <small>
                  <i className="bi bi-clock" aria-hidden /> Every 15 minutes
                </small>
                <small>7:00 AM – 9:00 PM</small>
              </div>
            </div>
            <div className={styles.routeBody}>
              <span className={styles.badge}>
                <i className="bi bi-geo-alt" aria-hidden /> Main Gate
              </span>
              <span className={styles.badge}>
                <i className="bi bi-geo-alt" aria-hidden /> Admin Block
              </span>
              <span className={styles.badge}>
                <i className="bi bi-geo-alt" aria-hidden /> Science Block
              </span>
              <span className={styles.badge}>
                <i className="bi bi-geo-alt" aria-hidden /> Library
              </span>
              <span className={styles.badge}>
                <i className="bi bi-geo-alt" aria-hidden /> Hostels
              </span>
            </div>
          </article>

          <article className={styles.routeCard}>
            <div className={`${styles.routeHead} ${styles.gradPurple}`}>
              <h3>Route C: Hostel shuttle</h3>
              <div className={styles.meta}>
                <small>
                  <i className="bi bi-clock" aria-hidden /> Every 10 minutes
                </small>
                <small>6:30 AM – 10:00 PM</small>
              </div>
            </div>
            <div className={styles.routeBody}>
              <span className={styles.badge}>
                <i className="bi bi-geo-alt" aria-hidden /> Boys Hostel 1
              </span>
              <span className={styles.badge}>
                <i className="bi bi-geo-alt" aria-hidden /> Girls Hostel 1
              </span>
              <span className={styles.badge}>
                <i className="bi bi-geo-alt" aria-hidden /> Library
              </span>
              <span className={styles.badge}>
                <i className="bi bi-geo-alt" aria-hidden /> Cafeteria
              </span>
            </div>
          </article>
        </div>

        <aside className={styles.aside}>
          <div className={styles.alertCard}>
            <h3>
              <i className="bi bi-exclamation-circle" aria-hidden /> Service alerts
            </h3>
            <div className={styles.alertBlue}>
              <p>Route A: extended service during examinations.</p>
              <small>2 hours ago</small>
            </div>
            <div className={styles.alertGreen}>
              <p>All shuttle services running on schedule.</p>
              <small>Just now</small>
            </div>
          </div>
          <div className={`${styles.info} ${styles.gradBlue}`}>
            <h3>Shuttle information</h3>
            <ul>
              <li>Air-conditioned buses on main routes</li>
              <li>Free for students and staff</li>
              <li>Wheelchair accessible buses on Route A</li>
              <li>Emergency desk via campus security</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
