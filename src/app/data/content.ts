import {
  Shirt, Luggage, Baby, Briefcase, ChefHat, Warehouse,
  ChevronsDown, Package, KeyRound, DoorOpen, Leaf, Repeat, Sparkles,
} from "lucide-react";

export const SERVICE_INTRO = "All services include a complimentary phone consultation after your intake form.";

export const SERVICE_CATEGORIES = [
  {
    id: "room-by-room",
    title: "Room by Room",
    intro: undefined as string | undefined,
    services: [
      {
        id: "everyday-closet",
        title: "The Everyday Closet",
        subtitle: "Reach-in closet",
        description: "We clear out what you don't need and set up the rest so you can find it.",
        pricing: "Half day · 1 organizer · Starting at $300",
        icon: Shirt,
        image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=900&h=675&fit=crop&auto=format",
      },
      {
        id: "walk-in-closet",
        title: "The Walk-In",
        subtitle: "Walk-in closet",
        description: "Clothes, linens, luggage, the vacuum. Whatever ended up in there, we find a home for it. You'll be able to find and reach it.",
        pricing: "Full day · 1 organizer · Starting at $575",
        icon: Luggage,
        image: "https://images.unsplash.com/photo-1618236444721-4a8dba415c15?w=900&h=675&fit=crop&auto=format",
      },
      {
        id: "room-to-grow",
        title: "Room to Grow",
        subtitle: "Kids playroom",
        description: "A setup your kids can keep up with on their own. It grows with them, so you're not redoing this next year.",
        pricing: "Full day · 1 organizer · Starting at $575",
        icon: Baby,
        image: "https://images.unsplash.com/photo-1635435605591-217d993deb88?w=900&h=675&fit=crop&auto=format",
      },
      {
        id: "quiet-corner",
        title: "The Quiet Corner",
        subtitle: "Home office",
        description: "Papers sorted, files set up, desk clear. You'll know where things are.",
        pricing: "Full day · 1 organizer · Starting at $575",
        icon: Briefcase,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&h=675&fit=crop&auto=format",
      },
      {
        id: "gathering-place",
        title: "The Gathering Place",
        subtitle: "Full kitchen",
        description: "Everyone ends up in the kitchen. We take on the whole thing, cabinets to pantry.",
        pricing: "Full day · 2 organizers · Starting at $975",
        icon: ChefHat,
        image: "https://images.unsplash.com/photo-1583558714633-3a3314d1f41b?w=900&h=675&fit=crop&auto=format",
      },
      {
        id: "garage-reclaimed",
        title: "The Garage, Reclaimed",
        subtitle: "Garage",
        description: "We work alongside you to clear it out, group what stays, and get it up on shelves. Then you park the car inside.",
        pricing: "Full day · 2 organizers · Starting at $975",
        icon: Warehouse,
        image: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=900&h=675&fit=crop&auto=format",
      },
    ],
  },
  {
    id: "next-chapter",
    title: "The Next Chapter",
    intro: undefined as string | undefined,
    services: [
      {
        id: "what-comes-with-you",
        title: "What Comes With You",
        subtitle: "Downsizing, phase one",
        description: "We go room by room, at your pace. Together we figure out what's coming with you.",
        pricing: "Full day · 2 organizers · Starting at $975",
        icon: ChevronsDown,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=675&fit=crop&auto=format",
      },
      {
        id: "packed-with-care",
        title: "Packed with Care",
        subtitle: "Downsizing, phase two",
        description: "We pack, run the donations, and clear the house. Gently, and with respect for what's in it.",
        pricing: "Two full days · 2 organizers · Starting at $1,950",
        icon: Package,
        image: "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=900&h=675&fit=crop&auto=format",
      },
      {
        id: "welcome-home",
        title: "Welcome Home",
        subtitle: "Unpack and set up",
        description: "We unpack, put everything away, and take the boxes with us. You get to just live there.",
        pricing: "Full day · 2 organizers · Starting at $975",
        icon: KeyRound,
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&h=675&fit=crop&auto=format",
      },
    ],
  },
  {
    id: "seasons-at-home",
    title: "Seasons at Home",
    intro: undefined as string | undefined,
    services: [
      {
        id: "warm-welcome",
        title: "The Warm Welcome",
        subtitle: "Front door and porch",
        description: "Wreath, planters, the whole entry, styled for the season.",
        pricing: "Front Door or Small Porch · Starting at $300 | Medium to Large Porch · Starting at $575",
        icon: DoorOpen,
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&h=675&fit=crop&auto=format",
      },
      {
        id: "turn-of-the-season",
        title: "Turn of the Season",
        subtitle: "Decor refresh",
        description: "We swap in the new season and pack up the old, labeled and ready for next year.",
        pricing: "Half day · 1 organizer · Starting at $300",
        icon: Leaf,
        image: "https://images.unsplash.com/photo-1570970701016-fc317b679a69?w=900&h=675&fit=crop&auto=format",
      },
    ],
  },
  {
    id: "kindred-care",
    title: "Kindred Care",
    intro: "These are our monthly members. We already know your home, so every visit picks up right where the last one left off.",
    services: [
      {
        id: "kindred-monthly",
        title: "Kindred Monthly",
        subtitle: undefined as string | undefined,
        description: "One of us, once a month. We reset whatever has slipped before it turns into a project.",
        pricing: "Half day · 1 organizer · $300 per month · $275 per month when you prepay six months",
        icon: Repeat,
        image: "https://images.unsplash.com/photo-1593113630400-ea4288922497?w=900&h=675&fit=crop&auto=format",
      },
      {
        id: "kindred-reset",
        title: "The Kindred Reset",
        subtitle: undefined as string | undefined,
        description: "Both of us, one visit. Good before company comes, or after a long season.",
        pricing: "Half day · 2 organizers · $510 per visit",
        icon: Sparkles,
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&h=675&fit=crop&auto=format",
      },
    ],
  },
];

export const SERVICES = SERVICE_CATEGORIES.flatMap(c => c.services);

export const SERVICE_ADDONS = [
  { title: "Product sourcing", desc: "Products at cost plus a $75 sourcing fee, wholesale when we can get it." },
  { title: "Upgraded product sourcing", desc: "Products at cost plus $150, wholesale when we can get it." },
  { title: "In-home or video consultation", desc: "$100, credited toward your project if you book within 30 days." },
];

export const SERVICE_FINE_PRINT = [
  "Every price is a starting point. We quote your actual project after we see the space.",
  "Products and containers are not included. We give you a budget up front and never spend a dollar without your approval.",
  "A 50% deposit holds your date. The balance is due before we start.",
  "Cash, check, and major credit cards. Card payments have a processing fee added.",
  "Serving Bucks, Chester, Montgomery, and Delaware County.",
];

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
