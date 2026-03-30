"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const cards = [
  { img: "https://www.qatarairways.com/content/dam/images/renditions/horizontal-2/campaigns/global/experience-qatar/h2-experience-qatar-family.jpg", title: "An unforgettable holiday in Websico", cta: "Book now" },
  { img: "https://www.qatarairways.com/content/dam/images/renditions/horizontal-2/destinations/maldives/maldives/h2-maldives-beach-sunrise.jpg", title: "Your perfect holiday awaits", cta: "Book a package" },
  { img: "https://www.qatarairways.com/content/dam/images/renditions/horizontal-3/brand/aircraft/a350/h3-a350-1000-doha2.jpg", title: "Travel requirements", cta: "Find out more" },
  { img: "https://www.qatarairways.com/content/dam/images/renditions/horizontal-3/brand/qsuite/h3-qsuite-ife-dine.jpg", title: "Elevate your experience", cta: "Purchase add-ons" },
];

export default function TripPlanner() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="trip-section">
      <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
        style={{ marginBottom: 40 }}>
        <p style={{ color: "#8e2157", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 12 }}>Plan Ahead</p>
        <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 800, background: "linear-gradient(135deg,#fff,#e0a0c0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Start planning your next trip
        </h2>
      </motion.div>

      <div className="trip-grid">
        {cards.map((card, i) => (
          <motion.div key={card.title}
            initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, overflow: "hidden", cursor: "pointer", transition: "border-color 0.3s, transform 0.3s" }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}>
            <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
              <motion.img src={card.img} alt={card.title} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                whileHover={{ scale: 1.08 }} transition={{ duration: 0.5 }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)" }} />
            </div>
            <div style={{ padding: "20px 20px 16px" }}>
              <p style={{ color: "#fff", fontWeight: 500, fontSize: "0.9rem", lineHeight: 1.4, marginBottom: 16 }}>{card.title}</p>
              <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 14 }} />
              <a href="#" className="trip-card-cta" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.85rem", transition: "color 0.2s" }}>
                {card.cta} <ArrowRight size={15} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        .trip-section {
          padding: 80px 48px;
          max-width: 1280px;
          margin: 0 auto;
        }
        .trip-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .trip-card-cta { color: rgba(255,255,255,0.55) !important; }
        .trip-card-cta:hover { color: #fff !important; }

        @media (max-width: 900px) {
          .trip-section { padding: 56px 24px; }
          .trip-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
        }
        @media (max-width: 480px) {
          .trip-section { padding: 48px 16px; }
          .trip-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
        }
      `}</style>
    </section>
  );
}
