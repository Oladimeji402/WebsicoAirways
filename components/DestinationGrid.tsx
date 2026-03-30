"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const dests = [
  { name: "London Heathrow", img: "/destinations/london.jpg", price: "NGN 1,542,107", dates: "25 Jul – 1 Oct", large: true },
  { name: "Guangzhou", img: "/destinations/guangzhou.jpg", price: "NGN 1,359,163", dates: "1 Jul – 21 Oct", large: false },
  { name: "New York", img: "/destinations/new-york.jpg", price: "NGN 1,540,748", dates: "8 Sep – 11 Nov", large: false },
  { name: "Paris", img: "/destinations/paris.jpg", price: "NGN 1,474,033", dates: "1 Oct – 21 Oct", large: false },
  { name: "Dubai", img: "/destinations/dubai.jpg", price: "NGN 980,000", dates: "15 Aug – 30 Sep", large: false },
  { name: "Washington D.C.", img: "/destinations/washington.jpg", price: "NGN 1,911,485", dates: "25 Dec – 1 Jan", large: true },
];

function Card({ d, i }: { d: typeof dests[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: i * 0.08 }}
      style={{ position: "relative", overflow: "hidden", borderRadius: 20, cursor: "pointer" }}
      className={`dest-card${d.large ? " dest-card-large" : ""}`}>
      <motion.img src={d.img} alt={d.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        whileHover={{ scale: 1.08 }} transition={{ duration: 0.55 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }} />
      <div className="dest-info" style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px", transform: "translateY(4px)", transition: "transform 0.3s" }}>
        <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1.05rem", marginBottom: 4 }}>{d.name}</h3>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.78rem", marginBottom: 8 }}>{d.dates}</p>
        <div className="dest-hover-content" style={{ opacity: 0, transition: "opacity 0.3s", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <p style={{ color: "#e0a0c0", fontSize: "0.78rem", fontWeight: 500 }}>Economy from {d.price}</p>
          <button style={{ background: "linear-gradient(135deg,#8e2157,#c0396e)", border: "none", borderRadius: 999, padding: "6px 16px", color: "#fff", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer", flexShrink: 0 }}>Book</button>
        </div>
      </div>
    </motion.div>
  );
}

export default function DestinationGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <section id="destinations" className="dest-section">
      <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ marginBottom: 40 }}>
        <p style={{ color: "#8e2157", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>Great Fares</p>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, background: "linear-gradient(135deg,#fff,#e0a0c0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Find your next adventure</h2>
        <p style={{ color: "rgba(255,255,255,0.45)", marginTop: 10, maxWidth: 480, fontSize: "0.95rem" }}>Handpicked destinations with the best fares, ready for you to explore.</p>
      </motion.div>
      <div className="dest-grid">
        {dests.map((d, i) => <Card key={d.name} d={d} i={i} />)}
      </div>

      <style>{`
        .dest-section {
          padding: 0 48px 96px;
          max-width: 1280px;
          margin: 0 auto;
        }
        .dest-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 200px;
          gap: 14px;
        }
        .dest-card { min-height: 200px; }
        .dest-card-large { grid-row: span 2; min-height: 414px; }
        .dest-card:hover .dest-hover-content { opacity: 1 !important; }
        .dest-card:hover .dest-info { transform: translateY(0) !important; }

        /* Touch devices — always show price info */
        @media (hover: none) {
          .dest-hover-content { opacity: 1 !important; }
          .dest-info { transform: translateY(0) !important; }
        }

        @media (max-width: 900px) {
          .dest-section { padding: 0 24px 72px; }
          .dest-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 180px; gap: 12px; }
          .dest-card-large { grid-row: span 1; min-height: 180px; }
        }
        @media (max-width: 480px) {
          .dest-section { padding: 0 16px 56px; }
          .dest-grid { grid-template-columns: 1fr; grid-auto-rows: 200px; gap: 10px; }
          .dest-card-large { grid-row: span 1; }
        }
      `}</style>
    </section>
  );
}
