/**
 * Badge.jsx
 * Veg / Non-veg food indicator badge.
 */

import React from "react";

/**
 * @param {Object} props
 * @param {boolean} props.isVeg  - true = veg, false = non-veg
 */
export default function Badge({ isVeg }) {
  return (
    <div
      className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium"
      style={{
        background: isVeg
          ? "rgba(34, 197, 94, 0.12)"
          : "rgba(239, 68, 68, 0.12)",
        border: `1px solid ${isVeg ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
        color: isVeg ? "#86efac" : "#fca5a5",
      }}
      title={isVeg ? "Vegetarian" : "Non-Vegetarian"}
    >
      {/* The classic green/red square with dot */}
      <span
        className="w-2.5 h-2.5 rounded-sm flex items-center justify-center"
        style={{
          border: `1.5px solid ${isVeg ? "#22c55e" : "#ef4444"}`,
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: isVeg ? "#22c55e" : "#ef4444" }}
        />
      </span>
      {isVeg ? "Veg" : "Non-Veg"}
    </div>
  );
}
