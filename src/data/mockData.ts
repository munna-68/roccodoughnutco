/**
 * MOCK DATA FILE: Rocco's Doughnut Company
 * 
 * HOW TO EDIT DATA:
 * - Update locations, hours, menu items, or dashboard analytics directly in this file.
 * - All content is centralized here with TypeScript types.
 * 
 * HOW TO SWAP IMAGES:
 * - Each menu item has an `image` field (currently null, defaulting to gradient food placeholders).
 * - To use real photos, place image files in /public/images/doughnuts/ and set `image: "/images/doughnuts/your-photo.jpg"`.
 * 
 * RESEARCH STATUS:
 * - Locations, addresses, hours, categories, item names, and allergen disclaimers are REAL and verified from research.
 * - Prices, order volumes, customer names, and revenue metrics are BELIEVABLE DEMO PLACEHOLDERS labeled "Demo Data / Demo Prices".
 */

export interface Location {
  id: string;
  name: string;
  town: string;
  address: string;
  cityStateZip: string;
  hoursDays: string;
  hoursTime: string;
  mondayStatus: string;
  phone: string;
  verified: boolean;
  notes: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: "yeast-raised" | "dark-chocolate-cake" | "vanilla-cake" | "fills" | "gluten-sensitive" | "specials";
  categoryLabel: string;
  description: string;
  price: number; // Demo price in USD
  tags: string[];
  gradient: {
    base: string; // CSS gradient for pastry base
    frosting: string; // CSS color for frosting
    accent?: string; // sprinkles or drizzle color
  };
  image?: string | null;
  featured?: boolean;
  seasonal?: boolean;
}

export interface SocialLink {
  id: string;
  title: string;
  subtitle: string;
  platform: string;
  url: string;
  badge?: string;
  icon: string;
}

export interface DashboardMetric {
  label: string;
  value: string;
  rawNumber: number;
  change: string;
  isPositive: boolean;
  subtext: string;
}

export interface LocationStat {
  locationId: string;
  name: string;
  revenue: number;
  orders: number;
  percentShare: number;
  avgOrderValue: number;
}

export interface TopDoughnut {
  name: string;
  category: string;
  quantitySold: number;
  revenue: number;
  growth: string;
}

export interface RecentOrder {
  id: string;
  customer: string;
  location: string;
  itemsSummary: string;
  boxType: "Single" | "Half Dozen (6)" | "Baker's Dozen (12)" | "Giant Cake";
  pickupTime: string;
  status: "Ready for Pickup" | "In the Fryer" | "Scheduled" | "Completed";
  amount: number;
}

// -------------------------------------------------------------
// 1. BRAND METADATA
// -------------------------------------------------------------
export const BRAND_DATA = {
  name: "Rocco's Doughnut Co.",
  legalName: "Rocco's Doughnut Company LLC",
  tagline: "Slingin’ handcrafted doughnuts in Massachusetts since 2018.",
  description: "Giant, handcrafted artisan gourmet doughnuts, seasonal monthly drops, and our signature Vanilla Creme-Cake Gluten-Sensitive collection. 4 Central MA locations.",
  instagramFollowers: "99.4K",
  instagramHandle: "@roccodoughnutco",
  contactEmail: "rdcoevents@gmail.com",
  donationEmail: "lia@roccos.co",
  foundedYear: 2018,
};

