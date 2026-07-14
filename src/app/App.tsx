import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
  Menu, X, ChevronDown, ArrowRight,
  Heart, Package, Trash2, Tag, Paintbrush, Sparkles,
  CheckCircle, Mail, Phone, MapPin, Clock,
  Leaf, Layers, ChevronsDown, ClipboardList, KeyRound,
  Plus, Minus,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────
type Page = "home" | "services" | "about" | "connect" | "policy";

// ── Data ───────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "declutter",
    title: "Home Decluttering & Organization",
    icon: Layers,
    tagline: "Calm from chaos.",
    short: "We transform cluttered rooms into calm, functional spaces built around how your family actually lives.",
    detail:
      "Working room by room, we sort, pare down, and create systems that are intuitive and easy to maintain long after we leave. No judgment — just calm, practical progress at a pace that feels right for you.",
  },
  {
    id: "downsizing",
    title: "Downsizing Support",
    icon: ChevronsDown,
    tagline: "A compassionate next chapter.",
    short: "Thoughtful guidance through one of life's most emotionally layered transitions.",
    detail:
      "Downsizing deserves patience and care. We help you decide what to keep, what to pass forward, and how to honor the memories tied to belongings you've loved — with no rush and no judgment.",
  },
  {
    id: "packing",
    title: "Packing & Unpacking",
    icon: Package,
    tagline: "Move with confidence.",
    short: "Expert packing that protects your things and unpacking that makes your new place feel like home immediately.",
    detail:
      "Every box is labeled by room and category so moving day runs smoothly. When you arrive, we unpack and set up so you wake up settled and at home, not surrounded by towers of cardboard.",
  },
  {
    id: "move-prep",
    title: "Move Prep",
    icon: ClipboardList,
    tagline: "Ready when you are.",
    short: "Get your home market-ready or move-ready with careful, strategic preparation.",
    detail:
      "We help clear, clean, and prepare your home for listing, showing, or vacating — ensuring nothing is overlooked and everything is handled with intentional care.",
  },
  {
    id: "move-in",
    title: "Move-in Setup",
    icon: KeyRound,
    tagline: "Home from the first night.",
    short: "Arrive to a home that feels organized, welcoming, and ready from day one.",
    detail:
      "We set up your kitchen, bedrooms, bathrooms, and living spaces so your family can settle in comfortably — without living out of boxes for weeks on end.",
  },
  {
    id: "donation",
    title: "Donation & Unwanted Removal",
    icon: Heart,
    tagline: "Items find new homes.",
    short: "We coordinate donation drop-offs so your unwanted belongings serve someone else — not a landfill.",
    detail:
      "We sort, bag, and haul your donations to local organizations that will put them to good use. You don't lift a single box.",
  },
  {
    id: "haul-away",
    title: "Trash & Clutter Haul Away",
    icon: Trash2,
    tagline: "Gone, responsibly.",
    short: "Fast, responsible removal of items that are beyond donating or reselling.",
    detail:
      "From broken furniture to years of accumulated junk, we haul it away cleanly and efficiently. We prioritize responsible disposal and recycling wherever possible.",
  },
  {
    id: "resell",
    title: "Resell Support for Items",
    icon: Tag,
    tagline: "Your things, valued.",
    short: "Turn quality unwanted pieces into cash with our resale guidance and connections.",
    detail:
      "We help identify what is worth selling, price items fairly, photograph them, and list them — or connect you with estate sale professionals for larger collections.",
  },
  {
    id: "staging",
    title: "Light Home Staging & Space Refresh",
    icon: Paintbrush,
    tagline: "First impressions, elevated.",
    short: "A thoughtful refresh that helps your home photograph beautifully and show at its very best.",
    detail:
      "Using what you already own, we rearrange, style, and refresh key spaces to highlight your home's warmth and potential. No major purchases needed — just an expert eye and intentional placement.",
  },
  {
    id: "cleaning",
    title: "Cleaning Coordination",
    icon: Sparkles,
    tagline: "Sparkling from the start.",
    short: "We connect you with trusted cleaning professionals so your home is spotless after every reset.",
    detail:
      "We partner with vetted cleaners and handle all scheduling so your home is pristine before a move, after a declutter, or whenever a deep reset is needed.",
  },
] as const;

