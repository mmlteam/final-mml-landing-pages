import React, {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import { gethome_testimonial_data } from "../../api/api";

import "./lp-client-testimonials.scss";

export default function LPClientTestimonialsMarquee({
  logoHeight = 72,
  equalHeights = true,
}) {
  const [items, setItems] = useState([]);
  const [expandedQuotes, setExpandedQuotes] = useState({});
  const [overflowingQuotes, setOverflowingQuotes] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const quoteRefs = useRef([]);

  const MOBILE_BREAKPOINT = 767;

  const getInitials = (name = "") => {
    const parts = name
      .trim()
      .split(" ")
      .filter(Boolean);

    if (!parts.length) return "";
    if (parts.length === 1) return parts[0][0].toUpperCase();

    return parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase();
  };

  const toggleQuote = (index) => {
    setExpandedQuotes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await gethome_testimonial_data();
        if (!mounted) return;

        const mapped = (Array.isArray(data) ? data : []).map((t) => ({
          quote: t.home_testimonials_client_testimonial || "",
          author: t.home_testimonials_client_name || "",
          role: [
            t.home_testimonials_client_designation,
            t.home_testimonials_project_name,
          ]
            .filter(Boolean)
            .join(" , "),
          project: t.home_testimonials_project_name || "",
          logo: t.home_testimonials_client_project_logo
            ? "https://api.mmlprojects.in/images/client-testimonials/" +
              t.home_testimonials_client_project_logo
            : null,
        }));

        setItems(mapped);
      } catch (e) {
        console.error("Testimonials fetch error:", e);
        setItems([]);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const measureHeights = useCallback(() => {
    if (!sectionRef.current) return;

    if (!equalHeights || window.innerWidth <= MOBILE_BREAKPOINT) {
      sectionRef.current.style.setProperty("--card-h", "auto");
      return;
    }

    sectionRef.current.style.setProperty("--card-h", "auto");

    requestAnimationFrame(() => {
      const heights = cardRefs.current
        .filter(Boolean)
        .map((el) => el.scrollHeight || el.offsetHeight || 0);

      const maxH = heights.length ? Math.max(...heights) : 0;
      sectionRef.current?.style.setProperty("--card-h", `${maxH}px`);
    });
  }, [equalHeights]);

  const detectQuoteOverflow = useCallback(() => {
    if (!isMobile) {
      setOverflowingQuotes({});
      return;
    }

    requestAnimationFrame(() => {
      const next = {};

      quoteRefs.current.forEach((el, index) => {
        if (!el) return;

        const isExpanded = !!expandedQuotes[index];

        if (isExpanded) {
          next[index] = true;
          return;
        }

        next[index] = el.scrollHeight > el.clientHeight + 1;
      });

      setOverflowingQuotes(next);
    });
  }, [isMobile, expandedQuotes]);

  useLayoutEffect(() => {
    if (!items.length) return;

    measureHeights();

    const onResize = () => {
      measureHeights();
      detectQuoteOverflow();
    };

    window.addEventListener("resize", onResize);

    const ro = new ResizeObserver(() => {
      measureHeights();
      detectQuoteOverflow();
    });

    cardRefs.current.forEach((el) => el && ro.observe(el));
    quoteRefs.current.forEach((el) => el && ro.observe(el));

    cardRefs.current.forEach((el) => {
      if (!el) return;
      const img = el.querySelector("img");
      if (img && !img.complete) {
        img.addEventListener("load", () => {
          measureHeights();
          detectQuoteOverflow();
        });
      }
    });

    detectQuoteOverflow();

    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [items.length, measureHeights, detectQuoteOverflow]);

  useEffect(() => {
    detectQuoteOverflow();
    measureHeights();
  }, [expandedQuotes, detectQuoteOverflow, measureHeights]);

  if (!items.length) return null;

  return (
    <section
      ref={sectionRef}
      className="lpctm-outer lpctm-swiper-outer is-compact"
      style={{
        "--logo-h": `${logoHeight}px`,
        "--stage-max": "1100px",
        "--stage-pad": "12px",
      }}
    >
      <div className="lpctm-stage">
        <Swiper
          modules={[Autoplay]}
          className="lpctm-swiper"
          loop={items.length > 3}
          centeredSlides={true}
          watchSlidesProgress={true}
          grabCursor={true}
          speed={700}
          autoplay={{
            delay: 2600,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          slidesPerView={1.08}
          spaceBetween={14}
          breakpoints={{
            576: {
              slidesPerView: 1.12,
              spaceBetween: 14,
            },
            768: {
              slidesPerView: 1.45,
              spaceBetween: 16,
            },
            992: {
              slidesPerView: 2.05,
              spaceBetween: 18,
            },
            1200: {
              slidesPerView: 2.35,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 2.55,
              spaceBetween: 22,
            },
          }}
        >
          {items.map((t, i) => {
            const isExpanded = !!expandedQuotes[i];
            const showReadMore = isMobile && !!overflowingQuotes[i];

            return (
              <SwiperSlide key={`${i}-${t.author}-${t.project}`}>
                <article
                  className="lpctm-card"
                  tabIndex={-1}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                >
                  <div className="lpctm-xL0qi">
                    <div className="lpctm-iydNQb" />
                  </div>
                  <div className="lpctm-mTurwe">
                    <div className="lpctm-iydNQb" />
                  </div>
                  <div className="lpctm-bvUkz" />

                  <div className="lpctm-content">
                    <div className="lpctm-logoWrap">
                      {t.logo ? (
                        <img
                          src={t.logo}
                          alt={
                            t.project ? `${t.project} logo` : `${t.author} logo`
                          }
                          loading="lazy"
                          className={`${
                            t.project?.toLowerCase().includes("smitten")
                              ? "is-smitten-logo"
                              : ""
                          }`}
                        />
                      ) : (
                        <div className="lpctm-logoPlaceholder" aria-hidden />
                      )}
                    </div>

                    <div className="lpctm-quoteWrap">
                      <div className="lpctm-quoteMark" aria-hidden>
                        “
                      </div>

                      <p
                        ref={(el) => {
                          quoteRefs.current[i] = el;
                        }}
                        className={`lpctm-quote ${
                          isMobile && !isExpanded ? "is-clamped" : ""
                        } ${isExpanded ? "is-expanded" : ""}`}
                      >
                        {t.quote}
                      </p>

                      {showReadMore ? (
                        <button
                          type="button"
                          className="lpctm-readMoreBtn"
                          onClick={() => toggleQuote(i)}
                          aria-expanded={isExpanded}
                        >
                          {isExpanded ? "Read less" : "Read more"}
                        </button>
                      ) : null}

                      <div
                        className="lpctm-author"
                        style={{
                          "--avatar": `"${getInitials(t.author)}"`,
                        }}
                      >
                        <div className="lpctm-authorText">
                          <span className="lpctm-name">{t.author}</span>
                          {t.role ? (
                            <span className="lpctm-role">{t.role}</span>
                          ) : null}
                          <span className="lpctm-rating">★★★★★</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