// -------------------------------------------------------------
// 2. LOCATIONS (Verified via research)
// -------------------------------------------------------------
export const LOCATIONS: Location[] = [
  {
    id: "auburn",
    name: "Auburn Bakery",
    town: "Auburn, MA",
    address: "744 Southbridge St # B",
    cityStateZip: "Auburn, MA 01501",
    hoursDays: "Tuesday – Sunday",
    hoursTime: "6:30 AM – 1:00 PM",
    mondayStatus: "Closed Mondays",
    phone: "(508) 407-8822",
    verified: true,
    notes: "Easy parking off Route 12 / Southbridge St. Fresh batches drop at 6:30 AM.",
  },
  {
    id: "worcester",
    name: "Worcester Bakery",
    town: "Worcester, MA",
    address: "947 W Boylston St",
    cityStateZip: "Worcester, MA 01606",
    hoursDays: "Tuesday – Sunday",
    hoursTime: "6:30 AM – 1:00 PM",
    mondayStatus: "Closed Mondays",
    phone: "(508) 459-2010",
    verified: true,
    notes: "Minutes from I-190 with easy express pickup counter.",
  },
  {
    id: "westborough",
    name: "Westborough Bakery",
    town: "Westborough, MA",
    address: "3 Colonial Dr",
    cityStateZip: "Westborough, MA 01581",
    hoursDays: "Tuesday – Sunday",
    hoursTime: "6:30 AM – 1:00 PM",
    mondayStatus: "Closed Mondays",
    phone: "(508) 898-3330",
    verified: true,
    notes: "Just off Route 9. High-volume catering and pre-order pickup hub.",
  },
  {
    id: "millbury",
    name: "Millbury Bakery",
    town: "Millbury, MA",
    address: "238 Millbury Ave",
    cityStateZip: "Millbury, MA 01527",
    hoursDays: "Tuesday – Sunday",
    hoursTime: "7:00 AM – 1:00 PM",
    mondayStatus: "Closed Mondays",
    phone: "(508) 865-9800",
    verified: true,
    notes: "Opens 7:00 AM Tue–Sun. Fast mobile pickup lane.",
  },
];

// -------------------------------------------------------------
// 3. GLUTEN-SENSITIVE DISCLAIMER (Verified from research)
// -------------------------------------------------------------
export const GLUTEN_SENSITIVE_NOTICE = {
  headline: "Skip The Pain: Our Gluten-Sensitive Collection",
  story: "Our brand new line of Gluten-Sensitive Doughnuts is crafted on our perfected vanilla crème cake base. None of the ingredients in this collection contain gluten.",
  allergenDisclaimer: "Allergen Disclaimer: Our recipe utilizes all gluten-free components and is made on dedicated equipment in a separate section of our bakery. However, because our kitchen is an active facility that handles wheat and gluten, per FDA guidelines we cannot guarantee 100% zero cross-contact. Not recommended for severe celiac disease.",
};

// -------------------------------------------------------------
// 4. MENU CATEGORIES
// -------------------------------------------------------------
export const MENU_CATEGORIES = [
  { id: "all", label: "Full Lineup" },
  { id: "yeast-raised", label: "Yeast Raised" },
  { id: "dark-chocolate-cake", label: "Dark Chocolate Cake" },
  { id: "vanilla-cake", label: "Vanilla Cake" },
  { id: "fills", label: "Fills & Creams" },
  { id: "gluten-sensitive", label: "Gluten Sensitive Collection" },
  { id: "specials", label: "Specials & Giant Cakes" },
] as const;

