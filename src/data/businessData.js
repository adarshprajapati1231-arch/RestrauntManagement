/**
 * businessData.js
 * ─────────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH for all restaurant client information.
 *
 * HOW TO USE FOR A NEW CLIENT:
 *   1. Change only this file.
 *   2. The entire website rebrands automatically.
 *   3. No component code needs to be modified.
 *
 * IMAGE NOTES:
 *   Replace placeholder Unsplash URLs with the client's actual
 *   hosted image URLs. Recommended size: 1200x800px minimum.
 * ─────────────────────────────────────────────────────────────
 */

export const business = {
  /* ── Identity ───────────────────────────────────────────── */
  name: "Mayur's Fine Dine",
  tagline: "Luxury Multi Cuisine Restaurant",
  description:
    "An extraordinary culinary journey through the finest Indian and International cuisines, served in an atmosphere of understated elegance in the heart of Ayodhya.",

  /* ── Contact ────────────────────────────────────────────── */
  whatsapp: "919936329494",       // Country code + number, no +
  phone: "+91 99363 29494",
  email: "info@mayursfinedine.com",
  address: "Ram Path, Ayodhya, Uttar Pradesh — 224001",
  maps: "https://maps.google.com/?q=Ayodhya,Uttar+Pradesh",

  /* ── Branding ───────────────────────────────────────────── */
  // Replace with the client's hosted logo URL
  logo: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=120&h=120&fit=crop&auto=format",
  // Full-width hero background (1920x1080 recommended)
  heroImage:
    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1920&h=1080&fit=crop&auto=format",

  /* ── Operations ─────────────────────────────────────────── */
  openingHours: "10 AM – 11 PM",
  established: "2018",

  /* ── Social ─────────────────────────────────────────────── */
  social: {
    instagram: "https://instagram.com/mayursfinedine",
    facebook: "https://facebook.com/mayursfinedine",
  },

  /* ── Theme Colors (auto-applies to entire site) ─────────── */
  colors: {
    primary: "#263B33",    // Dark green — main brand color
    secondary: "#8A5A3C",  // Warm brown — accent
  },

  /* ── Feature Flags ──────────────────────────────────────── */
  // Set any flag to false to hide that section completely
  features: {
    rooms: true,
    banquet: false,
    delivery: false,
    reservation: true,
  },

  /* ── Stats (shown on hero info card) ───────────────────── */
  stats: {
    rating: "4.9",
    dishes: "120+",
    years: "6+",
  },

  /* ── Gallery Images ─────────────────────────────────────── */
  gallery: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=1000&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=900&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=700&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=900&fit=crop&auto=format",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop&auto=format",
  ],

  /* ── Rooms ──────────────────────────────────────────────── */
  rooms: [
    {
      name: "Deluxe Room",
      image:
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop&auto=format",
      price: 2499,
      guests: 2,
      size: "240 sqft",
      wifi: true,
      ac: true,
      breakfast: true,
      description: "Elegant comfort with a serene garden view and premium bedding.",
    },
    {
      name: "Superior Room",
      image:
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop&auto=format",
      price: 3499,
      guests: 3,
      size: "300 sqft",
      wifi: true,
      ac: true,
      breakfast: true,
      description: "Spacious retreat with king-size bed and city panoramic views.",
    },
    {
      name: "Suite",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop&auto=format",
      price: 5999,
      guests: 4,
      size: "480 sqft",
      wifi: true,
      ac: true,
      breakfast: true,
      description: "The pinnacle of luxury — separate living area, private balcony, butler service.",
    },
  ],

  /* ── Banquet Halls ──────────────────────────────────────── */
  banquet: [
    {
      title: "Royal Wedding Hall",
      image:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop&auto=format",
      capacity: 250,
      parking: true,
      dining: true,
      decoration: true,
      description:
        "Grand hall with crystal chandeliers, perfect for weddings and large celebrations.",
    },
    {
      title: "Emerald Banquet",
      image:
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop&auto=format",
      capacity: 100,
      parking: true,
      dining: true,
      decoration: true,
      description:
        "Intimate yet grand — ideal for corporate events, anniversaries and private parties.",
    },
  ],

  /* ── Menu ───────────────────────────────────────────────── */
  menu: [
    /* Starters */
    {
      id: 1,
      category: "Starters",
      name: "Paneer Tikka",
      desc: "Smoky cottage cheese marinated in spiced yogurt, grilled to perfection",
      image:
        "https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&h=300&fit=crop&auto=format",
      veg: true,
      price: 320,
    },
    {
      id: 2,
      category: "Starters",
      name: "Chicken Malai Tikka",
      desc: "Tender chicken cubes in cream and mild spice, melt-in-mouth texture",
      image:
        "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop&auto=format",
      veg: false,
      price: 380,
    },
    {
      id: 3,
      category: "Starters",
      name: "Veg Platter",
      desc: "Assorted vegetarian starters — tikka, seekh, hara bhara kebab",
      image:
        "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=300&fit=crop&auto=format",
      veg: true,
      price: 450,
    },
    /* North Indian */
    {
      id: 4,
      category: "North Indian",
      name: "Dal Makhani",
      desc: "Slow-cooked black lentils with butter, cream and aromatic spices",
      image:
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop&auto=format",
      veg: true,
      price: 280,
    },
    {
      id: 5,
      category: "North Indian",
      name: "Butter Chicken",
      desc: "Iconic tomato-cream curry with tender chicken pieces, chef's signature",
      image:
        "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop&auto=format",
      veg: false,
      price: 420,
    },
    {
      id: 6,
      category: "North Indian",
      name: "Paneer Lababdar",
      desc: "Rich and creamy cottage cheese in indulgent onion-tomato gravy",
      image:
        "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop&auto=format",
      veg: true,
      price: 360,
    },
    {
      id: 7,
      category: "North Indian",
      name: "Garlic Naan",
      desc: "Freshly baked leavened bread with butter and garlic, from tandoor",
      image:
        "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop&auto=format",
      veg: true,
      price: 60,
    },
    /* Chinese */
    {
      id: 8,
      category: "Chinese",
      name: "Veg Manchurian",
      desc: "Crispy vegetable dumplings tossed in tangy Manchurian sauce",
      image:
        "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop&auto=format",
      veg: true,
      price: 260,
    },
    {
      id: 9,
      category: "Chinese",
      name: "Chicken Fried Rice",
      desc: "Wok-tossed basmati with scrambled egg, veggies and tender chicken",
      image:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop&auto=format",
      veg: false,
      price: 340,
    },
    {
      id: 10,
      category: "Chinese",
      name: "Hakka Noodles",
      desc: "Classic stir-fried noodles with crisp vegetables in soy sauce",
      image:
        "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop&auto=format",
      veg: true,
      price: 280,
    },
    /* Pizza */
    {
      id: 11,
      category: "Pizza",
      name: "Margherita",
      desc: "Classic tomato base, fresh mozzarella and aromatic basil",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&auto=format",
      veg: true,
      price: 350,
    },
    {
      id: 12,
      category: "Pizza",
      name: "BBQ Chicken",
      desc: "Smoky BBQ sauce, grilled chicken, caramelised onions, bell peppers",
      image:
        "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=300&fit=crop&auto=format",
      veg: false,
      price: 450,
    },
    /* Dessert */
    {
      id: 13,
      category: "Dessert",
      name: "Gulab Jamun",
      desc: "Soft milk-solid dumplings soaked in rose-scented sugar syrup",
      image:
        "https://images.unsplash.com/photo-1666891340855-be7e8e80f1b1?w=400&h=300&fit=crop&auto=format",
      veg: true,
      price: 140,
    },
    {
      id: 14,
      category: "Dessert",
      name: "Chocolate Lava Cake",
      desc: "Warm dark chocolate cake with a molten centre, served with vanilla ice cream",
      image:
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop&auto=format",
      veg: true,
      price: 220,
    },
    /* Beverages */
    {
      id: 15,
      category: "Beverages",
      name: "Mango Lassi",
      desc: "Chilled Alphonso mango blended with creamy yogurt and a hint of cardamom",
      image:
        "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&h=300&fit=crop&auto=format",
      veg: true,
      price: 120,
    },
    {
      id: 16,
      category: "Beverages",
      name: "Fresh Lime Soda",
      desc: "Zesty lime with chilled soda — sweet, salted, or masala",
      image:
        "https://images.unsplash.com/photo-1638176067278-c5e7b1fe2c33?w=400&h=300&fit=crop&auto=format",
      veg: true,
      price: 80,
    },
  ],

  /* ── Testimonials ───────────────────────────────────────── */
  testimonials: [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Food Blogger",
      rating: 5,
      text: "Absolutely magical experience. The Paneer Tikka was the best I've had anywhere in North India. The ambiance is strikingly beautiful — felt like dining in a luxury hotel.",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format",
    },
    {
      id: 2,
      name: "Arjun Mehta",
      role: "Corporate Client",
      rating: 5,
      text: "Booked the Emerald Banquet for our annual dinner. Flawless service, superb food quality and the decor was beyond expectations. Highly recommend for corporate events.",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format",
    },
    {
      id: 3,
      name: "Sunita Verma",
      role: "Frequent Diner",
      rating: 5,
      text: "We celebrated our anniversary here and it was unforgettable. The staff went above and beyond, the food was exquisite, and the room was immaculate. Will be back!",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&auto=format",
    },
    {
      id: 4,
      name: "Rahul Singh",
      role: "Travel Enthusiast",
      rating: 5,
      text: "Visited while travelling through Ayodhya. The Dal Makhani and Butter Naan are absolutely divine. The rooftop seating at night is a must-experience.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&auto=format",
    },
  ],
};