const TESTIMONIALS = [
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

const NAV_ABOUT: { id: Page; label: string }[] = [
  { id: "about", label: "About Us" },
  { id: "connect", label: "Let's Connect" },
  { id: "policy", label: "Policy" },
];

// ── Easing ─────────────────────────────────────────────────────────────────
const ease = [0.25, 0.1, 0.25, 1] as const;

// ── Fade-up reveal ─────────────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay }}
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────
function Navbar({ current, setPage }: { current: Page; setPage: (p: Page) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) setAboutOpen(false);
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  const go = (p: Page) => {
    setPage(p);
    setMobileOpen(false);
    setServicesOpen(false);
    setAboutOpen(false);
  };

  const isAbout = ["about", "connect", "policy"].includes(current);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[73px]">
          <button onClick={() => go("home")} className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
              <Leaf className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={1.5} />
            </div>
            <span className="font-display font-semibold text-[16px] text-foreground tracking-tight">
              Kindred Home Reset
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => go("home")} className={`text-sm transition-colors ${current === "home" ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}>
              Home
            </button>

            <div ref={servicesRef} className="relative">
              <button
                onClick={() => { setServicesOpen(o => !o); setAboutOpen(false); }}
                className={`flex items-center gap-1 text-sm transition-colors ${current === "services" ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
              >
                Our Services
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, ease }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-80 bg-background border border-border shadow-xl overflow-hidden"
                >
                  <div className="py-2">
                    {SERVICES.map(s => (
                      <button key={s.id} onClick={() => go("services")} className="w-full text-left px-5 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                        {s.title}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div ref={aboutRef} className="relative">
              <button
                onClick={() => { setAboutOpen(o => !o); setServicesOpen(false); }}
                className={`flex items-center gap-1 text-sm transition-colors ${isAbout ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
              >
                About
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`} />
              </button>
              {aboutOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, ease }}
                  className="absolute top-full right-0 mt-4 w-52 bg-background border border-border shadow-xl overflow-hidden"
                >
                  <div className="py-2">
                    {NAV_ABOUT.map(item => (
                      <button key={item.id} onClick={() => go(item.id)} className="w-full text-left px-5 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                        {item.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <button onClick={() => go("connect")} className="text-sm text-primary font-medium hover:text-primary/80 transition-colors flex items-center gap-1.5 group">
              Connect
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <button onClick={() => setMobileOpen(o => !o)} className="md:hidden p-2 -mr-1 text-foreground" aria-label="Toggle menu">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-6 py-3 space-y-0.5">
            <button onClick={() => go("home")} className="w-full text-left px-2 py-3 text-sm font-medium text-foreground border-b border-border/50">Home</button>
            <div className="border-b border-border/50">
              <button onClick={() => setMobileServicesOpen(o => !o)} className="w-full flex items-center justify-between px-2 py-3 text-sm font-medium text-foreground">
                Our Services
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileServicesOpen && (
                <div className="pb-2">
                  {SERVICES.map(s => (
                    <button key={s.id} onClick={() => go("services")} className="w-full text-left pl-4 pr-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {s.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="border-b border-border/50">
              <button onClick={() => setMobileAboutOpen(o => !o)} className="w-full flex items-center justify-between px-2 py-3 text-sm font-medium text-foreground">
                About
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileAboutOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileAboutOpen && (
                <div className="pb-2">
                  {NAV_ABOUT.map(item => (
                    <button key={item.id} onClick={() => go(item.id)} className="w-full text-left pl-4 pr-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => go("connect")} className="w-full text-left px-2 py-3 text-sm font-medium text-primary">Connect →</button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ── Label ──────────────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-semibold tracking-[0.22em] uppercase text-accent mb-4">{children}</p>;
}

// ── Home Page ──────────────────────────────────────────────────────────────
function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  const [tIdx, setTIdx] = useState(0);

  // ── Parallax refs ───────────────────────────────────────────────────────
  const heroRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLElement>(null);
  const aboutImgRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const { scrollYProgress: quoteProgress } = useScroll({
    target: quoteRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: aboutImgProgress } = useScroll({
    target: aboutImgRef,
    offset: ["start end", "end start"],
  });

  // Hero: image drifts up, text drifts up faster (creates depth separation)
  const heroImgY   = useTransform(heroProgress, [0, 1], ["0%", "28%"]);
  const heroTextY  = useTransform(heroProgress, [0, 1], ["0%", "12%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.7], [1, 0]);

  // Quote section: blockquote drifts upward as section scrolls through
  const quoteY = useTransform(quoteProgress, [0, 1], ["40px", "-40px"]);

  // About teaser image: subtle upward drift
  const aboutImgY = useTransform(aboutImgProgress, [0, 1], ["6%", "-6%"]);

  // Testimonial auto-cycle
  useEffect(() => {
    const t = setInterval(() => setTIdx(i => (i + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="pt-[73px]">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative overflow-hidden bg-background" style={{ minHeight: "calc(100vh - 73px)" }}>
        {/* Mobile image */}
        <div className="md:hidden h-64 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1635435605591-217d993deb88?w=900&h=500&fit=crop&auto=format"
            alt="Warm, inviting living room with natural light"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text — parallax upward as hero exits */}
        <motion.div
          style={{ y: heroTextY, opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10"
        >
          <div className="md:w-[52%] lg:w-[48%] flex flex-col justify-center py-16 md:py-0"
            style={{ minHeight: "calc(100vh - 73px)" }}>
            <FadeUp delay={0.05}>
              <Label>Home Organizing &amp; Reset Services</Label>
            </FadeUp>
            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.15 }}
              className="font-display font-semibold text-foreground leading-[1.06] mb-8"
              style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)" }}
            >
              Reclaim<br />
              your space.<br />
              <em className="text-primary">Restore<br />your calm.</em>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.3 }}
              className="text-muted-foreground leading-relaxed mb-10 max-w-sm text-[15px]"
            >
              We help busy families move through clutter, transitions, and change — so home feels like the sanctuary it was always meant to be.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => setPage("connect")}
                className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground border border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-colors"
              >
                Begin your reset
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setPage("services")}
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-3"
              >
                Explore our services →
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Desktop image — parallax layer, drifts slower than text */}
        <div className="hidden md:block absolute right-0 top-0 w-[50%] lg:w-[52%] overflow-hidden" style={{ height: "calc(100vh - 73px + 150px)", top: "-75px" }}>
          <motion.img
            style={{ y: heroImgY }}
            src="https://images.unsplash.com/photo-1635435605591-217d993deb88?w=1200&h=1600&fit=crop&auto=format"
            alt="Warm, inviting living room with natural light"
            className="w-full h-full object-cover"
            initial={{ scale: 1.04, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease }}
          />
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
        </div>
      </section>

      {/* ── Intro statement ───────────────────────────────────────────────── */}
      <section className="py-14 border-t border-b border-border bg-card">
        <FadeUp className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <p className="font-display text-2xl lg:text-[1.75rem] font-medium text-foreground leading-relaxed italic">
            "A home that works for your life — calm, clear, and entirely yours."
          </p>
        </FadeUp>
      </section>

      {/* ── Services — numbered editorial list ────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-end justify-between pb-6 border-b border-foreground/20">
            <FadeUp>
              <Label>What We Do</Label>
              <h2 className="font-display text-4xl font-semibold text-foreground leading-tight">Our services</h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <button onClick={() => setPage("services")} className="text-sm text-primary font-medium hidden sm:flex items-center gap-1.5 hover:gap-2.5 transition-all">
                View all 10 <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </FadeUp>
          </div>

          {SERVICES.slice(0, 6).map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: i * 0.07 }}
                viewport={{ once: true, margin: "-40px" }}
                className="flex items-start gap-6 md:gap-10 py-7 border-b border-border group"
              >
                <span className="font-display text-sm text-muted-foreground/40 w-8 shrink-0 pt-1 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-lg md:text-xl font-semibold text-foreground mb-1.5 leading-snug group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">{service.short}</p>
                    </div>
                    <Icon className="w-5 h-5 text-muted-foreground/30 shrink-0 mt-1 group-hover:text-primary/60 transition-colors hidden sm:block" strokeWidth={1.5} />
                  </div>
                </div>
              </motion.div>
            );
          })}

          <div className="pt-6 sm:hidden">
            <button onClick={() => setPage("services")} className="text-sm text-primary font-medium flex items-center gap-1.5">
              View all 10 services <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Pull quote — parallax blockquote ──────────────────────────────── */}
      <section ref={quoteRef} className="py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div style={{ y: quoteY }} className="max-w-3xl mb-16">
            <p className="font-display font-semibold text-primary-foreground/30 text-sm tracking-widest uppercase mb-8">
              Why Kindred
            </p>
            <blockquote
              className="font-display font-semibold leading-[1.1] text-primary-foreground"
              style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
            >
              "We believe your home should feel like a refuge — not another source of stress."
            </blockquote>
          </motion.div>
          <FadeUp>
            <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-primary-foreground/20">
              {[
                { label: "Tailored to you", desc: "Not a one-size template" },
                { label: "Compassionate", desc: "No judgment, ever" },
                { label: "Sustainable", desc: "Systems that last" },
                { label: "Full-service", desc: "First sort to final setup" },
              ].map((item, i) => (
                <div key={item.label} className={`py-8 pr-6 ${i > 0 ? "pl-6 border-l border-primary-foreground/20" : ""}`}>
                  <p className="font-display text-base font-semibold text-primary-foreground mb-1.5">{item.label}</p>
                  <p className="text-sm text-primary-foreground/55">{item.desc}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── About teaser — image with parallax ───────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-[3fr_2fr] gap-12 lg:gap-20 items-center">
            {/* Image container with overflow-hidden to clip parallax */}
            <div ref={aboutImgRef} className="overflow-hidden rounded-sm" style={{ aspectRatio: "16/9" }}>
              <motion.img
                style={{ y: aboutImgY, scale: 1.12 }}
                src="https://images.unsplash.com/photo-1618236444721-4a8dba415c15?w=1200&h=675&fit=crop&auto=format"
                alt="Neatly organized white shelves"
                className="w-full h-full object-cover"
              />
            </div>
            <FadeUp delay={0.1}>
              <Label>About Us</Label>
              <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground leading-tight mb-6">
                A small team with a big belief
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm mb-6">
                Kindred was built on the belief that every family deserves a home that feels calm, functional, and truly theirs. We work with patience, warmth, and genuine care — whether you're navigating a move, a life change, or simply need to breathe again.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "Compassionate through every emotional moment",
                  "Practical systems you can actually maintain",
                  "Resale, donation, and hauling all handled",
                ].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, ease, delay: 0.1 + i * 0.08 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" strokeWidth={1.5} />
                    <span className="text-sm text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
              <button onClick={() => setPage("about")} className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5 group">
                Meet the team <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Testimonial — AnimatePresence crossfade ───────────────────────── */}
      <section className="py-24 bg-secondary/40 border-t border-b border-border overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <Label>Kind Words</Label>
          <div className="mt-4 min-h-[200px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={tIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease }}
                className="text-center"
              >
                <blockquote
                  className="font-display font-medium text-foreground leading-tight italic mb-8"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                >
                  &ldquo;{TESTIMONIALS[tIdx].quote}&rdquo;
                </blockquote>
                <p className="text-sm font-semibold text-foreground">{TESTIMONIALS[tIdx].name}</p>
                <p className="text-xs text-muted-foreground mt-1">{TESTIMONIALS[tIdx].context}</p>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center gap-2 mt-8">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTIdx(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-400 ${i === tIdx ? "w-6 bg-primary" : "w-1.5 bg-foreground/20"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FadeUp>
            <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 border-b border-border pb-20">
              <div>
                <Label>Ready to begin?</Label>
                <h2 className="font-display font-semibold text-foreground leading-tight" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
                  Every reset begins<br />with a conversation.
                </h2>
              </div>
              <div className="shrink-0">
                <button
                  onClick={() => setPage("connect")}
                  className="group inline-flex items-center gap-3 text-base font-medium text-primary border-b border-primary pb-1 hover:gap-4 transition-all"
                >
                  Schedule a free consultation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-xs text-muted-foreground mt-3">No commitment required.</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Blog teaser ───────────────────────────────────────────────────── */}
      <section className="py-14 bg-background">
        <FadeUp className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <Label>Coming Soon</Label>
            <h3 className="font-display text-xl font-semibold text-foreground">The Kindred Journal</h3>
            <p className="text-sm text-muted-foreground mt-1.5 max-w-md">Tips, stories, and quiet wisdom for creating a home that supports the life you want. Launching on Substack.</p>
          </div>
          <div className="flex items-center gap-2.5 text-sm text-muted-foreground border border-border px-5 py-3 shrink-0">
            <Sparkles className="w-4 h-4 text-accent" strokeWidth={1.5} />
            Blog launching soon via Substack
          </div>
        </FadeUp>
      </section>
    </div>
  );
}

// ── Services Page ──────────────────────────────────────────────────────────
function ServicesPage({ setPage }: { setPage: (p: Page) => void }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Parallax on services header image strip
  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: headerProgress } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"],
  });
  const headerBgY = useTransform(headerProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="pt-[73px]">
      {/* Header with parallax background strip */}
      <div ref={headerRef} className="relative py-24 border-b border-border overflow-hidden bg-secondary/40">
        <motion.div
          style={{ y: headerBgY }}
          className="absolute inset-0 -top-[20%] -bottom-[20%] pointer-events-none"
        >
          <img
            src="https://images.unsplash.com/photo-1649361811423-a55616f7ab11?w=1600&h=600&fit=crop&auto=format"
            alt=""
            aria-hidden
            className="w-full h-full object-cover opacity-10"
          />
        </motion.div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-[1fr_1fr] gap-10 items-end">
          <FadeUp>
            <Label>Our Services</Label>
            <h1 className="font-display font-semibold text-foreground leading-tight" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
              Everything you<br />need to reset
            </h1>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-muted-foreground leading-relaxed lg:mb-1 max-w-md">
              From first sort to final setup, we offer a full suite of services to meet you wherever you are in your journey home.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* Accordion */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4">
        {SERVICES.map((service, i) => {
          const Icon = service.icon;
          const isOpen = expandedId === service.id;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease, delay: Math.min(i * 0.05, 0.3) }}
              viewport={{ once: true, margin: "-30px" }}
              className="border-b border-border"
            >
              <button
                onClick={() => setExpandedId(isOpen ? null : service.id)}
                className="w-full flex items-center gap-6 md:gap-10 py-7 text-left group"
              >
                <span className="font-display text-sm text-muted-foreground/40 w-8 shrink-0 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold text-accent tracking-[0.18em] uppercase mb-1">{service.tagline}</p>
                  <p className={`font-display text-xl md:text-2xl font-semibold leading-snug transition-colors duration-300 ${isOpen ? "text-primary" : "text-foreground group-hover:text-primary"}`}>
                    {service.title}
                  </p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <Icon className="w-5 h-5 text-muted-foreground/30 hidden sm:block" strokeWidth={1.5} />
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease }}
                    className="w-7 h-7 border border-border flex items-center justify-center"
                  >
                    <Plus className="w-3.5 h-3.5 text-muted-foreground" />
                  </motion.div>
                </div>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease }}
                    className="overflow-hidden"
                  >
                    <div className="pb-10 pl-14 pr-4 md:pr-20">
                      <p className="text-muted-foreground leading-relaxed max-w-2xl mb-6">{service.detail}</p>
                      <button
                        onClick={() => setPage("connect")}
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-primary border-b border-primary/40 pb-0.5 hover:border-primary transition-colors"
                      >
                        Book this service
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 border-t border-border mt-8">
        <FadeUp>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h3 className="font-display text-2xl font-semibold text-foreground mb-2">Not sure where to start?</h3>
              <p className="text-muted-foreground text-sm max-w-md">Our free consultation helps us understand your needs and build the plan that's right for you.</p>
            </div>
            <button
              onClick={() => setPage("connect")}
              className="group shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-foreground border border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-colors"
            >
              Book a Free Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}

// ── About Page ─────────────────────────────────────────────────────────────
function AboutPage({ setPage }: { setPage: (p: Page) => void }) {
  const storyImgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: storyProgress } = useScroll({
    target: storyImgRef,
    offset: ["start end", "end start"],
  });
  const storyImgY = useTransform(storyProgress, [0, 1], ["8%", "-8%"]);

  return (
    <div className="pt-[73px]">
      {/* Header */}
      <div className="py-20 lg:py-28 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[1fr_1fr] gap-12 items-end">
          <FadeUp>
            <Label>About Us</Label>
            <h1 className="font-display font-semibold text-foreground leading-[1.05]" style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}>
              Meet the<br />Kindred<br />team
            </h1>
          </FadeUp>
          <FadeUp delay={0.12}>
            <p className="text-muted-foreground text-lg leading-relaxed lg:mb-2 max-w-md">
              We're organizers, listeners, and home lovers — here to make the process feel manageable, meaningful, and even a little hopeful.
            </p>
          </FadeUp>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Story */}
        <div className="py-20 grid lg:grid-cols-[2fr_3fr] gap-14 lg:gap-20 items-start border-b border-border">
          {/* Parallax portrait */}
          <div ref={storyImgRef} className="overflow-hidden rounded-sm" style={{ aspectRatio: "3/4" }}>
            <motion.img
              style={{ y: storyImgY, scale: 1.1 }}
              src="https://images.unsplash.com/photo-1583558714633-3a3314d1f41b?w=700&h=933&fit=crop&auto=format"
              alt="Professional home organizer helping in a kitchen"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:pt-4">
            <FadeUp>
              <h2 className="font-display text-3xl font-semibold text-foreground mb-8">Our story</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed text-sm mb-12">
                <p>
                  Kindred Home Reset was born from a simple belief: every family deserves a home that feels calm, functional, and truly theirs. We've seen firsthand how clutter, transitions, and overwhelm can make a house feel more like a burden than a refuge.
                </p>
                <p>
                  We come alongside our clients with patience, practical skill, and genuine care — whether they're navigating a big move, a significant life change, or simply ready to breathe again in their own space.
                </p>
                <p>
                  Our name, "Kindred," is intentional. We see ourselves as kindred spirits with the families we serve — people who want their home to reflect the life they're building, not the chaos they're trying to escape.
                </p>
              </div>
            </FadeUp>

            {/* Values */}
            <div className="border-t border-border">
              {[
                { title: "Compassion", desc: "No judgment — especially through emotionally charged transitions like downsizing or a difficult move." },
                { title: "Intentionality", desc: "Every decision is purposeful. We create systems genuinely suited to how you live." },
                { title: "Sustainability", desc: "We prioritize donation and resale, and design spaces you can maintain without constant effort." },
              ].map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-6 py-6 border-b border-border"
                >
                  <span className="font-display text-sm font-semibold text-primary w-32 shrink-0 pt-0.5">{v.title}</span>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="py-20 border-b border-border">
          <div className="flex items-end justify-between mb-14">
            <FadeUp>
              <Label>Our People</Label>
              <h2 className="font-display text-3xl font-semibold text-foreground">Small team, big heart</h2>
            </FadeUp>
            <p className="text-sm text-muted-foreground hidden sm:block">Bios coming soon</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { role: "Founder & Lead Organizer", img: "https://images.unsplash.com/photo-1545947313-93c756069e69?w=600&h=700&fit=crop&auto=format", alt: "Founder and lead organizer" },
              { role: "Move Specialist", img: "https://images.unsplash.com/photo-1590451856230-7dc22d0da14a?w=600&h=700&fit=crop&auto=format", alt: "Move specialist" },
              { role: "Downsizing Consultant", img: "https://images.unsplash.com/photo-1581712592598-277443a0b77f?w=600&h=700&fit=crop&auto=format", alt: "Downsizing consultant" },
            ].map((member, i) => (
              <motion.div
                key={member.role}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease, delay: i * 0.12 }}
                viewport={{ once: true }}
              >
                <div className="overflow-hidden rounded-sm mb-5" style={{ aspectRatio: "6/7" }}>
                  <motion.img
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.5, ease }}
                    src={member.img}
                    alt={member.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <p className="text-xs text-muted-foreground">{member.role}</p>
                <p className="text-xs text-muted-foreground/50 mt-0.5 italic">Bio coming soon</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <FadeUp>
          <div className="py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h3 className="font-display text-2xl font-semibold text-foreground mb-2">Ready to connect?</h3>
              <p className="text-muted-foreground text-sm">Let's start a conversation about how we can help your family feel at home again.</p>
            </div>
            <button
              onClick={() => setPage("connect")}
              className="group shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-foreground border border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-colors"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}

// ── Connect Page ───────────────────────────────────────────────────────────
function ConnectPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const inputClass =
    "w-full px-4 py-3 bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all";

  return (
    <div className="pt-[73px]">
      <div className="py-20 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-[1fr_1fr] gap-10 items-end">
          <FadeUp>
            <Label>Let&rsquo;s Connect</Label>
            <h1 className="font-display font-semibold text-foreground leading-tight" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
              We&rsquo;d love to<br />hear from you
            </h1>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md lg:mb-1">
              Whether you&rsquo;re ready to book or just exploring, we&rsquo;re here to help — no pressure, no rush.
            </p>
          </FadeUp>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid md:grid-cols-[2fr_3fr] gap-14 lg:gap-20">
          <FadeUp delay={0.05}>
            <h2 className="font-display text-xl font-semibold text-foreground mb-8">Reach out directly</h2>
            <div className="space-y-0 mb-10 border-t border-border">
              {[
                { icon: Mail,   label: "Email",        value: "hello@kindredhomereset.com" },
                { icon: Phone,  label: "Phone",        value: "(555) 000-0000" },
                { icon: MapPin, label: "Service Area", value: "Serving the greater metro area" },
                { icon: Clock,  label: "Hours",        value: "Monday – Saturday, 8am – 6pm" },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-4 pt-5 border-b border-border pb-5">
                    <Icon className="w-4 h-4 text-primary mt-0.5 shrink-0" strokeWidth={1.5} />
                    <div>
                      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-0.5">{item.label}</p>
                      <p className="text-sm text-foreground">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="bg-secondary/50 px-5 py-5">
              <p className="text-sm font-semibold text-foreground mb-1.5">Free consultations, always</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Our initial consultation is complimentary. We'll learn about your space, your goals, and build a plan that feels right for your family.
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.15}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease }}
                className="flex flex-col items-center justify-center text-center py-16 border border-border"
              >
                <CheckCircle className="w-10 h-10 text-primary mb-5" strokeWidth={1.5} />
                <h3 className="font-display text-2xl font-semibold text-foreground mb-3">Thank you</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                  We&rsquo;ve received your message and will be in touch within one business day.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                <h3 className="font-display text-xl font-semibold text-foreground mb-6">Send us a message</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Name *</label>
                    <input required type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputClass} placeholder="Jane Smith" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Email *</label>
                    <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inputClass} placeholder="jane@email.com" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Phone</label>
                    <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className={inputClass} placeholder="(555) 000-0000" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Service Interest</label>
                    <select value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))} className={inputClass}>
                      <option value="">Select a service…</option>
                      {SERVICES.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                      <option value="not-sure">Not sure yet</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Tell us about your space *</label>
                  <textarea required rows={6} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} className={`${inputClass} resize-none`} placeholder="Share what's going on at home — the more context, the better we can help." />
                </div>
                <button type="submit" className="group w-full py-3.5 bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  Send Message
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-xs text-muted-foreground text-center">We respect your privacy and will never share your information.</p>
              </form>
            )}
          </FadeUp>
        </div>
      </div>
    </div>
  );
}

