"use client";

import { FormEvent, useState } from "react";
import styles from "./app.module.css";

export default function ContactPage() {
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDone(true);
    e.currentTarget.reset();
    window.setTimeout(() => setDone(false), 4000);
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Contact us</h1>
        <p>Reach the right office for admissions, exams, or general support.</p>
      </header>

      <div className={styles.cards}>
        <article className={styles.mini}>
          <div className={`${styles.miniTop} ${styles.gradBlue}`}>
            <i className="bi bi-geo-alt" aria-hidden />
          </div>
          <div className={styles.miniBody}>
            <h3>Address</h3>
            <small>
              Babasaheb Bhimrao Ambedkar University
              <br />
              Vidya Vihar, Raebareli Road
              <br />
              Lucknow - 226025, UP, India
            </small>
          </div>
        </article>
        <article className={styles.mini}>
          <div className={`${styles.miniTop} ${styles.gradGreen}`}>
            <i className="bi bi-telephone" aria-hidden />
          </div>
          <div className={styles.miniBody}>
            <h3>Phone</h3>
            <small>
              Main: +91-522-2440821
              <br />
              Admission: +91-522-2440818
              <br />
              Emergency: +91-522-2440800
            </small>
          </div>
        </article>
        <article className={styles.mini}>
          <div className={`${styles.miniTop} ${styles.gradPurple}`}>
            <i className="bi bi-envelope" aria-hidden />
          </div>
          <div className={styles.miniBody}>
            <h3>Email</h3>
            <small>
              General: info@bbau.ac.in
              <br />
              Admissions: admissions@bbau.ac.in
              <br />
              Support: support@bbau.ac.in
            </small>
          </div>
        </article>
        <article className={styles.mini}>
          <div className={`${styles.miniTop} ${styles.gradOrange}`}>
            <i className="bi bi-clock" aria-hidden />
          </div>
          <div className={styles.miniBody}>
            <h3>Office hours</h3>
            <small>
              Mon–Fri: 9:00 AM – 5:00 PM
              <br />
              Saturday: 9:00 AM – 1:00 PM
              <br />
              Sunday: Closed
            </small>
          </div>
        </article>
      </div>

      <div className={styles.split}>
        <section className={styles.formCard}>
          <div className={styles.formHead}>
            <i className="bi bi-chat-dots" aria-hidden />
            <h2>Send us a message</h2>
          </div>
          {done && <p className={styles.banner}>Thank you — we will respond shortly.</p>}
          <form onSubmit={onSubmit}>
            <div className={styles.row}>
              <label className={styles.field}>
                <span>Your name</span>
                <input name="name" required placeholder="Full name" />
              </label>
              <label className={styles.field}>
                <span>Email</span>
                <input name="email" type="email" required placeholder="you@example.com" />
              </label>
            </div>
            <label className={styles.field}>
              <span>Subject</span>
              <input name="subject" required placeholder="What is this regarding?" />
            </label>
            <label className={styles.field}>
              <span>Message</span>
              <textarea name="message" rows={5} required placeholder="Tell us more…" />
            </label>
            <button type="submit" className={styles.submit}>
              <i className="bi bi-send" aria-hidden /> Send message
            </button>
          </form>
        </section>

        <aside className={styles.side}>
          <div className={styles.sideCard}>
            <h3>Department contacts</h3>
            <div className={styles.line}>
              <small>Admissions office</small>
              <span>+91-522-2440818</span>
            </div>
            <div className={styles.line}>
              <small>Examination cell</small>
              <span>+91-522-2440819</span>
            </div>
            <div className={styles.line}>
              <small>Library</small>
              <span>+91-522-2440825</span>
            </div>
          </div>
          <div className={`${styles.tips} ${styles.gradBlue}`}>
            <h3>Quick tips</h3>
            <p>Responses usually within 24–48 hours. For urgent issues, call directly.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
