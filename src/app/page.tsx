import Link from "next/link";
import styles from "./app.module.css";

export default function HomePage() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroOverlay} aria-hidden />
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>BBAU Smart Campus Navigation System</h1>
          <p className={styles.heroLead}>
            Discover and navigate Babasaheb Bhimrao Ambedkar University campus with ease
          </p>
          <form className={styles.searchBox} action="/search" method="get">
            <div className={styles.searchRow}>
              <span className={styles.searchIcon}>
                <i className="bi bi-search" aria-hidden />
              </span>
              <input
                type="search"
                name="q"
                className={styles.searchInput}
                placeholder="Search classrooms, departments, hostels…"
              />
              <button type="submit" className={styles.searchBtn}>
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      <div className={styles.pullUp}>
        <section className={styles.cardLift}>
          <h3 className={styles.sectionTitle}>Quick access</h3>
          <div className={styles.quickGrid}>
            <Link href="/departments" className={styles.quickCard}>
              <div className={`${styles.quickIcon} ${styles.gradBlue}`}>
                <i className="bi bi-building" />
              </div>
              <span>Academic blocks</span>
            </Link>
            <Link href="/facilities" className={styles.quickCard}>
              <div className={`${styles.quickIcon} ${styles.gradPurple}`}>
                <i className="bi bi-building-gear" />
              </div>
              <span>Hostels</span>
            </Link>
            <Link href="/facilities" className={styles.quickCard}>
              <div className={`${styles.quickIcon} ${styles.gradGreen}`}>
                <i className="bi bi-book" />
              </div>
              <span>Library</span>
            </Link>
            <Link href="/facilities" className={styles.quickCard}>
              <div className={`${styles.quickIcon} ${styles.gradOrange}`}>
                <i className="bi bi-trophy" />
              </div>
              <span>Sports complex</span>
            </Link>
            <Link href="/facilities" className={styles.quickCard}>
              <div className={`${styles.quickIcon} ${styles.gradPink}`}>
                <i className="bi bi-cup-hot" />
              </div>
              <span>Cafeteria</span>
            </Link>
            <Link href="/contact" className={styles.quickCard}>
              <div className={`${styles.quickIcon} ${styles.gradIndigo}`}>
                <i className="bi bi-briefcase" />
              </div>
              <span>VC office</span>
            </Link>
          </div>
        </section>

        <div className={styles.twoCol}>
          <section className={styles.panel}>
            <div className={styles.panelHead}>
              <i className="bi bi-bell" aria-hidden />
              <h3>Campus announcements</h3>
            </div>
            <article className={styles.announce}>
              <small>Nov 25, 2025</small>
              <h5>Campus shuttle route update</h5>
              <p>New shuttle timing from Hostel Block to Library. Check Bus Schedule.</p>
            </article>
            <article className={styles.announce}>
              <small>Nov 24, 2025</small>
              <h5>Annual Sports Week</h5>
              <p>Registration open for all sports events. Visit Sports Complex for details.</p>
            </article>
            <article className={styles.announce}>
              <small>Nov 22, 2025</small>
              <h5>Library extended hours</h5>
              <p>Central Library now open until 11 PM during examination period.</p>
            </article>
          </section>

          <aside className={styles.asideCol}>
            <div className={`${styles.statCard} ${styles.gradBlue}`}>
              <h5>Campus overview</h5>
              <div className={styles.statRow}>
                <span>Academic blocks</span>
                <strong>12</strong>
              </div>
              <div className={styles.statRow}>
                <span>Departments</span>
                <strong>24</strong>
              </div>
              <div className={styles.statRow}>
                <span>Hostels</span>
                <strong>6</strong>
              </div>
              <div className={styles.statRow}>
                <span>Facilities</span>
                <strong>15+</strong>
              </div>
            </div>
            <Link href="/map" className={styles.mapTeaser}>
              <h5>Explore campus map</h5>
              <p>Interactive map with search, filters, and directions.</p>
              <span className={styles.mapTeaserLink}>View map →</span>
            </Link>
          </aside>
        </div>
      </div>
    </>
  );
}
