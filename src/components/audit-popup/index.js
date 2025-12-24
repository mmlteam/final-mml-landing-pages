import React, { useEffect, useState } from "react";
import "./audit-popup.scss";
import AuditPopupForm from "../landingpopupform";

export default function AuditPopup() {
  const [open, setOpen] = useState(false);
  const [manuallyClosed, setManuallyClosed] = useState(false);

  // 1️⃣ Auto open after 5 seconds (first load only)
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // 2️⃣ Exit intent — MULTIPLE TIMES allowed
  useEffect(() => {
    if (!manuallyClosed) return;

    const handleExitIntent = (e) => {
      if (e.clientY <= 0) {
        setOpen(true);
      }
    };

    document.addEventListener("mouseleave", handleExitIntent);

    return () => {
      document.removeEventListener("mouseleave", handleExitIntent);
    };
  }, [manuallyClosed]);

  const handleClose = () => {
    setOpen(false);
    setManuallyClosed(true);
  };

  if (!open) return null;

  return (
    <div className="audit-popup-overlay" onClick={handleClose}>
      <div className="audit-popup" onClick={(e) => e.stopPropagation()}>
        {/* CLOSE */}
        <button className="popup-close" onClick={handleClose}>
          ×
        </button>

        {/* CONTENT */}
        <div className="popup-tag">⚡ WAIT! BEFORE YOU GO...</div>

        <h2>
          Get a <span>FREE Website Audit</span> + <br />
          30-Min Expert Consultation
        </h2>

        <p className="popup-desc">
          We'll analyze your website and show exactly what to fix—no pressure.
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
