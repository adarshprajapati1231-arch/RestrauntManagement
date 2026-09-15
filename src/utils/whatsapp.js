/**
 * whatsapp.js
 * ──────────────────────────────────────────────────────────────
 * Generates a beautifully formatted WhatsApp order message
 * and opens the wa.me deep link automatically.
 *
 * Supports three order types: table, room, delivery.
 */

/**
 * buildOrderMessage
 *
 * @param {Object} params
 * @param {Object} params.business      - The business object from businessData.js
 * @param {Array}  params.cart          - Array of cart items { name, qty, price }
 * @param {number} params.subtotal      - Order subtotal in INR
 * @param {number} params.gst           - GST amount in INR
 * @param {number} params.grandTotal    - Grand total in INR
 * @param {string} params.orderType     - "table" | "room" | "delivery"
 * @param {Object} params.details       - Booking-specific details object
 * @returns {string} Formatted message string
 */
function buildOrderMessage({ business, cart, subtotal, gst, grandTotal, orderType, details }) {
  const divider = "────────────────────";
  const header = "━━━━━━━━━━━━━━━━━━━━";

  // ── Order type label
  const typeLabel =
    orderType === "table"
      ? "Table Dining"
      : orderType === "room"
      ? "Room Service"
      : "Home Delivery";

  // ── Extra lines based on order type
  let extraLines = "";
  if (orderType === "table") {
    extraLines = `Table No.     : ${String(details.table).padStart(2, "0")}\n`;
  } else if (orderType === "room") {
    extraLines = `Room No.      : ${details.room}\n`;
  } else {
    extraLines =
      `Address       : ${details.address}\n` +
      (details.landmark ? `Landmark      : ${details.landmark}\n` : "") +
      (details.pincode ? `Pincode       : ${details.pincode}\n` : "");
  }

  // ── Items block
  const itemLines = cart
    .map((item) => {
      const lineTotal = `₹${item.price * item.qty}`;
      const label = `${item.qty} × ${item.name}`;
      // Pad to ~30 chars for alignment
      return `${label.padEnd(26)} ${lineTotal}`;
    })
    .join("\n");

  const message =
    `${header}\n` +
    `${business.name.toUpperCase()}\n` +
    `${header}\n\n` +
    `ORDER SUMMARY\n\n` +
    `Customer      : ${details.name}\n` +
    `Phone         : ${details.phone}\n` +
    `Order Type    : ${typeLabel}\n` +
    extraLines +
    `\n${divider}\n\n` +
    `ITEMS\n\n` +
    `${itemLines}\n\n` +
    `${divider}\n\n` +
    `Subtotal      : ₹${subtotal}\n` +
    `GST (5%)      : ₹${gst}\n\n` +
    `GRAND TOTAL   : ₹${grandTotal}\n\n` +
    `${divider}\n` +
    (details.request
      ? `\nSpecial Request\n${details.request}\n`
      : "") +
    `\nSent from ${business.name} Online Order`;

  return message;
}

/**
 * sendWhatsAppOrder
 *
 * Builds the message and opens wa.me in a new tab.
 *
 * @param {Object} params  - Same params as buildOrderMessage
 */
export function sendWhatsAppOrder(params) {
  const message = buildOrderMessage(params);
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${params.business.whatsapp}?text=${encoded}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * sendWhatsAppEnquiry
 *
 * For banquet/room enquiries without a cart.
 *
 * @param {Object} business  - The business object
 * @param {string} subject   - e.g. "Banquet Enquiry — Royal Wedding Hall"
 * @param {Object} details   - { name, phone, message }
 */
export function sendWhatsAppEnquiry(business, subject, details) {
  const header = "━━━━━━━━━━━━━━━━━━━━";
  const message =
    `${header}\n` +
    `${business.name.toUpperCase()}\n` +
    `${header}\n\n` +
    `${subject.toUpperCase()}\n\n` +
    `Name    : ${details.name}\n` +
    `Phone   : ${details.phone}\n\n` +
    (details.message ? `Message :\n${details.message}\n\n` : "") +
    `Sent from ${business.name} Website`;

  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${business.whatsapp}?text=${encoded}`;
  window.open(url, "_blank", "noopener,noreferrer");
}
