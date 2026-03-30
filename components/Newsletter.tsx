"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send } from "lucide-react";

export default function Newsletter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="newsletter-section">
      <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
        style={{ position: "relative", overflow: "hidden", borderRadius: 24, padding: "56px 48px", background: "linear-gradient(135deg, rgba(142,33,87,0.25) 0%, rgba(10,15,30,0.95) 100%)", border: "1px solid rgba(142,33,87,0.25)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(https://www.qatarairways.com/content/dam/images/custom/enl-subscribe-component/NL_Background_Desktop.png)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.07 }} />
        <div className="newsletter-inner">
          <div>
            <p style={{ color: "#8e2157", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 10 }}>Stay Updated</p>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)", fontWeight: 800, color: "#fff", marginBottom: 10 }}>Get exclusive deals</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: 420, fontSize: "0.9rem", lineHeight: 1.6 }}>Subscribe and be the first to know about special offers, new routes, and travel inspiration.</p>
          </div>
          {sent ? (
            <motion.p initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ color: "#4ade80", fontWeight: 600, fontSize: "1rem" }}>
              ✓ You&apos;re subscribed!
            </motion.p>
          ) : (
            <form onSubmit={e => { e.preventDefault(); if (email) { setSent(true); setEmail(""); } }} className="newsletter-form">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 999, padding: "14px 20px", color: "#fff", fontSize: "0.9rem", flex: 1, minWidth: 0 }} />
              <button type="submit" style={{ background: "linear-gradient(135deg,#8e2157,#c0396e)", border: "none", borderRadius: 999, padding: "14px 20px", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem", display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap", flexShrink: 0 }}>
                Subscribe <Send size={15} />
              </button>
            </form>
          )}
        </div>
      </motion.div>

      <style>{`
        .newsletter-section {
          padding: 0 48px 96px;
          max-width: 1280px;
          margin: 0 auto;
        }
        .newsletter-inner {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
        }
        .newsletter-form {
          display: flex;
          gap: 10px;
          flex: 1;
          min-width: 280px;
          max-width: 480px;
        }
        @media (max-width: 768px) {
          .newsletter-section { padding: 0 24px 72px; }
          .newsletter-inner { flex-direction: column; align-items: stretch; }
          .newsletter-form { min-width: 0; max-width: 100%; width: 100%; }
        }
        @media (max-width: 480px) {
          .newsletter-section { padding: 0 16px 56px; }
          .newsletter-inner > div:first-child > div[style] { padding: 40px 24px; }
          .newsletter-form { flex-direction: column; }
          .newsletter-form input { width: 100%; }
          .newsletter-form button { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
