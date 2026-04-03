import React, { useEffect, useState } from "react";
import "./audit-popup.scss";
import AuditPopupForm from "../landingpopupform";

export default function AuditPopup() {
  const COOKIE_NAME = "auditPopupDismissed";

  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [triggerType, setTriggerType] = useState(""); // "timer" | "exit" | "scroll" | "submit"

  const setSessionCookie = (name, value) => {
    document.cookie = `${name}=${value}; path=/; SameSite=Lax`;
  };

  const getCookie = (name) => {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length);
      }
    }

    return null;
  };

  // Browser session me pehle se dismiss hua hai ya nahi
  useEffect(() => {
    if (typeof window !== "undefined") {
      const alreadyDismissed = getCookie(COOKIE_NAME) === "true";
      if (alreadyDismissed) {
        setDismissed(true);
      }
    }
  }, []);

  // 1) Auto open after 35 sec
  useEffect(() => {
    if (dismissed || open) return;

    const timer = setTimeout(() => {
      setTriggerType("timer");
      setOpen(true);
    }, 35000);

    return () => clearTimeout(timer);
  }, [dismissed, open]);

  // 2) Exit intent
  useEffect(() => {
    if (dismissed || open) return;

    const handleExitIntent = (e) => {
      if (dismissed || open) return;

      if (e.clientY <= 0) {
        setTriggerType("exit");
        setOpen(true);
      }
    };

    document.addEventListener("mouseleave", handleExitIntent);

    return () => {
      document.removeEventListener("mouseleave", handleExitIntent);
    };
  }, [dismissed, open]);

  // 3) Open on 50% scroll
  useEffect(() => {
    if (dismissed || open) return;

    const handleScroll = () => {
      if (dismissed || open) return;

      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      const scrollableHeight = docHeight - windowHeight;

      if (scrollableHeight <= 0) return;

      const scrollPercent = (scrollTop / scrollableHeight) * 100;

      if (scrollPercent >= 50) {
        setTriggerType("scroll");
        setOpen(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dismissed, open]);

  const handleClose = () => {
    setOpen(false);
    setDismissed(true);
    setTriggerType("");

    if (typeof window !== "undefined") {
      setSessionCookie(COOKIE_NAME, "true");
    }
  };

  // Form successful submit ke baad auto close
  const handleFormSuccess = () => {
    setTriggerType("submit");

    setTimeout(() => {
      handleClose();
    }, 2500); // 2.5 sec baad popup close
  };

  if (!open) return null;

  return (
    <div className="audit-popup-overlay" onClick={handleClose}>
      <div className="audit-popup" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={handleClose} type="button">
          ×
        </button>

        {triggerType === "exit" && (
          <div className="popup-tag">⚡ WAIT! BEFORE YOU GO...</div>
        )}

        <h2>
          Get a <span>FREE Website Audit</span> + <br />
          30-Min Expert Consultation
        </h2>

        <div className="popup-benefits">
          <ul>
            <li>Free professional audit</li>
            <li>30-minute expert call</li>
            <li>No sales pressure</li>
          </ul>
        </div>

        <AuditPopupForm onSuccess={handleFormSuccess} />

        <div className="popup-footer">
          ✓ No obligation • Real experts • Real value
        </div>
      </div>
    </div>
  );
}
