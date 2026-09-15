/**
 * GallerySection.jsx
 * ──────────────────────────────────────────────────────────────
 * Masonry photo gallery with:
 *  - Images from business.gallery JSON array
 *  - Lazy loading
 *  - Hover zoom effect
 *  - Lightbox modal on click
 */

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";

/**
 * @param {Object} props
 * @param {Object} props.business  - From businessData.js
 */
export default function GallerySection({ business }) {
  const [lightbox, setLightbox] = useState(null); // index of active image

  const openLightbox = useCallback((index) => setLightbox(index), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  const prev = useCallback(() => {
    setLightbox((i) => (i > 0 ? i - 1 : business.gallery.length - 1));
  }, [business.gallery.length]);

  const next = useCallback(() => {
    setLightbox((i) => (i < business.gallery.length - 1 ? i + 1 : 0));
  }, [business.gallery.length]);

  return (
    <section
      id="gallery"
      className="section"
      style={{ background: "rgba(14,20,18,1)" }}
    >
      <div className="container">
        <SectionHeader
          label="Visual Stories"
          title="Our Gallery"
          subtitle="A glimpse into the ambiance, cuisine and experiences that make us extraordinary."
        />

        {/* ── Masonry Grid ─────────────────────────────────── */}
        <div className="masonry-grid">
          {business.gallery.map((url, i) => (
            <motion.div
              key={i}
              className="masonry-item relative overflow-hidden rounded-xl cursor-pointer group"
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.07, 0.5) }}
              onClick={() => openLightbox(i)}
            >
              <img
                src={url}
                alt={`${business.name} gallery ${i + 1}`}
                loading="lazy"
                className="w-full block object-cover transition-transform duration-500 group-hover:scale-110"
                onLoad={(e) => e.currentTarget.classList.add("loaded")}
              />
              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(14,20,18,0.45)" }}
              >
                <ZoomIn size={28} style={{ color: "var(--color-gold)" }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Lightbox Modal ─────────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Image */}
            <motion.img
              key={lightbox}
              src={business.gallery[lightbox]}
              alt={`Gallery ${lightbox + 1}`}
              className="max-w-full max-h-full rounded-xl object-contain"
              style={{ maxWidth: "90vw", maxHeight: "85vh" }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center"
              style={{ color: "var(--color-text)" }}
              aria-label="Close lightbox"
            >
              <X size={18} />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center"
              style={{ color: "var(--color-text)" }}
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center"
              style={{ color: "var(--color-text)" }}
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>

            {/* Counter */}
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full glass text-xs"
              style={{ color: "var(--color-text-muted)" }}
            >
              {lightbox + 1} / {business.gallery.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
