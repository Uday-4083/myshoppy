import { Category, Product } from "@/types";

export const CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Kitchen",
    slug: "kitchen",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    description: "Cookware, appliances, and kitchen essentials",
    productCount: 5,
  },
  {
    id: "cat-2",
    name: "Cleaning",
    slug: "cleaning",
    image:
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&q=80",
    description: "Cleaning supplies and tools",
    productCount: 4,
  },
  {
    id: "cat-3",
    name: "Furniture",
    slug: "furniture",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    description: "Home furniture and seating",
    productCount: 4,
  },
  {
    id: "cat-4",
    name: "Storage",
    slug: "storage",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    description: "Storage bins, organizers, and bags",
    productCount: 4,
  },
  {
    id: "cat-5",
    name: "Tech",
    slug: "tech",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    description: "Headphones, smart home devices, and gadgets",
    productCount: 4,
  },
  {
    id: "cat-6",
    name: "Décor",
    slug: "decor",
    image:
      "https://images.unsplash.com/photo-1567225477277-c8162eb798d2?w=600&q=80",
    description: "Candles, plants, wall art, and more",
    productCount: 4,
  },
];

export const PRODUCTS: Product[] = [
  // ── Kitchen ──────────────────────────────────────────────────────────────
  {
    id: "p-kitchen-1",
    name: "Non-Stick Cookware Set",
    category: "Kitchen",
    categorySlug: "kitchen",
    description:
      "Complete 10-piece non-stick cookware set with heat-resistant handles. Dishwasher safe and PFOA-free coating for healthy cooking. Includes pots, pans, and lids.",
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.5,
    reviewCount: 128,
    image: "https://images.pexels.com/photos/6996329/pexels-photo-6996329.jpeg?auto=compress&cs=tinysrgb&w=600",
    inStock: true,
    stockCount: 24,
    tags: ["kitchen", "cookware", "non-stick"],
  },
  {
    id: "p-kitchen-2",
    name: "Smart Coffee Maker",
    category: "Kitchen",
    categorySlug: "kitchen",
    description:
      "Programmable 12-cup coffee maker with built-in grinder and auto-brew scheduling. Features a thermal carafe to keep coffee hot for up to 2 hours.",
    price: 129.99,
    originalPrice: 179.99,
    rating: 4.3,
    reviewCount: 95,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    inStock: true,
    stockCount: 15,
    tags: ["kitchen", "coffee", "appliance"],
  },
  {
    id: "p-kitchen-3",
    name: "Premium Knife Set",
    category: "Kitchen",
    categorySlug: "kitchen",
    description:
      "7-piece stainless steel knife set with ergonomic pakkawood handles. High-carbon German steel blades stay sharp longer. Includes wooden block for safe storage.",
    price: 59.99,
    originalPrice: 89.99,
    rating: 4.7,
    reviewCount: 203,
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=600&q=80",
    inStock: true,
    stockCount: 32,
    tags: ["kitchen", "knives", "cookware"],
  },
  {
    id: "p-kitchen-4",
    name: "Glass Food Storage Set",
    category: "Kitchen",
    categorySlug: "kitchen",
    description:
      "14-piece airtight glass food storage containers with snap-lock lids. Microwave, oven, dishwasher, and freezer safe. BPA-free and leak-proof design.",
    price: 34.99,
    originalPrice: 49.99,
    rating: 4.4,
    reviewCount: 167,
    image: "https://images.pexels.com/photos/4226806/pexels-photo-4226806.jpeg?auto=compress&cs=tinysrgb&w=600",
    inStock: true,
    stockCount: 41,
    tags: ["kitchen", "storage", "containers"],
  },
  {
    id: "p-kitchen-5",
    name: "Pro Electric Kettle",
    category: "Kitchen",
    categorySlug: "kitchen",
    description:
      "Variable temperature electric kettle with 5 preset settings for different beverages. 1.7L capacity, stainless steel interior, and keep-warm function for 30 minutes.",
    price: 45.99,
    rating: 4.6,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=600&q=80",
    inStock: true,
    stockCount: 19,
    tags: ["kitchen", "kettle", "appliance"],
  },

  // ── Cleaning ─────────────────────────────────────────────────────────────
  {
    id: "p-cleaning-1",
    name: "Smart Robot Vacuum",
    category: "Cleaning",
    categorySlug: "cleaning",
    description:
      "Wi-Fi connected robot vacuum with laser navigation and 2700Pa suction. Compatible with Alexa and Google Home. Auto-empty base holds 60 days of dirt.",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.2,
    reviewCount: 56,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80",
    inStock: true,
    stockCount: 8,
    tags: ["cleaning", "robot", "vacuum", "smart"],
  },
  {
    id: "p-cleaning-2",
    name: "Microfiber Mop & Bucket Set",
    category: "Cleaning",
    categorySlug: "cleaning",
    description:
      "Spin mop and bucket system with 360° rotation head. Includes 2 washable microfiber pads and a built-in wringer. Suitable for hardwood, tile, and laminate floors.",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.5,
    reviewCount: 112,
    image: "https://images.pexels.com/photos/4108711/pexels-photo-4108711.jpeg?auto=compress&cs=tinysrgb&w=600",
    inStock: true,
    stockCount: 27,
    tags: ["cleaning", "mop", "floor"],
  },
  {
    id: "p-cleaning-3",
    name: "Pro Steam Cleaner",
    category: "Cleaning",
    categorySlug: "cleaning",
    description:
      "Multi-surface handheld steam cleaner with 1050W power and 12 accessories. Eliminates 99.9% of bacteria without chemicals. Heats up in 25 seconds.",
    price: 89.99,
    rating: 4.3,
    reviewCount: 78,
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&q=80",
    inStock: true,
    stockCount: 14,
    tags: ["cleaning", "steam", "sanitize"],
  },
  {
    id: "p-cleaning-4",
    name: "All-Purpose Spray Kit (6-pack)",
    category: "Cleaning",
    categorySlug: "cleaning",
    description:
      "Eco-friendly concentrated cleaning spray pack covering kitchen, bathroom, glass, and fabric. Biodegradable formula, plant-based ingredients, fresh citrus scent.",
    price: 19.99,
    originalPrice: 27.99,
    rating: 4.1,
    reviewCount: 234,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    inStock: true,
    stockCount: 60,
    tags: ["cleaning", "spray", "eco-friendly"],
  },

  // ── Furniture ─────────────────────────────────────────────────────────────
  {
    id: "p-furniture-1",
    name: "Ergonomic Mesh Chair",
    category: "Furniture",
    categorySlug: "furniture",
    description:
      "Breathable mesh back office chair with lumbar support, adjustable armrests, and seat height. BIFMA certified for 8+ hours of comfortable use. Supports up to 250 lbs.",
    price: 249.99,
    originalPrice: 329.99,
    rating: 4.6,
    reviewCount: 87,
    image: "https://images.pexels.com/photos/586763/pexels-photo-586763.jpeg?auto=compress&cs=tinysrgb&w=600",
    inStock: true,
    stockCount: 10,
    tags: ["furniture", "chair", "office", "ergonomic"],
  },
  {
    id: "p-furniture-2",
    name: "5-Tier Wooden Bookshelf",
    category: "Furniture",
    categorySlug: "furniture",
    description:
      'Solid pine wood 5-tier open bookshelf with a natural finish. Each shelf holds up to 30 lbs. Easy assembly with included hardware. Dimensions: 29"W × 12"D × 72"H.',
    price: 119.99,
    originalPrice: 159.99,
    rating: 4.4,
    reviewCount: 63,
    image: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=600&q=80",
    inStock: true,
    stockCount: 12,
    tags: ["furniture", "bookshelf", "wood"],
  },
  {
    id: "p-furniture-3",
    name: "Marble Coffee Table",
    category: "Furniture",
    categorySlug: "furniture",
    description:
      'Modern round coffee table with faux marble top and gold-finish iron base. Scratch-resistant tempered glass overlay protects the surface. Diameter: 35".',
    price: 189.99,
    rating: 4.3,
    reviewCount: 41,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80",
    inStock: true,
    stockCount: 6,
    tags: ["furniture", "table", "living-room", "marble"],
  },
  {
    id: "p-furniture-4",
    name: "Memory Foam Mattress Topper",
    category: "Furniture",
    categorySlug: "furniture",
    description:
      "3-inch queen size memory foam mattress topper with cooling gel infusion for temperature regulation. Hypoallergenic and CertiPUR-US certified foam.",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.7,
    reviewCount: 198,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80",
    inStock: true,
    stockCount: 22,
    tags: ["furniture", "bedroom", "mattress", "sleep"],
  },

  // ── Storage ───────────────────────────────────────────────────────────────
  {
    id: "p-storage-1",
    name: "Stackable Storage Bins (6-pack)",
    category: "Storage",
    categorySlug: "storage",
    description:
      "Set of 6 durable plastic storage bins in 3 sizes with color-coded lids. Stackable design saves floor space. Ideal for pantry, garage, or craft room.",
    price: 39.99,
    originalPrice: 54.99,
    rating: 4.5,
    reviewCount: 156,
   image: "https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?w=600&q=80",
    inStock: true,
    stockCount: 35,
    tags: ["storage", "bins", "organizer"],
  },
  {
    id: "p-storage-2",
    name: "Under-Bed Storage Bags",
    category: "Storage",
    categorySlug: "storage",
    description:
      "4-pack jumbo vacuum storage bags for under-bed use. Zipper seal with valve for vacuum compression. Protects against dust, moisture, and insects.",
    price: 22.99,
    rating: 4.2,
    reviewCount: 89,
    image: "https://images.pexels.com/photos/7262404/pexels-photo-7262404.jpeg?auto=compress&cs=tinysrgb&w=600",
    inStock: true,
    stockCount: 48,
    tags: ["storage", "bags", "bedroom"],
  },
  {
    id: "p-storage-3",
    name: "Bamboo Kitchen Organizer",
    category: "Storage",
    categorySlug: "storage",
    description:
      'Expandable bamboo drawer organizer with 5 adjustable compartments. Fits drawers from 12" to 21". Eco-friendly bamboo construction, smooth finish.',
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.6,
    reviewCount: 143,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    inStock: true,
    stockCount: 30,
    tags: ["storage", "kitchen", "bamboo", "organizer"],
  },
  {
    id: "p-storage-4",
    name: "Hanging Closet Organizer",
    category: "Storage",
    categorySlug: "storage",
    description:
      "Over-the-door 5-shelf hanging closet organizer in breathable non-woven fabric. Holds clothes, bags, shoes, or accessories. Foldable for easy storage.",
    price: 18.99,
    rating: 4.3,
    reviewCount: 201,
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80",
    inStock: true,
    stockCount: 55,
    tags: ["storage", "closet", "organizer"],
  },

  // ── Tech ──────────────────────────────────────────────────────────────────
  {
    id: "p-tech-1",
    name: "Wireless Earbuds IPX8",
    category: "Tech",
    categorySlug: "tech",
    description:
      "True wireless earbuds with IPX8 waterproofing and 36-hour total battery life. Active noise cancellation, transparency mode, and 6-mic call clarity.",
    price: 89.0,
    originalPrice: 119.0,
    rating: 4.4,
    reviewCount: 321,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&q=80",
    inStock: true,
    stockCount: 45,
    tags: ["tech", "earbuds", "wireless", "audio"],
  },
  {
    id: "p-tech-2",
    name: "AirPods Max Headphones",
    category: "Tech",
    categorySlug: "tech",
    description:
      "Premium over-ear headphones with high-fidelity audio and industry-leading active noise cancellation. Spatial audio with dynamic head tracking for a cinematic experience.",
    price: 549.0,
    rating: 4.8,
    reviewCount: 521,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=80",
    inStock: true,
    stockCount: 12,
    tags: ["tech", "headphones", "premium", "audio"],
  },
  {
    id: "p-tech-3",
    name: "Bose BT Earphones",
    category: "Tech",
    categorySlug: "tech",
    description:
      "Bluetooth sport earphones with StayHear tips for a secure fit. 15-hour battery, water-resistant, and volume-optimized EQ for clear sound at any level.",
    price: 289.0,
    originalPrice: 319.0,
    rating: 4.7,
    reviewCount: 432,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=600&q=80",
    inStock: true,
    stockCount: 18,
    tags: ["tech", "earphones", "bluetooth", "sport"],
  },
  {
    id: "p-tech-4",
    name: "VIVEFOX Wired Headphones",
    category: "Tech",
    categorySlug: "tech",
    description:
      "Wired stereo headphones with 40mm drivers for rich bass and clear treble. Foldable design with padded ear cups. 3.5mm jack with in-line microphone.",
    price: 39.0,
    rating: 4.2,
    reviewCount: 188,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    inStock: true,
    stockCount: 67,
    tags: ["tech", "headphones", "wired", "budget"],
  },

  // ── Décor ─────────────────────────────────────────────────────────────────
  {
    id: "p-decor-1",
    name: "Scented Soy Candle Set",
    category: "Décor",
    categorySlug: "decor",
    description:
      "Set of 3 hand-poured soy wax candles in amber glass jars — vanilla, lavender, and eucalyptus. 45-hour burn time each. Cotton wicks for clean, soot-free burning.",
    price: 32.99,
    originalPrice: 44.99,
    rating: 4.6,
    reviewCount: 145,
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&q=80",
    inStock: true,
    stockCount: 40,
    tags: ["decor", "candle", "scent", "gift"],
  },
  {
    id: "p-decor-2",
    name: "Artificial Succulent Set",
    category: "Décor",
    categorySlug: "decor",
    description:
      "Set of 6 lifelike artificial succulents in ceramic pots. No watering required. Perfect for desk, shelf, or windowsill décor. Ships fully assembled.",
    price: 26.99,
    rating: 4.4,
    reviewCount: 98,
    image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=600&q=80",
    inStock: true,
    stockCount: 52,
    tags: ["decor", "plants", "artificial", "succulents"],
  },
  {
    id: "p-decor-3",
    name: "Abstract Canvas Wall Art",
    category: "Décor",
    categorySlug: "decor",
    description:
      '3-panel abstract canvas print in earth tones. Gallery-wrapped with wooden frame, ready to hang. Available in 36"×24" size. Fade-resistant UV ink.',
    price: 49.99,
    rating: 4.3,
    reviewCount: 67,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80",
    inStock: false,
    stockCount: 0,
    tags: ["decor", "wall-art", "canvas", "abstract"],
  },
  {
    id: "p-decor-4",
    name: "Decorative Throw Pillow Set",
    category: "Décor",
    categorySlug: "decor",
    description:
      'Set of 4 decorative throw pillow covers in linen blend fabric — 18"×18". Mix of geometric and floral patterns in complementary earth tones. Zipper closure.',
    price: 44.99,
    originalPrice: 59.99,
    rating: 4.5,
    reviewCount: 134,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80",
    inStock: true,
    stockCount: 29,
    tags: ["decor", "pillow", "cushion", "living-room"],
  },
];

export const getFeaturedProducts = (): Product[] =>
  PRODUCTS.filter((p) => p.inStock).slice(0, 8);

export const getProductsByCategory = (slug: string): Product[] =>
  PRODUCTS.filter((p) => p.categorySlug === slug);

export const getProductById = (id: string): Product | undefined =>
  PRODUCTS.find((p) => p.id === id);

export const getCategoryBySlug = (slug: string): Category | undefined =>
  CATEGORIES.find((c) => c.slug === slug);

export const searchProducts = (
  query: string,
  categorySlug?: string,
): Product[] => {
  const q = query.toLowerCase().trim();
  return PRODUCTS.filter((p) => {
    const matchesQuery =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q));
    const matchesCategory = !categorySlug || p.categorySlug === categorySlug;
    return matchesQuery && matchesCategory;
  });
};
