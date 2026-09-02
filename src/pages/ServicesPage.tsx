import { useRef } from "react";
import { useNavigate } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Star } from "lucide-react";
import { FadeUp } from "../app/components/FadeUp";
import { Label } from "../app/components/Label";
import { SERVICE_CATEGORIES, SERVICE_INTRO, SERVICE_ADDONS, SERVICE_FINE_PRINT, ease } from "../app/data/content";

export default function ServicesPage() {
  const navigate = useNavigate();

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

      <FadeUp>
        <p className="text-center text-sm text-muted-foreground py-6 max-w-7xl mx-auto px-6 lg:px-10 border-b border-border">
          {SERVICE_INTRO}
        </p>
      </FadeUp>

      {/* Service categories */}
      {SERVICE_CATEGORIES.map((category, catIndex) => (
        <div key={category.id} className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className={`pt-16 ${catIndex === 0 ? "" : "border-t border-border"}`}>
            <FadeUp>
              <h2 className="font-display text-3xl font-semibold text-foreground mb-2">{category.title}</h2>
              {category.intro && (
                <p className="text-muted-foreground leading-relaxed max-w-2xl">{category.intro}</p>
              )}
            </FadeUp>
          </div>

          {category.services.map((service, i) => {
            const reversed = i % 2 === 1;
            const isLast = i === category.services.length - 1;
            return (
              <div
                key={service.id}
                className={`grid md:grid-cols-2 gap-10 lg:gap-16 items-center py-16 ${isLast ? "" : "border-b border-border"}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease }}
                  viewport={{ once: true, margin: "-60px" }}
                  className={`overflow-hidden rounded-sm ${reversed ? "md:order-2" : ""}`}
                  style={{ aspectRatio: "4/3" }}
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
                <FadeUp delay={0.1} className={reversed ? "md:order-1" : ""}>
                  <p className="text-[10px] font-semibold text-accent tracking-[0.18em] uppercase mb-3">{service.pricing}</p>
                  <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground leading-snug mb-1">
                    {service.title}
                  </h2>
                  {service.subtitle && (
                    <p className="text-sm text-muted-foreground italic mb-4">{service.subtitle}</p>
                  )}
                  <p className="text-muted-foreground leading-relaxed max-w-xl mb-6">{service.description}</p>
                  <button
                    onClick={() => navigate("/connect", { state: { serviceId: service.id } })}
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-primary border-b border-primary/40 pb-0.5 hover:border-primary transition-colors"
                  >
                    Book this Service
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </button>
                </FadeUp>
              </div>
            );
          })}
        </div>
      ))}

      {/* Add-ons */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 border-t border-border">
        <FadeUp>
          <Label>Add-ons</Label>
          <div className="grid sm:grid-cols-3 gap-8 mt-6">
            {SERVICE_ADDONS.map(addon => (
              <div key={addon.title}>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Star className="w-4 h-4 text-accent shrink-0" strokeWidth={1.5} aria-hidden="true" />
                  {addon.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{addon.desc}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Fine print */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 border-t border-border">
        <FadeUp>
          <Label>The Fine Print</Label>
          <div className="space-y-3 mt-6 max-w-3xl">
            {SERVICE_FINE_PRINT.map(line => (
              <p key={line} className="text-sm text-muted-foreground leading-relaxed">{line}</p>
            ))}
          </div>
        </FadeUp>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 border-t border-border">
        <FadeUp>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <h3 className="font-display text-2xl font-semibold text-foreground mb-2">Not sure where to start?</h3>
              <p className="text-muted-foreground text-sm max-w-md">Our free consultation helps us understand your needs and build the plan that's right for you.</p>
            </div>
            <button
              onClick={() => navigate("/connect")}
              className="group shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-foreground border border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-colors"
            >
              Book a Free Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </button>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
