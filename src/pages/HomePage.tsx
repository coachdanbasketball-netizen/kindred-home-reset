import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ArrowRight, CheckCircle, Sparkles, Pause, Play } from "lucide-react";
import { FadeUp } from "../app/components/FadeUp";
import { Label } from "../app/components/Label";
import { SERVICES, TESTIMONIALS, ease } from "../app/data/content";

export default function HomePage() {
  const navigate = useNavigate();
  const [tIdx, setTIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [testimonialHover, setTestimonialHover] = useState(false);

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

  // Testimonial auto-cycle — paused via explicit control or hover/focus (WCAG 2.2.2)
  useEffect(() => {
    if (!autoPlay || testimonialHover) return;
    const t = setInterval(() => setTIdx(i => (i + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, [autoPlay, testimonialHover]);

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
                onClick={() => navigate("/connect")}
                className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground border border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-colors"
              >
                Begin your reset
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
              <button
                onClick={() => navigate("/services")}
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
              <button onClick={() => navigate("/services")} className="text-sm text-primary font-medium hidden sm:flex items-center gap-1.5 hover:gap-2.5 transition-all">
                View all {SERVICES.length} <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
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
                <span className="font-display text-sm text-muted-foreground w-8 shrink-0 pt-1 tabular-nums" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-lg md:text-xl font-semibold text-foreground mb-1.5 leading-snug group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">{service.description}</p>
                    </div>
                    <Icon className="w-5 h-5 text-muted-foreground/30 shrink-0 mt-1 group-hover:text-primary/60 transition-colors hidden sm:block" strokeWidth={1.5} aria-hidden="true" />
                  </div>
                </div>
              </motion.div>
            );
          })}

          <div className="pt-6 sm:hidden">
            <button onClick={() => navigate("/services")} className="text-sm text-primary font-medium flex items-center gap-1.5">
              View all {SERVICES.length} services <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── Pull quote — parallax blockquote ──────────────────────────────── */}
      <section ref={quoteRef} className="py-24 bg-primary text-primary-foreground overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div style={{ y: quoteY }} className="max-w-3xl mb-16">
            <p className="font-display font-semibold text-primary-foreground text-sm tracking-widest uppercase mb-8">
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
                  <p className="text-sm text-primary-foreground/90">{item.desc}</p>
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
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
                    <span className="text-sm text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
              <button onClick={() => navigate("/about")} className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5 group">
                Meet the team <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
              </button>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Testimonial — AnimatePresence crossfade ───────────────────────── */}
      <section
        className="py-24 bg-secondary/40 border-t border-b border-border overflow-hidden"
        onMouseEnter={() => setTestimonialHover(true)}
        onMouseLeave={() => setTestimonialHover(false)}
        onFocus={() => setTestimonialHover(true)}
        onBlur={() => setTestimonialHover(false)}
      >
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
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="flex justify-center gap-2" role="group" aria-label="Choose testimonial">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTIdx(i)}
                    aria-label={`Testimonial ${i + 1} of ${TESTIMONIALS.length}`}
                    aria-current={i === tIdx ? "true" : undefined}
                    className={`h-1.5 rounded-full transition-all duration-400 ${i === tIdx ? "w-6 bg-primary" : "w-1.5 bg-foreground/60"}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setAutoPlay(p => !p)}
                aria-label={autoPlay ? "Pause automatic testimonial rotation" : "Resume automatic testimonial rotation"}
                aria-pressed={!autoPlay}
                className="w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                {autoPlay ? <Pause className="w-3.5 h-3.5" aria-hidden="true" /> : <Play className="w-3.5 h-3.5" aria-hidden="true" />}
              </button>
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
                  onClick={() => navigate("/connect")}
                  className="group inline-flex items-center gap-3 text-base font-medium text-primary border-b border-primary pb-1 hover:gap-4 transition-all"
                >
                  Schedule a free consultation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
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
            <Sparkles className="w-4 h-4 text-accent" strokeWidth={1.5} aria-hidden="true" />
            Blog launching soon via Substack
          </div>
        </FadeUp>
      </section>
    </div>
  );
}
