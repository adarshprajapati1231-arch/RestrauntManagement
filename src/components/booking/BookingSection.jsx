/**
 * BookingSection.jsx
 * ──────────────────────────────────────────────────────────────
 * Premium booking section with three modes:
 *  - Table Dining (select table 1–30)
 *  - Room Service (select room 101–120)
 *  - Home Delivery (address details)
 *
 * On submit: sends a formatted WhatsApp message.
 * Saves last_booking to localStorage.
 */

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Utensils, BedDouble, Truck, Send } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import { sendWhatsAppOrder } from "../../utils/whatsapp";

const BOOKING_TYPES = [
  { key: "table", label: "Table Dining", icon: <Utensils size={16} /> },
  { key: "room", label: "Room Service", icon: <BedDouble size={16} /> },
  { key: "delivery", label: "Home Delivery", icon: <Truck size={16} /> },
];

/**
 * @param {Object} props
 * @param {Object} props.business  - From businessData.js
 */
export default function BookingSection({ business }) {
  const [mode, setMode] = useState("table");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    table: "01",
    room: "101",
    address: "",
    landmark: "",
    pincode: "",
    request: "",
    date: "",
    guests: "2",
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;

    // For booking without a cart — send enquiry via WhatsApp
    const typeLabel =
      mode === "table" ? "Table Dining" : mode === "room" ? "Room Service" : "Home Delivery";

    const header = "━━━━━━━━━━━━━━━━━━━━";
    const divider = "────────────────────";

    let extraLines = "";
    if (mode === "table") {
      extraLines = `Table No.     : ${form.table}\nGuests        : ${form.guests}\n`;
      if (form.date) extraLines += `Date & Time   : ${form.date}\n`;
    } else if (mode === "room") {
      extraLines = `Room No.      : ${form.room}\n`;
    } else {
      extraLines = `Address       : ${form.address}\n`;
      if (form.landmark) extraLines += `Landmark      : ${form.landmark}\n`;
      if (form.pincode) extraLines += `Pincode       : ${form.pincode}\n`;
    }

    const message =
      `${header}\n${business.name.toUpperCase()}\n${header}\n\n` +
      `BOOKING REQUEST\n\n` +
      `Customer      : ${form.name}\n` +
      `Phone         : ${form.phone}\n` +
      `Type          : ${typeLabel}\n` +
      extraLines +
      `\n${divider}\n` +
      (form.request ? `\nSpecial Request\n${form.request}\n` : "") +
      `\nSent from ${business.name} Website`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${business.whatsapp}?text=${encoded}`, "_blank", "noopener,noreferrer");

    // Persist
    localStorage.setItem("last_booking", JSON.stringify({ mode, form }));
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section
      id="booking"
      className="section"
      style={{ background: "rgba(38,59,51,0.08)" }}
    >
      <div className="container">
        <SectionHeader
          label="Reservations"
          title="Book a Table"
          subtitle="Reserve your spot for an unforgettable dining experience. We confirm within 15 minutes."
        />

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass rounded-2xl p-6 md:p-8">
            {/* ── Segmented Control ─────────────────────────── */}
            <div className="segment-control mb-8">
              {BOOKING_TYPES.map(({ key, label, icon }) => (
                <button
                  key={key}
                  id={`booking-type-${key}`}
                  className={`segment-btn flex items-center justify-center gap-1.5`}
                  style={{
                    background: mode === key ? "var(--color-gold)" : "transparent",
                    color: mode === key ? "#0E1412" : "var(--color-text-muted)",
                  }}
                  onClick={() => setMode(key)}
                  type="button"
                >
                  {icon}
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>

            {/* ── Form ──────────────────────────────────────── */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="input-label" htmlFor="booking-name">Full Name</label>
                  <input
                    id="booking-name"
                    className="input-field"
                    placeholder="Your name"
                    required
                    value={form.name}
                    onChange={set("name")}
                  />
                </div>
                <div>
                  <label className="input-label" htmlFor="booking-phone">Phone Number</label>
                  <input
                    id="booking-phone"
                    className="input-field"
                    placeholder="+91 XXXXX XXXXX"
                    required
                    value={form.phone}
                    onChange={set("phone")}
                  />
                </div>
              </div>

              {/* Table Specific */}
              {mode === "table" && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="input-label" htmlFor="booking-table">Table Number</label>
                      <select
                        id="booking-table"
                        className="input-field"
                        value={form.table}
                        onChange={set("table")}
                      >
                        {Array.from({ length: 30 }, (_, i) =>
                          String(i + 1).padStart(2, "0")
                        ).map((t) => (
                          <option key={t} value={t} style={{ background: "#0E1412" }}>
                            Table {t}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="input-label" htmlFor="booking-guests">Number of Guests</label>
                      <select
                        id="booking-guests"
                        className="input-field"
                        value={form.guests}
                        onChange={set("guests")}
                      >
                        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"].map((g) => (
                          <option key={g} value={g} style={{ background: "#0E1412" }}>
                            {g} {g === "1" ? "Guest" : "Guests"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="input-label" htmlFor="booking-date">Preferred Date & Time</label>
                    <input
                      id="booking-date"
                      type="datetime-local"
                      className="input-field"
                      value={form.date}
                      onChange={set("date")}
                    />
                  </div>
                </>
              )}

              {/* Room Specific */}
              {mode === "room" && (
                <div>
                  <label className="input-label" htmlFor="booking-room">Room Number</label>
                  <select
                    id="booking-room"
                    className="input-field"
                    value={form.room}
                    onChange={set("room")}
                  >
                    {Array.from({ length: 20 }, (_, i) => 101 + i).map((r) => (
                      <option key={r} value={r} style={{ background: "#0E1412" }}>
                        Room {r}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Delivery Specific */}
              {mode === "delivery" && (
                <>
                  <div>
                    <label className="input-label" htmlFor="booking-address">Full Address</label>
                    <textarea
                      id="booking-address"
                      className="input-field"
                      rows={3}
                      placeholder="House / flat number, street, area"
                      value={form.address}
                      onChange={set("address")}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="input-label" htmlFor="booking-landmark">Landmark</label>
                      <input
                        id="booking-landmark"
                        className="input-field"
                        placeholder="Near..."
                        value={form.landmark}
                        onChange={set("landmark")}
                      />
                    </div>
                    <div>
                      <label className="input-label" htmlFor="booking-pincode">Pincode</label>
                      <input
                        id="booking-pincode"
                        className="input-field"
                        placeholder="6-digit"
                        value={form.pincode}
                        onChange={set("pincode")}
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Special Request */}
              <div>
                <label className="input-label" htmlFor="booking-request">Special Request (optional)</label>
                <input
                  id="booking-request"
                  className="input-field"
                  placeholder="Any special requirements..."
                  value={form.request}
                  onChange={set("request")}
                />
              </div>

              {/* Submit */}
              <button
                id="booking-submit-btn"
                type="submit"
                className="w-full btn-primary justify-center py-3.5 mt-2"
              >
                <Send size={16} />
                {submitted ? "Booking Sent!" : "Confirm via WhatsApp"}
              </button>

              {submitted && (
                <p className="text-center text-sm" style={{ color: "var(--color-gold)" }}>
                  Booking request sent. We will confirm shortly.
                </p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
