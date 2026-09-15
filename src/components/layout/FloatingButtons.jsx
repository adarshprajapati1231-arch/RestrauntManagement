/**
 * FloatingButtons.jsx
 * ──────────────────────────────────────────────────────────────
 * Floating action buttons (bottom-right):
 *  - WhatsApp
 *  - Call
 *  - Back to Top (appears after scrolling)
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowUp, MessageCircle } from "lucide-react";

/**
 * @param {Object} props
 * @param {Object} props.business  - From businessData.js
 */
export default function FloatingButtons({ business }) {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const openWhatsApp = () => {
    window.open(`https://wa.me/${business.whatsapp}`, "_blank", "noopener,noreferrer");
  };

  const callPhone = () => {
    window.location.href = `tel:${business.phone}`;
  };

  return (
    <div className="fab-group">
      {/* Back to Top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            id="back-to-top-btn"
            className="fab"
            style={{ background: "rgba(201,164,92,0.15)", border: "1px solid rgba(201,164,92,0.3)", color: "var(--color-gold)" }}
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: 1.15 }}
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Call Button */}
      <motion.button
        id="call-fab-btn"
        className="fab"
        style={{ background: "rgba(38,59,51,0.9)", border: "1px solid rgba(201,164,92,0.25)", color: "var(--color-gold)" }}
        onClick={callPhone}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        aria-label={`Call ${business.phone}`}
      >
        <Phone size={18} />
      </motion.button>

      {/* WhatsApp Button */}
      <motion.button
        id="whatsapp-fab-btn"
        className="fab"
        style={{ background: "#25D366", color: "#fff" }}
        onClick={openWhatsApp}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={18} />
      </motion.button>
    </div>
  );
}
