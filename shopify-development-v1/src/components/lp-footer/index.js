import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { imagePath } from "../../utils/assetUtils";
import "./lp-footer.scss";
export default function LpFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer id="lp-footer">
      <div className="footer-bottom-content-wrapper">
        {/* <div className="footer-gridline"></div> */}
        <div className="footer-bottom-content-item">
          <div className="footer-copyright-text">
            <p>
              © {currentYear} - Makemelive Technologies. All rights reserved.
            </p>
          </div>
          {/* <div className="footer-bottom-social-icon">
            <ul className="footer-social-icon-wrap">
              <li className="footer-social-list-item">
                <a id="desktop_footer_linkedin"
                  href="https://www.linkedin.com/company/wearemakemelive/"
                  target="_blank"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="footer-social-list-item">
                <a id="desktop_footer_instagram"
                  href="https://www.instagram.com/wearemakemelive"
                  target="_blank"
                >
                  <FaInstagram />
                </a>
              </li>
              <li className="footer-social-list-item">
                <a id="desktop_footer_facebook"
                  href="https://www.facebook.com/wearemakemelive"
                  target="_blank"
                >
                  <FaFacebookF />
                </a>
              </li>

              <li className="footer-social-list-item">
                <a id="desktop_footer_twitter" href="https://twitter.com/makemelivetech" target="_blank">
                  <FaXTwitter />
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
