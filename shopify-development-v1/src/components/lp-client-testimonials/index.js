import React, {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
  useMemo,
} from "react";
import { gethome_testimonial_data } from "../../api/api";

import "./lp-client-testimonials.scss";

export default function LPClientTestimonialsMarquee({
  logoHeight = 72,
  equalHeights = true,
}) {
  const [items, setItems] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewport, setViewport] = useState({
    slidesToShow: 2,
    centerPadding: 60,
  });

  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const trackRef = useRef(null);
  const autoPlayRef = useRef(null);
  const cardRefs = useRef([]);
  const resizeRafRef = useRef(null);

  // drag / swipe refs
  const dragStartXRef = useRef(0);
  const dragCurrentXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragMovedRef = useRef(false);

  const MOBILE_BREAKPOINT = 767;
  const AUTOPLAY_DELAY = 2600;
  const TRANSITION_SPEED = 700;
  const SWIPE_THRESHOLD = 50;

  const getInitials = (name = "") => {
    const parts = name
      .trim()
      .split(" ")
      .filter(Boolean);
    if (!parts.length) return "";
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase();
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const data = await gethome_testimonial_data();
        if (!active) return;

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
      active = false;
    };
  }, []);

  const getViewportSettings = useCallback(() => {
    const w = window.innerWidth;

    if (w < 576) {
      return { slidesToShow: 1, centerPadding: 20 };
    }
    if (w < 768) {
      return { slidesToShow: 1, centerPadding: 30 };
    }
    if (w < 992) {
      return { slidesToShow: 1, centerPadding: 120 };
    }
    if (w < 1200) {
      return { slidesToShow: 2, centerPadding: 40 };
    }
    if (w < 1440) {
      return { slidesToShow: 2, centerPadding: 80 };
    }

    return { slidesToShow: 2, centerPadding: 60 };
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const updateViewport = () => {
      if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);
      resizeRafRef.current = requestAnimationFrame(() => {
        setViewport(getViewportSettings());
      });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
      if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);
    };
  }, [mounted, getViewportSettings]);

  const cloneCount = useMemo(() => {
    return Math.max(viewport.slidesToShow + 2, 4);
  }, [viewport.slidesToShow]);

  const extendedItems = useMemo(() => {
    if (!items.length) return [];
    if (items.length === 1) return items;

    const head = items.slice(0, cloneCount);
    const tail = items.slice(-cloneCount);

    return [...tail, ...items, ...head];
  }, [items, cloneCount]);

  useEffect(() => {
    if (!items.length) return;
    setCurrentIndex(items.length > 1 ? cloneCount : 0);
    setIsAnimating(true);
  }, [items, cloneCount]);

  const measureHeights = useCallback(() => {
    if (!sectionRef.current) return;

    if (!equalHeights) {
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

  useLayoutEffect(() => {
    if (!extendedItems.length) return;

    measureHeights();

    const onResize = () => measureHeights();
    window.addEventListener("resize", onResize);

    const ro = new ResizeObserver(() => measureHeights());
    cardRefs.current.forEach((el) => el && ro.observe(el));

    const cleanups = [];
    cardRefs.current.forEach((el) => {
      if (!el) return;
      const img = el.querySelector("img");
      if (img && !img.complete) {
        const fn = () => measureHeights();
        img.addEventListener("load", fn);
        cleanups.push(() => img.removeEventListener("load", fn));
      }
    });

    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, [extendedItems.length, measureHeights]);

  const goToNext = useCallback(() => {
    if (items.length <= 1) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);
  }, [items.length]);

  const goToPrev = useCallback(() => {
    if (items.length <= 1) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev - 1);
  }, [items.length]);

  useEffect(() => {
    if (items.length <= 1) return;
    if (isHovered || isDraggingRef.current) return;

    autoPlayRef.current = setInterval(() => {
      goToNext();
    }, AUTOPLAY_DELAY);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [goToNext, isHovered, items.length, currentIndex]);

  const handleTransitionEnd = useCallback(() => {
    if (items.length <= 1) return;

    const realStart = cloneCount;
    const realEnd = cloneCount + items.length - 1;

    if (currentIndex > realEnd) {
      setIsAnimating(false);
      setCurrentIndex(realStart);
      return;
    }

    if (currentIndex < realStart) {
      setIsAnimating(false);
      setCurrentIndex(realEnd);
    }
  }, [currentIndex, items.length, cloneCount]);

  useEffect(() => {
    if (isAnimating) return;

    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    });

    return () => cancelAnimationFrame(id);
  }, [isAnimating]);

  const handleDragStart = useCallback(
    (clientX) => {
      if (items.length <= 1) return;
      isDraggingRef.current = true;
      dragMovedRef.current = false;
      dragStartXRef.current = clientX;
      dragCurrentXRef.current = clientX;
    },
    [items.length],
  );

  const handleDragMove = useCallback((clientX) => {
    if (!isDraggingRef.current) return;
    dragCurrentXRef.current = clientX;

    const diff = Math.abs(dragCurrentXRef.current - dragStartXRef.current);
    if (diff > 6) {
      dragMovedRef.current = true;
    }
  }, []);

  const handleDragEnd = useCallback(() => {
    if (!isDraggingRef.current) return;

    const diff = dragCurrentXRef.current - dragStartXRef.current;

    isDraggingRef.current = false;

    if (Math.abs(diff) >= SWIPE_THRESHOLD) {
      if (diff < 0) {
        goToNext(); // swipe left
      } else {
        goToPrev(); // swipe right
      }
    }
  }, [goToNext, goToPrev]);

  if (!items.length) return null;

  const slideWidthPercent = 100 / viewport.slidesToShow;
  const trackTranslate = -(currentIndex * slideWidthPercent);

  return (
    <section
      ref={sectionRef}
      className="lpctm-outer lpctm-slick-outer is-compact"
      style={{
        "--logo-h": `${logoHeight}px`,
        "--stage-max": "1100px",
        "--stage-pad": "12px",
      }}
    >
      <div className="lpctm-stage">
        <div
          className="lpctm-slick slick-slider"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            handleDragEnd();
          }}
        >
          <div
            ref={listRef}
            className="slick-list"
            style={{
              overflow: "hidden",
              paddingLeft: `${viewport.centerPadding}px`,
              paddingRight: `${viewport.centerPadding}px`,
              cursor: isDraggingRef.current ? "grabbing" : "grab",
              touchAction: "pan-y",
              userSelect: "none",
            }}
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseMove={(e) => handleDragMove(e.clientX)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
            onTouchEnd={handleDragEnd}
            onTouchCancel={handleDragEnd}
          >
            <div
              ref={trackRef}
              className="slick-track"
              onTransitionEnd={handleTransitionEnd}
              style={{
                display: "flex",
                willChange: "transform",
                transform: `translate3d(${trackTranslate}%, 0, 0)`,
                transition: isAnimating
                  ? `transform ${TRANSITION_SPEED}ms ease`
                  : "none",
              }}
            >
              {extendedItems.map((t, i) => (
                <div
                  key={`${i}-${t.author}-${t.project}`}
                  className="lpctm-slide slick-slide"
                  style={{
                    width: `${slideWidthPercent}%`,
                    flex: `0 0 ${slideWidthPercent}%`,
                  }}
                >
                  <div
                    style={{ width: "100%" }}
                    onClick={(e) => {
                      if (dragMovedRef.current) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    }}
                  >
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
                                t.project
                                  ? `${t.project} logo`
                                  : `${t.author} logo`
                              }
                              loading="lazy"
                              className={
                                t.project?.toLowerCase().includes("smitten")
                                  ? "is-smitten-logo"
                                  : ""
                              }
                              draggable={false}
                            />
                          ) : (
                            <div
                              className="lpctm-logoPlaceholder"
                              aria-hidden
                            />
                          )}
                        </div>

                        <div className="lpctm-quoteWrap">
                          <p className="lpctm-quote">{t.quote}</p>

                          <div
                            className="lpctm-author"
                            style={{ "--avatar": `"${getInitials(t.author)}"` }}
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
