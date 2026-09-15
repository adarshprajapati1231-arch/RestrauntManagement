/**
 * TestimonialsSection.jsx
 * ──────────────────────────────────────────────────────────────
 * Auto-sliding testimonials carousel with:
 *  - Framer Motion animated transitions
 *  - Star ratings
 *  - Customer avatar + role
 *  - Manual dot navigation
 *  - Auto-advance every 4 seconds
 */

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";

/**
 * @param {Object} props
 * @param {Object} props.business  - From businessData.js (has .testimonials)
 */
export default function TestimonialsSection({ business }) {
  const testimonials = business.testimonials || [];
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  const goTo = useCallback((index) => {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  }, [active]);

  // Auto-advance
  useEffect(() => {
    if (testimonials.length < 2) return;
    const interval = setInterval(() => {
      setDirection(1);
      setActive((i) => (i + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  const current = testimonials[active];

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40, transition: { duration: 0.3 } }),
  };

  return (
    <section
      id="testimonials"
      className="section"
      style={{
        background:
          "linear-gradient(180deg, rgba(38,59,51,0.12) 0%, var(--color-background) 100%)",
      }}
    >
      <div className="container">
        <SectionHeader
          label="Guest Reviews"
          title="What They Say"
          subtitle="Stories from the guests who have experienced the finest hospitality we offer."
        />

        <div className="max-w-3xl mx-auto relative">
          {/* Quote Icon */}
          <div
            className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: "rgba(201,164,92,0.12)", border: "1px solid rgba(201,164,92,0.2)" }}
          >
            <Quote size={20} style={{ color: "var(--color-gold)" }} />
          </div>

          {/* Card */}
          <div
            className="glass rounded-2xl p-8 md:p-12 text-center overflow-hidden"
            style={{ minHeight: 280 }}
          >
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {/* Stars */}
                <div className="flex items-center justify-center gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < current.rating ? "star-filled" : ""}
                      style={{ color: i < current.rating ? "var(--color-gold)" : "rgba(255,255,255,0.15)" }}
                      fill={i < current.rating ? "var(--color-gold)" : "none"}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p
                  className="font-heading text-lg md:text-xl font-light italic leading-relaxed"
                  style={{ color: "var(--color-text)" }}
                >
                  "{current.text}"
                </p>

                {/* Avatar + Info */}
                <div className="flex items-center justify-center gap-4 mt-8">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    loading="lazy"
                    className="w-12 h-12 rounded-full object-cover border-2"
                    style={{ borderColor: "var(--color-gold)" }}
                  />
                  <div className="text-left">
                    <p className="font-medium text-sm" style={{ color: "var(--color-text)" }}>
                      {current.name}
                    </p>
                    <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                      {current.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot Navigation */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                id={`testimonial-dot-${i}`}
                onClick={() => goTo(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === active ? "24px" : "8px",
                  height: "8px",
                  background: i === active ? "var(--color-gold)" : "rgba(255,255,255,0.2)",
                  border: "none",
                  cursor: "pointer",
                }}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
