/**
 * App.jsx
 * ──────────────────────────────────────────────────────────────
 * Root application component.
 *
 * Responsibilities:
 *  - Apply CSS custom properties from business.colors (live theming)
 *  - Manage loading screen state
 *  - Manage cart sidebar open/close state
 *  - Compose all sections in page order
 *  - Conditionally render Rooms / Banquet based on feature flags
 */

import React, { useState, useEffect } from "react";

// ── Data
import { business } from "./data/businessData";

// ── Hooks
import { useCart } from "./hooks/useCart";

// ── Layout
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollProgress from "./components/layout/ScrollProgress";
import FloatingButtons from "./components/layout/FloatingButtons";
import LoadingScreen from "./components/layout/LoadingScreen";

// ── Sections
import Hero from "./components/hero/Hero";
import MenuSection from "./components/menu/MenuSection";
import CartSidebar from "./components/cart/CartSidebar";
import BookingSection from "./components/booking/BookingSection";
import RoomsSection from "./components/rooms/RoomsSection";
import BanquetSection from "./components/banquet/BanquetSection";
import GallerySection from "./components/gallery/GallerySection";
import TestimonialsSection from "./components/testimonials/TestimonialsSection";
import ContactSection from "./components/contact/ContactSection";

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  // ── Apply brand colors from businessData to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    if (business.colors?.primary) {
      root.style.setProperty("--color-primary", business.colors.primary);
    }
    if (business.colors?.secondary) {
      root.style.setProperty("--color-secondary", business.colors.secondary);
    }
  }, []);

  // ── Cart hook — single source of cart state
  const {
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
  } = useCart();

  return (
    <>
      {/* ── Loading Screen ──────────────────────────────── */}
      {!appReady && (
        <LoadingScreen
          business={business}
          onDone={() => setAppReady(true)}
        />
      )}

      {/* ── Main Site ───────────────────────────────────── */}
      <div style={{ opacity: appReady ? 1 : 0, transition: "opacity 0.4s ease" }}>
        {/* Scroll progress indicator */}
        <ScrollProgress />

        {/* Sticky navbar */}
        <Navbar
          business={business}
          totalItems={totalItems}
          onCartOpen={() => setCartOpen(true)}
        />

        {/* ── Page Sections ──────────────────────────────── */}
        <main>
          {/* Hero */}
          <Hero business={business} />

          {/* Menu */}
          <MenuSection
            menu={business.menu}
            addItem={addItem}
            increaseQty={increaseQty}
            decreaseQty={decreaseQty}
            getItemQty={getItemQty}
          />

          {/* Rooms — conditional */}
          <RoomsSection business={business} />

          {/* Banquet — conditional */}
          <BanquetSection business={business} />

          {/* Gallery */}
          <GallerySection business={business} />

          {/* Testimonials */}
          <TestimonialsSection business={business} />

          {/* Booking */}
          <BookingSection business={business} />

          {/* Contact */}
          <ContactSection business={business} />
        </main>

        {/* Footer */}
        <Footer business={business} />

        {/* Cart Sidebar / Bottom Sheet */}
        <CartSidebar
          isOpen={cartOpen}
          onClose={() => setCartOpen(false)}
          cart={cart}
          subtotal={subtotal}
          gst={gst}
          grandTotal={grandTotal}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
          removeItem={removeItem}
          clearCart={clearCart}
          business={business}
        />

        {/* Floating buttons: WhatsApp, Call, Back to top */}
        <FloatingButtons business={business} />
      </div>
    </>
  );
}
