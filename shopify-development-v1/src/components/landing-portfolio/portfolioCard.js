import React from "react";
import { GoArrowUpRight } from "react-icons/go";
import { workImagePath } from "../../utils/assetUtils";

export default function PortfolioCard({ portGrid }) {
  return (
    <div className="row portfolio-list-wrap">
      {portGrid.map((item, index) => {
        const {
          id,
          work_portfilio_title,
          work_portfilio_portlink,
          work_portfilio_portfolioimage,
          work_portfolio_category,
          work_portfolio_desc,
          work_portfolio_badge
        } = item;

        const bgImage = workImagePath(work_portfilio_portfolioimage);

        return (
          <div
            className="col-md-4 col-sm-6 col-xs-12 portfolio-item"
            key={id}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <a
              href={work_portfilio_portlink}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-card"
            >
              <div
                className="portfolio-card-top"
                style={{ backgroundImage: `url(${bgImage})` }}
              ></div>

              <div className="portfolio-card-body">
                <div className="portfolio-card-head">
                  <h4 className="portfolio-title">{work_portfilio_title}</h4>
                </div>

                <p className="portfolio-description">
                  {work_portfolio_desc ||
                    "A comprehensive platform for marketing analytics and automation."}
                </p>

                <div className="portfolio-visit-btn">
                  <span>Visit Website</span>
                  <span className="arrow">
                    <GoArrowUpRight />
                  </span>
                </div>
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
}
