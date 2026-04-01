import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { imagePath } from "../../utils/assetUtils";
import { FaRegEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
// import { FaYoutube } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import LpFooter from "../lp-footer";
import "./footer.scss";

export default function Footer() {
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  const [isLandingPage, setLandingPage] = useState(false);
  useEffect(() => {
    if (location.pathname === "/mmllanding") {
      setLandingPage(true);
    } else {
      setLandingPage(false);
    }
  }, [location]);

  return (
    <>
      {isLandingPage ? (
        <LpFooter />
      ) : (
        <footer id="footer">
          <div className="footer-top-img">
            <div
              className="bg-img"
              style={{
                backgroundImage: `url(${imagePath("footer-top-banner.jpg")})`
              }}
            ></div>
            <div className="footer-overlay"></div>
            <div className="footer-bg-title">
              <div className="patterns">
                <svg className="animated-text" width="100%" height="100%">
                  {/* <defs>
                  <pattern id="polka-dots" x="0" y="0"                    width="80" height="80"
                          patternUnits="userSpaceOnUse">
                    <circle fill="#be9ddf" cx="15" cy="15" r="2"></circle>
                  </pattern>  
                </defs> */}
                  {/* <rect x="0" y="0" width="100%" height="100%" fill="url(#polka-dots)"> </rect> */}
                  <text x="50%" y="60%" textAnchor="middle">
                    LET’S WORK TOGETHER
                  </text>
                </svg>
              </div>
              <div className="mobile-text">
                <h2>LET’S WORK TOGETHER</h2>
              </div>
            </div>
            <div className="footer-bg-desc">
              <p>
                Let’s work together and create something meaningful and valuable
              </p>
              <Link className="cybr-btn cybr-btn--sm" to="/contact-us">
                GET IN TOUCH
                <span aria-hidden className="cybr-btn__glitch">
                  GET IN TOUCH
                </span>
              </Link>
            </div>
          </div>
          <div className="footer-middel-content-wrapper">
            <div className="footer-col column1">
              <div className="footer-title">
                <h3>MAKEMELIVE TECHNOLOGIES</h3>
              </div>
              <div className="footer-desc">
                <p>
                  Looking for a Digital marketing agency in Mumbai to grow your
                  business with proficient Web developers in Mumbai? Your quest
                  ends here!
                </p>
              </div>
              <div className="footer-social-icons">
                <ul className="footer-social-icon-wrap">
                  <li className="footer-social-list-item">
                    <a
                      href="https://www.linkedin.com/company/wearemakemelive/"
                      target="_blank"
                    >
                      <FaLinkedinIn />
                    </a>
                  </li>
                  <li className="footer-social-list-item">
                    <a
                      href="https://www.instagram.com/wearemakemelive"
                      target="_blank"
                    >
                      <FaInstagram />
                    </a>
                  </li>
                  <li className="footer-social-list-item">
                    <a
                      href="https://www.facebook.com/wearemakemelive"
                      target="_blank"
                    >
                      <FaFacebookF />
                    </a>
                  </li>
                  <li className="footer-social-list-item">
                    <a
                      href="https://twitter.com/makemelivetech"
                      target="_blank"
                    >
                      <FaXTwitter />
                    </a>
                  </li>
                  {/* <li className="footer-social-list-item">
                    <a
                      href="https://www.youtube.com/@wearemakemelive"
                      target="_blank"
                    >
                      <FaYoutube />
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className="footer-col column2">
              <div className="footer-title">
                <h3>QUICK LINKS</h3>
              </div>
              <div className="footer-quick-links">
                <ul className="quick-links-wrap">
                  <li className="quick-link-listitem">
                    <NavLink to="/">
                      <FaAngleRight /> 01 – Home
                    </NavLink>
                  </li>
                  <li className="quick-link-listitem">
                    <NavLink to="/services">
                      <FaAngleRight /> 02 – Services
                    </NavLink>
                  </li>
                  <li className="quick-link-listitem">
                    <NavLink to="/upgrade">
                      <FaAngleRight /> 03 – Upgrade
                    </NavLink>
                  </li>
                  <li className="quick-link-listitem">
                    <NavLink to="/work">
                      <FaAngleRight /> 04 – Work
                    </NavLink>
                  </li>
                  <li className="quick-link-listitem">
                    <NavLink to="/about-us">
                      <FaAngleRight /> 05 – About Us
                    </NavLink>
                  </li>
                  <li className="quick-link-listitem">
                    <NavLink to="/contact-us">
                      <FaAngleRight /> 06 – Contact
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-col column3">
              <div className="footer-title">
                <h3>SERVICES</h3>
              </div>
              <div className="footer-services">
                <ul className="footer-services-wrap">
                  <li className="footer-services-listitem">
                    <Link to="/upgrade">
                      <FaAngleRight /> Upgrade
                    </Link>
                  </li>
                  <li className="footer-services-listitem">
                    <Link to="/services">
                      <FaAngleRight /> Website Design and Development
                    </Link>
                  </li>
                  <li className="footer-services-listitem">
                    <Link to="/services">
                      <FaAngleRight /> Website Maintenance
                    </Link>
                  </li>
                  <li className="footer-services-listitem">
                    <Link to="/services">
                      <FaAngleRight /> Mobile App Development
                    </Link>
                  </li>
                  <li className="footer-services-listitem">
                    <Link to="/services">
                      <FaAngleRight /> Search Engine Optimisation
                    </Link>
                  </li>
                  <li className="footer-services-listitem">
                    <Link to="/services">
                      <FaAngleRight /> E-Commerce Solutions
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-col column4">
              <div className="footer-title">
                <h3>OUR OFFICE</h3>
              </div>
              <div className="footer-desc">
                <p>
                  C-344, 3rd Floor, Oshiwara Industrial Centre, Off New Link Rd,
                  Goregaon West, Mumbai, Maharashtra 400104
                </p>
              </div>
              <div className="email-data-wrap">
                <div className="email-icon">
                  <FaRegEnvelope />
                </div>
                <div className="email-data">
                  <a href="mailto:sharik@makemelive.in">
                    sharik@makemelive.in -
                  </a>
                  <a href="mailto:support@makemelive.in">
                    support@makemelive.in
                  </a>
                </div>
              </div>
              <div className="call-data-wrap">
                <div className="call-icon">
                  <FaPhoneAlt />
                </div>
                <div className="call-data">
                  <a href="tel:+91 9167352347">+91 9167352347 /</a>
                  <a href="tel:+91 9136851479">+91 9136851479</a>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom-content-wrapper">
            <div className="footer-gridline"></div>
            <div className="footer-bottom-content-item">
              <div className="footer-copyright-text">
                <p>© {currentYear} - MAKEMELIVE TECHNOLOGIES</p>
              </div>
              <div className="footer-bottom-social-icon">
                <ul className="footer-social-icon-wrap">
                  <li className="footer-social-list-item">
                    <a
                      href="https://www.linkedin.com/company/makemelive-technologies"
                      target="_blank"
                    >
                      <FaLinkedinIn />
                    </a>
                  </li>
                  <li className="footer-social-list-item">
                    <a
                      href="https://www.instagram.com/wearemakemelive"
                      target="_blank"
                    >
                      <FaInstagram />
                    </a>
                  </li>
                  <li className="footer-social-list-item">
                    <a
                      href="https://www.facebook.com/makemelivetech/"
                      target="_blank"
                    >
                      <FaFacebookF />
                    </a>
                  </li>

                  <li className="footer-social-list-item">
                    <a
                      href="https://twitter.com/makemelivetech"
                      target="_blank"
                    >
                      <FaXTwitter />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
