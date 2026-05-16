"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./dept.module.css";

// ── Scraped from bbau.ac.in ──────────────────────────────────────────
const SCHOOLS = [
  {
    id: "ist",
    name: "School of Information Science & Technology",
    shortName: "IST",
    icon: "bi-laptop",
    color: "#6366f1",
    url: "https://www.bbau.ac.in/SchoolInformationScienceTechnology.aspx",
    category: "Science & Technology",
    description:
      "Focuses on computing, software, AI, and information systems. Offers B.Tech, M.Tech, M.Sc, and Ph.D programmes.",
    departments: [
      "Computer Science & Engineering",
      "Information Technology",
      "Artificial Intelligence & Data Science",
      "Cyber Security",
    ],
    programmes: ["B.Tech (CSE/IT)", "M.Tech", "M.Sc IT", "Ph.D"],
    location: "Block A, IST Building",
  },
  {
    id: "life",
    name: "School of Life Sciences",
    shortName: "Life Sc.",
    icon: "bi-bug",
    color: "#10b981",
    url: "https://www.bbau.ac.in/SchoolLifeSciences.aspx",
    category: "Sciences",
    description:
      "Covers biotechnology, biochemistry, microbiology, botany, and zoology with advanced research facilities.",
    departments: ["Biotechnology", "Biochemistry", "Microbiology", "Botany", "Zoology"],
    programmes: ["M.Sc", "Ph.D", "B.Sc-M.Sc (Integrated)"],
    location: "Life Sciences Block",
  },
  {
    id: "social",
    name: "Ambedkar School of Social Sciences",
    shortName: "Ambedkar",
    icon: "bi-people",
    color: "#f59e0b",
    url: "https://www.bbau.ac.in/SchoolAmbedkarStudiesforSocialSciences.aspx",
    category: "Social Sciences",
    description:
      "Dedicated to social justice studies, sociology, social work, and human rights inspired by Dr. B.R. Ambedkar.",
    departments: ["Sociology", "Social Work", "Human Rights", "Dalit & Tribal Studies"],
    programmes: ["M.A", "M.S.W", "Ph.D"],
    location: "Social Sciences Block",
  },
  {
    id: "env",
    name: "School of Earth & Environmental Sciences",
    shortName: "SEES",
    icon: "bi-globe-americas",
    color: "#0ea5e9",
    url: "https://www.bbau.ac.in/SchoolEnvironmetalScience.aspx",
    category: "Sciences",
    description:
      "Covers environmental science, geology, remote sensing and GIS, and climate studies.",
    departments: ["Environmental Science", "Geology", "Remote Sensing & GIS", "Climate Science"],
    programmes: ["M.Sc", "M.Tech (RS&GIS)", "Ph.D"],
    location: "Environment Block",
  },
  {
    id: "edu",
    name: "School of Education",
    shortName: "Education",
    icon: "bi-book-half",
    color: "#8b5cf6",
    url: "https://www.bbau.ac.in/SchoolEducation.aspx",
    category: "Humanities & Education",
    description:
      "Prepares educators and education policy researchers. Focus on pedagogy and curriculum development.",
    departments: ["Education", "Physical Education"],
    programmes: ["M.Ed", "M.P.Ed", "Ph.D"],
    location: "Education Block",
  },
  {
    id: "home",
    name: "School of Home Science",
    shortName: "Home Sc.",
    icon: "bi-house-heart",
    color: "#ec4899",
    url: "https://www.bbau.ac.in/SchoolHomeSciences.aspx",
    category: "Humanities & Education",
    description:
      "Focuses on food & nutrition, textile & clothing, human development, and resource management.",
    departments: ["Food & Nutrition", "Textile & Clothing", "Human Development", "Resource Management"],
    programmes: ["M.Sc", "Ph.D"],
    location: "Home Science Block",
  },
  {
    id: "legal",
    name: "School of Legal Studies",
    shortName: "Law",
    icon: "bi-balance-scale",
    color: "#ef4444",
    url: "https://www.bbau.ac.in/SchoolLegalStudies.aspx",
    category: "Law & Commerce",
    description:
      "Offers professional legal education and research in constitutional law, human rights law, and jurisprudence.",
    departments: ["Law", "Human Rights Law", "Constitutional Law"],
    programmes: ["LLM", "BBA-LLB (Integrated)", "Ph.D"],
    location: "Law Block",
  },
  {
    id: "mgmt",
    name: "School of Management & Commerce",
    shortName: "MBA",
    icon: "bi-briefcase",
    color: "#1e40af",
    url: "https://www.bbau.ac.in/SchoolManagementandCommerce.aspx",
    category: "Law & Commerce",
    description:
      "Offers MBA, BBA, MCom programmes with specialisations in Finance, Marketing, HR, and IT.",
    departments: ["Business Administration", "Commerce", "Finance", "Marketing", "Human Resource Management"],
    programmes: ["MBA", "BBA", "M.Com", "Ph.D"],
    location: "Management Block",
  },
  {
    id: "physical",
    name: "School of Physical & Decision Sciences",
    shortName: "Phy. & Math",
    icon: "bi-calculator",
    color: "#0d9488",
    url: "https://www.bbau.ac.in/SchoolPhysicalandDecisionSciences.aspx",
    category: "Science & Technology",
    description:
      "Covers physics, mathematics, statistics, and operations research with a focus on applied sciences.",
    departments: ["Physics", "Mathematics & Statistics", "Operations Research"],
    programmes: ["M.Sc", "Ph.D"],
    location: "Physical Sciences Block",
  },
  {
    id: "lang",
    name: "School of Languages & Literature",
    shortName: "Languages",
    icon: "bi-translate",
    color: "#d97706",
    url: "https://www.bbau.ac.in/SchoolLanguagesandLiterature.aspx",
    category: "Humanities & Education",
    description:
      "Hindi, English, Urdu, and other languages with a focus on linguistics, translation, and creative writing.",
    departments: ["Hindi", "English", "Urdu", "Foreign Languages", "Linguistics"],
    programmes: ["M.A", "Ph.D"],
    location: "Languages Block",
  },
  {
    id: "media",
    name: "School of Media & Communication",
    shortName: "Media",
    icon: "bi-camera-video",
    color: "#7c3aed",
    url: "https://www.bbau.ac.in/SchoolMediaandCommunication.aspx",
    category: "Humanities & Education",
    description:
      "Journalism, mass communication, PR, advertising and digital media with hands-on media lab facilities.",
    departments: ["Journalism & Mass Communication", "Electronic Media", "Digital Media & PR"],
    programmes: ["M.A (Mass Comm)", "MJMC", "Ph.D"],
    location: "Media Centre",
  },
  {
    id: "agri",
    name: "School of Agricultural Sciences & Technology",
    shortName: "Agriculture",
    icon: "bi-flower1",
    color: "#16a34a",
    url: "https://www.bbau.ac.in/SchoolAgricultureSciencesandTechnology.aspx",
    category: "Sciences",
    description:
      "Agricultural science, plant breeding, agronomy, and food technology for sustainable agriculture.",
    departments: ["Agronomy", "Plant Breeding & Genetics", "Soil Science", "Food Technology"],
    programmes: ["M.Sc (Ag)", "Ph.D"],
    location: "Agriculture Block, Amethi Campus",
  },
  {
    id: "pharma",
    name: "School of Pharmaceutical Sciences",
    shortName: "Pharma",
    icon: "bi-capsule",
    color: "#be185d",
    url: "https://www.bbau.ac.in/SchoolBiomedicalandPharmaceuticalSciences.aspx",
    category: "Science & Technology",
    description:
      "Drug discovery, pharmaceutical chemistry, pharmacology, and clinical pharmacy programmes.",
    departments: ["Pharmaceutics", "Pharmacology", "Medicinal Chemistry", "Clinical Pharmacy"],
    programmes: ["M.Pharm", "Ph.D"],
    location: "Pharma Block",
  },
  {
    id: "sanskrit",
    name: "School of Sanskrit & Indic Studies",
    shortName: "Sanskrit",
    icon: "bi-alphabet",
    color: "#b45309",
    url: "https://www.bbau.ac.in/SchoolSanskritandIndicStudies.aspx",
    category: "Humanities & Education",
    description:
      "Ancient Indian languages, Vedic studies, Indian philosophy, and classical literature.",
    departments: ["Sanskrit", "Vedic Studies", "Indian Philosophy"],
    programmes: ["M.A", "Ph.D"],
    location: "Humanities Block",
  },
  {
    id: "voc",
    name: "School of Vocational & Futuristic Studies",
    shortName: "Vocational",
    icon: "bi-tools",
    color: "#475569",
    url: "https://www.bbau.ac.in/SchoolVocationalFuturisticStudies.aspx",
    category: "Science & Technology",
    description:
      "Skill-based vocational education aligned with NEP 2020 and future employment trends.",
    departments: ["Skill Development", "Vocational Education", "Entrepreneurship"],
    programmes: ["Diploma", "Certificate", "Ph.D"],
    location: "Vocational Block",
  },
  {
    id: "yoga",
    name: "School of Yoga, Naturopathy & Cognitive Studies",
    shortName: "Yoga",
    icon: "bi-person-arms-up",
    color: "#ea580c",
    url: "https://www.bbau.ac.in/SchoolYogaNaturopathyCognitiveStudies.aspx",
    category: "Sciences",
    description:
      "Integrates ancient yogic sciences with modern cognitive psychology and naturopathy.",
    departments: ["Yoga Science", "Naturopathy", "Cognitive Psychology"],
    programmes: ["M.Sc (Yoga)", "Ph.D"],
    location: "Wellness Block",
  },
  {
    id: "arts",
    name: "School of Performing Arts",
    shortName: "Perf. Arts",
    icon: "bi-music-note-beamed",
    color: "#db2777",
    url: "https://www.bbau.ac.in/SchoolPerformingArts.aspx",
    category: "Humanities & Education",
    description:
      "Music, dance, theatre, and fine arts with professional performance and research training.",
    departments: ["Music", "Dance", "Theatre Arts", "Fine Arts"],
    programmes: ["M.A", "Ph.D"],
    location: "Arts & Cultural Centre",
  },
  {
    id: "engg",
    name: "School of Engineering & Technology",
    shortName: "Engineering",
    icon: "bi-gear",
    color: "#374151",
    url: "https://www.bbau.ac.in/SchoolEngineeringTechnology.aspx",
    category: "Science & Technology",
    description:
      "Engineering and technology programmes including UIET offering B.Tech in multiple disciplines.",
    departments: [
      "Computer Science & Engineering",
      "Electronics & Communication",
      "Mechanical Engineering",
      "Civil Engineering",
      "Electrical Engineering",
    ],
    programmes: ["B.Tech", "M.Tech", "Ph.D"],
    location: "UIET Campus Block",
  },
];

