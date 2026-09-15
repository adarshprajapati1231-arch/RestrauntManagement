/**
 * MenuSection.jsx
 * ──────────────────────────────────────────────────────────────
 * Full menu section with:
 *  - Auto-generated category tabs from JSON
 *  - Real-time search filtering
 *  - Menu cards with image, veg badge, qty selector, add to cart
 *  - Luxury hover effects via Framer Motion
 */

import React, { useState, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Minus, ShoppingCart, X } from "lucide-react";
import SectionHeader from "../ui/SectionHeader";
import Badge from "../ui/Badge";

/**
 * @param {Object} props
 * @param {Array}    props.menu        - Menu items from businessData.js
 * @param {Function} props.addItem     - Cart addItem
 * @param {Function} props.increaseQty
 * @param {Function} props.decreaseQty
 * @param {Function} props.getItemQty
 */
export default function MenuSection({ menu, addItem, increaseQty, decreaseQty, getItemQty }) {
  // ── Derive unique categories from menu
  const categories = useMemo(() => {
    const cats = ["All", ...new Set(menu.map((item) => item.category))];
    return cats;
  }, [menu]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  // ── Filter items
  const filteredItems = useMemo(() => {
    let items = menu;
    if (activeCategory !== "All") {
      items = items.filter((item) => item.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      );
    }
    return items;
  }, [menu, activeCategory, search]);

  return (
    <section id="menu" className="section" style={{ background: "var(--color-background)" }}>
      <div className="container">
        <SectionHeader
          label="Culinary Excellence"
          title="Our Menu"
          subtitle="A curated selection of the finest Indian and International cuisines, crafted with love and the freshest ingredients."
        />

        {/* ── Search Bar ──────────────────────────────────────── */}
        <motion.div
          className="max-w-md mx-auto mb-8 relative"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: "var(--color-text-muted)" }}
          />
          <input
            id="menu-search-input"
            type="text"
            placeholder="Search dishes, categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-11 pr-10"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--color-text-muted)" }}
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </motion.div>

        {/* ── Category Tabs ────────────────────────────────────── */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              id={`menu-cat-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => { setActiveCategory(cat); setSearch(""); }}
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-250"
              style={{
                background:
                  activeCategory === cat
                    ? "var(--color-gold)"
                    : "rgba(255,255,255,0.06)",
                color:
                  activeCategory === cat
                    ? "#0E1412"
                    : "var(--color-text-muted)",
                border:
                  activeCategory === cat
                    ? "1px solid var(--color-gold)"
                    : "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── Menu Cards Grid ──────────────────────────────────── */}
        <AnimatePresence mode="wait">
          {filteredItems.length === 0 ? (
            <motion.p
              key="empty"
              className="text-center py-16 text-sm"
              style={{ color: "var(--color-text-muted)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              No dishes found. Try a different search.
            </motion.p>
          ) : (
            <motion.div
              key={activeCategory + search}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredItems.map((item, i) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  index={i}
                  qty={getItemQty(item.id)}
                  onAdd={() => addItem(item)}
                  onIncrease={() => increaseQty(item.id)}
                  onDecrease={() => decreaseQty(item.id)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ── Menu Card (memoised for performance) ─────────────────── */
const MenuCard = memo(function MenuCard({ item, index, qty, onAdd, onIncrease, onDecrease }) {
  return (
    <motion.div
      className="glass rounded-2xl overflow-hidden card-hover flex flex-col"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          onLoad={(e) => e.currentTarget.classList.add("loaded")}
        />
        {/* Veg badge (top-left overlay) */}
        <div className="absolute top-3 left-3">
          <Badge isVeg={item.veg} />
        </div>
        {/* Price overlay */}
        <div
          className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg text-sm font-semibold"
          style={{ background: "rgba(14,20,18,0.85)", color: "var(--color-gold)" }}
        >
          ₹{item.price}
        </div>
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3
          className="font-heading text-lg font-semibold leading-tight"
          style={{ color: "var(--color-text)" }}
        >
          {item.name}
        </h3>
        <p className="text-xs mt-1 leading-relaxed flex-1" style={{ color: "var(--color-text-muted)" }}>
          {item.desc}
        </p>

        {/* Cart Controls */}
        <div className="mt-4">
          {qty === 0 ? (
            <button
              id={`add-to-cart-${item.id}`}
              onClick={onAdd}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-250"
              style={{
                background: "rgba(201,164,92,0.12)",
                border: "1px solid rgba(201,164,92,0.3)",
                color: "var(--color-gold)",
              }}
            >
              <Plus size={15} />
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center justify-between px-1">
              <button
                id={`decrease-qty-${item.id}`}
                onClick={onDecrease}
                className="qty-btn"
                aria-label="Decrease quantity"
              >
                <Minus size={13} />
              </button>
              <span className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>
                {qty}
              </span>
              <button
                id={`increase-qty-${item.id}`}
                onClick={onIncrease}
                className="qty-btn"
                style={{ background: "rgba(201,164,92,0.15)", borderColor: "var(--color-gold)" }}
                aria-label="Increase quantity"
              >
                <Plus size={13} />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});