// -------------------------------------------------------------
// 5. MENU ITEMS (Real verified names from research)
// -------------------------------------------------------------
export const MENU_ITEMS: MenuItem[] = [
  // --- Yeast Raised ---
  {
    id: "the-homer",
    name: "The Homer",
    category: "yeast-raised",
    categoryLabel: "Yeast Raised",
    description: "Our world-famous signature yeast ring drenched in vibrant strawberry glaze and finished with colorful rainbow sprinkles.",
    price: 3.75,
    tags: ["Signature Classic", "Yeast Ring", "Fan Favorite"],
    gradient: {
      base: "from-[#e8cbb0] to-[#cba37a]",
      frosting: "#ff5e9c",
      accent: "#fef08a",
    },
    featured: true,
  },
  {
    id: "fruity-pebbles",
    name: "Fruity Pebbles",
    category: "yeast-raised",
    categoryLabel: "Yeast Raised",
    description: "Fluffy honey-glazed yeast doughnut loaded with sweet strawberry icing and piled high with crispy Fruity Pebbles cereal.",
    price: 3.95,
    tags: ["Cereal Series", "Yeast Ring", "Bestseller"],
    gradient: {
      base: "from-[#edd2b8] to-[#cca47e]",
      frosting: "#f472b6",
      accent: "#38bdf8",
    },
    featured: true,
  },
  {
    id: "maple-bacon",
    name: "Maple Bacon",
    category: "yeast-raised",
    categoryLabel: "Yeast Raised",
    description: "Artisan yeast ring dipped in Vermont maple glaze, generously covered with crispy applewood smoked bacon and a pure maple drizzle.",
    price: 4.25,
    tags: ["Sweet & Savory", "Yeast Ring", "Signature"],
    gradient: {
      base: "from-[#e3c4a6] to-[#be956d]",
      frosting: "#d97706",
      accent: "#78350f",
    },
    featured: true,
  },
  {
    id: "honey-glazed",
    name: "Honey Glazed",
    category: "yeast-raised",
    categoryLabel: "Yeast Raised",
    description: "Our signature pillow-soft artisan yeast dough enveloped in warm, crystal-clear honey glaze. Melt-in-your-mouth perfection.",
    price: 3.25,
    tags: ["Pillowy Soft", "Classic", "Everyday Staple"],
    gradient: {
      base: "from-[#f4e0c8] to-[#d6ad85]",
      frosting: "#fde68a",
      accent: "#ffffff",
    },
  },
  {
    id: "chocolate-frosted-sprinkles",
    name: "Chocolate Frosted with Sprinkles",
    category: "yeast-raised",
    categoryLabel: "Yeast Raised",
    description: "Signature fluffy yeast ring smothered in rich, velvety milk chocolate frosting and topped with birthday rainbow sprinkles.",
    price: 3.50,
    tags: ["Classic", "Yeast Ring"],
    gradient: {
      base: "from-[#edd2b8] to-[#cca47e]",
      frosting: "#451a03",
      accent: "#ec4899",
    },
  },
  {
    id: "twix-bar-special",
    name: "Twix Bar Doughnut",
    category: "yeast-raised",
    categoryLabel: "Yeast Raised",
    description: "Yeast ring dipped in golden caramel glaze, smothered in crushed Twix candy bars, and finished with ribbons of chocolate ganache.",
    price: 4.50,
    tags: ["Candy Special", "Yeast Ring", "Limited"],
    gradient: {
      base: "from-[#e3c4a6] to-[#be956d]",
      frosting: "#b45309",
      accent: "#451a03",
    },
  },

  // --- Dark Chocolate Cake ---
  {
    id: "cookies-n-cream",
    name: "Cookies N' Cream",
    category: "dark-chocolate-cake",
    categoryLabel: "Dark Chocolate Cake",
    description: "Fudgy dark chocolate cake doughnut honey glazed, hand-dipped in rich vanilla icing, topped with crushed Oreo pieces and dark chocolate drizzle.",
    price: 4.25,
    tags: ["Dark Cocoa Base", "Bestseller", "Cake Donut"],
    gradient: {
      base: "from-[#382012] to-[#1c0f08]",
      frosting: "#ffffff",
      accent: "#171717",
    },
    featured: true,
  },
  {
    id: "triple-chocolate",
    name: "Triple Chocolate",
    category: "dark-chocolate-cake",
    categoryLabel: "Dark Chocolate Cake",
    description: "Deep dark chocolate cake base coated in rich Dutch cocoa glaze, covered with chocolate sprinkles and finished with dark chocolate flakes.",
    price: 3.95,
    tags: ["Chocoholic", "Cake Donut"],
    gradient: {
      base: "from-[#2e1709] to-[#180a03]",
      frosting: "#451a03",
      accent: "#78350f",
    },
  },
  {
    id: "chocolate-fudge-cake",
    name: "Chocolate Fudge",
    category: "dark-chocolate-cake",
    categoryLabel: "Dark Chocolate Cake",
    description: "Dense, moist dark chocolate cake doughnut topped with a silky layer of house-made old-fashioned fudge frosting.",
    price: 3.75,
    tags: ["Rich & Fudgy", "Cake Donut"],
    gradient: {
      base: "from-[#331b0c] to-[#1b0b03]",
      frosting: "#291407",
      accent: "#a16207",
    },
  },

  // --- Vanilla Cake ---
  {
    id: "brown-butter-crunch",
    name: "Brown Butter Crunch",
    category: "vanilla-cake",
    categoryLabel: "Vanilla Cake",
    description: "Lightly spiced vanilla cake doughnut dipped in our nutty house brown butter vanilla glaze, generously tossed in sweet almond buttercrunch.",
    price: 4.25,
    tags: ["Seasonal Fall", "Cake Donut", "Chef Pick"],
    gradient: {
      base: "from-[#f4e2c9] to-[#d8b58a]",
      frosting: "#b45309",
      accent: "#fef08a",
    },
    featured: true,
  },
  {
    id: "apple-cinnamon-toast-crunch",
    name: "Apple Cinnamon Toast Crunch",
    category: "vanilla-cake",
    categoryLabel: "Vanilla Cake",
    description: "Cinnamon-spiced vanilla cake doughnut dipped in fresh local apple cider glaze, encrusted with crushed Cinnamon Toast Crunch cereal.",
    price: 4.25,
    tags: ["Seasonal Fall", "Cereal Series"],
    gradient: {
      base: "from-[#f0dab8] to-[#cca475]",
      frosting: "#ea580c",
      accent: "#fde047",
    },
  },
  {
    id: "old-fashioned",
    name: "Old Fashioned",
    category: "vanilla-cake",
    categoryLabel: "Vanilla Cake",
    description: "Crispy-edged buttermilk cake doughnut with deep crevices catching every drop of our sweet honey vanilla glaze.",
    price: 3.25,
    tags: ["Classic Heritage", "Crispy Edge"],
    gradient: {
      base: "from-[#edd1af] to-[#c79c6d]",
      frosting: "#fef3c7",
      accent: "#b45309",
    },
  },
  {
    id: "cinnamon-sugared-apple-cider",
    name: "Cinnamon Sugared Apple Cider",
    category: "vanilla-cake",
    categoryLabel: "Vanilla Cake",
    description: "Made with genuine Massachusetts apple cider baked right into the cake, rolled warm in cinnamon cane sugar.",
    price: 3.50,
    tags: ["New England Fall", "Warm Spiced"],
    gradient: {
      base: "from-[#e4b584] to-[#b37a44]",
      frosting: "#c2410c",
      accent: "#fef08a",
    },
  },

  // --- Fills & Creams ---
  {
    id: "boston-cream",
    name: "Boston Cream",
    category: "fills",
    categoryLabel: "Fills & Creams",
    description: "Our signature yeast shell doughnut stuffed to bursting with silky Bavarian custard cream, crowned with thick dark chocolate glaze.",
    price: 4.25,
    tags: ["Massachusetts Iconic", "Bavarian Cream", "Filled Shell"],
    gradient: {
      base: "from-[#e5c6a5] to-[#c1976b]",
      frosting: "#1f1107",
      accent: "#fef9c3",
    },
    featured: true,
  },
  {
    id: "apple-cider-creme",
    name: "Apple Cider Creme",
    category: "fills",
    categoryLabel: "Fills & Creams",
    description: "Fluffy yeast shell filled with spiced apple compote and whipped sweet cream, topped with salted caramel drizzle.",
    price: 4.50,
    tags: ["November Special", "Spiced Cream"],
    gradient: {
      base: "from-[#e8caa8] to-[#c59c70]",
      frosting: "#d97706",
      accent: "#fef3c7",
    },
  },
  {
    id: "raspberry-jelly",
    name: "Raspberry Jelly",
    category: "fills",
    categoryLabel: "Fills & Creams",
    description: "Pillowy yeast shell stuffed with sweet-tart real seedless raspberry preserves and generously dusted in snow-white powdered sugar.",
    price: 3.75,
    tags: ["Fruit Filled", "Powdered Sugar"],
    gradient: {
      base: "from-[#e7cbb1] to-[#bf976f]",
      frosting: "#be185d",
      accent: "#ffffff",
    },
  },

  // --- Gluten-Sensitive Collection ---
  {
    id: "gs-chocolate-frosted",
    name: "GS Chocolate Frosted",
    category: "gluten-sensitive",
    categoryLabel: "Gluten Sensitive Collection",
    description: "Handmade on our dedicated vanilla crème cake base using gluten-free ingredients, frosted with rich chocolate and rainbow sprinkles.",
    price: 4.50,
    tags: ["Gluten-Sensitive", "Vanilla Crème Base"],
    gradient: {
      base: "from-[#f4e4cf] to-[#dabda0]",
      frosting: "#451a03",
      accent: "#ec4899",
    },
    featured: true,
  },
  {
    id: "gs-strawberry-frosted",
    name: "GS Strawberry Frosted",
    category: "gluten-sensitive",
    categoryLabel: "Gluten Sensitive Collection",
    description: "Moist vanilla crème cake doughnut dipped in sweet strawberry icing with rainbow sprinkles. Sweet relief without gluten.",
    price: 4.50,
    tags: ["Gluten-Sensitive", "Berry Glaze"],
    gradient: {
      base: "from-[#f4e4cf] to-[#dabda0]",
      frosting: "#f472b6",
      accent: "#38bdf8",
    },
  },
  {
    id: "gs-oreo",
    name: "GS Oreo",
    category: "gluten-sensitive",
    categoryLabel: "Gluten Sensitive Collection",
    description: "Vanilla crème cake doughnut topped with house vanilla frosting and generous crumbles of certified Gluten-Free Oreos.",
    price: 4.75,
    tags: ["Gluten-Sensitive", "GF Oreos"],
    gradient: {
      base: "from-[#f4e4cf] to-[#dabda0]",
      frosting: "#ffffff",
      accent: "#262626",
    },
    featured: true,
  },
  {
    id: "gs-vanilla-glazed",
    name: "GS Vanilla Glazed",
    category: "gluten-sensitive",
    categoryLabel: "Gluten Sensitive Collection",
    description: "Simple, pure, and decadent. Our vanilla crème cake doughnut drenched in warm Madagascar bourbon vanilla bean glaze.",
    price: 4.25,
    tags: ["Gluten-Sensitive", "Pure Vanilla"],
    gradient: {
      base: "from-[#f4e4cf] to-[#dabda0]",
      frosting: "#fef3c7",
      accent: "#ffffff",
    },
  },

  // --- Specials & Giant Cakes ---
  {
    id: "november-spiced-pecan",
    name: "November Spiced Pecan Pie",
    category: "specials",
    categoryLabel: "Specials & Giant Cakes",
    description: "November Featured Drop: Fluffy yeast ring dipped in brown sugar praline glaze, topped with toasted spiced Georgia pecans and cream drizzle.",
    price: 4.75,
    tags: ["November Drop", "Monthly Feature"],
    gradient: {
      base: "from-[#e4c29d] to-[#be9364]",
      frosting: "#92400e",
      accent: "#fef08a",
    },
    featured: true,
    seasonal: true,
  },
  {
    id: "giant-boston-cream-cake",
    name: "Giant Boston Cream Doughnut Cake",
    category: "specials",
    categoryLabel: "Specials & Giant Cakes",
    description: "Our legendary giant yeast doughnut (serves 8-10) sliced in half, stuffed with fresh Bavarian cream and draped in warm dark chocolate fudge.",
    price: 29.00,
    tags: ["Party Cake", "Serves 8-10", "Preorder Available"],
    gradient: {
      base: "from-[#debd99] to-[#b3885b]",
      frosting: "#1f1107",
      accent: "#fef08a",
    },
  },
  {
    id: "giant-chocolate-fudge-cake",
    name: "Giant Chocolate Fudge Doughnut Cake",
    category: "specials",
    categoryLabel: "Specials & Giant Cakes",
    description: "Giant double-chocolate birthday cake doughnut topped with rich fudge frosting and celebration sprinkles. Serves 8-12.",
    price: 32.00,
    tags: ["Party Cake", "Celebration", "Serves 8-12"],
    gradient: {
      base: "from-[#291307] to-[#120703]",
      frosting: "#3d1b08",
      accent: "#ec4899",
    },
  },
];

