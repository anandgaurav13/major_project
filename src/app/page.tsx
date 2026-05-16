"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BBAU_INFO,
  BBAU_SCHOOLS,
  BBAU_CENTRES,
  BBAU_INFRASTRUCTURE,
  BBAU_QUICK_LINKS,
  BBAU_IMPORTANT_LINKS,
  BBAU_ADMISSIONS,
  BBAU_PROGRAMMES,
  BBAU_STATIC_NOTICES,
  BBAU_STATIC_EVENTS,
} from "@/lib/bbauData";
import styles from "./home.module.css";

interface Notice { date: string; title: string; url: string; }
interface Event  { title: string; url: string; date?: string; }

export default function HomePage() {
  const [notices, setNotices]     = useState<Notice[]>(BBAU_STATIC_NOTICES);
  const [events,  setEvents]      = useState<Event[]>(BBAU_STATIC_EVENTS);
  const [source,  setSource]      = useState<"static" | "live">("static");
  const [loading, setLoading]     = useState(true);
  const [activeTab, setActiveTab] = useState<"notices" | "events" | "admissions">("notices");

  useEffect(() => {
    fetch("/api/bbau-data")
      .then(r => r.json())
      .then(d => {
        if (d.success) {
          if (d.notices?.length) setNotices(d.notices);
          if (d.events?.length)  setEvents(d.events);
          setSource(d.source ?? "static");
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.page}>

      {/* ════════════════════════════════════════
          HERO — campus navigator + BBAU branding
          ════════════════════════════════════════ */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} aria-hidden />
        <div className={styles.heroInner}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://www.bbau.ac.in/bbau/bbauLogo.png"
            alt="BBAU Logo"
            className={styles.heroLogo}
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
          <span className={styles.heroBadge}>NIRF Ranked #37 · Central University</span>
          <h1 className={styles.heroTitle}>
            Babasaheb Bhimrao Ambedkar University
          </h1>
          <p className={styles.heroSub}>Smart Campus Navigation &amp; Information System</p>

          {/* Search bar */}
          <form className={styles.searchBox} action="/search" method="get">
            <span className={styles.searchIcon}><i className="bi bi-search" aria-hidden /></span>
            <input
              type="search"
              name="q"
              className={styles.searchInput}
              placeholder="Search classrooms, departments, hostels, facilities…"
            />
            <button type="submit" className={styles.searchBtn}>Search</button>
          </form>

          {/* CTA buttons */}
          <div className={styles.heroActions}>
            <Link href="/map" className={styles.btnWhite}>
              <i className="bi bi-map" /> Campus Map
            </Link>
            <a href="http://bbau.samarth.ac.in" target="_blank" rel="noopener noreferrer" className={styles.btnGhost}>
              <i className="bi bi-person-badge" /> Samarth ERP
            </a>
            <a href="https://www.bbau.ac.in/" target="_blank" rel="noopener noreferrer" className={styles.btnGhost}>
              <i className="bi bi-globe" /> Official Site
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          ADMISSION TICKER
          ════════════════════════════════════════ */}
      <div className={styles.ticker}>
        <span className={styles.tickerLabel}>📢 Admissions</span>
        <div className={styles.tickerTrack}>
          <div className={styles.tickerInner}>
            {BBAU_ADMISSIONS.concat(BBAU_ADMISSIONS).map((a, i) => (
              <a key={i} href={a.url} target="_blank" rel="noopener noreferrer" className={styles.tickerItem}>
                {a.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.container}>

        {/* ════════════════════════════════════════
            STATS ROW
            ════════════════════════════════════════ */}
        <section className={styles.statsRow}>
          {[
            { label: "Schools",     value: BBAU_SCHOOLS.length, icon: "bi-building" },
            { label: "Centres",     value: BBAU_CENTRES.length, icon: "bi-geo-alt"  },
            { label: "Established", value: BBAU_INFO.established, icon: "bi-calendar3" },
            { label: "NIRF Rank",   value: "#37", icon: "bi-award" },
            { label: "Type",        value: "Central", icon: "bi-bank" },
            { label: "City",        value: "Lucknow", icon: "bi-pin-map" },
          ].map(s => (
            <div key={s.label} className={styles.statCard}>
              <i className={`bi ${s.icon} ${styles.statIcon}`} />
              <strong className={styles.statValue}>{s.value}</strong>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </section>

        {/* ════════════════════════════════════════
            QUICK NAV — campus sections
            ════════════════════════════════════════ */}
        <section className={styles.card}>
          <h2 className={styles.sectionTitle}><i className="bi bi-lightning" /> Quick Campus Access</h2>
          <div className={styles.quickNavGrid}>
            <Link href="/map" className={styles.navCard}>
              <div className={`${styles.navIcon} ${styles.gradBlue}`}><i className="bi bi-map" /></div>
              <span>Campus Map</span>
            </Link>
            <Link href="/departments" className={styles.navCard}>
              <div className={`${styles.navIcon} ${styles.gradPurple}`}><i className="bi bi-building" /></div>
              <span>Departments</span>
            </Link>
            <Link href="/facilities" className={styles.navCard}>
              <div className={`${styles.navIcon} ${styles.gradGreen}`}><i className="bi bi-building-gear" /></div>
              <span>Hostels</span>
            </Link>
            <Link href="/facilities" className={styles.navCard}>
              <div className={`${styles.navIcon} ${styles.gradOrange}`}><i className="bi bi-book" /></div>
              <span>Library</span>
            </Link>
            <Link href="/facilities" className={styles.navCard}>
              <div className={`${styles.navIcon} ${styles.gradPink}`}><i className="bi bi-trophy" /></div>
              <span>Sports</span>
            </Link>
            <Link href="/routes" className={styles.navCard}>
              <div className={`${styles.navIcon} ${styles.gradIndigo}`}><i className="bi bi-signpost-2" /></div>
              <span>Navigation</span>
            </Link>
            <Link href="/bus" className={styles.navCard}>
              <div className={`${styles.navIcon} ${styles.gradTeal}`}><i className="bi bi-bus-front" /></div>
              <span>Bus Schedule</span>
            </Link>
            <Link href="/contact" className={styles.navCard}>
              <div className={`${styles.navIcon} ${styles.gradRed}`}><i className="bi bi-briefcase" /></div>
              <span>VC Office</span>
            </Link>
          </div>
        </section>

        {/* ════════════════════════════════════════
            NOTICES / EVENTS / ADMISSIONS TABS
            ════════════════════════════════════════ */}
        <section className={styles.card}>
          <div className={styles.tabBar}>
            {(["notices", "events", "admissions"] as const).map(t => (
              <button
                key={t}
                className={`${styles.tab} ${activeTab === t ? styles.tabActive : ""}`}
                onClick={() => setActiveTab(t)}
              >
                {t === "notices"    && <><i className="bi bi-bell" /> Latest News</>}
                {t === "events"     && <><i className="bi bi-calendar-event" /> Events</>}
                {t === "admissions" && <><i className="bi bi-mortarboard" /> Admissions</>}
              </button>
            ))}
            <span className={styles.liveChip}>
              {loading ? "⏳ Loading…" : source === "live" ? "🟢 Live" : "📋 Cached"}
            </span>
            <a
              href="https://www.bbau.ac.in/PublicNotices.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.moreLink}
            >
              View all ↗
            </a>
          </div>

          {activeTab === "notices" && (
            <ul className={styles.noticeList}>
              {notices.map((n, i) => (
                <li key={i} className={styles.noticeItem}>
                  <span className={styles.noticeDate}>{n.date}</span>
                  <a href={n.url} target="_blank" rel="noopener noreferrer" className={styles.noticeTitle}>
                    {n.title} <i className="bi bi-box-arrow-up-right" />
                  </a>
                </li>
              ))}
            </ul>
          )}

          {activeTab === "events" && (
            <ul className={styles.noticeList}>
              {events.map((e, i) => (
                <li key={i} className={styles.noticeItem}>
                  {e.date && <span className={styles.noticeDate}>{e.date}</span>}
                  <a href={e.url} target="_blank" rel="noopener noreferrer" className={styles.noticeTitle}>
                    {e.title} <i className="bi bi-box-arrow-up-right" />
                  </a>
                </li>
              ))}
            </ul>
          )}

          {activeTab === "admissions" && (
            <ul className={styles.noticeList}>
              {BBAU_ADMISSIONS.map((a, i) => (
                <li key={i} className={styles.noticeItem}>
                  <a href={a.url} target="_blank" rel="noopener noreferrer" className={styles.noticeTitle}>
                    <i className="bi bi-mortarboard" /> {a.name} <i className="bi bi-box-arrow-up-right" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* ════════════════════════════════════════
            TWO-COL: PROGRAMMES  +  CAMPUS OVERVIEW
            ════════════════════════════════════════ */}
        <div className={styles.twoCol}>
          {/* Programmes */}
          <section className={styles.card}>
            <h2 className={styles.sectionTitle}><i className="bi bi-journal-bookmark" /> Academic Programmes</h2>
            <div className={styles.progGrid}>
              {Object.entries(BBAU_PROGRAMMES).map(([cat, list]) => (
                <div key={cat} className={styles.progGroup}>
                  <h4 className={styles.progCat}>
                    {cat === "doctoral"       ? "Doctoral"
                    : cat === "integrated"    ? "Integrated"
                    : cat === "postGraduate"  ? "Post Graduate"
                    : "Under Graduate"}
                  </h4>
                  <ul className={styles.progList}>
                    {list.map(p => (
                      <li key={p.name}>
                        <a href={p.url} target="_blank" rel="noopener noreferrer">{p.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Campus overview stats */}
          <section className={styles.card}>
            <h2 className={styles.sectionTitle}><i className="bi bi-bar-chart" /> Campus Overview</h2>
            <div className={styles.overviewList}>
              {[
                ["Academic Schools",    BBAU_SCHOOLS.length],
                ["Centres & Institutes", BBAU_CENTRES.length],
                ["Infrastructure Items", BBAU_INFRASTRUCTURE.length],
                ["Hostel Blocks",        "6"],
                ["NIRF National Rank",   "#37"],
                ["Established",          BBAU_INFO.established],
              ].map(([label, val]) => (
                <div key={String(label)} className={styles.overviewRow}>
                  <span>{label}</span>
                  <strong>{val}</strong>
                </div>
              ))}
            </div>

            <div className={styles.mapTeaser}>
              <Link href="/map" className={styles.mapTeaserLink}>
                <i className="bi bi-map" /> Explore Interactive Campus Map →
              </Link>
            </div>
          </section>
        </div>

        {/* ════════════════════════════════════════
            SCHOOLS & DEPARTMENTS
            ════════════════════════════════════════ */}
        <section className={styles.card}>
          <h2 className={styles.sectionTitle}><i className="bi bi-building" /> Schools &amp; Departments</h2>
          <div className={styles.schoolGrid}>
            {BBAU_SCHOOLS.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className={styles.schoolCard}>
                <i className="bi bi-mortarboard-fill" />
                <span>{s.name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════
            INFRASTRUCTURE & FACILITIES
            ════════════════════════════════════════ */}
        <section className={styles.card}>
          <h2 className={styles.sectionTitle}><i className="bi bi-building-gear" /> Infrastructure &amp; Facilities</h2>
          <div className={styles.infraGrid}>
            {BBAU_INFRASTRUCTURE.map((item, i) => (
              <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className={styles.infraCard}>
                <i className={`bi ${item.icon}`} />
                <span>{item.name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════
            CENTRES & INSTITUTES
            ════════════════════════════════════════ */}
        <section className={styles.card}>
          <h2 className={styles.sectionTitle}><i className="bi bi-geo-alt" /> Centres &amp; Institutes</h2>
          <div className={styles.centreList}>
            {BBAU_CENTRES.map((c, i) => (
              <a key={i} href={c.url} target="_blank" rel="noopener noreferrer" className={styles.centreItem}>
                <i className="bi bi-arrow-right-circle" /> {c.name}
              </a>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════
            QUICK LINKS
            ════════════════════════════════════════ */}
        <section className={styles.card}>
          <h2 className={styles.sectionTitle}><i className="bi bi-link-45deg" /> Quick Links</h2>
          <div className={styles.qlGrid}>
            {BBAU_QUICK_LINKS.map((l, i) => (
              <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" className={styles.qlCard}>
                <i className={`bi ${l.icon}`} />
                <span>{l.name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════
            QUOTE
            ════════════════════════════════════════ */}
        <blockquote className={styles.quote}>
          <p>"{BBAU_INFO.quote}"</p>
          <cite>— {BBAU_INFO.quoteBy}</cite>
        </blockquote>

        {/* ════════════════════════════════════════
            IMPORTANT EXTERNAL LINKS
            ════════════════════════════════════════ */}
        <section className={styles.card}>
          <h2 className={styles.sectionTitle}><i className="bi bi-box-arrow-up-right" /> Important External Links</h2>
          <div className={styles.extLinks}>
            {BBAU_IMPORTANT_LINKS.map((l, i) => (
              <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" className={styles.extLink}>
                {l.name}
              </a>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════
            CONTACT
            ════════════════════════════════════════ */}
        <section className={`${styles.card} ${styles.contactCard}`}>
          <h2 className={styles.contactTitle}><i className="bi bi-telephone" /> Contact Us</h2>
          <div className={styles.contactGrid}>
            <div className={styles.contactItem}>
              <i className="bi bi-geo-alt-fill" />
              <div>
                <strong>{BBAU_INFO.name}</strong>
                <p>{BBAU_INFO.type}</p>
                <p>{BBAU_INFO.address}</p>
              </div>
            </div>
            <div className={styles.contactItem}>
              <i className="bi bi-telephone-fill" />
              <div>
                <p>Toll Free: <strong>{BBAU_INFO.tollFree}</strong></p>
                <p>Fax: {BBAU_INFO.fax}</p>
              </div>
            </div>
            <div className={styles.contactItem}>
              <i className="bi bi-globe" />
              <div>
                <a href={BBAU_INFO.website} target="_blank" rel="noopener noreferrer">
                  {BBAU_INFO.website}
                </a>
                <a href="https://www.bbau.ac.in/Contact.aspx" target="_blank" rel="noopener noreferrer">
                  Full contact details ↗
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
