/**
 * SectionHeader.jsx
 * Reusable section title component with gold underline.
 */

import React from "react";
import { motion } from "framer-motion";

/**
 * @param {Object} props
 * @param {string} props.label    - Small uppercase label above the title
 * @param {string} props.title    - Main heading text
 * @param {string} [props.subtitle] - Optional subtitle paragraph
 * @param {string} [props.align]  - "center" | "left" (default: "center")
 */
export default function SectionHeader({ label, title, subtitle, align = "center" }) {
  const isCenter = align === "center";

  return (
    <motion.div
      className={`mb-12 ${isCenter ? "text-center" : "text-left"}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Label */}
      {label && (
        <p
          className="text-xs font-semibold tracking-widest uppercase mb-3"
          style={{ color: "var(--color-gold)" }}
        >
          {label}
        </p>
      )}

      {/* Title */}
      <h2
        className={`font-heading text-4xl md:text-5xl font-semibold leading-tight gold-underline inline-block ${
          isCenter ? "mx-auto" : ""
        }`}
        style={{ color: "var(--color-text)" }}
      >
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          className="mt-6 text-base md:text-lg max-w-2xl leading-relaxed"
          style={{
            color: "var(--color-text-muted)",
            margin: isCenter ? "1.5rem auto 0" : "1.5rem 0 0",
          }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
