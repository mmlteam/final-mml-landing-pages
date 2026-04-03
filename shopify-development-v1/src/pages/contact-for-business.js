import React, { useState, useEffect } from "react";
import LandingPortfolio from "../components/landing-portfolio";
import LPClientTestimonials from "../components/lp-client-testimonials";
import LandingContactForm from "../components/landingcontactform";
import LpContactForm from "../components/lp-contact-form-top";
import { imagePath } from "../utils/assetUtils";
import AuditPopup from "../components/audit-popup";
import { FaPhoneAlt } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { BiConversation } from "react-icons/bi";
import { FaPeopleArrows } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import PageAnimWrapper from "../components/pagetransition";
import { gethome_brands_data } from "../api/api";
import Head from "./Head";
import CountUp from "../components/countup/contup";
import ScrollToTop from "../components/scroll-to-top";
import BrandLogosGrid from "../components/brandlogos";
import TechnologiesWorkGrid from "../components/technologies-work";
import "./mml-landing.scss";
import GoogleRatingButton from "../components/rating-badge";
import FAQ from "../components/landing-faq";
// import { path } from "path";

export default function ContactforBusiness() {
  const [brandTrustLogo, setBrandTrustLogo] = useState([]);

  useEffect(() => {
    gethome_brands_data().then((brandlogos) => {
      setBrandTrustLogo(brandlogos);
    }, []);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // scroll top handler start
  const handleConsultationScroll = (e) => {
    e.preventDefault();

    const formTarget = document.getElementById("contact-top-form-wrapper");
    if (!formTarget) return;

    const header =
      document.querySelector(".site-header") ||
      document.querySelector(".header-wrapper") ||
      document.querySelector("header");

    const headerHeight = header ? header.offsetHeight : 0;

    const extraOffset = 16; // thoda breathing space
    const targetTop =
      formTarget.getBoundingClientRect().top +
      window.pageYOffset -
      headerHeight -
      extraOffset;

    window.scrollTo({
      top: targetTop,
      behavior: "smooth",
    });
  };
  // scroll top handler end
  return (
    <PageAnimWrapper>
      <AuditPopup />
      <Head
        title="Makemelive – A complete web solution for all your business needs."
        description="Makemelive is a professional IT company, which provides high-end business solution services to its clients globally. We offer complete website development and Digital solutions for your business. We are passionate about delivering next generation solutions to all your digital requirements."
        url="https://makemelive.in/"
        type="website"
        site_name="Makemelive Technologies"
      />
      <div className="landing-page-wrapper">
        {/* fold1 banner section start */}
        <section
          id="consultation-banner"
          className="banner-wrapper"
          style={{ backgroundImage: `url(${imagePath("lp-banner7.png")})` }}
        >
          <div className="fluid-container">
            <div className="row justify-content-left v-align">
              <div className="col-md-7 col-xs-12">
                <div className="banner-left-wrap">
                  <h1>
                    Professional{" "}
                    <span className="highlight">Shopify Store Development</span>{" "}
                    That Turns Visitors into Customers
                  </h1>
                  <div className="lp-left-banner-desc" id="lp-top-contact-form">
                    <div className="list-item-lp-wrap">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-circle-check-big mt-1 h-5 w-5 shrink-0 text-primary"
                      >
                        <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                        <path d="m9 11 3 3L22 4"></path>
                      </svg>
                      <p className="list-item-lp">
                        Custom Shopify store design based on your brand and
                        products
                      </p>
                    </div>
                    <div className="list-item-lp-wrap">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-circle-check-big mt-1 h-5 w-5 shrink-0 text-primary"
                      >
                        <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                        <path d="m9 11 3 3L22 4"></path>
                      </svg>
                      <p className="list-item-lp">
                        Mobile-friendly Shopify stores optimised for speed and
                        SEO
                      </p>
                    </div>
                    <div className="list-item-lp-wrap">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-circle-check-big mt-1 h-5 w-5 shrink-0 text-primary"
                      >
                        <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                        <path d="m9 11 3 3L22 4"></path>
                      </svg>
                      <p className="list-item-lp">
                        Complete store setup including products, payments, and
                        shipping
                      </p>
                    </div>
                    <div className="list-item-lp-wrap">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-circle-check-big mt-1 h-5 w-5 shrink-0 text-primary"
                      >
                        <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                        <path d="m9 11 3 3L22 4"></path>
                      </svg>
                      <p className="list-item-lp">
                        Delivered in 3–6 weeks with revisions included
                      </p>
                    </div>
                    <div className="list-item-lp-wrap">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-circle-check-big mt-1 h-5 w-5 shrink-0 text-primary"
                      >
                        <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                        <path d="m9 11 3 3L22 4"></path>
                      </svg>
                      <p className="list-item-lp">
                        Post-launch support and Shopify training included
                      </p>
                    </div>
                  </div>

                  <div className="cta-button-row">
                    <a
                      href="#contact-top-form-wrapper"
                      onClick={handleConsultationScroll}
                      className="cta-btn-custom cta-btn-primary"
                    >
                      <span className="cta-btn__text">
                        Get Your Free Consultation
                      </span>
                    </a>

                    <a
                      href="#portfolio"
                      className="cta-btn-custom cta-btn-primary"
                    >
                      <span className="cta-btn__text">View Our Work</span>
                    </a>
                  </div>
                  <div className="trust-line">
                    <p className="stars">★★★★★</p>
                    <p className="tagline">1200+ websites delivered</p>
                    <p className="verticalline">|</p>
                    <p className="tagline">15 years in business</p>
                    <p className="verticalline">|</p>
                    <p className="tagline">Mumbai, India</p>
                  </div>
                </div>
              </div>

              <div className="col-md-5 col-xs-12">
                <div
                  id="contact-top-form-wrapper"
                  className="form-wrap-tile-top"
                >
                  <div className="form-title">
                    <h1>Get Your Free Consultation</h1>
                    <p>Quick response during business hours • No obligation</p>
                  </div>
                  <LpContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* fold1 banner section end */}
        {/* our awesome clients start */}
        <section className="fol5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12 col-xs-12">
                <div className="our-partners align-center">
                  <h3>Join 150+ Businesses Who Trust Makemelive</h3>
                </div>
              </div>
              <div className="col-md-12">
                <BrandLogosGrid />
                <GoogleRatingButton />
              </div>
            </div>
          </div>
        </section>
        {/* our awesome clients end */}

        {/* our testimonials start */}
        <section className="fold4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12 col-xs-12">
                <div className="client-testimonial-title">
                  <h2>What Our Clients Say About Working with Us</h2>
                </div>
                {/* <div className="client-testimonial-data">
                  <p>Real results from real businesses.</p>
                </div> */}
                <LPClientTestimonials />
              </div>
            </div>
          </div>
        </section>
        {/* our testimonials end */}

        {/* why choose us section start */}
        <section class="why-choose fade-in visible">
          <div class="container">
            <div className="row justify-content-center">
              <div className="col-md-12 col-xs-12">
                <div class="section-header">
                  <h2>Why Choose Makemelive for Shopify Development?</h2>
                  <p>
                    Tailored solutions built around your{" "}
                    <span class="mobile-break"></span> business goals
                  </p>
                </div>
                <div class="features-grid">
                  <div class="feature-card">
                    <div class="feature-icon">🛠️</div>
                    <h3>Shopify Expertise</h3>
                    <p>
                      Our team specializes in Shopify development and
                      understands how to build online stores that are easy to
                      manage, scalable, and designed to increase sales.
                    </p>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon">🎨</div>
                    <h3>Custom Shopify Store Design</h3>
                    <p>
                      Every Shopify store we build is designed around your
                      brand, products, and customers to create a shopping
                      experience that encourages visitors to buy.
                    </p>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon">📱</div>
                    <h3>Mobile-Friendly Shopping Experience</h3>
                    <p>
                      Most customers shop from their phones. We design Shopify
                      stores that look great and work smoothly across all
                      devices.
                    </p>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon">🔍</div>
                    <h3>Shopify SEO Setup</h3>
                    <p>
                      We set up your Shopify store with proper structure,
                      product pages, and SEO basics so your store can be easily
                      found on Google.
                    </p>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon">⚡</div>
                    <h3>Easy Store Management</h3>
                    <p>
                      Shopify is simple to manage. We set up your products,
                      collections, and dashboard so you can easily manage
                      orders, inventory, and customers.
                    </p>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon">💪</div>
                    <h3>Post-Launch Support</h3>
                    <p>
                      After your store goes live, we provide support for
                      updates, improvements, and any technical help you may
                      need.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* why choose us section end */}

        {/* our portfolio section start */}
        <section className="fold3 portfolio-section-anchor" id="portfolio">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12 col-xs-12">
                <div className="our-portfolio-title align-center">
                  <h2>Real Websites We've Built. Real Results.</h2>
                </div>
                <div className="our-portfolio-subtitle align-center">
                  <p>From simple landing pages to complex web applications</p>
                </div>
              </div>
            </div>
          </div>
          <LandingPortfolio />
        </section>
        {/* our portfolio section end */}
        {/* simple transparent process section start */}
        <section className="process-section-wrapper" id="process">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12 col-xs-12">
                <div className="section-header">
                  <h2>Our Shopify Store Development Process</h2>
                  <p>
                    From understanding your business to launching your online
                    store, our structured Shopify development process ensures
                    everything is built to help you start selling smoothly.
                  </p>
                </div>
                <div className="process-steps">
                  <div className="process-step">
                    <div className="step-number">1</div>
                    <h3>Business & Store Planning</h3>
                    <p>
                      We understand your business, products, and target
                      customers to plan the structure of your Shopify store,
                      including collections, product categories, and navigation.
                    </p>
                  </div>
                  <div className="process-step">
                    <div className="step-number">2</div>
                    <h3>Store Structure & Wireframing</h3>
                    <p>
                      We create the layout of your Shopify store to define how
                      customers will browse products, explore collections, and
                      move smoothly toward checkout.
                    </p>
                  </div>
                  <div className="process-step">
                    <div className="step-number">3</div>
                    <h3>Shopify Store Design</h3>
                    <p>
                      We design a visually appealing Shopify store that reflects
                      your brand and provides a simple, engaging shopping
                      experience for your customers.
                    </p>
                  </div>
                  <div className="process-step">
                    <div className="step-number">4</div>
                    <h3>Feature & Functionality Setup</h3>
                    <p>
                      We implement essential Shopify features such as product
                      setup, payment gateways, shipping settings, apps, and any
                      custom functionality required for your store.
                    </p>
                  </div>
                  <div className="process-step">
                    <div className="step-number">5</div>
                    <h3>Responsive and Functionality Testing</h3>
                    <p>
                      Before launch, we test your Shopify store across devices
                      and browsers to ensure everything works smoothly, loads
                      quickly, and provides a seamless shopping experience.
                    </p>
                  </div>
                  <div className="process-step">
                    <div className="step-number">6</div>
                    <h3>Launch</h3>
                    <p>
                      Once everything is ready, we launch your Shopify store and
                      make it live for customers. We also guide you on how to
                      manage products, orders, and your store dashboard.
                    </p>
                  </div>
                </div>
                <div className="process-highlights">
                  <div className="highlight-grid">
                    <div className="highlight-item">
                      <div className="highlight-icon">
                        {/* <FaCalendarDays /> */}
                        <img src="./images/schedule.png" alt="timeline" />
                      </div>
                      <div className="highlight-text">
                        <strong>6-8 Week Timeline</strong>
                        <span>Most projects completed on schedule</span>
                      </div>
                    </div>
                    <div className="highlight-item">
                      <div className="highlight-icon">
                        <img src="./images/rupee.png" alt="quotation" />
                      </div>
                      <div className="highlight-text">
                        <strong>Fixed Price Quote</strong>
                        <span>No hidden costs or surprises</span>
                      </div>
                    </div>
                    <div className="highlight-item">
                      <div className="highlight-icon">
                        <img src="./images/sales-funnel.png" alt="conversion" />
                      </div>
                      <div className="highlight-text">
                        <strong>Conversion-Optimized Design</strong>
                        <span>Turn visitors into customers</span>
                      </div>
                    </div>
                    <div className="highlight-item">
                      <div className="highlight-icon phone-icon">
                        <img src="./images/new-call.png" alt="new-call" />
                      </div>
                      <div className="highlight-text">
                        <strong>Weekly Updates</strong>
                        <span>Always know project status</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* simple transparent process section end */}
        {/* fold 8 company experience port section start */}
        {/* <section className="fold8 our-experience-wrapper">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-5 col-xs-12">
                <div className="modern-number-year">
                  <div className="company-experience-wrap">
                    <h2>
                      <span className="mark-txt">15</span>+ Years of Excellence.
                    </h2>
                  </div>
                  <div className="company-success-story">
                    <h3>150+ Happy Clients.</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-7 col-xs-12">
                <div className="row justify-content-center hide-counter-mob">
                  <div className="col-md-6 col-xs-12">
                    <div className="counter align-center">
                      <span className="counter-number">
                        <CountUp end={300} />
                      </span>
                      <h6 className="counter-details">ACTIVE AMC'S</h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-xs-12">
                    <div className="counter align-center">
                      <span className="counter-number">
                        <CountUp end={2000} />
                      </span>
                      <h6 className="counter-details">FINISHED PROJECTS</h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-xs-12">
                    <div className="counter align-center">
                      <span className="counter-number">
                        <CountUp end={500} />
                      </span>
                      <h6 className="counter-details">HAPPY CLIENTS</h6>
                    </div>
                  </div>
                  <div className="col-md-6 col-xs-12">
                    <div className="counter align-center">
                      <span className="counter-number">
                        <CountUp end={5} />
                      </span>
                      <h6 className="counter-details">COUNTRIES SERVED</h6>
                    </div>
                  </div>
                </div>
                <div className="our-experience-mob-main-wrap">
                  <div className="experience-wrap-mobile-counter">
                    <div className="counter-wrap">
                      <div className="counter align-center divider-line">
                        <span className="counter-number">
                          <CountUp end={200} />
                        </span>
                        <h6 className="counter-details">ACTIVE AMC'S</h6>
                      </div>
                      <div className="counter align-center divider-line">
                        <span className="counter-number">
                          <CountUp end={300} />
                        </span>
                        <h6 className="counter-details">FINISHED PROJECTS</h6>
                      </div>
                    </div>
                    <div className="counter-wrap">
                      <div className="counter align-center">
                        <span className="counter-number">
                          <CountUp end={300} />
                        </span>
                        <h6 className="counter-details">HAPPY CLIENTS</h6>
                      </div>
                      <div className="counter align-center">
                        <span className="counter-number">
                          <CountUp end={18} />
                        </span>
                        <h6 className="counter-details">BLOG POSTS</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        {/* fold 8 company experience port section end */}
        {/* faq section start */}
        <section className="fold10" id="faq">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12 col-xs-12">
                <div className="faq-title align-center">
                  <h3>Common Questions, Straight Answers</h3>
                  {/* <p>Everything you need to know about working with us</p> */}
                </div>
                <FAQ />
              </div>
            </div>
          </div>
        </section>
        {/* faq section end */}
        {/* contact form section start */}
        {/* contact form section start */}
        <div id="landing-form" className="contact-page-wrapper">
          <section className="contact-fold1 contact-cta-gradient">
            <div className="container">
              <div className="contact-cta-head">
                <h2>
                  Ready to Get a Website That Actually Brings You Customers??
                </h2>
                <p>
                  Book your free consultation today. We'll discuss your business
                  goals and recommend the best solution for you.
                </p>

                {/* <div className="contact-cta-buttons">
                  <a
                    href="https://wa.me/919136851479"
                    target="_blank"
                    rel="noreferrer"
                    className="cta-btn cta-btn--whatsapp"
                  >
                    WhatsApp Now
                  </a>
                  <a href="#landing-form" className="cta-btn cta-btn--dark">
                    Get Free Proposal
                  </a>
                </div> */}
              </div>

              <div className="contact-cta-card contact-cta-container">
                <div className="contact-cta-card-head">
                  <h3>Get Started - It Takes 2 Minutes</h3>
                  {/* <p>We reply within 30–60 mins (10:30–7:30). No spam.</p> */}
                </div>
                <LandingContactForm />
              </div>
              <div class="contact-info">
                <div class="contact-item">
                  <FaPhoneAlt /> <a href="tel:+91 9136651479">+91 9136651479</a>
                </div>
                <div class="contact-item">
                  <CiMail />{" "}
                  <a
                    href="mailto:nitin.tambe@makemelive.in"
                    class="__cf_email__"
                    // data-cfemail="26554e47544f4d664b474d434b434a4f5043084f48"
                  >
                    nitin.tambe@makemelive.in
                  </a>
                </div>
                <div class="contact-item">
                  <img src="./images/schedule.png" alt="time" /> Mon-Sat: 10:30
                  AM - 7:30 PM IST
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* contact form section end */}

        {/* contact form section end */}

        {/* button right side fixed start */}
        <div className="switcher-tab-btn">
          <a href="tel:9136651479">
            <button className="call-btn">
              <span className="ico-txt">Call Now</span>
              <span className="ico">
                <FaPhoneAlt />
              </span>
            </button>
          </a>
        </div>

        <div className="switcher-tab-btn">
          <a href="#landing-form">
            <button className="form-btn-enquiry">
              <span className="ico-txt">Enquire Now</span>
              <span className="ico">
                <BiConversation />
              </span>
            </button>
          </a>
        </div>

        <div className="switcher-tab-btn">
          <a href="mailto:nitin.tambe@makemelive.in">
            <button className="btn-services-quote">
              <span className="ico-txt">Connect</span>
              <span className="ico">
                <BiMailSend />
              </span>
            </button>
          </a>
        </div>
        {/* button right side fixed end */}

        {/* back to top button */}
        <div className="scroll-to-top-wrap">
          <ScrollToTop />
        </div>
        {/* back to top button */}
      </div>
    </PageAnimWrapper>
  );
}