// -------------------------------------------------------------
// 6. SOCIAL & MULTI-PLATFORM HUBS (Replacing Linktree)
// -------------------------------------------------------------
export const SOCIAL_HUBS: SocialLink[] = [
  {
    id: "mobile-app",
    title: "Download iOS App",
    subtitle: "ChowNow mobile ordering on Apple App Store",
    platform: "Apple App Store",
    url: "https://apps.apple.com/us/app/roccos-doughnut-company/id1527878415",
    badge: "Official App",
    icon: "Smartphone",
  },
  {
    id: "tiktok",
    title: "TikTok (@roccodoughnutco)",
    subtitle: "Daily kitchen drops, glaze pours & behind-the-scenes",
    platform: "TikTok",
    url: "http://www.tiktok.com/@roccodoughnutco",
    badge: "Viral Videos",
    icon: "Video",
  },
  {
    id: "facebook",
    title: "Facebook Community",
    subtitle: "Monthly flavor polls, community events & hours",
    platform: "Facebook",
    url: "https://www.facebook.com/roccodoughnutco",
    badge: "Events & News",
    icon: "Share2",
  },
  {
    id: "spotify",
    title: "Rocco's Music on Spotify",
    subtitle: "Stream our original 'Sell Out - EP' (4 tracks)",
    platform: "Spotify",
    url: "https://open.spotify.com/album/1o7XPhKdjy3OrewnC9nwNR",
    badge: "Sell Out EP",
    icon: "Headphones",
  },
];