// ── Policy Page ────────────────────────────────────────────────────────────
function PolicyPage() {
  const sections = [
    { title: "Booking & Cancellations", body: "We ask for at least 48 hours notice for cancellations or rescheduling. Cancellations within 24 hours may be subject to a partial service fee. If something comes up, please reach out as soon as you can and we'll do our best to accommodate you." },
    { title: "Privacy & Confidentiality", body: "Everything we see, sort, and handle in your home stays between us. We never share client information, take photographs without explicit permission, or discuss your situation outside our team." },
    { title: "Donations & Disposal", body: "We prioritize finding new homes for items through local charities and donation centers. Resale assistance is handled per the terms discussed during your consultation. We prioritize sustainability at every step." },
    { title: "Payment", body: "Payment is due at time of service unless otherwise arranged. We accept cash, check, and most major credit cards. Flexible payment plans may be available for larger projects — ask during your consultation." },
    { title: "Our Responsibility", body: "We handle your belongings with the utmost care. In the rare event of accidental damage, please notify us within 24 hours and we will work to make it right. We are fully insured." },
    { title: "Photography & Testimonials", body: "We may ask permission to photograph before-and-after results. Sharing photos is always optional — we will never post anything without your explicit written consent." },
    { title: "Service Area", body: "We primarily serve the greater metro area. If you're unsure whether we reach your location, please contact us and we'll do our best to help or refer you to a trusted colleague." },
  ];

  return (
    <div className="pt-[73px]">
      <div className="py-16 border-b border-border">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <FadeUp>
            <Label>Policy</Label>
            <h1 className="font-display text-4xl font-semibold text-foreground">Our Policies</h1>
          </FadeUp>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 lg:px-10 py-12">
        {sections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease, delay: i * 0.05 }}
            viewport={{ once: true }}
            className={`py-10 ${i < sections.length - 1 ? "border-b border-border" : ""}`}
          >
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">{section.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{section.body}</p>
          </motion.div>
        ))}
        <p className="mt-8 pt-6 border-t border-border text-xs text-muted-foreground">
          Last updated: July 2025. Policies subject to change — please check back periodically or contact us with questions.
        </p>
      </div>
    </div>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────
