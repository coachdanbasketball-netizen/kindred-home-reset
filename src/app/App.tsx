import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router";
import { Navbar } from "./layout/Navbar";
import { Footer } from "./layout/Footer";
import HomePage from "../pages/HomePage";
import ServicesPage from "../pages/ServicesPage";
import AboutPage from "../pages/AboutPage";
import ConnectPage from "../pages/ConnectPage";
import PolicyPage from "../pages/PolicyPage";

const PAGE_TITLES: Record<string, string> = {
  "/": "Kindred Home Reset | Home Organizing & Reset Services",
  "/services": "Services & Pricing | Kindred Home Reset",
  "/about": "About Us | Kindred Home Reset",
  "/connect": "Let's Connect | Kindred Home Reset",
  "/policy": "Our Policies | Kindred Home Reset",
};

export default function App() {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    document.title = PAGE_TITLES[pathname] ?? "Kindred Home Reset";
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    mainRef.current?.focus();
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:rounded-md"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" ref={mainRef} tabIndex={-1} className="outline-none">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/connect" element={<ConnectPage />} />
          <Route path="/policy" element={<PolicyPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
