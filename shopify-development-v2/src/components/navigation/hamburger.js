import React from "react";

export default function Hamburger({ status, onChildClick }) {
  const showBurgerOpen = () => onChildClick(!status);
  return (
    <>
      <div
        className={status ? "hamburger menu-open" : "hamburger menu-close"}
        onClick={showBurgerOpen}
      >
        <span className="line burger1"></span>
        <span className="line burger2"></span>
        <span className="line burger3"></span>
      </div>
    </>
  );
}
