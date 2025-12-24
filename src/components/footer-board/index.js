import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaPeopleArrows } from "react-icons/fa";
import "./footerboard.scss";

export default function FooterApp() {
  const handleCallPhone = () => {};
  return (
    <div className="footer-app-wrapper">
      <div className="footer-app">
        <div className="footer-wrap-item">
          <div className="footer-board-content">
            <Link to="/">
              <FaHome />
              <p>Home</p>
            </Link>
          </div>
        </div>
        <div className="footer-wrap-item">
          <div className="footer-board-content">
            <a href="tel:+091673 52347">
              <FaPhoneAlt />
              <p>Call</p>
            </a>
          </div>
        </div>
        <div className="footer-wrap-item">
          <div className="footer-board-content">
            <Link to="/contact-us/">
              <FaUser />
              <p>Enquiry</p>
            </Link>
          </div>
        </div>
        <div className="footer-wrap-item">
          <div className="footer-board-content">
            <Link to="/contact-us/">
              <FaPeopleArrows />
              <p>Connect</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
