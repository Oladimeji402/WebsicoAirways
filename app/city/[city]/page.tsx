"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

type FType = "return" | "one-way" | "multi-city";

const inputStyle: React.CSSProperties = {
  background: "#f5f5f5", border: "1px solid #ddd",
  borderRadius: 10, padding: "10px 14px", color: "#111", fontSize: "0.85rem",
  width: "100%", outline: "none",
};
const labelStyle: React.CSSProperties = {
  fontSize: "0.68rem", color: "#666", marginBottom: 4,
  display: "block", textTransform: "uppercase", letterSpacing: "0.1em",
};

type CityData = {
  name: string; country: string; region: string; regionSlug: string;
  hero: string; tagline: string; description: string;
  highlights: { label: string; img: string }[];
  facts: { icon: string; label: string; value: string }[];
};

const cityData: Record<string, CityData> = {
  "new-york": {
    name: "New York", country: "United States", region: "The Americas", regionSlug: "americas",
    hero: "/destinations/new-york.jpg",
    tagline: "The city that never sleeps",
    description: "New York City is one of the world's most iconic destinations — a dazzling metropolis of towering skyscrapers, world-class museums, legendary cuisine, and an energy unlike anywhere else on Earth. From the bright lights of Times Square and the serenity of Central Park to the cultural richness of Brooklyn and the Statue of Liberty standing tall in the harbour, New York is a city that has something for everyone.",
    highlights: [
      { label: "Times Square", img: "/destinations/new-york.jpg" },
      { label: "Central Park", img: "/destinations/new-york.jpg" },
      { label: "Brooklyn Bridge", img: "/destinations/new-york.jpg" },
      { label: "Statue of Liberty", img: "/destinations/new-york.jpg" },
    ],
    facts: [
      { icon: "✈️", label: "Flight time", value: "~13 hrs from Doha" },
      { icon: "🌡️", label: "Best time to visit", value: "Apr – Jun, Sep – Nov" },
      { icon: "💱", label: "Currency", value: "US Dollar (USD)" },
      { icon: "🗣️", label: "Language", value: "English" },
    ],
  },
  "maldives": {
    name: "Maldives", country: "Maldives", region: "Asia and the Pacific", regionSlug: "asia-pacific",
    hero: "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tagline: "Paradise found in the Indian Ocean",
    description: "The Maldives is the ultimate tropical escape — a breathtaking archipelago of over 1,000 coral islands scattered across the Indian Ocean. With crystal-clear turquoise lagoons, pristine white-sand beaches, and some of the world's finest overwater bungalows, the Maldives is a destination that defines luxury and natural beauty. Whether you're snorkelling with manta rays, watching the sunset from your private villa, or simply unwinding on the beach, the Maldives is pure paradise.",
    highlights: [
      { label: "Overwater Villas", img: "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { label: "Coral Reefs", img: "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { label: "Sunset Cruises", img: "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { label: "Snorkelling", img: "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=600" },
    ],
    facts: [
      { icon: "✈️", label: "Flight time", value: "~4 hrs from Doha" },
      { icon: "🌡️", label: "Best time to visit", value: "Nov – Apr" },
      { icon: "💱", label: "Currency", value: "Maldivian Rufiyaa (MVR)" },
      { icon: "🗣️", label: "Language", value: "Dhivehi, English" },
    ],
  },
  "dallas": {
    name: "Dallas", country: "United States", region: "The Americas", regionSlug: "americas",
    hero: "https://images.pexels.com/photos/1570099/pexels-photo-1570099.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tagline: "Big city energy, Texas style",
    description: "Dallas is a dynamic, fast-growing city that blends Southern charm with cosmopolitan flair. Home to world-class arts districts, a thriving food scene, and iconic sports culture, Dallas is a city that surprises and delights at every turn. Explore the historic Sixth Floor Museum, stroll through the vibrant Deep Ellum neighbourhood, or catch a Cowboys game — Dallas delivers an authentic Texas experience with big-city sophistication.",
    highlights: [
      { label: "Deep Ellum", img: "https://images.pexels.com/photos/1570099/pexels-photo-1570099.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { label: "Arts District", img: "https://images.pexels.com/photos/1570099/pexels-photo-1570099.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { label: "Reunion Tower", img: "https://images.pexels.com/photos/1570099/pexels-photo-1570099.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { label: "Sixth Floor Museum", img: "https://images.pexels.com/photos/1570099/pexels-photo-1570099.jpeg?auto=compress&cs=tinysrgb&w=600" },
    ],
    facts: [
      { icon: "✈️", label: "Flight time", value: "~16 hrs from Doha" },
      { icon: "🌡️", label: "Best time to visit", value: "Mar – May, Sep – Nov" },
      { icon: "💱", label: "Currency", value: "US Dollar (USD)" },
      { icon: "🗣️", label: "Language", value: "English" },
    ],
  },
  "delhi": {
    name: "Delhi", country: "India", region: "Asia and the Pacific", regionSlug: "asia-pacific",
    hero: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tagline: "Where ancient history meets modern India",
    description: "Delhi, India's sprawling capital, is a city of extraordinary contrasts — where Mughal monuments stand alongside modern skyscrapers, and ancient bazaars buzz with life next to sleek shopping malls. From the majestic Red Fort and the serene Lotus Temple to the chaotic charm of Chandni Chowk and the leafy boulevards of Lutyens' Delhi, the city offers an immersive journey through thousands of years of history, culture, and culinary tradition.",
    highlights: [
      { label: "Red Fort", img: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { label: "Qutub Minar", img: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { label: "Chandni Chowk", img: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { label: "Lotus Temple", img: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=600" },
    ],
    facts: [
      { icon: "✈️", label: "Flight time", value: "~4 hrs from Doha" },
      { icon: "🌡️", label: "Best time to visit", value: "Oct – Mar" },
      { icon: "💱", label: "Currency", value: "Indian Rupee (INR)" },
      { icon: "🗣️", label: "Language", value: "Hindi, English" },
    ],
  },
  "jeddah": {
    name: "Jeddah", country: "Saudi Arabia", region: "Middle East", regionSlug: "middle-east",
    hero: "https://images.pexels.com/photos/3214995/pexels-photo-3214995.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tagline: "Gateway to the holy cities, jewel of the Red Sea",
    description: "Jeddah is Saudi Arabia's most cosmopolitan city — a vibrant port on the Red Sea that serves as the gateway to Mecca and Medina. The city seamlessly blends its rich Islamic heritage with a modern, outward-looking spirit. Explore the UNESCO-listed Al-Balad historic district with its ornate coral buildings, stroll along the stunning Corniche waterfront, or dive into the world-class coral reefs of the Red Sea. Jeddah is a city of warmth, culture, and discovery.",
    highlights: [
      { label: "Al-Balad Old Town", img: "https://images.pexels.com/photos/3214995/pexels-photo-3214995.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { label: "King Fahd Fountain", img: "https://images.pexels.com/photos/3214995/pexels-photo-3214995.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { label: "Red Sea Corniche", img: "https://images.pexels.com/photos/3214995/pexels-photo-3214995.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { label: "Floating Mosque", img: "https://images.pexels.com/photos/3214995/pexels-photo-3214995.jpeg?auto=compress&cs=tinysrgb&w=600" },
    ],
    facts: [
      { icon: "✈️", label: "Flight time", value: "~2.5 hrs from Doha" },
      { icon: "🌡️", label: "Best time to visit", value: "Nov – Feb" },
      { icon: "💱", label: "Currency", value: "Saudi Riyal (SAR)" },
      { icon: "🗣️", label: "Language", value: "Arabic, English" },
    ],
  },
  "toronto": {
    name: "Toronto", country: "Canada", region: "The Americas", regionSlug: "americas",
    hero: "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tagline: "Canada's most diverse and dynamic city",
    description: "Toronto is one of the world's most multicultural cities — a vibrant, welcoming metropolis on the shores of Lake Ontario. Home to the iconic CN Tower, world-class museums, a thriving arts scene, and neighbourhoods that reflect cultures from every corner of the globe, Toronto is a city that constantly surprises. Whether you're exploring the trendy Distillery District, catching a Raptors game, or sampling cuisine from over 200 nationalities, Toronto delivers an unforgettable urban experience.",
    highlights: [
      { label: "CN Tower", img: "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { label: "Distillery District", img: "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { label: "Kensington Market", img: "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { label: "Royal Ontario Museum", img: "https://images.pexels.com/photos/1486222/pexels-photo-1486222.jpeg?auto=compress&cs=tinysrgb&w=600" },
    ],
    facts: [
      { icon: "✈️", label: "Flight time", value: "~14 hrs from Doha" },
      { icon: "🌡️", label: "Best time to visit", value: "Jun – Sep" },
      { icon: "💱", label: "Currency", value: "Canadian Dollar (CAD)" },
      { icon: "🗣️", label: "Language", value: "English, French" },
    ],
  },
  "phnom-penh": {
    name: "Phnom Penh", country: "Cambodia", region: "Asia and the Pacific", regionSlug: "asia-pacific",
    hero: "https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tagline: "The Pearl of Asia, reborn and resilient",
    description: "Phnom Penh, Cambodia's capital, is a city of remarkable resilience and beauty. Set at the confluence of the Mekong and Tonlé Sap rivers, the city blends French colonial architecture with glittering Buddhist temples and a buzzing riverside scene. Visit the magnificent Royal Palace, pay respects at the sobering Tuol Sleng Genocide Museum, or simply wander the vibrant street markets and riverside promenade as the sun sets over the Mekong.",
    highlights: [
      { label: "Royal Palace", img: "https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { label: "Riverside Promenade", img: "https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { label: "Central Market", img: "https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { label: "Silver Pagoda", img: "https://images.pexels.com/photos/3889843/pexels-photo-3889843.jpeg?auto=compress&cs=tinysrgb&w=600" },
    ],
    facts: [
      { icon: "✈️", label: "Flight time", value: "~7 hrs from Doha" },
      { icon: "🌡️", label: "Best time to visit", value: "Nov – Apr" },
      { icon: "💱", label: "Currency", value: "Cambodian Riel (KHR)" },
      { icon: "🗣️", label: "Language", value: "Khmer, English" },
    ],
  },
  "tokyo": {
    name: "Tokyo", country: "Japan", region: "Asia and the Pacific", regionSlug: "asia-pacific",
    hero: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tagline: "Where tradition and the future collide",
    description: "Tokyo is one of the world's most extraordinary cities — a seamless fusion of ancient tradition and cutting-edge modernity. From the serene temples of Asakusa and the cherry blossom-lined paths of Shinjuku Gyoen to the neon-drenched streets of Shibuya and the world's finest sushi counters, Tokyo is a city that overwhelms the senses in the best possible way. Every neighbourhood tells a different story, and every visit reveals something new.",
    highlights: [
      { label: "Shibuya Crossing", img: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { label: "Senso-ji Temple", img: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { label: "Shinjuku", img: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { label: "Mount Fuji", img: "https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=600" },
    ],
    facts: [
      { icon: "✈️", label: "Flight time", value: "~10 hrs from Doha" },
      { icon: "🌡️", label: "Best time to visit", value: "Mar – May, Sep – Nov" },
      { icon: "💱", label: "Currency", value: "Japanese Yen (JPY)" },
      { icon: "🗣️", label: "Language", value: "Japanese" },
    ],
  },
  "alula": {
    name: "AlUla", country: "Saudi Arabia", region: "Middle East", regionSlug: "middle-east",
    hero: "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tagline: "Arabia's ancient wonder, newly revealed",
    description: "AlUla is one of the world's most extraordinary emerging destinations — a vast, dramatic landscape of rose-red sandstone mountains, ancient Nabataean tombs, and lush oasis valleys in the heart of northwest Saudi Arabia. Home to Hegra, Saudi Arabia's first UNESCO World Heritage Site, AlUla is a place where 200,000 years of human history is written in the rock. Explore monumental tombs, stargazing camps, and world-class art installations set against a backdrop of breathtaking natural beauty.",
    highlights: [
      { label: "Hegra (Mada'in Salih)", img: "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { label: "Elephant Rock", img: "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { label: "Old Town AlUla", img: "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=600" },
      { label: "Stargazing Desert", img: "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=600" },
    ],
    facts: [
      { icon: "✈️", label: "Flight time", value: "~3 hrs from Doha" },
      { icon: "🌡️", label: "Best time to visit", value: "Oct – Mar" },
      { icon: "💱", label: "Currency", value: "Saudi Riyal (SAR)" },
      { icon: "🗣️", label: "Language", value: "Arabic, English" },
    ],
  },
};

function BookingBar({ cityName }: { cityName: string }) {
  const [ft, setFt] = useState<FType>("return");
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
      <div className="city-booking-fields">
        <div>
          <label style={labelStyle}>From</label>
          <input type="text" placeholder="City or airport" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>To</label>
          <input type="text" defaultValue={cityName} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Departure</label>
          <input type="date" style={inputStyle} />
        </div>
        {ft === "return" && (
          <div>
            <label style={labelStyle}>Return</label>
            <input type="date" style={inputStyle} />
          </div>
        )}
        <div>
          <label style={labelStyle}>Passengers & Class</label>
          <select style={inputStyle}>
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

export default function CityPage() {
  const params = useParams();
  const slug = (params.city as string) || "";
  const data = cityData[slug];

  if (!data) {
    return (
      <>
        <Navbar />
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>City not found</h1>
          <Link href="/" style={{ color: "#c0396e", fontWeight: 600 }}>Back to Home</Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${data.hero})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 50%, rgba(10,15,30,0.92) 100%)" }} />

        <div className="city-hero-content" style={{ position: "relative", zIndex: 10, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", maxWidth: 1280, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <p style={{ color: "#8e2157", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 10 }}>
              {data.country}
            </p>
            <h1 style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 800, color: "#fff", lineHeight: 1.05, marginBottom: 8 }}>
              Flights to {data.name}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem", marginBottom: 32 }}>{data.tagline}</p>
            <BookingBar cityName={data.name} />
          </motion.div>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 30C1200 60 960 0 720 15C480 30 240 60 0 30L0 60Z" fill="#0a0f1e" />
          </svg>
        </div>
      </section>

      {/* Breadcrumb + description */}
      <section style={{ padding: "40px 48px 0", maxWidth: 1280, margin: "0 auto" }} className="city-section">
        <nav style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", marginBottom: 24, flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "rgba(255,255,255,0.4)", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>Home</Link>
          <span>/</span>
          <Link href={`/destinations/${data.regionSlug}`} style={{ color: "rgba(255,255,255,0.4)", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>
            {data.region}
          </Link>
          <span>/</span>
          <span style={{ color: "#fff" }}>{data.name}</span>
        </nav>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.95rem", maxWidth: 860, lineHeight: 1.8 }}>
          {data.description}
        </motion.p>
      </section>

      {/* Quick facts */}
      <section style={{ padding: "40px 48px 0", maxWidth: 1280, margin: "0 auto" }} className="city-section">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
          {data.facts.map((f, i) => (
            <motion.div key={f.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "18px 20px" }}>
              <span style={{ fontSize: "1.4rem" }}>{f.icon}</span>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: 10, marginBottom: 4 }}>{f.label}</p>
              <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.9rem" }}>{f.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Highlights grid */}
      <section style={{ padding: "48px 48px 80px", maxWidth: 1280, margin: "0 auto" }} className="city-section">
        <h2 className="gradient-text" style={{ fontSize: "2rem", fontWeight: 800, marginBottom: 32 }}>
          Highlights of {data.name}
        </h2>
        <div className="city-highlights-grid">
          {data.highlights.map((h, i) => (
            <motion.div key={h.label} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.5 + i * 0.08 }}
              style={{ position: "relative", borderRadius: 16, overflow: "hidden", cursor: "pointer", height: 260 }}
              className="dest-card">
              <motion.img src={h.img} alt={h.label}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                whileHover={{ scale: 1.07 }} transition={{ duration: 0.5 }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "16px 18px" }}>
                <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}>{h.label}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />

      <style>{`
        .dest-card:hover img { transform: scale(1.07); }
        .city-hero-content { padding: 0 48px 60px; }
        .city-section { padding-left: 48px !important; padding-right: 48px !important; }
        .city-booking-fields {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 10px;
          align-items: end;
        }
        .city-highlights-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 900px) {
          .city-hero-content { padding: 0 24px 40px; }
          .city-section { padding-left: 24px !important; padding-right: 24px !important; }
          .city-highlights-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .city-hero-content { padding: 0 16px 32px; }
          .city-section { padding-left: 16px !important; padding-right: 16px !important; }
          .city-booking-fields { grid-template-columns: 1fr 1fr; }
          .city-booking-fields button { grid-column: 1 / -1; }
        }
        @media (max-width: 480px) {
          .city-highlights-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .city-highlights-grid > div { height: 180px !important; }
          .city-booking-fields { grid-template-columns: 1fr; }
        }
        @media (hover: none) {
          .dest-card img { transform: none !important; }
        }
      `}</style>
    </>
  );
}
