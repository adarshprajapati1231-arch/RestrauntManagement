/**
 * Hero.jsx
 * ──────────────────────────────────────────────────────────────
 * Full-viewport hero with:
 *  - Background image from business.heroImage
 *  - Dark gradient overlay
 *  - Animated headline and tagline
 *  - Floating glassmorphism info card (rating, dishes, banquet, hours)
 *  - CTA buttons: Explore Menu + Reserve Table
 *  - All content driven by businessData.js
 */

import React from "react";
import { motion } from "framer-motion";
import { Star, ChefHat, CalendarDays, Clock, ChevronDown } from "lucide-react";

/**
 * @param {Object} props
 * @param {Object} props.business  - From businessData.js
 */
export default function Hero({ business }) {
  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Background Image ──────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <img
          src={business.heroImage}
          alt={`${business.name} hero`}
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Multi-layer gradient overlay for depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(14,20,18,0.55) 0%, rgba(14,20,18,0.3) 40%, rgba(14,20,18,0.75) 80%, rgba(14,20,18,0.97) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(14,20,18,0.6) 100%)",
          }}
        />
      </div>

      {/* ── Main Content ──────────────────────────────────────── */}
      <div className="container relative z-10 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Label */}
          <motion.p
            className="text-xs font-semibold tracking-widest uppercase mb-5"
            style={{ color: "var(--color-gold)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Est. {business.established} &nbsp;·&nbsp; {business.address}
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            className="font-heading font-semibold leading-tight"
            style={{
              fontSize: "clamp(2.8rem, 8vw, 6rem)",
              color: "var(--color-text)",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {business.name}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="mt-4 text-lg md:text-xl font-light tracking-wide"
            style={{ color: "rgba(246,244,241,0.75)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {business.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <button
              id="hero-explore-menu-btn"
              onClick={scrollToMenu}
              className="btn-primary text-sm px-8 py-3.5"
            >
              <ChefHat size={17} />
              Explore Menu
            </button>
            <button
              id="hero-reserve-table-btn"
              onClick={scrollToBooking}
              className="btn-ghost text-sm px-8 py-3.5"
            >
              <CalendarDays size={17} />
              Reserve Table
            </button>
          </motion.div>
        </div>

        {/* ── Floating Info Card ─────────────────────────────── */}
        <motion.div
          className="mt-16 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <div
            className="glass rounded-2xl px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-px"
            style={{ background: "rgba(255,255,255,0.07)" }}
          >
            {/* Rating */}
            <InfoStat
              icon={<Star size={18} fill="currentColor" />}
              value={business.stats.rating}
              label="Rating"
            />
            {/* Dishes */}
            <InfoStat
              icon={<ChefHat size={18} />}
              value={business.stats.dishes}
              label="Dishes"
            />
            {/* Banquet */}
            <InfoStat
              icon={<CalendarDays size={18} />}
              value="Events"
              label="Banquet & Dining"
            />
            {/* Hours */}
            <InfoStat
              icon={<Clock size={18} />}
              value={business.openingHours}
              label="Open Daily"
            />
          </div>
        </motion.div>
      </div>

      {/* ── Scroll Indicator ──────────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={24} style={{ color: "rgba(201,164,92,0.7)" }} />
      </motion.div>
    </section>
  );
}

/* ── Info Stat Sub-component ──────────────────────────────── */
function InfoStat({ icon, value, label }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 px-3 py-3 text-center">
      <span style={{ color: "var(--color-gold)" }}>{icon}</span>
      <span
        className="font-heading text-xl md:text-2xl font-semibold"
        style={{ color: "var(--color-text)" }}
      >
        {value}
      </span>
      <span className="text-xs" style={{ color: "var(--color-text-muted)" }}>
        {label}
      </span>
    </div>
  );
}
