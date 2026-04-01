import React, { useMemo } from "react";
import "./brand-slider.scss";

export default function BrandSliderMarquee({ logos = [] }) {
  // We duplicate the logos so the scroll loops seamlessly
  const marqueeLogos = useMemo(() => [...logos, ...logos], [logos]);

  return (
    <div className="marquee-outer">
      <div className="marquee-track">
        {marqueeLogos.map((item, idx) => (
          <div className="marquee-item" key={idx}>
            <div className="marquee-logo-box">
              <img
                src={
                  "https://api.mmlprojects.in/images/" + item.home_brands_image
                }
                alt={item.home_brands_name || "brand"}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
