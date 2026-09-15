/**
 * ContactSection.jsx
 * ──────────────────────────────────────────────────────────────
 * Contact section with address, phone, email, map button,
 * and social links — all from businessData.js.
 */

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ExternalLink, Instagram, Facebook } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";

/**
 * @param {Object} props
 * @param {Object} props.business  - From businessData.js
 */
export default function ContactSection({ business }) {
  const items = [
    {
      id: "contact-address",
      icon: <MapPin size={20} />,
      label: "Address",
      value: business.address,
      link: business.maps,
      linkLabel: "Open in Maps",
    },
    {
      id: "contact-phone",
      icon: <Phone size={20} />,
      label: "Phone",
      value: business.phone,
      link: `tel:${business.phone}`,
    },
    ...(business.email
      ? [
          {
            id: "contact-email",
            icon: <Mail size={20} />,
            label: "Email",
            value: business.email,
            link: `mailto:${business.email}`,
          },
        ]
      : []),
    {
      id: "contact-hours",
      icon: <Clock size={20} />,
      label: "Opening Hours",
      value: `Open daily: ${business.openingHours}`,
    },
  ];

  return (
    <section
      id="contact"
      className="section"
      style={{ background: "rgba(14,20,18,1)" }}
    >
      <div className="container">
        <SectionHeader
          label="Get In Touch"
          title="Find Us"
          subtitle="We'd love to hear from you. Visit us, call us, or connect on social media."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Contact Cards */}
          <div className="space-y-4">
            {items.map((item, i) => (
              <motion.div
                key={item.id}
                className="glass rounded-xl px-5 py-4 flex items-start gap-4"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: "rgba(201,164,92,0.1)",
                    color: "var(--color-gold)",
                  }}
                >
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                    {item.label}
                  </p>
                  <p className="text-sm mt-0.5" style={{ color: "var(--color-text)" }}>
                    {item.value}
                  </p>
                  {item.link && (
                    <a
                      id={item.id}
                      href={item.link}
                      target={item.link.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs mt-1 transition-colors hover:opacity-80"
                      style={{ color: "var(--color-gold)" }}
                    >
                      {item.linkLabel || item.value}
                      {item.link.startsWith("http") && <ExternalLink size={11} />}
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Social + Map CTA */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Map CTA */}
            <div className="glass rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 flex-1">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "rgba(201,164,92,0.1)", border: "1px solid rgba(201,164,92,0.2)" }}
              >
                <MapPin size={28} style={{ color: "var(--color-gold)" }} />
              </div>
              <div>
                <p className="font-heading text-xl font-semibold" style={{ color: "var(--color-text)" }}>
                  Visit Us
                </p>
                <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
                  {business.address}
                </p>
              </div>
              <a
                id="get-directions-btn"
                href={business.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm px-6 py-2.5"
              >
                <ExternalLink size={15} />
                Get Directions
              </a>
            </div>

            {/* Social Links */}
            {(business.social?.instagram || business.social?.facebook) && (
              <div className="glass rounded-2xl p-6">
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  Follow Us
                </p>
                <div className="flex gap-3">
                  {business.social?.instagram && (
                    <a
                      id="contact-instagram-link"
                      href={business.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-200 hover:scale-105 text-sm font-medium"
                      style={{
                        background: "rgba(201,164,92,0.1)",
                        border: "1px solid rgba(201,164,92,0.2)",
                        color: "var(--color-gold)",
                      }}
                    >
                      <Instagram size={16} />
                      Instagram
                    </a>
                  )}
                  {business.social?.facebook && (
                    <a
                      id="contact-facebook-link"
                      href={business.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all duration-200 hover:scale-105 text-sm font-medium"
                      style={{
                        background: "rgba(201,164,92,0.1)",
                        border: "1px solid rgba(201,164,92,0.2)",
                        color: "var(--color-gold)",
                      }}
                    >
                      <Facebook size={16} />
                      Facebook
                    </a>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