// -------------------------------------------------------------
// 7. EXECUTIVE DASHBOARD DATA (Believable for ~99K followers & 4 shops)
// -------------------------------------------------------------
export const DASHBOARD_METRICS: DashboardMetric[] = [
  {
    label: "Visits from Instagram",
    value: "42,850",
    rawNumber: 42850,
    change: "+18.4% vs last mo",
    isPositive: true,
    subtext: "Traffic driven from bio & comment automation",
  },
  {
    label: "Menu Views",
    value: "68,400",
    rawNumber: 68400,
    change: "+24.2% vs last mo",
    isPositive: true,
    subtext: "November drop views on own domain",
  },
  {
    label: "Pickup Orders",
    value: "3,840",
    rawNumber: 3840,
    change: "+12.8% vs last mo",
    isPositive: true,
    subtext: "Across Auburn, Worcester, Westborough & Millbury",
  },
  {
    label: "Drop Signups (SMS/Email)",
    value: "1,420",
    rawNumber: 1420,
    change: "+31.5% vs last mo",
    isPositive: true,
    subtext: "First-party customer subscribers captured",
  },
  {
    label: "Monthly Digital Revenue",
    value: "$84,920",
    rawNumber: 84920,
    change: "+15.7% vs last mo",
    isPositive: true,
    subtext: "Direct web pickup orders (0% third-party commission)",
  },
];

