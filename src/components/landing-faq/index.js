import React, { useState } from "react";
import "./faq.scss";

const FAQ = () => {
  const [open, setOpen] = useState(null);

  const items = [
    {
      q: "What's your minimum project budget?",
      a:
        "Our minimum project budget is ₹50,000. This ensures we can deliver a quality website with proper design, development, testing, and support. For smaller budgets, we can recommend alternative solutions or phased approaches to fit your needs.",
    },
    {
      q: "How much does website development cost?",
      a:
        "Project costs vary based on complexity, features, and requirements. Most projects range from ₹50,000 to ₹5,00,000+. Final pricing depends on your specific scope—number of pages, custom features, integrations, e-commerce functionality, etc. Schedule a free consultation for a detailed custom quote based on your exact needs.",
    },
    {
      q: "How do you decide which technology to use?",
      a:
        "We analyze your business requirements, budget, timeline, and long-term goals. We're platform-agnostic—we recommend what's best for YOU, not what's easiest for us. Whether it's WordPress, Shopify, React, custom development, or another solution entirely—we'll guide you to the right choice.",
    },
    {
      q: "How long does website development take?",
      a:
        "Most projects are completed in 6–8 weeks from kickoff to launch. This includes design, development, revisions, and testing. Timeline can vary based on project complexity and how quickly you provide feedback. Rush projects can be accommodated with additional resources.",
    },
    {
      q: "Will I be able to update the website myself?",
      a:
        "Yes! We provide comprehensive training on managing your website. You'll be able to update content, images, add blog posts, and manage basic settings. We also offer ongoing maintenance packages if you prefer hands-off management.",
    },
    {
      q: "Do you provide hosting and domain services?",
      a:
        "Yes, we handle domain registration, premium hosting setup, SSL certificates, and email setup. Or if you have existing hosting, we can work with your current setup. Full flexibility based on your preference.",
    },
    {
      q: "What happens after the website launches?",
      a:
        "You get 30 days of free post-launch support for bug fixes, minor adjustments, and questions. After that, we offer monthly maintenance plans starting from ₹2,500/month which include updates, backups, security monitoring, and ongoing support.",
    },
    {
      q: "What if my project requires more features mid-development?",
      a:
        "We understand requirements can evolve. We'll provide a clear scope at the start, and if you need additional features, we'll give you a separate quote for the extra work. Budget adjustments are based on the complexity and time required for the new features.",
    },
  ];

  const toggle = (i) => setOpen((prev) => (prev === i ? null : i));

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
