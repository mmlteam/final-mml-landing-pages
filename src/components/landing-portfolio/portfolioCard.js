import React from "react";

export default function PortfolioCard({ portGrid }) {
  return (
    <div className="row portfolio-list-wrap">
      {portGrid.map((item, index) => {
        const {
          id,
          work_portfilio_title,
          work_portfilio_portlink,
          work_portfilio_portfolioimage,
        } = item;

        const bgImage = `https://api.mmlprojects.in/images/work/${work_portfilio_portfolioimage}`;

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
              >
                <h3>{work_portfilio_title}</h3>
              </div>

              <div className="portfolio-card-body">
                <h4>{work_portfilio_title}</h4>
                <p className="portfolio-category">AI / SaaS Platform</p>

                <div className="portfolio-stats">
                  <div>
                    <strong>15K+</strong>
                    <span>Monthly Users</span>
                  </div>
                  <div>
                    <strong>4.8★</strong>
                    <span>Rating</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        );
      })}
    </div>
  );
}
