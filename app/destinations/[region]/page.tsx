"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

type FType = "return" | "one-way" | "multi-city";

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: 10, padding: "10px 14px", color: "#fff", fontSize: "0.85rem",
  width: "100%", outline: "none",
};
const labelStyle: React.CSSProperties = {
  fontSize: "0.68rem", color: "rgba(255,255,255,0.45)", marginBottom: 4,
  display: "block", textTransform: "uppercase", letterSpacing: "0.1em",
};

type City = { name: string; img: string; country: string };
type RegionEntry = {
  title: string; subtitle: string; hero: string; description: string;
  cities: City[];
};

const regionData: Record<string, RegionEntry> = {
  europe: {
    title: "Europe",
    subtitle: "Journey through timeless cities and scenic landscapes",
    hero: "/hero/hero-4.jpg",
    description: "Be captivated by the everlasting charm of Europe. Discover a world of culture, history, and breathtaking scenery as you explore iconic landmarks, charming villages, and vibrant cities. Europe is home to some of the most beautiful and renowned places on Earth. From the Mediterranean coasts of Cyprus and Greece to the Northern lights of Scandinavia, there is no matter where you decide to fly — Europe is sure to captivate you.",
    cities: [
      { name: "London", country: "United Kingdom", img: "/destinations/london.jpg" },
      { name: "Paris", country: "France", img: "/destinations/paris.jpg" },
      { name: "Munich", country: "Germany", img: "https://images.pexels.com/photos/109629/pexels-photo-109629.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Yerevan", country: "Armenia", img: "https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Vienna", country: "Austria", img: "https://images.pexels.com/photos/1127119/pexels-photo-1127119.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Baku", country: "Azerbaijan", img: "https://images.pexels.com/photos/4388164/pexels-photo-4388164.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Brussels", country: "Belgium", img: "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Sarajevo", country: "Bosnia", img: "https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Sofia", country: "Bulgaria", img: "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Split", country: "Croatia", img: "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Zagreb", country: "Croatia", img: "https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Dubrovnik", country: "Croatia", img: "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Larnaca", country: "Cyprus", img: "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Copenhagen", country: "Denmark", img: "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Helsinki", country: "Finland", img: "https://images.pexels.com/photos/1127119/pexels-photo-1127119.jpeg?auto=compress&cs=tinysrgb&w=600" },
    ],
  },
  americas: {
    title: "The Americas",
    subtitle: "From the Big Apple to the Amazon rainforest",
    hero: "/hero/hero-1.jpg",
    description: "The Americas span a more eclectic cultural spectrum than any other region on Earth. From the imposing skyscrapers of New York and the vibrant rhythms of Rio de Janeiro, to the ancient ruins of Machu Picchu and the vast wilderness of Patagonia — the Americas offer an unparalleled diversity of experiences for every kind of traveller.",
    cities: [
      { name: "New York", country: "USA", img: "/destinations/new-york.jpg" },
      { name: "Washington D.C.", country: "USA", img: "/destinations/washington.jpg" },
      { name: "Los Angeles", country: "USA", img: "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Chicago", country: "USA", img: "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Dallas", country: "USA", img: "https://images.pexels.com/photos/1570099/pexels-photo-1570099.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Miami", country: "USA", img: "https://images.pexels.com/photos/421927/pexels-photo-421927.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Toronto", country: "Canada", img: "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Montreal", country: "Canada", img: "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "São Paulo", country: "Brazil", img: "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Buenos Aires", country: "Argentina", img: "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Bogotá", country: "Colombia", img: "https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Lima", country: "Peru", img: "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=600" },
    ],
  },
  africa: {
    title: "Africa",
    subtitle: "Wild landscapes, ancient cultures, and vibrant cities",
    hero: "/hero/hero-2.jpg",
    description: "Africa is a continent of extraordinary contrasts — from the sweeping Sahara Desert and the lush Congo rainforest to the iconic savannahs of the Serengeti and the cosmopolitan energy of Cape Town and Nairobi. Rich in history, culture, and natural wonders, Africa offers travellers an experience unlike anywhere else on the planet.",
    cities: [
      { name: "Cairo", country: "Egypt", img: "https://images.pexels.com/photos/3214995/pexels-photo-3214995.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Cape Town", country: "South Africa", img: "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Nairobi", country: "Kenya", img: "https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Lagos", country: "Nigeria", img: "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Casablanca", country: "Morocco", img: "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Accra", country: "Ghana", img: "https://images.pexels.com/photos/1570099/pexels-photo-1570099.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Addis Ababa", country: "Ethiopia", img: "https://images.pexels.com/photos/3214995/pexels-photo-3214995.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Dar es Salaam", country: "Tanzania", img: "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Johannesburg", country: "South Africa", img: "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=600" },
    ],
  },
  "middle-east": {
    title: "Middle East",
    subtitle: "Where ancient heritage meets modern ambition",
    hero: "/hero/hero-3.jpg",
    description: "The Middle East is a region of remarkable diversity — where ancient civilisations and modern skylines coexist in harmony. From the golden dunes of the Arabian Desert and the historic streets of Jerusalem to the futuristic towers of Dubai and the cultural richness of Beirut, the Middle East captivates every traveller with its warmth, hospitality, and timeless allure.",
    cities: [
      { name: "Dubai", country: "UAE", img: "/destinations/dubai.jpg" },
      { name: "Abu Dhabi", country: "UAE", img: "https://images.pexels.com/photos/3214995/pexels-photo-3214995.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Riyadh", country: "Saudi Arabia", img: "https://images.pexels.com/photos/3214995/pexels-photo-3214995.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Jeddah", country: "Saudi Arabia", img: "https://images.pexels.com/photos/3214995/pexels-photo-3214995.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "AlUla", country: "Saudi Arabia", img: "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Doha", country: "Qatar", img: "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Kuwait City", country: "Kuwait", img: "https://images.pexels.com/photos/1570099/pexels-photo-1570099.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Muscat", country: "Oman", img: "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Beirut", country: "Lebanon", img: "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Amman", country: "Jordan", img: "https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=600" },
    ],
  },
  "asia-pacific": {
    title: "Asia and the Pacific",
    subtitle: "Ancient traditions, modern wonders, and island paradise",
    hero: "/hero/hero-2.jpg",
    description: "Asia and the Pacific is the world's most diverse region — a tapestry of ancient temples, futuristic megacities, pristine beaches, and lush rainforests. From the neon-lit streets of Tokyo and the spiritual serenity of Bali to the breathtaking landscapes of New Zealand and the vibrant culture of India, this region promises an adventure at every turn.",
    cities: [
      { name: "Tokyo", country: "Japan", img: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Beijing", country: "China", img: "/destinations/guangzhou.jpg" },
      { name: "Guangzhou", country: "China", img: "/destinations/guangzhou.jpg" },
      { name: "Singapore", country: "Singapore", img: "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Bangkok", country: "Thailand", img: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Bali", country: "Indonesia", img: "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Delhi", country: "India", img: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Mumbai", country: "India", img: "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Sydney", country: "Australia", img: "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Auckland", country: "New Zealand", img: "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Maldives", country: "Maldives", img: "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { name: "Phnom Penh", country: "Cambodia", img: "https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=600" },
    ],
  },
};

function BookingBar({ region }: { region: string }) {
  const [ft, setFt] = useState<FType>("return");
  const regionLabel: Record<string, string> = {
    europe: "Europe", americas: "Americas", africa: "Africa",
    "middle-east": "Middle East", "asia-pacific": "Asia Pacific",
  };
  return (
    <div style={{ background: "rgba(255,255,255,0.95)", borderRadius: 16, padding: "20px 20px", boxShadow: "0 8px 40px rgba(0,0,0,0.25)", color: "#111" }}>
      <div style={{ display: "flex", gap: 16, marginBottom: 14, flexWrap: "wrap" }}>
        {(["return", "one-way", "multi-city"] as FType[]).map(f => (
          <label key={f} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: "0.85rem" }}>
            <div onClick={() => setFt(f)} style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${ft === f ? "#8e2157" : "#ccc"}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
              {ft === f && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#8e2157" }} />}
            </div>
            <span style={{ textTransform: "capitalize", color: "#333" }}>{f.replace("-", " ")}</span>
          </label>
        ))}
      </div>
      <div className="region-booking-fields">
        <div>
          <label style={{ ...labelStyle, color: "#666" }}>From</label>
          <input type="text" placeholder="City or airport" style={{ ...inputStyle, background: "#f5f5f5", border: "1px solid #ddd", color: "#111" }} />
        </div>
        <div>
          <label style={{ ...labelStyle, color: "#666" }}>To</label>
          <input type="text" defaultValue={regionLabel[region] || ""} style={{ ...inputStyle, background: "#f5f5f5", border: "1px solid #ddd", color: "#111" }} />
        </div>
        <div>
          <label style={{ ...labelStyle, color: "#666" }}>Departure</label>
          <input type="date" style={{ ...inputStyle, background: "#f5f5f5", border: "1px solid #ddd", color: "#111" }} />
        </div>
        {ft === "return" && (
          <div>
            <label style={{ ...labelStyle, color: "#666" }}>Return</label>
            <input type="date" style={{ ...inputStyle, background: "#f5f5f5", border: "1px solid #ddd", color: "#111" }} />
          </div>
        )}
        <div>
          <label style={{ ...labelStyle, color: "#666" }}>Passengers & Class</label>
          <select style={{ ...inputStyle, background: "#f5f5f5", border: "1px solid #ddd", color: "#111" }}>
            <option>1 Passenger · Economy</option>
            <option>2 Passengers · Economy</option>
            <option>1 Passenger · Business</option>
          </select>
        </div>
        <button className="btn-maroon" style={{ borderRadius: 999, padding: "11px 20px", fontSize: "0.9rem", fontWeight: 700, whiteSpace: "nowrap" }}>
          Search Flights
        </button>
      </div>
    </div>
  );
}

const ITEMS_PER_PAGE = 9;

export default function RegionPage() {
  const params = useParams();
  const region = (params.region as string) || "europe";
  const data = regionData[region] || regionData.europe;
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(data.cities.length / ITEMS_PER_PAGE);
  const visibleCities = data.cities.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <>
      <Navbar />

      {/* Hero with booking widget overlay */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${data.hero})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.2) 50%, rgba(10,15,30,0.9) 100%)" }} />

        <div className="region-hero-content" style={{ position: "relative", zIndex: 10, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", maxWidth: 1280, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <p style={{ color: "#8e2157", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 10 }}>Destinations</p>
            <h1 style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 800, color: "#fff", lineHeight: 1.05, marginBottom: 8 }}>
              Flights to {data.title}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem", marginBottom: 32 }}>{data.subtitle}</p>
            <BookingBar region={region} />
          </motion.div>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 30C1200 60 960 0 720 15C480 30 240 60 0 30L0 60Z" fill="#0a0f1e" />
          </svg>
        </div>
      </section>

      {/* Breadcrumb + description */}
      <section style={{ padding: "40px 48px 0", maxWidth: 1280, margin: "0 auto" }} className="region-section">
        <nav style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", marginBottom: 24 }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.4)", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>Home</Link>
          <span>/</span>
          <span style={{ color: "rgba(255,255,255,0.55)" }}>Destinations</span>
          <span>/</span>
          <span style={{ color: "#fff" }}>{data.title}</span>
        </nav>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.95rem", maxWidth: 860, lineHeight: 1.8 }}>
          {data.description}
        </motion.p>
      </section>

      {/* Cities grid */}
      <section style={{ padding: "48px 48px 80px", maxWidth: 1280, margin: "0 auto" }} className="region-section">
        <h2 className="gradient-text" style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 32 }}>
          Destinations in {data.title}
        </h2>
        <div className="region-cities-grid">
          {visibleCities.map((city, i) => (
            <motion.div key={city.name + page}
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              style={{ position: "relative", borderRadius: 16, overflow: "hidden", cursor: "pointer", height: 220 }}
              className="dest-card">
              <motion.img src={city.img} alt={city.name}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                whileHover={{ scale: 1.07 }} transition={{ duration: 0.5 }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 18px" }}>
                <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "1rem", marginBottom: 2 }}>{city.name}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem" }}>{city.country}</p>
                <button className="btn-maroon dest-hover-content"
                  style={{ marginTop: 8, borderRadius: 999, padding: "5px 16px", fontSize: "0.75rem", opacity: 0, transition: "opacity 0.3s" }}>
                  Explore
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 40 }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} onClick={() => setPage(p)}
                style={{ width: 36, height: 36, borderRadius: "50%", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem",
                  background: p === page ? "linear-gradient(135deg,#8e2157,#c0396e)" : "rgba(255,255,255,0.08)",
                  color: p === page ? "#fff" : "rgba(255,255,255,0.5)", transition: "all 0.2s" }}>
                {p}
              </button>
            ))}
          </div>
        )}
      </section>

      <Footer />

      <style>{`
        .dest-card:hover .dest-hover-content { opacity: 1 !important; }
        .region-hero-content { padding: 0 48px 60px; }
        .region-section { padding-left: 48px !important; padding-right: 48px !important; }
        .region-booking-fields {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 10px;
          align-items: end;
        }
        .region-cities-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 900px) {
          .region-hero-content { padding: 0 24px 40px; }
          .region-section { padding-left: 24px !important; padding-right: 24px !important; }
          .region-cities-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
        }
        @media (max-width: 640px) {
          .region-hero-content { padding: 0 16px 32px; }
          .region-section { padding-left: 16px !important; padding-right: 16px !important; }
          .region-booking-fields { grid-template-columns: 1fr 1fr; }
          .region-booking-fields button { grid-column: 1 / -1; }
        }
        @media (max-width: 480px) {
          .region-cities-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
          .region-cities-grid > div { height: 160px !important; }
          .region-booking-fields { grid-template-columns: 1fr; }
        }
        @media (hover: none) {
          .dest-hover-content { opacity: 1 !important; }
        }
      `}</style>
    </>
  );
}
