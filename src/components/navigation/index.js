import React from "react";
import { Link } from "react-router-dom";
import { imagePath } from "../../utils/assetUtils";
import MenuItem from "./menuitem";
import { FaPhoneAlt } from "react-icons/fa";
import "./navigation.scss";

export default function Navigation() {
  return (
    <header id="get-started" className="main-head-wrap">
      <div className="menu-wrapper">
        <div className="logo-wrapper">
          <Link to="/">
            <img src={imagePath("logo.png")} alt="logo" />
          </Link>
        </div>

        <div className="phone-wrap-menu">
          <a className="phone-icon-menu" href="tel:+919167352347">
            <FaPhoneAlt fill="#fff" />
          </a>
        </div>

        <MenuItem />
      </div>
    </header>
  );
}
