/**
 * RoomsSection.jsx
 * ──────────────────────────────────────────────────────────────
 * Renders only if business.features.rooms === true
 * Luxury room cards with image, price, amenities, book button.
 */

import React from "react";
import { motion } from "framer-motion";
import { Wifi, Wind, Coffee, Users, Maximize, MessageCircle } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import { sendWhatsAppEnquiry } from "../../utils/whatsapp";

/**
 * @param {Object} props
 * @param {Object} props.business  - From businessData.js
 */
export default function RoomsSection({ business }) {
  // Guard — only render if feature flag is on
  if (!business.features?.rooms) return null;

  const handleBook = (room) => {
    sendWhatsAppEnquiry(business, `Room Booking Enquiry — ${room.name}`, {
      name: "Guest",
      phone: "",
      message: `I am interested in booking the ${room.name} at ₹${room.price}/night.`,
    });
  };

  return (
    <section
      id="rooms"
      className="section"
      style={{ background: "var(--color-background)" }}
    >
      <div className="container">
        <SectionHeader
          label="Accommodations"
          title="Premium Rooms"
          subtitle="Rest in absolute comfort after your fine dining experience. Each room is a sanctuary of luxury."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {business.rooms.map((room, i) => (
            <motion.div
              key={room.name}
              className="glass rounded-2xl overflow-hidden card-hover flex flex-col"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-108"
                  onLoad={(e) => e.currentTarget.classList.add("loaded")}
                />
                {/* Price badge */}
                <div
                  className="absolute top-4 right-4 px-3 py-1.5 rounded-xl"
                  style={{
                    background: "rgba(14,20,18,0.85)",
                    border: "1px solid rgba(201,164,92,0.3)",
                  }}
                >
                  <span className="font-heading text-base font-semibold" style={{ color: "var(--color-gold)" }}>
                    ₹{room.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs ml-1" style={{ color: "var(--color-text-muted)" }}>
                    /night
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-heading text-xl font-semibold" style={{ color: "var(--color-text)" }}>
                  {room.name}
                </h3>
                <p className="text-sm mt-2 leading-relaxed flex-1" style={{ color: "var(--color-text-muted)" }}>
                  {room.description}
                </p>

                {/* Meta: guests + size */}
                <div className="flex items-center gap-4 mt-3">
                  <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--color-text-muted)" }}>
                    <Users size={13} style={{ color: "var(--color-gold)" }} />
                    {room.guests} Guests
                  </span>
                  <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--color-text-muted)" }}>
                    <Maximize size={13} style={{ color: "var(--color-gold)" }} />
                    {room.size}
                  </span>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {room.wifi && (
                    <span className="amenity-chip">
                      <Wifi size={11} /> WiFi
                    </span>
                  )}
                  {room.ac && (
                    <span className="amenity-chip">
                      <Wind size={11} /> AC
                    </span>
                  )}
                  {room.breakfast && (
                    <span className="amenity-chip">
                      <Coffee size={11} /> Breakfast
                    </span>
                  )}
                </div>

                {/* Book Button */}
                <button
                  id={`book-room-${room.name.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => handleBook(room)}
                  className="w-full btn-primary justify-center mt-5 py-2.5 text-sm"
                >
                  <MessageCircle size={15} />
                  Book This Room
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
