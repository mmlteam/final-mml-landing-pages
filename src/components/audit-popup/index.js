import React, { useEffect, useState } from "react";
import "./audit-popup.scss";
import AuditPopupForm from "../landingpopupform";

export default function AuditPopup() {
  const SESSION_KEY = "auditPopupDismissed";

  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // sessionStorage se check
  useEffect(() => {
    if (typeof window !== "undefined") {
      const alreadyDismissed = sessionStorage.getItem(SESSION_KEY) === "true";
      if (alreadyDismissed) {
        setDismissed(true);
      }
    }
  }, []);

  // 1) Auto open after 35 sec
  useEffect(() => {
    if (dismissed) return;

    const timer = setTimeout(() => {
      if (!dismissed) {
        setOpen(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [dismissed]);

  // 2) Exit intent
  useEffect(() => {
    if (dismissed) return;

    const handleExitIntent = (e) => {
      // agar user already dismiss kar chuka hai to kuch mat karo
      if (dismissed) return;

      // only top exit intent
      if (e.clientY <= 0) {
        setOpen(true);
      }
    };

    document.addEventListener("mouseleave", handleExitIntent);

    return () => {
      document.removeEventListener("mouseleave", handleExitIntent);
    };
  }, [dismissed]);

  const handleClose = () => {
    setOpen(false);
    setDismissed(true);

    if (typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_KEY, "true");
    }
  };

  if (!open) return null;

  return (
    <div className="audit-popup-overlay" onClick={handleClose}>
      <div className="audit-popup" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={handleClose} type="button">
          ×
        </button>

        <div className="popup-tag">⚡ WAIT! BEFORE YOU GO...</div>

        <h2>
          Get a <span>FREE Website Audit</span> + <br />
          30-Min Expert Consultation
        </h2>

        <p className="popup-desc">
          We&apos;ll analyze your website and show exactly what to fix—no
          pressure.
        </p>

        <div className="popup-benefits">
          <ul>
            <li>Free professional audit</li>
            <li>30-minute expert call</li>
            <li>No sales pressure</li>
          </ul>
        </div>

        <AuditPopupForm />

        <div className="popup-footer">
          ✓ No obligation • Real experts • Real value
        </div>
      </div>
    </div>
  );
}
