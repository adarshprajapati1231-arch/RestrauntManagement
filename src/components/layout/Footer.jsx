/**
 * Footer.jsx
 * Dynamic footer — business name, current year, social links.
 */

import React from "react";
import { Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";

/**
 * @param {Object} props
 * @param {Object} props.business  - From businessData.js
 */
export default function Footer({ business }) {
  const year = new Date().getFullYear();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{
        background: "rgba(10, 16, 14, 0.95)",
        borderTop: "1px solid rgba(201, 164, 92, 0.15)",
      }}
    >
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full overflow-hidden border"
                style={{ borderColor: "var(--color-gold)" }}
              >
                <img src={business.logo} alt={business.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-heading text-xl font-semibold" style={{ color: "var(--color-text)" }}>
                {business.name}
              </h3>
            </div>
            <p className="text-sm leading-relaxed max-w-sm" style={{ color: "var(--color-text-muted)" }}>
              {business.description}
            </p>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {business.social?.instagram && (
                <a
                  href={business.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-instagram-link"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: "rgba(201,164,92,0.1)",
                    border: "1px solid rgba(201,164,92,0.2)",
                    color: "var(--color-gold)",
                  }}
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </a>
              )}
              {business.social?.facebook && (
                <a
                  href={business.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-facebook-link"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: "rgba(201,164,92,0.1)",
                    border: "1px solid rgba(201,164,92,0.2)",
                    color: "var(--color-gold)",
                  }}
                  aria-label="Facebook"
                >
                  <Facebook size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "var(--color-gold)" }}
            >
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {["menu", "gallery", "booking", "contact"].map((id) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="text-sm capitalize transition-colors duration-200 hover:text-amber-400"
                    style={{ color: "var(--color-text-muted)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  >
                    {id === "booking" ? "Book a Table" : id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "var(--color-gold)" }}
            >
              Contact
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="mt-0.5 shrink-0" style={{ color: "var(--color-gold)" }} />
                <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                  {business.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="shrink-0" style={{ color: "var(--color-gold)" }} />
                <a
                  href={`tel:${business.phone}`}
                  className="text-sm transition-colors hover:text-amber-400"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {business.phone}
                </a>
              </li>
              {business.email && (
                <li className="flex items-center gap-3">
                  <Mail size={14} className="shrink-0" style={{ color: "var(--color-gold)" }} />
                  <a
                    href={`mailto:${business.email}`}
                    className="text-sm transition-colors hover:text-amber-400"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {business.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(201,164,92,0.12)" }}
        >
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            &copy; {year} {business.name}. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            Open {business.openingHours}
          </p>
        </div>
      </div>
    </footer>
  );
}
