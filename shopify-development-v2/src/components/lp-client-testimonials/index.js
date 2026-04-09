import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
  useCallback
} from "react";
import { gethome_testimonial_data } from "../../api/api";
import "./lp-client-testimonials.scss";

export default function LPClientTestimonialsMarquee({
  speed = 40,
  gap = 32,
  logoHeight = 72,
  equalHeights = true
}) {
  const [items, setItems] = useState([]);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  // ✅ ADD: initials helper
  const getInitials = (name = "") => {
    const parts = name
      .trim()
      .split(" ")
      .filter(Boolean);
    if (!parts.length) return "";
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase();
  };

  // Fetch
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await gethome_testimonial_data();
        if (!mounted) return;
        const mapped = (Array.isArray(data) ? data : []).map(t => ({
          quote: t.home_testimonials_client_testimonial || "",
          author: t.home_testimonials_client_name || "",
          role: [
            t.home_testimonials_client_designation,
            t.home_testimonials_project_name
          ]
            .filter(Boolean)
            .join(" , "),
          project: t.home_testimonials_project_name || "",
          logo: t.home_testimonials_client_project_logo
            ? "https://api.mmlprojects.in/images/client-testimonials/" +
              t.home_testimonials_client_project_logo
            : null
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

  const doubled = useMemo(() => [...items, ...items], [items]);
  const isStatic = items.length <= 1;

  const measureHeights = useCallback(() => {
    if (!equalHeights || !sectionRef.current) return;
    const heights = cardRefs.current
      .filter(Boolean)
      .map(el => el.offsetHeight || 0);
    const maxH = heights.length ? Math.max(...heights) : 0;
    sectionRef.current.style.setProperty("--card-h", `${maxH}px`);
  }, [equalHeights]);

  useLayoutEffect(() => {
    if (!equalHeights) return;

    measureHeights();

    const onResize = () => measureHeights();
    window.addEventListener("resize", onResize);

    const ro = new ResizeObserver(measureHeights);
    cardRefs.current.forEach(el => el && ro.observe(el));

    cardRefs.current.forEach(el => {
      if (!el) return;
      const img = el.querySelector("img");
      if (img && !img.complete) {
        img.addEventListener("load", measureHeights, { once: true });
      }
    });

    return () => {
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [items.length, equalHeights, measureHeights]);

  if (!items.length) return null;

  return (
    <section
      ref={sectionRef}
      className={`lpctm-outer ${isStatic ? "is-static" : ""} is-compact`}
      style={{
        "--speed": `${speed}s`,
        "--gap": "15px",
        "--logo-h": "50px",
        "--stage-max": "1100px",
        "--stage-pad": "12px",
        "--cards": 3
      }}
    >
      <div className="lpctm-stage">
        <div className="lpctm-marquee">
          <div className="lpctm-fade lpctm-fade--left" />
          <div className="lpctm-fade lpctm-fade--right" />

          <div className="lpctm-track">
            {doubled.map((t, i) => {
              const measureRef = el => {
                if (i < items.length) cardRefs.current[i] = el;
              };

              return (
                <div
                  className="lpctm-item"
                  key={`${i}-${t.author}-${t.project}`}
                >
                  <article className="lpctm-card" tabIndex={0} ref={measureRef}>
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
                          />
                        ) : (
                          <div className="lpctm-logoPlaceholder" aria-hidden />
                        )}
                      </div>

                      <div className="lpctm-quoteWrap">
                        <div className="lpctm-quoteMark" aria-hidden>
                          “
                        </div>
                        <p className="lpctm-quote">{t.quote}</p>

                        {/* ✅ UPDATED LINE ONLY */}
                        <div
                          className="lpctm-author"
                          style={{
                            "--avatar": `"${getInitials(t.author)}"`
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
