/**
 * Navbar.jsx
 * ──────────────────────────────────────────────────────────────
 * Sticky, glassmorphism navbar with:
 *  - Blur intensifies on scroll
 *  - Animated underline on active link
 *  - Mobile hamburger → full-screen drawer (Framer Motion)
 *  - Cart item count badge
 */

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart } from "lucide-react";

// ── Nav links definition
const NAV_LINKS = [
  { label: "Home",    href: "#home" },
  { label: "Menu",    href: "#menu" },
  { label: "Rooms",   href: "#rooms" },
  { label: "Banquet", href: "#banquet" },
  { label: "Gallery", href: "#gallery" },
  { label: "Book",    href: "#booking" },
  { label: "Contact", href: "#contact" },
];

/**
 * @param {Object} props
 * @param {Object}   props.business    - From businessData.js
 * @param {number}   props.totalItems  - Total items in cart
 * @param {Function} props.onCartOpen  - Opens cart sidebar/sheet
 * @param {boolean}  props.features    - Business feature flags
 */
export default function Navbar({ business, totalItems, onCartOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // ── Detect scroll for blur intensity
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Detect active section via IntersectionObserver
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  // ── Close mobile drawer on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = useCallback((href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  // ── Filter nav links based on feature flags
  const visibleLinks = NAV_LINKS.filter((link) => {
    if (link.href === "#rooms" && !business.features?.rooms) return false;
    if (link.href === "#banquet" && !business.features?.banquet) return false;
    return true;
  });

  return (
    <>
      {/* ── Main Navbar ──────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(14, 20, 18, 0.88)"
            : "rgba(14, 20, 18, 0.4)",
          backdropFilter: scrolled ? "blur(24px)" : "blur(10px)",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "blur(10px)",
          borderBottom: scrolled
            ? "1px solid rgba(201, 164, 92, 0.15)"
            : "1px solid transparent",
        }}
      >
        <div className="container">
          <nav className="flex items-center justify-between h-16 md:h-18">
            {/* Logo + Name */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
              className="flex items-center gap-3 text-decoration-none"
            >
              <div
                className="w-9 h-9 rounded-full overflow-hidden border"
                style={{ borderColor: "var(--color-gold)" }}
              >
                <img
                  src={business.logo}
                  alt={`${business.name} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className="font-heading text-xl font-semibold hidden sm:block"
                style={{ color: "var(--color-text)" }}
              >
                {business.name}
              </span>
            </a>

            {/* Desktop Nav Links */}
            <ul className="hidden lg:flex items-center gap-8" role="navigation">
              {visibleLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className={`nav-link ${activeSection === link.href.replace("#", "") ? "active" : ""}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Cart Button */}
              <button
                id="cart-toggle-btn"
                onClick={onCartOpen}
                className="relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200"
                style={{
                  background: "rgba(201, 164, 92, 0.12)",
                  border: "1px solid rgba(201, 164, 92, 0.25)",
                  color: "var(--color-gold)",
                }}
                aria-label="Open cart"
              >
                <ShoppingCart size={18} />
                <span className="text-sm font-medium hidden sm:inline">Cart</span>
                {totalItems > 0 && (
                  <span
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
                    style={{ background: "var(--color-gold)", color: "#0E1412" }}
                  >
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger */}
              <button
                id="mobile-menu-btn"
                className="lg:hidden p-2 rounded-lg transition-colors"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  color: "var(--color-text)",
                }}
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* ── Mobile Drawer ─────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[60]"
              style={{ background: "rgba(0,0,0,0.6)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-72 z-[70] flex flex-col"
              style={{
                background: "rgba(14, 20, 18, 0.97)",
                backdropFilter: "blur(24px)",
                borderLeft: "1px solid rgba(201, 164, 92, 0.2)",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: "rgba(201,164,92,0.15)" }}>
                <span className="font-heading text-lg font-semibold" style={{ color: "var(--color-gold)" }}>
                  {business.name}
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-lg"
                  style={{ color: "var(--color-text-muted)" }}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Links */}
              <nav className="flex flex-col p-6 gap-1 flex-1">
                {visibleLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="flex items-center px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200"
                    style={{
                      color: activeSection === link.href.replace("#", "")
                        ? "var(--color-gold)"
                        : "var(--color-text-muted)",
                      background: activeSection === link.href.replace("#", "")
                        ? "rgba(201,164,92,0.1)"
                        : "transparent",
                    }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              {/* Drawer Footer */}
              <div className="p-6 border-t" style={{ borderColor: "rgba(201,164,92,0.15)" }}>
                <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                  {business.openingHours}
                </p>
                <p className="text-xs mt-1" style={{ color: "var(--color-gold)" }}>
                  {business.phone}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
