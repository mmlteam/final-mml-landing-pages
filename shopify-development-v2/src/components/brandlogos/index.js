import React from "react";
import "./brand-logos.scss";
export default function BrandLogosGrid() {
  const logos = [
    { name: "Brand 4", image: "./images/brand-logos/brand-AnitaDongre.png" },
    { name: "Brand 1", image: "./images/brand-logos/brand-dentsu.png" },
    { name: "Brand 2", image: "./images/brand-logos/brand-xp-pen.png" },
    { name: "Brand 3", image: "./images/brand-logos/brand-rachnaye.png" },
    { name: "Brand 5", image: "./images/brand-logos/brand-bezome.png" },
    { name: "Brand 6", image: "./images/brand-logos/brand-And.png" },
    { name: "Brand 7", image: "./images/brand-logos/brand-edtimes.png" },
    { name: "Brand 8", image: "./images/brand-logos/brand-globaldesi.png" },
    { name: "Brand 9", image: "./images/brand-logos/brand-hetero.png" },
    { name: "Brand 10", image: "./images/brand-logos/brand-koredg.png" },
    { name: "Brand 11", image: "./images/brand-logos/brand-reistor.png" },
    { name: "Brand 12", image: "./images/brand-logos/brand-saintg.png" }
  ];
  return (
    <section className="trusted-section">
      <div className="logo-grid">
        {logos.map((logo, index) => (
          <div className="logo-item" key={index}>
            <img src={logo.image} alt={logo.name} />
          </div>
        ))}
      </div>
    </section>
  );
}
