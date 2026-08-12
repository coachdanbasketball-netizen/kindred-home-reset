import { useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Menu, X, ChevronDown, ArrowRight, Leaf } from "lucide-react";
import { NAV_ABOUT, ease } from "../data/content";

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);
  const aboutButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) setAboutOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && aboutOpen) {
        setAboutOpen(false);
        aboutButtonRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [aboutOpen]);

  const go = (path: string) => {
    navigate(path);
    setMobileOpen(false);
    setAboutOpen(false);
  };

  const isAbout = ["/about", "/connect", "/policy"].includes(location.pathname);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[73px]">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
              <Leaf className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <span className="font-display font-semibold text-[16px] text-foreground tracking-tight">
              Kindred Home Reset
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              aria-current={location.pathname === "/" ? "page" : undefined}
              className={`text-sm transition-colors ${location.pathname === "/" ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
            >
              Home
            </Link>

            <Link
              to="/services"
              aria-current={location.pathname === "/services" ? "page" : undefined}
              className={`text-sm transition-colors ${location.pathname === "/services" ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
            >
              Services &amp; Pricing
            </Link>

            <div ref={aboutRef} className="relative">
              <button
                ref={aboutButtonRef}
                onClick={() => setAboutOpen(o => !o)}
                aria-expanded={aboutOpen}
                aria-haspopup="true"
                aria-controls="about-menu"
                aria-current={isAbout ? "page" : undefined}
                className={`flex items-center gap-1 text-sm transition-colors ${isAbout ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
              >
                About
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              {aboutOpen && (
                <motion.div
                  id="about-menu"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, ease }}
                  className="absolute top-full right-0 mt-4 w-52 bg-background border border-border shadow-xl overflow-hidden"
                >
                  <div className="py-2">
                    {NAV_ABOUT.map(item => (
                      <button key={item.path} onClick={() => go(item.path)} className="w-full text-left px-5 py-2.5 text-sm text-foreground hover:bg-muted transition-colors">
                        {item.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <Link to="/connect" className="text-sm rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5 group px-4 py-2">
              Book Now
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(o => !o)}
            className="md:hidden p-2 -mr-1 text-foreground"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-border bg-background">
          <div className="px-6 py-3 space-y-0.5">
            <button onClick={() => go("/")} aria-current={location.pathname === "/" ? "page" : undefined} className="w-full text-left px-2 py-3 text-sm font-medium text-foreground border-b border-border/50">Home</button>
            <button onClick={() => go("/services")} aria-current={location.pathname === "/services" ? "page" : undefined} className="w-full text-left px-2 py-3 text-sm font-medium text-foreground border-b border-border/50">Services &amp; Pricing</button>
            <div className="border-b border-border/50">
              <button
                onClick={() => setMobileAboutOpen(o => !o)}
                aria-expanded={mobileAboutOpen}
                aria-controls="mobile-about-menu"
                className="w-full flex items-center justify-between px-2 py-3 text-sm font-medium text-foreground"
              >
                About
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileAboutOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              {mobileAboutOpen && (
                <div id="mobile-about-menu" className="pb-2">
                  {NAV_ABOUT.map(item => (
                    <button key={item.path} onClick={() => go(item.path)} className="w-full text-left pl-4 pr-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => go("/connect")} className="w-full text-left px-4 py-3 mt-2 text-sm font-semibold bg-primary text-primary-foreground">Book Now →</button>
          </div>
        </div>
      )}
    </nav>
  );
}
