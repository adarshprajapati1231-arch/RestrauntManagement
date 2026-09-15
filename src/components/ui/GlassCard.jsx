/**
 * GlassCard.jsx
 * Glassmorphism card primitive — used throughout the site.
 */

import React from "react";

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.className]
 * @param {string} [props.variant]  - "default" | "strong" | "dark"
 * @param {Function} [props.onClick]
 */
export default function GlassCard({ children, className = "", variant = "default", onClick }) {
  const variantClass =
    variant === "strong"
      ? "glass-strong"
      : variant === "dark"
      ? "glass-dark"
      : "glass";

  return (
    <div
      className={`${variantClass} rounded-2xl ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}