function Footer({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">
        <div className="grid md:grid-cols-4 gap-10 pb-14 border-b border-background/10">
          <div className="md:col-span-2">
            <button onClick={() => setPage("home")} className="flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                <Leaf className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={1.5} />
              </div>
              <span className="font-display text-[16px] font-semibold">Kindred Home Reset</span>
            </button>
            <p className="text-sm text-background/50 leading-relaxed max-w-xs mb-7">
              Helping busy families reclaim their spaces through compassionate, practical home organizing and reset services.
            </p>
            <div className="flex gap-2.5">
              <a href="mailto:hello@kindredhomereset.com" className="w-8 h-8 border border-background/15 flex items-center justify-center hover:bg-background/10 transition-colors" aria-label="Email us">
                <Mail className="w-3.5 h-3.5" strokeWidth={1.5} />
              </a>
              <a href="tel:5550000000" className="w-8 h-8 border border-background/15 flex items-center justify-center hover:bg-background/10 transition-colors" aria-label="Call us">
                <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
              </a>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-background/30 uppercase tracking-[0.2em] mb-5">Services</p>
            <div className="space-y-3">
              {SERVICES.slice(0, 5).map(s => (
                <button key={s.id} onClick={() => setPage("services")} className="block text-sm text-background/55 hover:text-background transition-colors text-left leading-snug">
                  {s.title}
                </button>
              ))}
              <button onClick={() => setPage("services")} className="block text-sm text-primary hover:text-primary/80 transition-colors">All services →</button>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-background/30 uppercase tracking-[0.2em] mb-5">Company</p>
            <div className="space-y-3">
              <button onClick={() => setPage("about")} className="block text-sm text-background/55 hover:text-background transition-colors">About Us</button>
              <button onClick={() => setPage("connect")} className="block text-sm text-background/55 hover:text-background transition-colors">Let's Connect</button>
              <button onClick={() => setPage("policy")} className="block text-sm text-background/55 hover:text-background transition-colors">Policy</button>
            </div>
            <div className="mt-7 pt-5 border-t border-background/10">
              <p className="text-[10px] font-semibold text-background/30 uppercase tracking-[0.2em] mb-2.5">Coming Soon</p>
              <div className="flex items-center gap-2 text-sm text-background/40">
                <Sparkles className="w-3.5 h-3.5 text-accent/60 shrink-0" strokeWidth={1.5} />
                Blog via Substack
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-background/30">© 2025 Kindred Home Reset. All rights reserved.</p>
          <button onClick={() => setPage("policy")} className="text-xs text-background/30 hover:text-background/50 transition-colors">Privacy & Policy</button>
        </div>
      </div>
    </footer>
  );
}

// ── App ────────────────────────────────────────────────────────────────────
export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar current={currentPage} setPage={setCurrentPage} />
      <main>
        {currentPage === "home"     && <HomePage     setPage={setCurrentPage} />}
        {currentPage === "services" && <ServicesPage setPage={setCurrentPage} />}
        {currentPage === "about"    && <AboutPage    setPage={setCurrentPage} />}
        {currentPage === "connect"  && <ConnectPage />}
        {currentPage === "policy"   && <PolicyPage />}
      </main>
      <Footer setPage={setCurrentPage} />
    </div>
  );
}
