import { useState } from "react";
import { useLocation } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Check, CheckCircle, Mail, Phone, MapPin, Clock } from "lucide-react";
import { FadeUp } from "../app/components/FadeUp";
import { Label } from "../app/components/Label";
import { SERVICES, ease } from "../app/data/content";

export default function ConnectPage() {
  const location = useLocation();
  const preselectedServiceId = (location.state as { serviceId?: string } | null)?.serviceId;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    services: preselectedServiceId ? [preselectedServiceId] : ([] as string[]),
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const inputClass =
    "w-full px-4 py-3 bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all";

  const toggleService = (id: string) => {
    setForm(f => ({
      ...f,
      services: f.services.includes(id) ? f.services.filter(s => s !== id) : [...f.services, id],
    }));
  };

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
                { icon: Mail,   label: "Email",        value: "kindredhomereset@gmail.com" },
                { icon: Phone,  label: "Phone",        value: "(609) 290-6008" },
                { icon: MapPin, label: "Service Area", value: "Serving the greater metro area" },
                { icon: Clock,  label: "Hours",        value: "Monday – Saturday, 9am – 4pm" },
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
                <div>
                  <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">Phone</label>
                  <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className={inputClass} placeholder="(555) 000-0000" />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                    Service Interest <span className="normal-case font-normal text-muted-foreground/70">(select all that apply)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map(s => {
                      const selected = form.services.includes(s.id);
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => toggleService(s.id)}
                          aria-pressed={selected}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium border transition-colors ${
                            selected
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                          }`}
                        >
                          {selected && <Check className="w-3 h-3" />}
                          {s.title}
                        </button>
                      );
                    })}
                    {(() => {
                      const selected = form.services.includes("not-sure");
                      return (
                        <button
                          type="button"
                          onClick={() => toggleService("not-sure")}
                          aria-pressed={selected}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium border transition-colors ${
                            selected
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                          }`}
                        >
                          {selected && <Check className="w-3 h-3" />}
                          Not sure yet
                        </button>
                      );
                    })()}
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
