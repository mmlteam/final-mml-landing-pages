import React, { useState, useEffect } from "react";
import LandingPortfolio from "../../components/landing-portfolio";
import LPClientTestimonials from "../../components/lp-client-testimonials";
import LandingContactForm from "../../components/landingcontactform";
import LpContactForm from "../../components/lp-contact-form-top";
import { imagePath } from "../../utils/assetUtils";
import AuditPopup from "../../components/audit-popup";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { FiGlobe, FiShoppingCart, FiCode, FiZap } from "react-icons/fi";
import { FiSearch, FiTool } from "react-icons/fi";
import { FaRocket } from "react-icons/fa";
import { PiPaintBrushBold } from "react-icons/pi";
import { FiCheckCircle } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { SiCoffeescript } from "react-icons/si";
import { ImSleepy } from "react-icons/im";
import { BiConversation } from "react-icons/bi";
import { FaPeopleArrows } from "react-icons/fa";
import PageAnimWrapper from "../../components/pagetransition";
import { gethome_brands_data } from "../../api/api";
import Head from "../Head";
import CountUp from "../../components/countup/contup";
import ScrollToTop from "../../components/scroll-to-top";
import BrandLogosGrid from "../../components/brandlogos";
import TechnologiesWorkGrid from "../../components/technologies-work";
import "./mml-landing.scss";
import GoogleRatingButton from "../../components/rating-badge";
import FAQ from "../../components/landing-faq";
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
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

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
          className="banner-wrapper"
          style={{ backgroundImage: `url(${imagePath("lp-banner7.png")})` }}
        >
          <div className="fluid-container">
            <div className="row justify-content-left v-align">
              <div className="col-md-7 col-xs-12">
                <div className="banner-left-wrap">
                  <h1>
                    Professional{" "}
                    <span className="highlight">Website Development</span> That
                    Converts Visitors into Customers
                  </h1>
                  <p className="hero-description">
                    We build high-performing websites tailored to your business
                    goals. From e-commerce stores to corporate websites and
                    custom web applications—we deliver solutions that drive real
                    results.
                  </p>
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
                        Custom-designed for your specific business needs
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
                        Mobile-responsive and SEO-optimized from day one
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
                        Delivered in 30-45 days with comprehensive revisions
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
                        Post-launch support and training included
                      </p>
                    </div>
                  </div>

                  {/* hero CTA buttons (no popup now) */}
                  <div className="button-wrapper">
                    <button className="enquire-btn">
                      Get Your Free Consultation
                    </button>
                    <button className="enquire-btn2">View Our Work</button>
                  </div>
                  <div class="trust-line">
                    <span class="stars">★★★★★</span>
                    <span>150+ websites delivered</span>
                    <span>|</span>
                    <span>15 years in business</span>
                    <span>|</span>
                    <span>Mumbai, India</span>
                  </div>
                </div>
              </div>

              <div className="col-md-5 col-xs-12">
                <div className="form-wrap-tile-top">
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
              <div className="col-md-12">
                <div className="col-md-12 col-xs-12">
                  <div className="our-partners align-center">
                    <h3>Join 150+ Businesses Who Trust Makemelive</h3>
                  </div>
                  <BrandLogosGrid />
                  <GoogleRatingButton />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* our awesome clients end */}
        {/* Technologies We work with section start */}
        <section className="fold-tech">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12 col-xs-12">
                <div className="work-with-technologies-title align-center">
                  <h3>Technologies We Work With</h3>
                  <p>
                    Platform-agnostic approach—we choose what's best for your
                    project
                  </p>
                </div>
                <TechnologiesWorkGrid />
              </div>
            </div>
          </div>
        </section>
        {/* Technologies We work with section end */}
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
        {/* Website Design and Development Service Start */}
        {/* <section className="services-modern">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12 col-xs-12">
                <div className="services-modern-head align-center">
                  <h2>Website Design &amp; Development Services</h2>
                  <p>Built for modern businesses in Mumbai &amp; beyond</p>
                </div>

                <div className="row cards-row">
                  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div className="service-card">
                      <span className="service-icon">
                        <FiGlobe />
                      </span>
                      <h3 className="service-title">WordPress Websites</h3>
                      <p className="service-desc">
                        Fast, secure, easy-to-manage business sites.
                      </p>
                      <a href="#landing-form" className="service-cta">
                        Get Costs <FaArrowRight className="arrow" />
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div className="service-card">
                      <span className="service-icon">
                        <FiShoppingCart />
                      </span>
                      <h3 className="service-title">Shopify Stores</h3>
                      <p className="service-desc">
                        Conversion-ready storefronts with clean UX.
                      </p>
                      <a href="#landing-form" className="service-cta">
                        Get Costs <FaArrowRight className="arrow" />
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div className="service-card">
                      <span className="service-icon">
                        <FiCode />
                      </span>
                      <h3 className="service-title">Custom Development</h3>
                      <p className="service-desc">
                        Node/PHP/React as needed. Scalable &amp; secure.
                      </p>
                      <a href="#landing-form" className="service-cta">
                        Get Costs <FaArrowRight className="arrow" />
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div className="service-card">
                      <span className="service-icon">
                        <FiZap />
                      </span>
                      <h3 className="service-title">Performance &amp; Speed</h3>
                      <p className="service-desc">
                        Core Web Vitals, CDN, caching—faster pages, better SEO.
                      </p>
                      <a href="#landing-form" className="service-cta">
                        Get Costs <FaArrowRight className="arrow" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Website Design and Development Service End */}

        {/* why choose us section start */}
        <section class="why-choose fade-in visible">
          <div class="container">
            <div className="row justify-content-center">
              <div className="col-md-12 col-xs-12">
                <div class="section-header">
                  <h2>Why Choose Makemelive for Website Development?</h2>
                  <p>Tailored solutions built around your business goals</p>
                </div>
                <div class="features-grid">
                  <div class="feature-card">
                    <div class="feature-icon">🛠️</div>
                    <h3>Technology-Agnostic Approach</h3>
                    <p>
                      We recommend and build on the platform that best fits your
                      business requirements—not what's easiest for us. Your
                      success is our priority.
                    </p>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon">🎨</div>
                    <h3>Custom Design &amp; Development</h3>
                    <p>
                      No templates. Every website is designed and developed
                      specifically for your brand, industry, and target audience
                      to maximize conversions.
                    </p>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon">📱</div>
                    <h3>Mobile-First &amp; Lightning Fast</h3>
                    <p>
                      70% of customers browse on mobile. Your website will be
                      responsive, load in under 2 seconds, and provide seamless
                      experience across all devices.
                    </p>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon">🔍</div>
                    <h3>SEO-Optimized from Day One</h3>
                    <p>
                      We build with Google in mind. Proper structure, meta tags,
                      sitemaps, and technical SEO so you rank higher and get
                      found by customers.
                    </p>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon">⚡</div>
                    <h3>Complete Control &amp; Ownership</h3>
                    <p>
                      You own your website—source code, content, everything. We
                      train you to manage it yourself or offer ongoing
                      maintenance. Your choice.
                    </p>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon">💪</div>
                    <h3>30 Days Post-Launch Support</h3>
                    <p>
                      Free support for bug fixes, content updates, and technical
                      questions for 30 days after launch. We're with you beyond
                      deployment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* why choose us section end */}

        {/* our services fold6  start */}
        {/* <section className="fold6">
          <div className="our-services-title align-center">
            <h3>
              <span className="text-color-primary">Our Work</span>
            </h3>
            <div className="our-work-subtitle">
              <p>
                From audit to launch—executed by senior engineers & designers
              </p>
            </div>
          </div>

          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-4 col-xs-12">
                <div className="services-icon-box-wrap">
                  <div className="services-icon-item">
                    <img
                      src={imagePath("website-development.png")}
                      alt="websitedevelopment"
                    />
                  </div>
                  <div className="service-icon-data-wrap">
                    <div className="service-icon-title">
                      <h5>Website Design and Development</h5>
                    </div>
                    <div className="service-icon-desc">
                      <p>
                        When you step into this digital space, the website is
                        the fundamental need as it is the first step to
                        strengthen your business; we at Make Me Live have a team
                        of expert developers who will revolve around your ideas
                        and mold their creative ideas into a tremendous website
                        design that will best suit your requirements.
                      </p>
                    </div>
                    <div className="service-icon-btn-wrap">
                      <a className="service-icon-btn-text" href="#get-started">
                        Get Started{" "}
                        <span className="service-btn-arrow">
                          <FaArrowUpRightFromSquare />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-xs-12">
                <div className="services-icon-box-wrap">
                  <div className="services-icon-item">
                    <img
                      src={imagePath("smartphone.png")}
                      alt="websitedevelopment"
                    />
                  </div>
                  <div className="service-icon-data-wrap">
                    <div className="service-icon-title">
                      <h5>Mobile App Development</h5>
                    </div>
                    <div className="service-icon-desc">
                      <p>
                        Mobile Application represents your brand; in short, it’s
                        your brand’s face, and it needs to be designed
                        accordingly, With easy to use and latest features that
                        your customers need. that your customers love! Our
                        developers are highly skilled and make a perfect app
                        that reflects your brand and fits your business
                        requirement.
                      </p>
                    </div>
                    <div className="service-icon-btn-wrap">
                      <a className="service-icon-btn-text" href="#get-started">
                        Get Started{" "}
                        <span className="service-btn-arrow">
                          <FaArrowUpRightFromSquare />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-xs-12">
                <div className="services-icon-box-wrap">
                  <div className="services-icon-item">
                    <img
                      src={imagePath("search-engine-optimize.png")}
                      alt="websitedevelopment"
                    />
                  </div>
                  <div className="service-icon-data-wrap">
                    <div className="service-icon-title">
                      <h5>Search Engine Optimisation</h5>
                    </div>
                    <div className="service-icon-desc">
                      <p>
                        Do you think a website is the end goal? No, right? You
                        need to drive the correct target audience to your
                        webpage, and SEO will help you achieve that goal. Search
                        Engine Optimisation is a method that involves a set of
                        processes to help your web page rank through On-Page and
                        Off-Page SEO. Our dedicated SEO Experts are here to help
                        you with it; they will help rank and increase traffic to
                        your website!
                      </p>
                    </div>
                    <div className="service-icon-btn-wrap">
                      <a className="service-icon-btn-text" href="#get-started">
                        Get Started{" "}
                        <span className="service-btn-arrow">
                          <FaArrowUpRightFromSquare />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-xs-12">
                <div className="services-icon-box-wrap">
                  <div className="services-icon-item">
                    <img
                      src={imagePath("website-optimization.png")}
                      alt="websitedevelopment"
                    />
                  </div>
                  <div className="service-icon-data-wrap">
                    <div className="service-icon-title">
                      <h5>Website Maintenance</h5>
                    </div>
                    <div className="service-icon-desc">
                      <p>
                        Unlike humans, even technology needs to visit their
                        experts for their maintenance. Our team of experts will
                        help you diagnose your website’s health and performance
                        by keeping it up-to-date with all the requirements so
                        that it doesn’t stop giving your brand massive results!
                      </p>
                    </div>
                    <div className="service-icon-btn-wrap">
                      <a className="service-icon-btn-text" href="#get-started">
                        Get Started{" "}
                        <span className="service-btn-arrow">
                          <FaArrowUpRightFromSquare />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-xs-12">
                <div className="services-icon-box-wrap">
                  <div className="services-icon-item">
                    <img
                      src={imagePath("website-speed-optimization.png")}
                      alt="websitedevelopment"
                    />
                  </div>
                  <div className="service-icon-data-wrap">
                    <div className="service-icon-title">
                      <h5>Website Speed Optimisation</h5>
                    </div>
                    <div className="service-icon-desc">
                      <p>
                        Website speed is a crucial part of holding your users on
                        your website for a longer time, is your website taking
                        time to load? Don’t you worry; our team of expert
                        developers will help you by optimising the speed of your
                        website, which will also give a unique browsing
                        experience to your customer.
                      </p>
                    </div>
                    <div className="service-icon-btn-wrap">
                      <a className="service-icon-btn-text" href="#get-started">
                        Get Started{" "}
                        <span className="service-btn-arrow">
                          <FaArrowUpRightFromSquare />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-xs-12">
                <div className="services-icon-box-wrap">
                  <div className="services-icon-item">
                    <img
                      src={imagePath("globe-grid.png")}
                      alt="websitedevelopment"
                    />
                  </div>
                  <div className="service-icon-data-wrap">
                    <div className="service-icon-title">
                      <h5>Website Security</h5>
                    </div>
                    <div className="service-icon-desc">
                      <p>
                        We know that you worry about your security, but when you
                        are a part of Make Me Live need not worry about your
                        website’s security, our technical expert team will help
                        you in securing your personal as well as public faced
                        data safe from any cyber-attacks! Your Security is our
                        Priority!
                      </p>
                    </div>
                    <div className="service-icon-btn-wrap">
                      <a className="service-icon-btn-text" href="#get-started">
                        Get Started{" "}
                        <span className="service-btn-arrow">
                          <FaArrowUpRightFromSquare />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-xs-12">
                <div className="services-icon-box-wrap">
                  <div className="services-icon-item">
                    <img
                      src={imagePath("ecommerce-solutions.png")}
                      alt="websitedevelopment"
                    />
                  </div>
                  <div className="service-icon-data-wrap">
                    <div className="service-icon-title">
                      <h5>Ecommerce Solutions</h5>
                    </div>
                    <div className="service-icon-desc">
                      <p>
                        Your Best-Friend for all your Ecommerce Needs! Want a
                        website that can allow users to buy or sell any goods or
                        services easily? Then worry not Make Me Live has a
                        perfect solution for all your E-commerce needs; from
                        receiving orders to setting up a payment gateway, we are
                        here from the start till the end!
                      </p>
                    </div>
                    <div className="service-icon-btn-wrap">
                      <a className="service-icon-btn-text" href="#get-started">
                        Get Started{" "}
                        <span className="service-btn-arrow">
                          <FaArrowUpRightFromSquare />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-xs-12">
                <div className="services-icon-box-wrap">
                  <div className="services-icon-item">
                    <img
                      src={imagePath("wordpress-expert.png")}
                      alt="websitedevelopment"
                    />
                  </div>
                  <div className="service-icon-data-wrap">
                    <div className="service-icon-title">
                      <h5>Wordpress Expert Solution</h5>
                    </div>
                    <div className="service-icon-desc">
                      <p>
                        Want a WordPress website? But confused about what and
                        how to do it? Don’t worry, you can consult our team of
                        experts, and your wordpress website will be on board;
                        with a user-friendly interface and latest designs, we
                        will bring the best Wordpress Expert Solution for you.
                      </p>
                    </div>
                    <div className="service-icon-btn-wrap">
                      <a className="service-icon-btn-text" href="#get-started">
                        Get Started{" "}
                        <span className="service-btn-arrow">
                          <FaArrowUpRightFromSquare />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-xs-12">
                <div className="services-icon-box-wrap">
                  <div className="services-icon-item">
                    <img
                      src={imagePath("shopify.png")}
                      alt="websitedevelopment"
                    />
                  </div>
                  <div className="service-icon-data-wrap">
                    <div className="service-icon-title">
                      <h5>Shopify Expert Solution</h5>
                    </div>
                    <div className="service-icon-desc">
                      <p>
                        Do you want your website to be built on Shopify?
                        Makemelive has a solution to your digital requirement!
                        For all your website solutions related to Shopify, we
                        bring on board many technically sound and expert people
                        to help you with all your website requirements.
                      </p>
                    </div>
                    <div className="service-icon-btn-wrap">
                      <a className="service-icon-btn-text" href="#get-started">
                        Get Started{" "}
                        <span className="service-btn-arrow">
                          <FaArrowUpRightFromSquare />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        {/* our services fold6  end */}
        {/* our process (new) */}
        {/* <section className="fold-process">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12 col-xs-12">
                <div className="process-head">
                  <h2>Our Process</h2>
                  <p>
                    From discovery to launch, every step is clear and
                    collaborative
                  </p>
                </div>
                <ol className="process-grid">
                  <li className="process-card">
                    <span className="process-no" data-text="01" aria-hidden>
                      01
                    </span>
                    <span className="process-icon">
                      <FiSearch />
                    </span>
                    <h3 className="process-title">Discover</h3>
                    <p className="process-desc">
                      Requirements, audit, success metrics
                    </p>
                  </li>

                  <li className="process-card">
                    <span className="process-no" data-text="02" aria-hidden>
                      02
                    </span>
                    <span className="process-icon">
                      <PiPaintBrushBold />
                    </span>
                    <h3 className="process-title">Design</h3>
                    <p className="process-desc">
                      Wireframes, UI, UX copy, reviews
                    </p>
                  </li>

                  <li className="process-card">
                    <span className="process-no" data-text="03" aria-hidden>
                      03
                    </span>
                    <span className="process-icon">
                      <FiTool />
                    </span>
                    <h3 className="process-title">Build</h3>
                    <p className="process-desc">CMS setup, integrations, QA</p>
                  </li>

                  <li className="process-card">
                    <span className="process-no" data-text="04" aria-hidden>
                      04
                    </span>
                    <span className="process-icon">
                      <FaRocket />
                    </span>
                    <h3 className="process-title">Launch</h3>
                    <p className="process-desc">
                      Deployment, training, 15-day support
                    </p>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section> */}
        {/* our process end */}

        {/* pricing section start */}
        {/* <section className="fold-pricing" id="pricing">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-12 col-xs-12">
                <div className="pricing-head align-center">
                  <h2>Transparent Pricing</h2>
                  <p>Fixed milestones, clear timelines, no surprises</p>
                </div>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-md-4 col-xs-12">
                <div className="plan-card">
                  <div className="plan-top">
                    <h4 className="plan-name">Starter</h4>
                    <div className="plan-price">
                      <span className="muted">From</span>{" "}
                      <span className="value">₹45,000</span>
                    </div>
                    <div className="plan-time">Timeline: 2–3 weeks</div>
                  </div>

                  <ul className="plan-features">
                    <li>
                      <FiCheckCircle /> 5–7 pages
                    </li>
                    <li>
                      <FiCheckCircle /> Mobile responsive
                    </li>
                    <li>
                      <FiCheckCircle /> SSL &amp; security basics
                    </li>
                    <li>
                      <FiCheckCircle /> On-page SEO foundation
                    </li>
                    <li>
                      <FiCheckCircle /> 15-day support
                    </li>
                  </ul>

                  <div className="plan-cta">
                    <a className="btn-ghost" href="#landing-form">
                      Get Quote
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-xs-12">
                <div className="plan-card plan-popular">
                  <div className="popular-badge">
                    <FaStar /> Popular
                  </div>

                  <div className="plan-top">
                    <h4 className="plan-name">Business</h4>
                    <div className="plan-price">
                      <span className="muted">From</span>{" "}
                      <span className="value">₹85,000</span>
                    </div>
                    <div className="plan-time">Timeline: 3–5 weeks</div>
                  </div>

                  <ul className="plan-features">
                    <li>
                      <FiCheckCircle /> 10–15 pages
                    </li>
                    <li>
                      <FiCheckCircle /> Blog functionality
                    </li>
                    <li>
                      <FiCheckCircle /> Advanced animations
                    </li>
                    <li>
                      <FiCheckCircle /> Analytics setup
                    </li>
                    <li>
                      <FiCheckCircle /> Speed optimization
                    </li>
                    <li>
                      <FiCheckCircle /> Training session
                    </li>
                  </ul>

                  <div className="plan-cta">
                    <a className="btn-solid" href="#landing-form">
                      Get Quote
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-xs-12">
                <div className="plan-card">
                  <div className="plan-top">
                    <h4 className="plan-name">Pro / Custom</h4>
                    <div className="plan-price">
                      <span className="muted">Scope-based</span>
                    </div>
                    <div className="plan-time">Timeline: After audit</div>
                  </div>

                  <ul className="plan-features">
                    <li>
                      <FiCheckCircle /> E-commerce
                    </li>
                    <li>
                      <FiCheckCircle /> Custom integrations
                    </li>
                    <li>
                      <FiCheckCircle /> Advanced features
                    </li>
                    <li>
                      <FiCheckCircle /> API development
                    </li>
                    <li>
                      <FiCheckCircle /> Dedicated support
                    </li>
                  </ul>

                  <div className="plan-cta">
                    <a className="btn-ghost" href="#landing-form">
                      Get Quote
                    </a>
                  </div>
                </div>
              </div>
              <div className="bottom-content-plan">
                <p>
                  * Pricing excludes hosting and premium plugin/app
                  subscriptions, if any. Fixed quote after a quick audit call.
                </p>
              </div>
            </div>
          </div>
        </section> */}
        {/* pricing section end */}

        {/* our services fold2 start */}
        {/* <section className="fold2">
          <div className="container">
            <div className="our-services-subtitle align-center">
              <h4>WHY CHOOSE US?</h4>
            </div>
            <div className="our-services-title align-center">
              <span>
                <h2>Experience the Top-Class Service</h2>
              </span>
            </div>
            <div className="our-services-title-mobile align-center">
              <span>
                <h2>Experience the</h2>
                <h2>Top-Class Service</h2>
              </span>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-4 col-xs-12">
                <div className="landing-service-col">
                  <div className="landing-service-icon">
                    <div className="landing-icon-image">
                      <img
                        src={imagePath("expert.png")}
                        alt="websitedevelopment"
                      />
                    </div>
                  </div>
                  <div className="landing-service-details-wrap align-center">
                    <div className="landing-service-title">
                      <h3>Expert</h3>
                    </div>
                    <div className="landing-service-para">
                      <p>
                        We have a group of highly skilled people on board whose
                        expertise will help your business scale on another level
                        and make your brand highly visible! Our experts will
                        never fail to make you keep believing in us!
                      </p>
                    </div>
                    <div className="landing-service-arrow">
                      <a className="lanidng-button-text" href="#get-started">
                        Get Started{" "}
                        <span className="lanidng-button-arrow">
                          <FaArrowRight />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-xs-12">
                <div className="landing-service-col">
                  <div className="landing-service-icon">
                    <div className="landing-icon-image">
                      <img
                        src={imagePath("delivery.png")}
                        alt="websitedevelopment"
                      />
                    </div>
                  </div>
                  <div className="landing-service-details-wrap align-center">
                    <div className="landing-service-title">
                      <h3>Delivery</h3>
                    </div>
                    <div className="landing-service-para">
                      <p>
                        We do not just believe in delivering the best, we also
                        believe in delivering it on time; our team makes sure
                        that your business gets more than it deserves! Our
                        discipline will never fail to blow your mind.
                      </p>
                    </div>
                    <div className="landing-service-arrow">
                      <a className="lanidng-button-text" href="#get-started">
                        Get Started{" "}
                        <span className="lanidng-button-arrow">
                          <FaArrowRight />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-xs-12">
                <div className="landing-service-col">
                  <div className="landing-service-icon">
                    <div className="landing-icon-image">
                      <img
                        src={imagePath("creative-mind.png")}
                        alt="websitedevelopment"
                      />
                    </div>
                  </div>
                  <div className="landing-service-details-wrap align-center">
                    <div className="landing-service-title">
                      <h3>Creative Mind</h3>
                    </div>
                    <div className="landing-service-para">
                      <p>
                        We know it is challenging to cope with the social world
                        but worry not, we are here to provide you with the
                        solution and take your brand to the next level; our
                        creative team is highly professional in building your
                        growth targets and working towards it!
                      </p>
                    </div>
                    <div className="landing-service-arrow">
                      <a className="lanidng-button-text" href="#get-started">
                        Get Started{" "}
                        <span className="lanidng-button-arrow">
                          <FaArrowRight />
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        {/* our services fold2 end */}
        {/* project counter landing page start */}
        {/* <section className="fold7">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-4 col-xs-12">
                <div className="counter-box-wrap">
                  <div className="counter-wrap-item">
                    <div className="counter-box-icon counter-icon1">
                      <ImSleepy />
                    </div>
                    <div className="counter-box-num">
                      <span className="count percent">
                        <CountUp end={400} />
                      </span>
                    </div>
                  </div>
                  <div className="counter-box-details">
                    <h3>Hours Of Sleepless Nights</h3>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-xs-12">
                <div className="counter-box-wrap">
                  <div className="counter-wrap-item">
                    <div className="counter-box-icon counter-icon2">
                      <FaHandshake />
                    </div>
                    <div className="counter-box-num">
                      <span className="count percent">
                        <CountUp end={250} />
                      </span>
                    </div>
                  </div>
                  <div className="counter-box-details">
                    <h3>Brands</h3>
                  </div>
                </div>
              </div>

              <div className="col-md-4 col-xs-12">
                <div className="counter-box-wrap">
                  <div className="counter-wrap-item">
                    <div className="counter-box-icon counter-icon3">
                      <SiCoffeescript />
                    </div>
                    <div className="counter-box-num">
                      <span className="count percent">
                        <CountUp end={200} />
                      </span>
                    </div>
                  </div>
                  <div className="counter-box-details">
                    <h3>Cups of Coffee</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        {/* project counter landing page end */}

        {/* our portfolio section start */}
        <section className="fold3" id="portfolio">
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
                  <h2>Simple, Transparent Process. No Surprises.</h2>
                  <p>From initial call to successful launch in 6-8 weeks</p>
                </div>
                <div className="process-steps">
                  <div className="process-step">
                    <div className="step-number">1</div>
                    <h3>Week 1-2: Discovery &amp; Design</h3>
                    <p>
                      We learn your business, competitors, and goals. Recommend
                      the best technology approach. Create design mockups for
                      your approval.
                    </p>
                    <p>
                      <strong>You'll Get:</strong> Technology recommendation,
                      competitor analysis, custom design mockups, sitemap
                    </p>
                  </div>
                  <div className="process-step">
                    <div className="step-number">2</div>
                    <h3>Week 3-5: Development</h3>
                    <p>
                      Our developers build your website with clean code, fast
                      performance, and mobile responsiveness. Weekly progress
                      updates included.
                    </p>
                    <p>
                      <strong>You'll Get:</strong> Fully functional website, CMS
                      training, SEO optimization, integrations
                    </p>
                  </div>
                  <div className="process-step">
                    <div className="step-number">3</div>
                    <h3>Week 6-8: Testing &amp; Launch</h3>
                    <p>
                      Rigorous testing across devices and browsers. Train your
                      team. Handle hosting setup. Launch your website. 30 days
                      free support.
                    </p>
                    <p>
                      <strong>You'll Get:</strong> Testing report, training
                      materials, admin access, 30 days support
                    </p>
                  </div>
                </div>
                <div className="process-highlights">
                  <div className="highlight-grid">
                    <div className="highlight-item">
                      <div className="highlight-icon">📅</div>
                      <div className="highlight-text">
                        <strong>6-8 Week Timeline</strong>
                        <span>Most projects completed on schedule</span>
                      </div>
                    </div>
                    <div className="highlight-item">
                      <div className="highlight-icon">💰</div>
                      <div className="highlight-text">
                        <strong>Fixed Price Quote</strong>
                        <span>No hidden costs or surprises</span>
                      </div>
                    </div>
                    <div className="highlight-item">
                      <div className="highlight-icon">🔄</div>
                      <div className="highlight-text">
                        <strong>Comprehensive Revisions</strong>
                        <span>Included within project scope</span>
                      </div>
                    </div>
                    <div className="highlight-item">
                      <div className="highlight-icon">📞</div>
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
        <section className="fold8 our-experience-wrapper">
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
        </section>
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
                  📞 +91 91673 52347 | +91 91368 51479
                </div>
                <div class="contact-item">
                  📧{" "}
                  <a
                    href="/cdn-cgi/l/email-protection"
                    class="__cf_email__"
                    data-cfemail="26554e47544f4d664b474d434b434a4f5043084f48"
                  >
                    [email&nbsp;protected]
                  </a>
                </div>
                <div class="contact-item">
                  ⏰ Mon-Fri: 10:30 AM - 7:30 PM IST
                </div>
              </div>
            </div>
          </section>
        </div>
        {/* contact form section end */}

        {/* contact form section end */}

        {/* button right side fixed start */}
        <div className="switcher-tab-btn">
          <a href="tel:9167352347">
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
          <a href="https://www.makemelive.in/contact-us/">
            <button className="btn-services-quote">
              <span className="ico-txt">Connect</span>
              <span className="ico">
                <FaPeopleArrows />
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