export const LOCATION_STATS: LocationStat[] = [
  {
    locationId: "auburn",
    name: "Auburn (Southbridge St)",
    revenue: 24150,
    orders: 1120,
    percentShare: 28.4,
    avgOrderValue: 21.56,
  },
  {
    locationId: "westborough",
    name: "Westborough (Colonial Dr)",
    revenue: 22480,
    orders: 980,
    percentShare: 26.5,
    avgOrderValue: 22.94,
  },
  {
    locationId: "worcester",
    name: "Worcester (W Boylston St)",
    revenue: 21690,
    orders: 960,
    percentShare: 25.5,
    avgOrderValue: 22.59,
  },
  {
    locationId: "millbury",
    name: "Millbury (Millbury Ave)",
    revenue: 16600,
    orders: 780,
    percentShare: 19.6,
    avgOrderValue: 21.28,
  },
];

export const TOP_DOUGHNUTS: TopDoughnut[] = [
  {
    name: "The Homer",
    category: "Yeast Raised",
    quantitySold: 4210,
    revenue: 15787.50,
    growth: "+14%",
  },
  {
    name: "Fruity Pebbles",
    category: "Yeast Raised",
    quantitySold: 3680,
    revenue: 14536.00,
    growth: "+19%",
  },
  {
    name: "Maple Bacon",
    category: "Yeast Raised",
    quantitySold: 3140,
    revenue: 13345.00,
    growth: "+8%",
  },
  {
    name: "Cookies N' Cream",
    category: "Dark Chocolate Cake",
    quantitySold: 2890,
    revenue: 12282.50,
    growth: "+22%",
  },
  {
    name: "Boston Cream",
    category: "Fills & Creams",
    quantitySold: 2450,
    revenue: 10412.50,
    growth: "+11%",
  },
  {
    name: "GS Chocolate Frosted",
    category: "Gluten Sensitive",
    quantitySold: 1820,
    revenue: 8190.00,
    growth: "+38%",
  },
];

