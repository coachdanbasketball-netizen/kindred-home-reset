import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router";
import { Navbar } from "./layout/Navbar";
import { Footer } from "./layout/Footer";
import HomePage from "../pages/HomePage";
import ServicesPage from "../pages/ServicesPage";
import AboutPage from "../pages/AboutPage";
import ConnectPage from "../pages/ConnectPage";
import PolicyPage from "../pages/PolicyPage";
import FAQPage from "../pages/FAQPage";

const PAGE_TITLES: Record<string, string> = {
  "/": "The Kindred Life | Home Organizing & Reset Services",
  "/services": "Services & Pricing | The Kindred Life",
  "/about": "About Us | The Kindred Life",
  "/connect": "Let's Connect | The Kindred Life",
  "/policy": "Our Policies | The Kindred Life",
  "/faq": "FAQ | The Kindred Life",
};

export default function App() {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    document.title = PAGE_TITLES[pathname] ?? "The Kindred Life";
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
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
