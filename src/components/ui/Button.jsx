/**
 * Button.jsx
 * Premium button component — three variants: primary, ghost, outline.
 */

import React from "react";

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {"primary"|"ghost"|"outline"} [props.variant="primary"]
 * @param {Function} [props.onClick]
 * @param {string} [props.className]
 * @param {string} [props.type]  - "button" | "submit"
 * @param {boolean} [props.disabled]
 * @param {React.ReactNode} [props.icon]  - Optional Lucide icon
 * @param {"sm"|"md"|"lg"} [props.size="md"]
 */
export default function Button({
  children,
  variant = "primary",
  onClick,
  className = "",
  type = "button",
  disabled = false,
  icon,
  size = "md",
}) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const base =
    "inline-flex items-center justify-center gap-2 font-medium font-body rounded-lg transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "btn-primary",
    ghost: "btn-ghost",
    outline: [
      "border border-white/20 text-white/80 hover:border-white/40",
      "hover:text-white hover:bg-white/5",
    ].join(" "),
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizeClasses[size]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