export const RECENT_ORDERS: RecentOrder[] = [
  {
    id: "RDC-8941",
    customer: "Hannah M.",
    location: "Worcester",
    itemsSummary: "The Homer, Fruity Pebbles, Cookies N' Cream (6-Pack)",
    boxType: "Half Dozen (6)",
    pickupTime: "Today @ 8:15 AM",
    status: "Ready for Pickup",
    amount: 22.50,
  },
  {
    id: "RDC-8940",
    customer: "Marcus D.",
    location: "Auburn",
    itemsSummary: "Maple Bacon x4, Brown Butter Crunch x4, Boston Cream x4",
    boxType: "Baker's Dozen (12)",
    pickupTime: "Today @ 8:30 AM",
    status: "In the Fryer",
    amount: 44.00,
  },
  {
    id: "RDC-8939",
    customer: "Chloe S.",
    location: "Westborough",
    itemsSummary: "GS Chocolate Frosted, GS Oreo, GS Strawberry x2",
    boxType: "Half Dozen (6)",
    pickupTime: "Today @ 8:45 AM",
    status: "Scheduled",
    amount: 24.50,
  },
  {
    id: "RDC-8938",
    customer: "Liam K.",
    location: "Millbury",
    itemsSummary: "Giant Boston Cream Doughnut Cake (Birthday Pre-order)",
    boxType: "Giant Cake",
    pickupTime: "Today @ 9:00 AM",
    status: "Ready for Pickup",
    amount: 29.00,
  },
  {
    id: "RDC-8937",
    customer: "Samantha R.",
    location: "Auburn",
    itemsSummary: "November Spiced Pecan Pie x2, The Homer x2",
    boxType: "Single",
    pickupTime: "Today @ 7:45 AM",
    status: "Completed",
    amount: 17.00,
  },
  {
    id: "RDC-8936",
    customer: "Tyler B.",
    location: "Westborough",
    itemsSummary: "Office Box: 12 Assorted Classics & Specials",
    boxType: "Baker's Dozen (12)",
    pickupTime: "Today @ 7:30 AM",
    status: "Completed",
    amount: 42.00,
  },
];

export const COMMENT_TO_LINK_STATS = {
  triggerWord: "MENU",
  campaignName: "November Monthly Flavor Reveal",
  totalComments: 8940,
  linksDMSent: 7650,
  dmDeliveryRate: "85.6%",
  clicksToOwnDomain: 5820,
  clickThroughRate: "76.1%",
  sameDayOrdersPlaced: 840,
  conversionRate: "14.4%",
  attributedRevenue: 19320,
  previousLinktreeDropoffEstimate: "62% lost between Linktree buttons and ordering",
};

export const ORDER_CHANNEL_SPLIT = {
  directWeb: {
    percentage: 64,
    revenue: 54350,
    orders: 2458,
    label: "Direct Web Storefront (Zero App Download)",
  },
  nativeApp: {
    percentage: 36,
    revenue: 30570,
    orders: 1382,
    label: "Native iOS / ChowNow App",
  },
};

export const WEEKLY_CHART_DATA = [
  { day: "Tue", orders: 380, revenue: 8400, label: "Tuesday" },
  { day: "Wed", orders: 420, revenue: 9240, label: "Wednesday" },
  { day: "Thu", orders: 460, revenue: 10120, label: "Thursday" },
  { day: "Fri", orders: 690, revenue: 15180, label: "Friday" },
  { day: "Sat", orders: 980, revenue: 21560, label: "Saturday (Peak)" },
  { day: "Sun", orders: 910, revenue: 20020, label: "Sunday (Peak)" },
];
