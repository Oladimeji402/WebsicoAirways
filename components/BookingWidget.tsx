"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, MapPin, CalendarDays } from "lucide-react";

type Tab = "flight" | "stopover" | "manage";
type FType = "return" | "one-way" | "multi-city";

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 12, padding: "12px 16px", color: "#fff", fontSize: "0.85rem",
  width: "100%", transition: "border-color 0.2s",
};
const labelStyle: React.CSSProperties = {
  fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginBottom: 4,
  display: "block", textTransform: "uppercase", letterSpacing: "0.1em",
};

export default function BookingWidget() {
  const [tab, setTab] = useState<Tab>("flight");
  const [ft, setFt] = useState<FType>("return");

  const tabs: { id: Tab; label: string; shortLabel: string; icon: React.ReactNode }[] = [
    { id: "flight", label: "Book a Flight", shortLabel: "Flight", icon: <Plane size={15} /> },
    { id: "stopover", label: "Stopover", shortLabel: "Stopover", icon: <MapPin size={15} /> },
    { id: "manage", label: "Manage / Check-in", shortLabel: "Manage", icon: <CalendarDays size={15} /> },
  ];

  return (
    <section id="booking" className="booking-section">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
        style={{ background: "rgba(10,15,30,0.88)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ flex: 1, padding: "16px 8px", background: "none", border: "none", color: tab === t.id ? "#fff" : "rgba(255,255,255,0.4)", fontSize: "0.82rem", fontWeight: tab === t.id ? 600 : 400, cursor: "pointer", position: "relative", transition: "color 0.2s", borderBottom: tab === t.id ? "2px solid #8e2157" : "2px solid transparent", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              {t.icon}
              <span className="tab-label-full">{t.label}</span>
              <span className="tab-label-short">{t.shortLabel}</span>
            </button>
          ))}
        </div>

        <div className="booking-inner">
          <AnimatePresence mode="wait">
            {tab === "flight" && (
              <motion.div key="flight" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
                {/* Radio */}
                <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
                  {(["return", "one-way", "multi-city"] as FType[]).map(f => (
                    <label key={f} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                      <div onClick={() => setFt(f)} style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${ft === f ? "#8e2157" : "rgba(255,255,255,0.3)"}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
                        {ft === f && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#8e2157" }} />}
                      </div>
                      <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", textTransform: "capitalize" }}>{f.replace("-", " ")}</span>
                    </label>
                  ))}
                </div>

                {/* Fields */}
                <div className="booking-fields">
                  {["From", "To", "Departure", ...(ft === "return" ? ["Return"] : [])].map(lbl => (
                    <div key={lbl}>
                      <label style={labelStyle}>{lbl}</label>
                      <input type={lbl.includes("ture") || lbl === "Return" ? "date" : "text"} placeholder={lbl.includes("ture") || lbl === "Return" ? "" : "City or airport"} style={inputStyle} />
                    </div>
                  ))}
                </div>

                <div className="booking-bottom">
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <label style={labelStyle}>Passengers & Class</label>
                    <select style={{ ...inputStyle, width: "100%" }}>
                      <option>1 Passenger · Economy</option>
                      <option>2 Passengers · Economy</option>
                      <option>1 Passenger · Business</option>
                      <option>1 Passenger · First</option>
                    </select>
                  </div>
                  <button style={{ background: "linear-gradient(135deg,#8e2157,#c0396e)", border: "none", borderRadius: 999, padding: "14px 28px", color: "#fff", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", boxShadow: "0 6px 24px rgba(142,33,87,0.35)", transition: "opacity 0.2s, transform 0.2s", whiteSpace: "nowrap", flexShrink: 0 }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "scale(1.03)"; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}>
                    Search Flights
                  </button>
                </div>
              </motion.div>
            )}

            {tab === "stopover" && (
              <motion.div key="stopover" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", marginBottom: 20 }}>Explore Websico during your journey with amazing stopover packages from USD 14pp.</p>
                <div className="booking-fields">
                  {["From", "To", "Departure"].map(lbl => (
                    <div key={lbl}>
                      <label style={labelStyle}>{lbl}</label>
                      <input type={lbl === "Departure" ? "date" : "text"} placeholder={lbl === "Departure" ? "" : "City or airport"} style={inputStyle} />
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
                  <button style={{ background: "linear-gradient(135deg,#8e2157,#c0396e)", border: "none", borderRadius: 999, padding: "14px 28px", color: "#fff", fontWeight: 700, cursor: "pointer", width: "100%" }}
                    className="booking-btn-full">
                    Search Stopover
                  </button>
                </div>
              </motion.div>
            )}

            {tab === "manage" && (
              <motion.div key="manage" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
                <div className="booking-fields">
                  {["Booking Reference", "Last Name"].map(lbl => (
                    <div key={lbl}>
                      <label style={labelStyle}>{lbl}</label>
                      <input placeholder={lbl === "Booking Reference" ? "e.g. ABC123" : "Passenger last name"} style={inputStyle} />
                    </div>
                  ))}
                  <button style={{ background: "linear-gradient(135deg,#8e2157,#c0396e)", border: "none", borderRadius: 999, padding: "14px 28px", color: "#fff", fontWeight: 700, cursor: "pointer", alignSelf: "flex-end" }}>
                    Retrieve Booking
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <style>{`
        .booking-section {
          position: relative;
          z-index: 20;
          margin-top: -64px;
          padding: 0 32px;
          max-width: 1100px;
          margin-left: auto;
          margin-right: auto;
          margin-top: -64px;
        }
        .booking-inner { padding: 24px 28px; }
        .booking-fields {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 12px;
          margin-bottom: 16px;
          align-items: end;
        }
        .booking-bottom {
          display: flex;
          align-items: flex-end;
          gap: 12px;
        }
        .tab-label-short { display: none; }
        .tab-label-full { display: inline; }
        @media (max-width: 640px) {
          .booking-section { padding: 0 16px; margin-top: -48px; }
          .booking-inner { padding: 18px 16px; }
          .booking-fields { grid-template-columns: 1fr 1fr; gap: 10px; }
          .booking-bottom { flex-direction: column; align-items: stretch; }
          .booking-bottom > div { width: 100%; }
          .booking-bottom button { width: 100%; }
          .tab-label-short { display: inline; }
          .tab-label-full { display: none; }
          .booking-btn-full { width: 100% !important; }
        }
        @media (max-width: 400px) {
          .booking-fields { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
