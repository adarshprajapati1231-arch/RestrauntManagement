/**
 * BanquetSection.jsx
 * ──────────────────────────────────────────────────────────────
 * Renders only if business.features.banquet === true
 * Luxury banquet hall cards with capacity, amenities, enquiry button.
 */

import React from "react";
import { motion } from "framer-motion";
import { Users, Car, Utensils, Sparkles, Send } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import { sendWhatsAppEnquiry } from "../../utils/whatsapp";

/**
 * @param {Object} props
 * @param {Object} props.business  - From businessData.js
 */
export default function BanquetSection({ business }) {
  if (!business.features?.banquet) return null;

  const handleEnquiry = (hall) => {
    sendWhatsAppEnquiry(business, `Banquet Hall Enquiry — ${hall.title}`, {
      name: "Guest",
      phone: "",
      message: `I am interested in booking the ${hall.title} (Capacity: ${hall.capacity}). Please share availability and pricing.`,
    });
  };

  return (
    <section
      id="banquet"
      className="section"
      style={{
        background:
          "linear-gradient(180deg, rgba(38,59,51,0.15) 0%, var(--color-background) 100%)",
      }}
    >
      <div className="container">
        <SectionHeader
          label="Events & Celebrations"
          title="Banquet Halls"
          subtitle="From intimate gatherings to grand celebrations — our venues are designed to create lasting memories."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {business.banquet.map((hall, i) => (
            <motion.div
              key={hall.title}
              className="glass rounded-2xl overflow-hidden card-hover"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              {/* Image */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={hall.image}
                  alt={hall.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  onLoad={(e) => e.currentTarget.classList.add("loaded")}
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(14,20,18,0.85) 0%, transparent 60%)",
                  }}
                />
                {/* Capacity badge */}
                <div className="absolute bottom-4 left-5 flex items-center gap-2">
                  <Users size={16} style={{ color: "var(--color-gold)" }} />
                  <span className="font-heading text-2xl font-semibold" style={{ color: "var(--color-text)" }}>
                    {hall.capacity}
                  </span>
                  <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                    guests
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 className="font-heading text-xl font-semibold" style={{ color: "var(--color-text)" }}>
                  {hall.title}
                </h3>
                <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {hall.description}
                </p>

                {/* Feature chips */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {hall.parking && (
                    <span className="amenity-chip">
                      <Car size={11} /> Parking
                    </span>
                  )}
                  {hall.dining && (
                    <span className="amenity-chip">
                      <Utensils size={11} /> In-house Dining
                    </span>
                  )}
                  {hall.decoration && (
                    <span className="amenity-chip">
                      <Sparkles size={11} /> Decoration
                    </span>
                  )}
                </div>

                <button
                  id={`enquire-banquet-${hall.title.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => handleEnquiry(hall)}
                  className="mt-5 btn-ghost text-sm px-5 py-2.5 flex items-center gap-2"
                >
                  <Send size={14} />
                  Send Enquiry
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
