import { Link } from "react-router";
import { Mail, Phone, Leaf, Sparkles } from "lucide-react";
import { SERVICES } from "../data/content";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">
        <div className="grid md:grid-cols-4 gap-10 pb-14 border-b border-background/10">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                <Leaf className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={1.5} />
              </div>
              <span className="font-display text-[16px] font-semibold">Kindred Home Reset</span>
            </Link>
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
                <Link key={s.id} to="/services" className="block text-sm text-background/55 hover:text-background transition-colors text-left leading-snug">
                  {s.title}
                </Link>
              ))}
              <Link to="/services" className="block text-sm text-primary hover:text-primary/80 transition-colors">All services →</Link>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-background/30 uppercase tracking-[0.2em] mb-5">Company</p>
            <div className="space-y-3">
              <Link to="/about" className="block text-sm text-background/55 hover:text-background transition-colors">About Us</Link>
              <Link to="/connect" className="block text-sm text-background/55 hover:text-background transition-colors">Let's Connect</Link>
              <Link to="/policy" className="block text-sm text-background/55 hover:text-background transition-colors">Policy</Link>
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
          <Link to="/policy" className="text-xs text-background/30 hover:text-background/50 transition-colors">Privacy & Policy</Link>
        </div>
      </div>
    </footer>
  );
}