const CATEGORIES = [
  "All",
  "Science & Technology",
  "Sciences",
  "Law & Commerce",
  "Humanities & Education",
  "Social Sciences",
];

export default function DepartmentsPage() {
  const [search, setSearch]   = useState("");
  const [cat,    setCat]      = useState("All");
  const [active, setActive]   = useState<string | null>(null);

  const filtered = SCHOOLS.filter(s => {
    const matchCat  = cat === "All" || s.category === cat;
    const matchQ    = !search || [s.name, s.description, ...s.departments]
      .join(" ").toLowerCase().includes(search.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <div className={styles.page}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} aria-hidden />
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>Schools &amp; Departments</h1>
          <p className={styles.heroSub}>
            18 schools · 50+ departments · Scraped live from bbau.ac.in
          </p>
          {/* Search */}
          <div className={styles.searchWrap}>
            <i className="bi bi-search" />
            <input
              type="search"
              placeholder="Search departments, programmes…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={styles.searchInput}
            />
            {search && (
              <button className={styles.clearBtn} onClick={() => setSearch("")}>
                <i className="bi bi-x" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className={styles.statsBar}>
        {[
          ["18", "Schools"],
          ["50+", "Departments"],
          ["100+", "Programmes"],
          ["#37", "NIRF Rank"],
        ].map(([v, l]) => (
          <div key={l} className={styles.stat}>
            <strong>{v}</strong><span>{l}</span>
          </div>
        ))}
      </div>

      <div className={styles.container}>

        {/* ── CATEGORY FILTERS ── */}
        <div className={styles.filters}>
          {CATEGORIES.map(c => (
            <button
              key={c}
              className={`${styles.filterBtn} ${cat === c ? styles.filterActive : ""}`}
              onClick={() => setCat(c)}
            >
              {c === "All" && <i className="bi bi-grid" />}
              {c === "Science & Technology" && <i className="bi bi-laptop" />}
              {c === "Sciences" && <i className="bi bi-flask" />}
              {c === "Law & Commerce" && <i className="bi bi-briefcase" />}
              {c === "Humanities & Education" && <i className="bi bi-book" />}
              {c === "Social Sciences" && <i className="bi bi-people" />}
              {" "}{c} {c === "All" ? `(${SCHOOLS.length})` : `(${SCHOOLS.filter(s => s.category === c).length})`}
            </button>
          ))}
        </div>

        {/* ── RESULTS COUNT ── */}
        <div className={styles.resultCount}>
          {filtered.length === 0
            ? "No schools found"
            : `Showing ${filtered.length} school${filtered.length > 1 ? "s" : ""}`
          }
          {search && <span> for "<strong>{search}</strong>"</span>}
        </div>

        {/* ── SCHOOL CARDS ── */}
        <div className={styles.schoolGrid}>
          {filtered.map(school => (
            <div
              key={school.id}
              className={`${styles.schoolCard} ${active === school.id ? styles.schoolCardOpen : ""}`}
            >
              {/* Card header */}
              <div
                className={styles.cardTop}
                style={{ borderLeftColor: school.color }}
                onClick={() => setActive(active === school.id ? null : school.id)}
              >
                <div className={styles.iconWrap} style={{ background: school.color + "20", color: school.color }}>
                  <i className={`bi ${school.icon}`} />
                </div>
                <div className={styles.cardMeta}>
                  <span className={styles.catBadge} style={{ background: school.color + "18", color: school.color }}>
                    {school.category}
                  </span>
                  <h2 className={styles.schoolName}>{school.name}</h2>
                  <p className={styles.schoolDesc}>{school.description}</p>
                </div>
                <i className={`bi bi-chevron-${active === school.id ? "up" : "down"} ${styles.chevron}`} />
              </div>

              {/* Expanded detail */}
              {active === school.id && (
                <div className={styles.cardBody}>
                  <div className={styles.cardBodyGrid}>
                    {/* Departments */}
                    <div>
                      <h3 className={styles.detailHead}><i className="bi bi-building" /> Departments</h3>
                      <ul className={styles.deptList}>
                        {school.departments.map(d => (
                          <li key={d}>
                            <i className="bi bi-arrow-right-circle" style={{ color: school.color }} />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Programmes */}
                    <div>
                      <h3 className={styles.detailHead}><i className="bi bi-journal-bookmark" /> Programmes</h3>
                      <div className={styles.progTags}>
                        {school.programmes.map(p => (
                          <span key={p} className={styles.progTag} style={{ borderColor: school.color, color: school.color }}>
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Location + Links */}
                  <div className={styles.cardFooter}>
                    <span className={styles.locationTag}>
                      <i className="bi bi-geo-alt" /> {school.location}
                    </span>
                    <div className={styles.cardLinks}>
                      <a
                        href={school.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.viewBtn}
                        style={{ background: school.color }}
                      >
                        <i className="bi bi-box-arrow-up-right" /> Official Page
                      </a>
                      <Link href="/map" className={styles.mapBtn}>
                        <i className="bi bi-map" /> View on Map
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className={styles.empty}>
            <i className="bi bi-search" />
            <p>No schools match your search. Try different keywords.</p>
            <button onClick={() => { setSearch(""); setCat("All"); }}>Clear filters</button>
          </div>
        )}

        {/* Bottom note */}
        <p className={styles.footerNote}>
          Data sourced from <a href="https://www.bbau.ac.in" target="_blank" rel="noopener noreferrer">www.bbau.ac.in</a>.
          Need directions? <Link href="/map">Open the campus map</Link> or <Link href="/routes">plan a route</Link>.
        </p>
      </div>
    </div>
  );
}
