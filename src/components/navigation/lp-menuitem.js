import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Hamburger from "./hamburger";
import { FaWhatsapp } from "react-icons/fa";

export default function LpMenuItem() {
  const [hamburger, setHamburger] = useState(false);
  const showHamburger = () => setHamburger(!hamburger);

  // change this to your preferred number (E.164 format without +)
  const PHONE_E164 = "919167352347";

  return (
    <>
      <div className="hamburger-wrap">
        <Hamburger status={hamburger} onChildClick={setHamburger} />
      </div>

      <nav
        className={
          hamburger
            ? "main-menu lp-main-menu menu-open"
            : "main-menu menu-close"
        }
      >
        <ul className="navbar-wrap">
          <li className="list-item-wrap" onClick={showHamburger}>
            <NavLink exact to="#portfolio" activeClassName="active">
              <span className="list-item">01 - Portfolio</span>
            </NavLink>
          </li>

          <li className="list-item-wrap" onClick={showHamburger}>
            <NavLink to="#process" activeClassName="active">
              <span className="list-item">02 - Process</span>
            </NavLink>
          </li>

          <li className="list-item-wrap" onClick={showHamburger}>
            <NavLink to="#faq" activeClassName="active">
              <span className="list-item">03 - FAQs</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* CTA buttons for landing header (replaces social icons) */}
      <div className="lp-cta-wrap">
        <a
          className="lp-wa-btn"
          href={`https://wa.me/${PHONE_E164}?text=Hi%20MakeMeLive%2C%20I%20want%20a%20quotation.`}
          target="_blank"
          rel="noreferrer"
        >
          <FaWhatsapp className="lp-wa-icon" />
          <span>WhatsApp</span>
        </a>

        <NavLink className="lp-quote-btn" to="/contact-for-business/">
          Get Quotation
        </NavLink>
      </div>
    </>
  );
}
