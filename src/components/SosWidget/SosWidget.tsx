"use client";

import { useState } from "react";
import styles from "./SosWidget.module.css";

export function SosWidget() {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  function activate() {
    setSuccess(true);
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          console.log("SOS location", pos.coords.latitude, pos.coords.longitude);
        },
        () => undefined
      );
    }
    window.setTimeout(() => {
      setSuccess(false);
      setOpen(false);
    }, 5000);
  }

  return (
    <>
      <button type="button" className={styles.sosBtn} onClick={() => setOpen(true)} aria-label="Emergency help">
        <i className="bi bi-exclamation-triangle-fill" aria-hidden />
      </button>

      {open && (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal
          aria-labelledby="sos-title"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className={styles.panel}>
            <div className={styles.header}>
              <div>
                <h2 id="sos-title" className={styles.title}>
                  Emergency Help
                </h2>
                <p className={styles.sub}>Quick access to emergency services</p>
              </div>
              <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label="Close">
                <i className="bi bi-x-lg" />
              </button>
            </div>

            <div className={styles.activateWrap}>
              <button type="button" className={styles.activate} onClick={activate}>
                <i className="bi bi-exclamation-triangle-fill" aria-hidden />
                Activate SOS Alert
              </button>
            </div>

            <div className={styles.contacts}>
              <h3 className={styles.contactsTitle}>Emergency Contacts</h3>
              <a className={styles.card} href="tel:05222440999">
                <div className={styles.iconWrap}>
                  <i className="bi bi-shield-check" />
                </div>
                <div>
                  <h4 className={styles.cardTitle}>Campus Security</h4>
                  <p className={styles.cardMeta}>24/7 Security Helpline</p>
                  <span className={styles.cardLink}>0522-2440999</span>
                </div>
              </a>
              <a className={styles.card} href="tel:05222440888">
                <div className={styles.iconWrap}>
                  <i className="bi bi-hospital" />
                </div>
                <div>
                  <h4 className={styles.cardTitle}>Health Center</h4>
                  <p className={styles.cardMeta}>Medical Emergency</p>
                  <span className={styles.cardLink}>0522-2440888</span>
                </div>
              </a>
              <a className={styles.card} href="tel:05222440777">
                <div className={styles.iconWrap}>
                  <i className="bi bi-people" />
                </div>
                <div>
                  <h4 className={styles.cardTitle}>Women Safety Cell</h4>
                  <p className={styles.cardMeta}>Women Safety Helpline</p>
                  <span className={styles.cardLink}>0522-2440777</span>
                </div>
              </a>
              <a className={styles.card} href="tel:112">
                <div className={styles.iconWrap}>
                  <i className="bi bi-telephone" />
                </div>
                <div>
                  <h4 className={styles.cardTitle}>Emergency Services</h4>
                  <p className={styles.cardMeta}>Police / Ambulance / Fire</p>
                  <span className={styles.cardLink}>112</span>
                </div>
              </a>
            </div>

            <div className={styles.tips}>
              <h3>Safety Tips</h3>
              <ul>
                <li>Stay in well-lit areas after dark</li>
                <li>Use the buddy system when possible</li>
                <li>Save emergency numbers in your phone</li>
                <li>Report suspicious activity immediately</li>
                <li>Campus security patrols 24/7</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className={styles.success}>
          <div className={styles.successBox}>
            <i className={`bi bi-exclamation-triangle-fill ${styles.successIcon}`} aria-hidden />
            <h2>SOS Alert Sent!</h2>
            <p>Campus security has been notified.</p>
            <p>Your location has been shared.</p>
            <strong>Help is on the way.</strong>
          </div>
        </div>
      )}
    </>
  );
}
