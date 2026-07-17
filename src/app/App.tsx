import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router";
import { Navbar } from "./layout/Navbar";
import { Footer } from "./layout/Footer";
import HomePage from "../pages/HomePage";
import ServicesPage from "../pages/ServicesPage";
import AboutPage from "../pages/AboutPage";
import ConnectPage from "../pages/ConnectPage";
import PolicyPage from "../pages/PolicyPage";

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <main>
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
