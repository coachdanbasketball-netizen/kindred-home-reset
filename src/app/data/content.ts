import {
  Heart, Package, Trash2, Tag, Paintbrush, Sparkles,
  Layers, ChevronsDown, ClipboardList, KeyRound,
} from "lucide-react";

export const SERVICES = [
  {
    id: "declutter",
    title: "Home Decluttering & Organization",
    icon: Layers,
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=900&h=675&fit=crop&auto=format",
    price: "Starting at $149",
    tagline: "Calm from chaos.",
    short: "We transform cluttered rooms into calm, functional spaces built around how your family actually lives.",
    detail:
      "Working room by room, we sort, pare down, and create systems that are intuitive and easy to maintain long after we leave. No judgment — just calm, practical progress at a pace that feels right for you.",
  },
  {
    id: "downsizing",
    title: "Downsizing Support",
    icon: ChevronsDown,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=675&fit=crop&auto=format",
    price: "Starting at $399",
    tagline: "A compassionate next chapter.",
    short: "Thoughtful guidance through one of life's most emotionally layered transitions.",
    detail:
      "Downsizing deserves patience and care. We help you decide what to keep, what to pass forward, and how to honor the memories tied to belongings you've loved — with no rush and no judgment.",
  },
  {
    id: "packing",
    title: "Packing & Unpacking",
    icon: Package,
    image: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=900&h=675&fit=crop&auto=format",
    price: "Starting at $249",
    tagline: "Move with confidence.",
    short: "Expert packing that protects your things and unpacking that makes your new place feel like home immediately.",
    detail:
      "Every box is labeled by room and category so moving day runs smoothly. When you arrive, we unpack and set up so you wake up settled and at home, not surrounded by towers of cardboard.",
  },
  {
    id: "move-prep",
    title: "Move Prep",
    icon: ClipboardList,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&h=675&fit=crop&auto=format",
    price: "Starting at $199",
    tagline: "Ready when you are.",
    short: "Get your home market-ready or move-ready with careful, strategic preparation.",
    detail:
      "We help clear, clean, and prepare your home for listing, showing, or vacating — ensuring nothing is overlooked and everything is handled with intentional care.",
  },
  {
    id: "move-in",
    title: "Move-in Setup",
    icon: KeyRound,
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&h=675&fit=crop&auto=format",
    price: "Starting at $299",
    tagline: "Home from the first night.",
    short: "Arrive to a home that feels organized, welcoming, and ready from day one.",
    detail:
      "We set up your kitchen, bedrooms, bathrooms, and living spaces so your family can settle in comfortably — without living out of boxes for weeks on end.",
  },
  {
    id: "donation",
    title: "Donation & Unwanted Removal",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1593113630400-ea4288922497?w=900&h=675&fit=crop&auto=format",
    price: "Starting at $89",
    tagline: "Items find new homes.",
    short: "We coordinate donation drop-offs so your unwanted belongings serve someone else — not a landfill.",
    detail:
      "We sort, bag, and haul your donations to local organizations that will put them to good use. You don't lift a single box.",
  },
  {
    id: "haul-away",
    title: "Trash & Clutter Haul Away",
    icon: Trash2,
    image: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=900&h=675&fit=crop&auto=format",
    price: "Starting at $129",
    tagline: "Gone, responsibly.",
    short: "Fast, responsible removal of items that are beyond donating or reselling.",
    detail:
      "From broken furniture to years of accumulated junk, we haul it away cleanly and efficiently. We prioritize responsible disposal and recycling wherever possible.",
  },
  {
    id: "resell",
    title: "Resell Support for Items",
    icon: Tag,
    image: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=900&h=675&fit=crop&auto=format",
    price: "Starting at $79",
    tagline: "Your things, valued.",
    short: "Turn quality unwanted pieces into cash with our resale guidance and connections.",
    detail:
      "We help identify what is worth selling, price items fairly, photograph them, and list them — or connect you with estate sale professionals for larger collections.",
  },
  {
    id: "staging",
    title: "Light Home Staging & Space Refresh",
    icon: Paintbrush,
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&h=675&fit=crop&auto=format",
    price: "Starting at $175",
    tagline: "First impressions, elevated.",
    short: "A thoughtful refresh that helps your home photograph beautifully and show at its very best.",
    detail:
      "Using what you already own, we rearrange, style, and refresh key spaces to highlight your home's warmth and potential. No major purchases needed — just an expert eye and intentional placement.",
  },
  {
    id: "cleaning",
    title: "Cleaning Coordination",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&h=675&fit=crop&auto=format",
    price: "Starting at $99",
    tagline: "Sparkling from the start.",
    short: "We connect you with trusted cleaning professionals so your home is spotless after every reset.",
    detail:
      "We partner with vetted cleaners and handle all scheduling so your home is pristine before a move, after a declutter, or whenever a deep reset is needed.",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "I finally feel at peace walking through my front door. Kindred turned our overwhelming storage room into something I actually want to use.",
    name: "Sarah M.",
    context: "Home Organization client",
  },
  {
    quote:
      "Moving my mother out of her house of 40 years was one of the most emotional things I've done. The Kindred team handled everything with so much care.",
    name: "David T.",
    context: "Downsizing client",
  },
  {
    quote:
      "They unpacked our entire house in one day. ONE DAY. We were having dinner at our own table that same evening.",
    name: "Priya & James K.",
    context: "Move-in Setup clients",
  },
];

export const NAV_ABOUT = [
  { path: "/about", label: "About Us" },
  { path: "/connect", label: "Let's Connect" },
  { path: "/policy", label: "Policy" },
];

// ── Shared easing curve ──────────────────────────────────────────────────────
export const ease = [0.25, 0.1, 0.25, 1] as const;
