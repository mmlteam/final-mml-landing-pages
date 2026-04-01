import React, { useState } from "react";
import PortfolioCard from "./portfolioCard";
import "./lp-portfolio-gallery.scss";

// SAME DATA HERE
const portfolioData = [
  {
    id: 1,
    work_portfilio_title: "Saint G",
    work_portfilio_portlink: "https://www.saintg.in/",
    work_portfilio_portfolioimage: "saintg.png",
    work_portfolio_desc:
      "Luxury leather footwear brand with Milan-inspired design, crafted with premium materials and high-fashion detailing.",
  },
  {
    id: 2,
    work_portfilio_title: "Bezomè",
    work_portfilio_portlink: "https://bezome.com/",
    work_portfilio_portfolioimage: "/bezome.png",
    work_portfolio_desc:
      "Premium ergonomic lifestyle brand offering stylish, certified chairs designed for better posture and modern workspaces.",
  },
  {
    id: 3,
    work_portfilio_title: "Reistor",
    work_portfilio_portlink: "https://reistor.com/",
    work_portfilio_portfolioimage: "reistor.png",
    work_portfolio_desc:
      "Sustainable women’s fashion brand using eco-friendly fabrics like hemp, focused on minimal design and conscious living.",
  },
  {
    id: 4,
    work_portfilio_title: "Koredg",
    work_portfilio_portlink: "https://koredg.in/",
    work_portfilio_portfolioimage: "koredg.png",
    work_portfolio_desc:
      "Contemporary apparel brand co-created with global artists, featuring bold, art-led designs on everyday silhouettes.",
  },
  {
    id: 5,
    work_portfilio_title: "Lujore",
    work_portfilio_portlink: "https://lujore.com/",
    work_portfilio_portfolioimage: "lujore.png",
    work_portfolio_desc:
      "Luxury womenswear brand creating modest, timeless pieces designed for everyday elegance, comfort, and refined style.",
  },
  {
    id: 6,
    work_portfilio_title: "XP Pen",
    work_portfilio_portlink: "https://xp-pen.co.in/",
    work_portfilio_portfolioimage: "new-xp-pen.png",
    work_portfolio_desc:
      "Official platform for graphic tablets and pen displays, built for creators with easy product discovery and seamless buying.",
  },
  {
    id: 7,
    work_portfilio_title: "My Taupe",
    work_portfilio_portlink: "https://mytaupe.com/",
    work_portfilio_portfolioimage: "taupe.png",
    work_portfolio_desc:
      "Microbiome-friendly vegan skincare brand with gentle, milk-based formulas designed for sensitive Indian skin.",
  },
  {
    id: 8,
    work_portfilio_title: "Table Manners & Co.",
    work_portfilio_portlink: "https://tablemannersandco.com/",
    work_portfilio_portfolioimage: "tm&co.png",
    work_portfolio_desc:
      "Premium tableware and décor brand offering curated pieces that elevate everyday dining into a styled experience.",
  },
  {
    id: 9,
    work_portfilio_title: "Sitaara",
    work_portfilio_portlink: "https://sitarraa.com/",
    work_portfilio_portfolioimage: "sitaara.png",
    work_portfolio_desc:
      "Luxury pret brand blending heritage Indian textiles with modern silhouettes for versatile and statement-driven fashion.",
  },
  {
    id: 10,
    work_portfilio_title: "House of Vitti",
    work_portfilio_portlink: "https://houseofvitti.com/",
    work_portfilio_portfolioimage: "vitti.png",
    work_portfolio_desc:
      "Designer footwear brand known for handcrafted juttis and mules that blend traditional artistry with modern fashion.",
  },
  {
    id: 11,
    work_portfilio_title: "Couture Yard",
    work_portfilio_portlink: "https://www.coutureyard.com/",
    work_portfilio_portfolioimage: "cy.png",
    work_portfolio_desc:
      "Luxury bridal and occasion wear platform offering curated designer ensembles with a seamless shopping experience.",
  },
  {
    id: 12,
    work_portfilio_title: "Kapur Jewels",
    work_portfilio_portlink: "https://kapurjewels.com/",
    work_portfilio_portfolioimage: "kapur-jewels.png",
    work_portfolio_desc:
      "Luxury jewellery brand offering timeless, finely crafted pieces, showcased through a premium website focused on elegance, detail, and trust.",
  },
];

export default function LandingPortfolio() {
  const [visibleCount, setVisibleCount] = useState(6);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const handleReadLess = () => {
    setVisibleCount(6);

    setTimeout(() => {
      const portfolioSection = document.getElementById("portfolio");
      if (!portfolioSection) return;

      const header =
        document.querySelector(".site-header") ||
        document.querySelector(".header-wrapper") ||
        document.querySelector("header");

      const headerHeight = header ? header.offsetHeight : 0;
      const extraOffset = 20;

      const sectionTop =
        portfolioSection.getBoundingClientRect().top + window.pageYOffset;

      window.scrollTo({
        top: sectionTop - headerHeight - extraOffset,
        behavior: "smooth",
      });
    }, 150);
  };

  return (
    <div className="container">
      <div className="portfolio-main-wrapper">
        <PortfolioCard portGrid={portfolioData.slice(0, visibleCount)} />

        {portfolioData.length > 3 && (
          <div className="portfolio-loadmore">
            {visibleCount < portfolioData.length ? (
              <button type="button" onClick={handleLoadMore}>
                Load More
              </button>
            ) : (
              <button type="button" onClick={handleReadLess}>
                Read Less
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
