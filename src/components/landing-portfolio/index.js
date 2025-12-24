import React, { useEffect, useState } from "react";
import { PortfolioAllData } from "../../api/api";
import PortfolioCard from "./portfolioCard";
import "./lp-portfolio-gallery.scss";

export default function Portfolio() {
  const [allProjects, setAllProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    PortfolioAllData().then((data) => {
      setAllProjects(data);
    });
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const handleReadLess = () => {
    setVisibleCount(3);
  };

  return (
    <div className="container">
      <div className="portfolio-main-wrapper">
        <PortfolioCard portGrid={allProjects.slice(0, visibleCount)} />

        {allProjects.length > 3 && (
          <div className="portfolio-loadmore">
            {visibleCount < allProjects.length ? (
              <button onClick={handleLoadMore}>Load More</button>
            ) : (
              <button onClick={handleReadLess}>Read Less</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
