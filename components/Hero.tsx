"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const slides = [
  { img: "/hero/hero-1.jpg", title: "Discover the World", sub: "Save up to 25% on summer adventures" },
  { img: "/hero/hero-2.jpg", title: "New Destinations", sub: "Explore places you've never been before" },
  { img: "/hero/hero-3.jpg", title: "Fly in Luxury", sub: "Business class redefined for the modern traveller" },
  { img: "/hero/hero-4.jpg", title: "Europe Awaits", sub: "Iconic cities, timeless experiences" },
];

export default function Hero() {
  const [cur, setCur] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCur(c => (c + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ position: "relative", height: "100svh", minHeight: 560, width: "100%", overflow: "hidden" }}>
      <AnimatePresence mode="wait">
        <motion.div key={cur}
          style={{ position: "absolute", inset: 0, backgroundImage: `url(${slides[cur].img})`, backgroundSize: "cover", backgroundPosition: "center" }}
          initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }} />
      </AnimatePresence>

      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 50%, rgba(10,15,30,0.85) 100%)" }} />

      {/* Content */}
      <div className="hero-content" style={{ position: "relative", zIndex: 10, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <AnimatePresence mode="wait">
          <motion.div key={cur} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.75 }}>
            <p style={{ color: "#8e2157", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 16 }}>Websico Airways</p>
            <h1 style={{ fontSize: "clamp(2.2rem, 7vw, 5.5rem)", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: 16 }}>{slides[cur].title}</h1>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "clamp(0.95rem, 2vw, 1.25rem)", marginBottom: 36, maxWidth: 520 }}>{slides[cur].sub}</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#booking" style={{ background: "linear-gradient(135deg,#8e2157,#c0396e)", padding: "14px 28px", borderRadius: 999, color: "#fff", fontWeight: 700, fontSize: "0.9rem", boxShadow: "0 8px 32px rgba(142,33,87,0.4)", transition: "opacity 0.2s, transform 0.2s", display: "inline-block" }}
                onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "scale(1.04)"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}>
                Book Now
              </a>
              <a href="#destinations" style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", padding: "14px 28px", borderRadius: 999, color: "#fff", fontWeight: 600, fontSize: "0.9rem", backdropFilter: "blur(8px)", transition: "background 0.2s", display: "inline-block" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.16)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}>
                Explore Destinations
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide dots */}
        <div className="hero-dots">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCur(i)}
              style={{ height: 4, borderRadius: 2, border: "none", cursor: "pointer", transition: "all 0.4s", background: i === cur ? "#8e2157" : "rgba(255,255,255,0.3)", width: i === cur ? 32 : 8 }} />
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, color: "rgba(255,255,255,0.35)" }}>
        <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll</span>
        <ChevronDown size={16} />
      </motion.div>

      <style>{`
        .hero-content {
          padding: 0 48px;
          max-width: 1280px;
          margin: 0 auto;
        }
        .hero-dots {
          position: absolute;
          bottom: 72px;
          left: 48px;
          display: flex;
          gap: 8px;
        }
        @media (max-width: 640px) {
          .hero-content { padding: 0 20px; }
          .hero-dots { left: 20px; bottom: 56px; }
        }
      `}</style>
    </section>
  );
}
