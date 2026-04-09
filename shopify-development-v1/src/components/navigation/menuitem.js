import React, { useState } from "react";
import Hamburger from "./hamburger";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaPhoneAlt,
} from "react-icons/fa";
import { FaXTwitter, FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

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
        <div className="mobile-menu-inner">
          {/* <ul className="navbar-wrap">
            <li className="list-item-wrap" onClick={showHamburger}>
              <a id="menu-portfolio" href="#portfolio">
                <span className="list-item">01 - Portfolio</span>
              </a>
            </li>

            <li className="list-item-wrap" onClick={showHamburger}>
              <a id="menu-process" href="#process">
                <span className="list-item">02 - Process</span>
              </a>
            </li>

            <li className="list-item-wrap" onClick={showHamburger}>
              <a id="menu-faqs"  href="#faq">
                <span className="list-item">03 - FAQs</span>
              </a>
            </li>
          </ul> */}

          <div className="mobile-menu-contact">
            <p className="mobile-menu-contact__title">Contact Us</p>

            <a
              id="mobile-sidebar-phone"
              href="tel:+91 9136651479"
              className="mobile-menu-contact__item"
            >
              <FaPhoneAlt />
              <span>+91 91366 51479</span>
            </a>

            <a
              id="mobile-sidebar-email"
              href="mailto:nitin.tambe@makemelive.in"
              className="mobile-menu-contact__item"
            >
              <MdEmail />
              <span>nitin.tambe@makemelive.in</span>
            </a>

            <div className="mobile-menu-contact__item mobile-menu-contact__item--address">
              <a
                id="mobile-sidebar-address"
                href="https://maps.app.goo.gl/BpcrHjHfE8Da6WcP9"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-menu-contact__item mobile-menu-contact__item--address"
              >
                <FaLocationDot />
                <span>
                  C-344, 3rd Floor, Oshiwara Industrial Centre, Off New Link Rd,
                  Goregaon (West), Mumbai, Maharashtra 400104
                </span>
              </a>
            </div>

            {/* <div className="mobile-menu-social">
              <a
                id="mobile-sidebar-linkedin"
                href="https://www.linkedin.com/company/wearemakemelive/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                id="mobile-sidebar-instagram"
                href="https://www.instagram.com/wearemakemelive"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                id="mobile-sidebar-facebook"
                href="https://www.facebook.com/wearemakemelive"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>

              <a
                id="mobile-sidebar-twitter"
                href="https://twitter.com/makemelivetech"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
              >
                <FaXTwitter />
              </a>
            </div> */}
          </div>
        </div>
      </nav>

      <div className="header-social-icon">
        <ul className="header-social-icon-wrap">
          <li className="header-social-list-item">
            <a
              id="navigation-header-phone"
              href="tel:+91 9136651479"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="phone-ring-icon">
                <FaPhoneAlt fill="#fff" />
              </span>{" "}
              +91 91366 51479
            </a>
          </li>
          <li className="header-button">
            <a
              id="navigation-get-free-consultation-button"
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
