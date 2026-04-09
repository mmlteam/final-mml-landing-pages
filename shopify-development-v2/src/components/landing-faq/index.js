import React, { useState } from "react";
import "./faq.scss";

const FAQ = () => {
  const [open, setOpen] = useState(null);

  const items = [
    {
      q: "Can I migrate my existing e-commerce store to Shopify?",
      a:
        "Migrating an existing store to Shopify can be a complex process, especially depending on the platform, data structure, and custom features involved. At Makemelive Technologies, we assess the scope carefully and provide tailored migration solutions to ensure a smooth and secure transition."
    },
    {
      q: "How long does it take to develop a Shopify website?",
      a:
        "A basic Shopify store can be developed in 5–10 days, while custom or advanced stores may take 2–6 weeks. Timelines depend on design complexity and required integrations."
    },
    {
      q: " What about security and payment gateways supported by Shopify?",
      a:
        "Shopify offers enterprise-level security with SSL and PCI compliance. It supports multiple payment gateways like Razorpay, PayU, Stripe, PayPal, and UPI for seamless transactions."
    },
    {
      q: "Is Shopify suitable for small businesses?",
      a:
        "Yes, Shopify is ideal for small businesses due to its ease of use, affordability, and scalability. It allows you to start small and grow without technical challenges."
    },
    {
      q: "Why Choose Makemelive Technologies For Shopify?",
      a:
        "We provide custom, conversion-focused Shopify solutions with expert development, fast delivery, and ongoing support. Our goal is to build stores that not only look great but also drive sales."
    }
  ];

  const toggle = i => setOpen(prev => (prev === i ? null : i));

  return (
    <section className="faq-section">
      <div className="faq-container">
        <ul className="faq-list-wrap">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={i} className={`faq-item ${isOpen ? "is-open" : ""}`}>
                <button
                  id={`faq-q-${i}`}
                  className="faq-question"
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  onClick={() => toggle(i)}
                >
                  <span className="faq-question-text">{item.q}</span>
                  <svg
                    className="faq-chevron"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M7 10l5 5 5-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </button>

                {/* Smooth transition container */}
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className={`faq-collapse ${isOpen ? "open" : ""}`}
                >
                  <div className="faq-answer-inner">
                    <p className="faq-answer">{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
