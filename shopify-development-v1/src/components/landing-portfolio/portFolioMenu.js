import React from "react";

export default function PortfolioMenu({ filterItem, buttonMenu }) {
  return (
    <div className="portfolio-menu-tab-wrapper">
      <div className="row justify-content-center portfolio-menu-list-wrap">
        <button
          type="button"
          className="portfolio-menu-list-items active-tabs"
          onClick={filterItem}
          value="All"
        >
          All
        </button>
        {buttonMenu &&
          buttonMenu.map(buttonMenu => {
            return (
              <button
                type="button"
                className="portfolio-menu-list-items"
                onClick={filterItem}
                value={buttonMenu.category_title}
              >
                {buttonMenu.category_title}
              </button>
            );
          })}
      </div>
    </div>
  );
}
