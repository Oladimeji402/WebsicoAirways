"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import AuthModal from "@/components/AuthModal";

const navLinks = ["Experience", "Help"];

const ourDestinations = [
  { name: "Americas", href: "/destinations/americas" },
  { name: "Europe", href: "/destinations/europe" },
  { name: "Africa", href: "/destinations/africa" },
  { name: "Middle East", href: "/destinations/middle-east" },
  { name: "Asia and the Pacific", href: "/destinations/asia-pacific" },
];

const trending = [
  { name: "New York", img: "/destinations/new-york.jpg", href: "/city/new-york" },
  { name: "Maldives", img: "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=400", href: "/city/maldives" },
  { name: "Dallas", img: "https://images.pexels.com/photos/1570099/pexels-photo-1570099.jpeg?auto=compress&cs=tinysrgb&w=400", href: "/city/dallas" },
  { name: "Delhi", img: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=400", href: "/city/delhi" },
  { name: "Jeddah", img: "https://images.pexels.com/photos/3214995/pexels-photo-3214995.jpeg?auto=compress&cs=tinysrgb&w=400", href: "/city/jeddah" },
];

const newDestinations = [
  { name: "Toronto", href: "/city/toronto" },
  { name: "Phnom Penh", href: "/city/phnom-penh" },
  { name: "Tokyo (Haneda)", href: "/city/tokyo" },
  { name: "AlUla", href: "/city/alula" },
  { name: "View all", href: "/destinations/europe", accent: true },
];

const visitQatar = [
  { name: "Qatar Stopover", href: "#" },
  { name: "Experience Qatar", href: "#" },
  { name: "Tours & activities", href: "#" },
  { name: "Transit Tours", href: "#" },
  { name: "Discover Qatar", href: "#" },
];

const mobileMenuSections = [
  { label: "Our Destinations", items: ourDestinations },
  { label: "Trending", items: trending.map(t => ({ name: t.name, href: t.href })) },
  { label: "New Destinations", items: newDestinations },
  { label: "Visit Qatar", items: visitQatar },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [hoveredTrend, setHoveredTrend] = useState(trending[0]);
  const [user, setUser] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    const stored = localStorage.getItem("wa_user");
    if (stored) setUser(stored);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleLogin = (username: string) => {
    setUser(username);
    localStorage.setItem("wa_user", username);
    setAuthOpen(false);
  };

  const navStyle: React.CSSProperties = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
    transition: "all 0.4s ease",
    background: scrolled || mobileOpen ? "rgba(10,15,30,0.97)" : "transparent",
    backdropFilter: scrolled ? "blur(20px)" : "none",
    borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
  };

  const colHead: React.CSSProperties = {
    fontSize: "0.95rem", fontWeight: 700, color: "#fff", marginBottom: 14,
  };

  const linkStyle: React.CSSProperties = {
    display: "block", padding: "5px 0", color: "rgba(255,255,255,0.65)",
    fontSize: "0.88rem", textDecoration: "none", transition: "color 0.15s", cursor: "pointer",
  };

  return (
    <>
      <motion.nav style={navStyle} initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.6 }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flexShrink: 0 }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#8e2157">
              <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2A1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1l3.5 1v-1.5L13 19v-5.5z" />
            </svg>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.15em" }}>WEBSICO</span>
            <span style={{ color: "#8e2157", fontWeight: 300, fontSize: "1rem", letterSpacing: "0.15em" }}>AIRWAYS</span>
          </a>

          {/* Desktop links */}
          <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="desktop-nav">
            {/* Explore */}
            <div onMouseEnter={() => setExploreOpen(true)} onMouseLeave={() => setExploreOpen(false)}>
              <button style={{ background: "none", border: "none", color: "rgba(255,255,255,0.75)", fontSize: "0.9rem", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, padding: "8px 0" }}>
                Explore <ChevronDown size={14} style={{ transition: "transform 0.2s", transform: exploreOpen ? "rotate(180deg)" : "rotate(0)" }} />
              </button>
            </div>

            {/* Book */}
            <div style={{ position: "relative" }} onMouseEnter={() => setBookOpen(true)} onMouseLeave={() => setBookOpen(false)}>
              <button style={{ background: "none", border: "none", color: "rgba(255,255,255,0.75)", fontSize: "0.9rem", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, padding: "8px 0" }}>
                Book <ChevronDown size={14} style={{ transition: "transform 0.2s", transform: bookOpen ? "rotate(180deg)" : "rotate(0)" }} />
              </button>
              <AnimatePresence>
                {bookOpen && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.18 }}
                    style={{ position: "absolute", top: "calc(100% + 12px)", left: "50%", transform: "translateX(-50%)", width: 220,
                      background: "rgba(10,15,30,0.97)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 14, padding: "18px 20px", boxShadow: "0 24px 60px rgba(0,0,0,0.5)" }}>
                    <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 12 }}>Plan your trip</p>
                    {["Hotels", "Car Rentals", "Travel Insurance", "Meet & Greet"].map((item) => (
                      <a key={item} href="#" style={linkStyle}
                        onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}>
                        {item}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((link) => (
              <a key={link} href="#" style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.9rem", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}>
                {link}
              </a>
            ))}

            {/* Auth */}
            {user ? (
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 999, padding: "6px 14px" }}>
                  <User size={15} color="#8e2157" />
                  <span style={{ fontSize: "0.85rem", color: "#fff" }}>{user}</span>
                </div>
                <button onClick={() => { setUser(null); localStorage.removeItem("wa_user"); }}
                  style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", cursor: "pointer" }}>
                  Logout
                </button>
              </div>
            ) : (
              <button onClick={() => setAuthOpen(true)}
                style={{ background: "linear-gradient(135deg,#8e2157,#c0396e)", border: "none", borderRadius: 999, padding: "10px 22px", color: "#fff", fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                <User size={15} /> Login / Sign Up
              </button>
            )}
          </div>

          {/* Mobile right side */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }} className="mobile-right">
            {user && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 999, padding: "5px 10px" }}>
                <User size={13} color="#8e2157" />
                <span style={{ fontSize: "0.78rem", color: "#fff", maxWidth: 80, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user}</span>
              </div>
            )}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 4, display: "flex", alignItems: "center" }}>
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu — full screen overlay */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween", duration: 0.28 }}
              style={{
                position: "fixed", top: 64, left: 0, right: 0, bottom: 0,
                background: "#0a0f1e", overflowY: "auto", zIndex: 49,
                borderTop: "1px solid rgba(255,255,255,0.08)",
              }}>
              <div style={{ padding: "24px 20px 40px" }}>
                {/* Quick actions */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 28 }}>
                  <a href="#booking" onClick={() => setMobileOpen(false)}
                    style={{ background: "linear-gradient(135deg,#8e2157,#c0396e)", borderRadius: 12, padding: "14px 16px", color: "#fff", fontWeight: 700, fontSize: "0.9rem", textAlign: "center", textDecoration: "none" }}>
                    Book a Flight
                  </a>
                  <button onClick={() => { setAuthOpen(true); setMobileOpen(false); }}
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "14px 16px", color: "#fff", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer" }}>
                    {user ? "My Account" : "Login / Sign Up"}
                  </button>
                </div>

                {/* Accordion sections */}
                {mobileMenuSections.map((section) => (
                  <div key={section.label} style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", marginBottom: 4 }}>
                    <button
                      onClick={() => setMobileSection(mobileSection === section.label ? null : section.label)}
                      style={{ width: "100%", background: "none", border: "none", color: "#fff", fontSize: "0.95rem", fontWeight: 600, padding: "16px 0", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                      {section.label}
                      <ChevronDown size={16} style={{ transition: "transform 0.2s", transform: mobileSection === section.label ? "rotate(180deg)" : "rotate(0)", color: "rgba(255,255,255,0.4)" }} />
                    </button>
                    <AnimatePresence>
                      {mobileSection === section.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ overflow: "hidden" }}>
                          <div style={{ paddingBottom: 12, display: "flex", flexDirection: "column", gap: 2 }}>
                            {section.items.map((item) => (
                              <a key={item.name} href={item.href} onClick={() => setMobileOpen(false)}
                                style={{ padding: "10px 12px", color: "rgba(255,255,255,0.65)", fontSize: "0.9rem", borderRadius: 8, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                {item.name}
                                <ChevronRight size={14} style={{ color: "rgba(255,255,255,0.25)" }} />
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Other links */}
                {["Experience", "Help"].map((item) => (
                  <a key={item} href="#"
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 0", color: "#fff", fontSize: "0.95rem", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.07)", textDecoration: "none" }}>
                    {item}
                    <ChevronRight size={16} style={{ color: "rgba(255,255,255,0.4)" }} />
                  </a>
                ))}

                {user && (
                  <button onClick={() => { setUser(null); localStorage.removeItem("wa_user"); setMobileOpen(false); }}
                    style={{ marginTop: 24, width: "100%", background: "none", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "14px", color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", cursor: "pointer" }}>
                    Logout
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Explore mega dropdown — desktop only */}
      <AnimatePresence>
        {exploreOpen && (
          <motion.div
            onMouseEnter={() => setExploreOpen(true)}
            onMouseLeave={() => setExploreOpen(false)}
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{ position: "fixed", top: 64, left: 0, right: 0, zIndex: 49,
              background: "rgba(10,15,30,0.97)", backdropFilter: "blur(24px)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 24px 60px rgba(0,0,0,0.5)" }}>

            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "36px 32px 28px", display: "grid", gridTemplateColumns: "260px 1fr 1fr 180px", gap: 40 }}>
              {/* Col 1 */}
              <div>
                <p style={colHead}>Our destinations</p>
                <div style={{ position: "relative", background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "12px", marginBottom: 14, height: 90, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "2rem" }}>🗺️</span>
                </div>
                {ourDestinations.map((d) => (
                  <a key={d.name} href={d.href} style={{ display: "block", padding: "5px 0", color: "rgba(255,255,255,0.65)", fontSize: "0.88rem", textDecoration: "none", transition: "color 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}>
                    {d.name}
                  </a>
                ))}
              </div>

              {/* Col 2 */}
              <div>
                <p style={colHead}>Trending</p>
                <div style={{ display: "flex", gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    {trending.map((t) => (
                      <a key={t.name} href={t.href} onMouseEnter={() => setHoveredTrend(t)}
                        style={{ display: "block", padding: "5px 0", color: hoveredTrend.name === t.name ? "#fff" : "rgba(255,255,255,0.65)", fontSize: "0.88rem", cursor: "pointer", transition: "color 0.15s", textDecoration: "none" }}>
                        {t.name}
                      </a>
                    ))}
                  </div>
                  <div style={{ width: 130, height: 160, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
                    <motion.img key={hoveredTrend.img} src={hoveredTrend.img} alt={hoveredTrend.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} />
                  </div>
                </div>
              </div>

              {/* Col 3 */}
              <div>
                <p style={colHead}>New destinations</p>
                <div style={{ display: "flex", gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    {newDestinations.map((d) => (
                      <a key={d.name} href={d.href} style={{ display: "block", padding: "5px 0", color: d.accent ? "#c0396e" : "rgba(255,255,255,0.65)", fontWeight: d.accent ? 600 : 400, fontSize: "0.88rem", textDecoration: "none", transition: "color 0.15s" }}
                        onMouseEnter={e => (e.currentTarget.style.color = d.accent ? "#e05080" : "#fff")}
                        onMouseLeave={e => (e.currentTarget.style.color = d.accent ? "#c0396e" : "rgba(255,255,255,0.65)")}>
                        {d.name}
                      </a>
                    ))}
                  </div>
                  <div style={{ width: 130, height: 160, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
                    <img src="/destinations/london.jpg" alt="New destination" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                </div>
              </div>

              {/* Col 4 */}
              <div>
                <p style={colHead}>Visit Qatar</p>
                {visitQatar.map((d) => (
                  <a key={d.name} href={d.href} style={{ display: "block", padding: "5px 0", color: "rgba(255,255,255,0.65)", fontSize: "0.88rem", textDecoration: "none", transition: "color 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}>
                    {d.name}
                  </a>
                ))}
              </div>
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "14px 32px", maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "center", gap: 80 }}>
              <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.45)" }}>
                Step on board virtually.{" "}
                <a href="#" style={{ color: "#c0396e", fontWeight: 600, textDecoration: "none" }}>
                  Explore QVerse <ChevronRight size={12} style={{ display: "inline", verticalAlign: "middle" }} />
                </a>
              </span>
              <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.45)" }}>
                Dreaming of your next trip?{" "}
                <a href="#" style={{ color: "#c0396e", fontWeight: 600, textDecoration: "none" }}>
                  Get inspired <ChevronRight size={12} style={{ display: "inline", verticalAlign: "middle" }} />
                </a>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 901px) {
          .mobile-right { display: none !important; }
        }
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-right { display: flex !important; }
        }
      `}</style>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} onLogin={handleLogin} />
    </>
  );
}
