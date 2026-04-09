import React from "react";
import "./technologies-work.scss";
export default function TechnologiesWorkGrid() {
  const logos = [
    { name: "Brand 4", image: "./images/programming-languages/python.png" },
    { name: "Brand 1", image: "./images/programming-languages/nodejs.png" },
    { name: "Brand 2", image: "./images/programming-languages/shopify.png" },
    { name: "Brand 3", image: "./images/programming-languages/wordpress.png" },
    {
      name: "Brand 5",
      image: "./images/programming-languages/custom-code.png"
    },
    { name: "Brand 6", image: "./images/programming-languages/java.png" },
    { name: "Brand 7", image: "./images/programming-languages/js.png" },
    { name: "Brand 8", image: "./images/programming-languages/magento.png" },
    { name: "Brand 18", image: "./images/programming-languages/aws.png" },
    { name: "Brand 9", image: "./images/programming-languages/mysql.png" },
    { name: "Brand 10", image: "./images/programming-languages/php.png" },
    { name: "Brand 11", image: "./images/programming-languages/postgres.png" },
    { name: "Brand 12", image: "./images/programming-languages/react.png" },
    { name: "Brand 13", image: "./images/programming-languages/c-.png" },
    { name: "Brand 14", image: "./images/programming-languages/nextjs.png" },
    { name: "Brand 15", image: "./images/programming-languages/html.png" },
    { name: "Brand 16", image: "./images/programming-languages/mongo-db.png" },
    { name: "Brand 17", image: "./images/programming-languages/css-3.png" }
  ];
  return (
    <section className="technologies-section">
      <div className="tech-logo-grid">
        {logos.map((logo, index) => (
          <div className="tech-logo-item" key={index}>
            <img src={logo.image} alt={logo.name} />
          </div>
        ))}
      </div>
    </section>
  );
}
