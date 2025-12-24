import React, { useState } from "react";
import Hamburger from "./hamburger";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";

// import { FaYoutube } from "react-icons/fa";

export default function MenuItem() {
  const [hamburger, setHamburger] = useState(false);
  const showHamburger = () => setHamburger(!hamburger);

  return (
    <>
      <div className="hamburger-wrap">
        <Hamburger status={hamburger} onChildClick={setHamburger} />
      </div>
      <nav
        className={hamburger ? "main-menu menu-open" : "main-menu menu-close"}
      >
        <ul className="navbar-wrap">
          <li className="list-item-wrap" onClick={showHamburger}>
            <a exact href="#portfolio" activeClassName="active">
              <span className="list-item">01 - Portfolio</span>
            </a>
          </li>

          <li className="list-item-wrap" onClick={showHamburger}>
            <a href="#process" activeClassName="active">
              <span className="list-item">02 - Process</span>
            </a>
          </li>

          <li className="list-item-wrap" onClick={showHamburger}>
            <a href="#faq" activeClassName="active">
              <span className="list-item">03 - FAQs</span>
            </a>
          </li>
        </ul>
      </nav>
      <div className="header-social-icon">
        <ul className="header-social-icon-wrap">
          <li className="header-social-list-item">
            <a
              href="tel:+919167352347"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaPhoneAlt fill="#fff" /> +91 91673 52347
            </a>
          </li>
          <li className="header-button">
            <a
              className="get-free-consultation-button"
              href="#landing-form"
              rel="noopener noreferrer"
            >
              Get Free Consultation
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
