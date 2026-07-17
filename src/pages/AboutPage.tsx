import { useRef } from "react";
import { useNavigate } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "../app/components/FadeUp";
import { Label } from "../app/components/Label";
import { ease } from "../app/data/content";

export default function AboutPage() {
  const navigate = useNavigate();
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
              onClick={() => navigate("/connect")}
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
