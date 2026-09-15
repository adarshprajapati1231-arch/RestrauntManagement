/**
 * calculateGST.js
 * ──────────────────────────────────────────────────────────────
 * Reusable GST calculation utility for cart totals.
 *
 * @param {number} subtotal  - The pre-tax order total in INR
 * @param {number} [rate=5]  - GST rate as a percentage (default 5%)
 * @returns {{ gst: number, grandTotal: number }}
 */
export function calculateGST(subtotal, rate = 5) {
  const gst = Math.round((subtotal * rate) / 100);
  const grandTotal = subtotal + gst;
  return { gst, grandTotal };
}

/**
 * formatINR
 * Formats a number as Indian Rupee currency string.
 *
 * @param {number} amount
 * @returns {string}  e.g. "₹1,234"
 */
export function formatINR(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}
