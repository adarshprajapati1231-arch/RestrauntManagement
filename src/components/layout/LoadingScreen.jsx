/**
 * LoadingScreen.jsx
 * ──────────────────────────────────────────────────────────────
 * Animated loading screen shown on first mount.
 * Fades out after ~1.8s and unmounts gracefully.
 */

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * @param {Object} props
 * @param {Object}   props.business   - From businessData.js
 * @param {Function} props.onDone     - Called when animation completes
 */
export default function LoadingScreen({ business, onDone }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Logo */}
          <motion.div
            className="w-20 h-20 rounded-full overflow-hidden mb-6 border-2"
            style={{ borderColor: "var(--color-gold)" }}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <img
              src={business.logo}
              alt={business.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Business Name */}
          <motion.h1
            className="font-heading text-3xl md:text-4xl font-semibold text-gradient-gold"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {business.name}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="mt-2 text-sm tracking-widest uppercase"
            style={{ color: "var(--color-text-muted)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            {business.tagline}
          </motion.p>

          {/* Gold loading dots */}
          <motion.div
            className="flex gap-2 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ background: "var(--color-gold)" }}
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
