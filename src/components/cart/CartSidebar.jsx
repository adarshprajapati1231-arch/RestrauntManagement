/**
 * CartSidebar.jsx
 * ──────────────────────────────────────────────────────────────
 * Shopping cart UI:
 *  - Desktop: fixed floating sidebar (right)
 *  - Mobile: bottom sheet
 *  - Item list with qty controls
 *  - Subtotal, GST, grand total
 *  - Empty cart luxury illustration
 *  - "Place Order" → WhatsApp
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, Plus, Minus, ChevronDown } from "lucide-react";
import { formatINR } from "../../utils/calculateGST";
import { sendWhatsAppOrder } from "../../utils/whatsapp";

/**
 * @param {Object} props
 * @param {boolean}  props.isOpen
 * @param {Function} props.onClose
 * @param {Array}    props.cart
 * @param {number}   props.subtotal
 * @param {number}   props.gst
 * @param {number}   props.grandTotal
 * @param {Function} props.increaseQty
 * @param {Function} props.decreaseQty
 * @param {Function} props.removeItem
 * @param {Function} props.clearCart
 * @param {Object}   props.business
 */
export default function CartSidebar({
  isOpen,
  onClose,
  cart,
  subtotal,
  gst,
  grandTotal,
  increaseQty,
  decreaseQty,
  removeItem,
  clearCart,
  business,
}) {
  const [orderType, setOrderType] = useState("table");
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    table: "01",
    room: "101",
    address: "",
    landmark: "",
    pincode: "",
    request: "",
  });

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const handleOrder = () => {
    if (!details.name || !details.phone) {
      alert("Please enter your name and phone number.");
      return;
    }
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    sendWhatsAppOrder({
      business,
      cart,
      subtotal,
      gst,
      grandTotal,
      orderType,
      details,
    });

    // Save last booking to localStorage
    localStorage.setItem("last_booking", JSON.stringify({ orderType, details, grandTotal }));
    clearCart();
    onClose();
  };

  const panelVariants = {
    desktop: {
      hidden: { x: "100%", opacity: 0 },
      visible: { x: 0, opacity: 1, transition: { type: "spring", damping: 28, stiffness: 280 } },
      exit: { x: "100%", opacity: 0, transition: { duration: 0.25 } },
    },
    mobile: {
      hidden: { y: "100%", opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 28, stiffness: 280 } },
      exit: { y: "100%", opacity: 0, transition: { duration: 0.25 } },
    },
  };

  const variant = isMobile ? "mobile" : "desktop";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[80]"
            style={{ background: "rgba(0,0,0,0.55)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed z-[90] flex flex-col"
            style={{
              background: "rgba(12, 18, 15, 0.97)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderLeft: "1px solid rgba(201,164,92,0.2)",
              // Desktop: right sidebar
              right: 0,
              top: 0,
              bottom: 0,
              width: "min(420px, 100vw)",
            }}
            variants={panelVariants[variant]}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 shrink-0"
              style={{ borderBottom: "1px solid rgba(201,164,92,0.15)" }}
            >
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} style={{ color: "var(--color-gold)" }} />
                <h2 className="font-heading text-xl font-semibold" style={{ color: "var(--color-text)" }}>
                  Your Order
                </h2>
              </div>
              <div className="flex items-center gap-2">
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                    style={{
                      color: "rgba(239,68,68,0.7)",
                      border: "1px solid rgba(239,68,68,0.2)",
                      background: "rgba(239,68,68,0.05)",
                    }}
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg"
                  style={{ color: "var(--color-text-muted)" }}
                  aria-label="Close cart"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {cart.length === 0 ? (
                /* ── Empty Cart ─────────────────────────────── */
                <div className="flex flex-col items-center justify-center h-full gap-5 py-16">
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(201,164,92,0.08)", border: "1px solid rgba(201,164,92,0.15)" }}
                  >
                    <ShoppingBag size={36} style={{ color: "rgba(201,164,92,0.4)" }} />
                  </div>
                  <div className="text-center">
                    <p className="font-heading text-xl" style={{ color: "var(--color-text)" }}>
                      Your cart is empty
                    </p>
                    <p className="text-sm mt-2" style={{ color: "var(--color-text-muted)" }}>
                      Add dishes from our menu to place an order
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="btn-ghost text-sm px-6 py-2.5"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <>
                  {/* ── Cart Items ──────────────────────────── */}
                  {cart.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onIncrease={() => increaseQty(item.id)}
                      onDecrease={() => decreaseQty(item.id)}
                      onRemove={() => removeItem(item.id)}
                    />
                  ))}

                  {/* ── Order Type ──────────────────────────── */}
                  <div
                    className="rounded-xl p-4 mt-2"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,164,92,0.1)" }}
                  >
                    <p className="input-label mb-3">Order Type</p>
                    <div className="segment-control">
                      {["table", "room", "delivery"].map((type) => (
                        <button
                          key={type}
                          id={`order-type-${type}`}
                          className={`segment-btn ${orderType === type ? "active" : ""}`}
                          onClick={() => setOrderType(type)}
                        >
                          {type === "table" ? "Table" : type === "room" ? "Room" : "Delivery"}
                        </button>
                      ))}
                    </div>

                    {/* Dynamic Fields */}
                    <div className="mt-4 space-y-3">
                      <div>
                        <label className="input-label">Name</label>
                        <input
                          id="cart-customer-name"
                          className="input-field"
                          placeholder="Your name"
                          value={details.name}
                          onChange={(e) => setDetails({ ...details, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="input-label">Phone</label>
                        <input
                          id="cart-customer-phone"
                          className="input-field"
                          placeholder="10-digit mobile number"
                          value={details.phone}
                          onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                        />
                      </div>

                      {orderType === "table" && (
                        <div>
                          <label className="input-label">Table Number</label>
                          <select
                            id="cart-table-select"
                            className="input-field"
                            value={details.table}
                            onChange={(e) => setDetails({ ...details, table: e.target.value })}
                          >
                            {Array.from({ length: 30 }, (_, i) => String(i + 1).padStart(2, "0")).map((t) => (
                              <option key={t} value={t} style={{ background: "#0E1412" }}>
                                Table {t}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {orderType === "room" && (
                        <div>
                          <label className="input-label">Room Number</label>
                          <select
                            id="cart-room-select"
                            className="input-field"
                            value={details.room}
                            onChange={(e) => setDetails({ ...details, room: e.target.value })}
                          >
                            {Array.from({ length: 20 }, (_, i) => 101 + i).map((r) => (
                              <option key={r} value={r} style={{ background: "#0E1412" }}>
                                Room {r}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {orderType === "delivery" && (
                        <>
                          <div>
                            <label className="input-label">Full Address</label>
                            <textarea
                              id="cart-delivery-address"
                              className="input-field"
                              rows={2}
                              placeholder="House / flat / street"
                              value={details.address}
                              onChange={(e) => setDetails({ ...details, address: e.target.value })}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="input-label">Landmark</label>
                              <input
                                id="cart-landmark"
                                className="input-field"
                                placeholder="Near..."
                                value={details.landmark}
                                onChange={(e) => setDetails({ ...details, landmark: e.target.value })}
                              />
                            </div>
                            <div>
                              <label className="input-label">Pincode</label>
                              <input
                                id="cart-pincode"
                                className="input-field"
                                placeholder="6-digit"
                                value={details.pincode}
                                onChange={(e) => setDetails({ ...details, pincode: e.target.value })}
                              />
                            </div>
                          </div>
                        </>
                      )}

                      <div>
                        <label className="input-label">Special Request (optional)</label>
                        <input
                          id="cart-special-request"
                          className="input-field"
                          placeholder="Less spicy, extra sauce..."
                          value={details.request}
                          onChange={(e) => setDetails({ ...details, request: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer — Totals + Order Button */}
            {cart.length > 0 && (
              <div
                className="shrink-0 p-5 space-y-3"
                style={{ borderTop: "1px solid rgba(201,164,92,0.15)" }}
              >
                <div className="space-y-2">
                  <div className="flex justify-between text-sm" style={{ color: "var(--color-text-muted)" }}>
                    <span>Subtotal</span>
                    <span>{formatINR(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm" style={{ color: "var(--color-text-muted)" }}>
                    <span>GST (5%)</span>
                    <span>{formatINR(gst)}</span>
                  </div>
                  <div
                    className="flex justify-between text-base font-semibold pt-2"
                    style={{
                      borderTop: "1px solid rgba(201,164,92,0.2)",
                      color: "var(--color-text)",
                    }}
                  >
                    <span>Grand Total</span>
                    <span style={{ color: "var(--color-gold)" }}>{formatINR(grandTotal)}</span>
                  </div>
                </div>

                <button
                  id="place-order-btn"
                  onClick={handleOrder}
                  className="w-full btn-primary justify-center py-3.5"
                >
                  Place Order via WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Cart Item Row ────────────────────────────────────────── */
function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <motion.div
      layout
      className="flex items-center gap-3 p-3 rounded-xl"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
      exit={{ opacity: 0, height: 0, margin: 0 }}
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-14 h-14 rounded-lg object-cover shrink-0"
        loading="lazy"
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: "var(--color-text)" }}>
          {item.name}
        </p>
        <p className="text-xs mt-0.5" style={{ color: "var(--color-gold)" }}>
          {formatINR(item.price * item.qty)}
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button onClick={onDecrease} className="qty-btn" aria-label="Decrease">
          <Minus size={11} />
        </button>
        <span className="text-sm font-semibold w-4 text-center" style={{ color: "var(--color-text)" }}>
          {item.qty}
        </span>
        <button
          onClick={onIncrease}
          className="qty-btn"
          style={{ background: "rgba(201,164,92,0.12)", borderColor: "var(--color-gold)" }}
          aria-label="Increase"
        >
          <Plus size={11} />
        </button>
        <button
          onClick={onRemove}
          className="ml-1 p-1 rounded transition-colors"
          style={{ color: "rgba(239,68,68,0.6)" }}
          aria-label="Remove item"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </motion.div>
  );
}
