/**
 * useCart.js
 * ──────────────────────────────────────────────────────────────
 * Custom React hook for cart state management.
 *
 * Features:
 *  - Add, remove, increase, decrease cart items
 *  - Automatic subtotal, GST (5%) and grand total calculation
 *  - Persists to localStorage under key "restaurant_cart"
 *  - Cart survives page refresh
 */

import { useState, useEffect, useCallback } from "react";
import { calculateGST } from "../utils/calculateGST";

const STORAGE_KEY = "restaurant_cart";

export function useCart() {
  // ── Initialise from localStorage if available
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // ── Persist to localStorage on every cart change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // localStorage not available (private mode etc.)
    }
  }, [cart]);

  /**
   * addItem — adds a menu item to the cart or increases qty if already present.
   * @param {Object} item  - Menu item from businessData.js
   * @param {number} [qty=1]
   */
  const addItem = useCallback((item, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, qty: c.qty + qty } : c
        );
      }
      return [...prev, { ...item, qty }];
    });
  }, []);

  /**
   * removeItem — completely removes an item from the cart by id.
   * @param {number} id
   */
  const removeItem = useCallback((id) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }, []);

  /**
   * increaseQty — increments item quantity by 1.
   * @param {number} id
   */
  const increaseQty = useCallback((id) => {
    setCart((prev) =>
      prev.map((c) => (c.id === id ? { ...c, qty: c.qty + 1 } : c))
    );
  }, []);

  /**
   * decreaseQty — decrements item quantity by 1; removes if qty reaches 0.
   * @param {number} id
   */
  const decreaseQty = useCallback((id) => {
    setCart((prev) => {
      const item = prev.find((c) => c.id === id);
      if (!item) return prev;
      if (item.qty <= 1) return prev.filter((c) => c.id !== id);
      return prev.map((c) => (c.id === id ? { ...c, qty: c.qty - 1 } : c));
    });
  }, []);

  /**
   * clearCart — empties the entire cart.
   */
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  /**
   * getItemQty — returns current qty for an item (0 if not in cart).
   * @param {number} id
   */
  const getItemQty = useCallback(
    (id) => {
      const item = cart.find((c) => c.id === id);
      return item ? item.qty : 0;
    },
    [cart]
  );

  // ── Derived totals
  const subtotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const { gst, grandTotal } = calculateGST(subtotal);
  const totalItems = cart.reduce((sum, c) => sum + c.qty, 0);

  return {
    cart,
    totalItems,
    subtotal,
    gst,
    grandTotal,
    addItem,
    removeItem,
    increaseQty,
    decreaseQty,
    clearCart,
    getItemQty,
  };
}
