"use client";
const socialIcons = [
  { label: "Facebook", svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
  { label: "X", svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { label: "LinkedIn", svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
  { label: "YouTube", svg: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0a0f1e"/></svg> },
];

const links: Record<string, string[]> = {
  "Destinations": ["Europe", "Africa", "Asia", "Americas", "Middle East"],
  "Travel Info": ["Travel Requirements", "Baggage", "Check-in", "Our Partners"],
  "Experience": ["Business Class", "Economy Class", "Websico Stopover", "Loyalty Program"],
  "Company": ["About Us", "Careers", "Press", "Contact Us"],
};

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: 8, background: "#0a0f1e", color: "#fff" }}>
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#8e2157">
                <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2A1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1l3.5 1v-1.5L13 19v-5.5z" />
              </svg>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.15em" }}>WEBSICO</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", lineHeight: 1.7, marginBottom: 20 }}>Connecting the world, one flight at a time.</p>
            <div style={{ display: "flex", gap: 10 }}>
              {socialIcons.map(({ svg, label }) => (
                <a key={label} href="#" aria-label={label}
                  style={{ width: 38, height: 38, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)", transition: "all 0.2s", textDecoration: "none" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#8e2157"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}>
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="footer-links">
            {Object.entries(links).map(([title, items]) => (
              <div key={title}>
                <p style={{ fontSize: "0.72rem", color: "#8e2157", textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 16, fontWeight: 600 }}>{title}</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {items.map(item => (
                    <li key={item}>
                      <a href="#" style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.875rem", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                        onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>© 2026 Websico Airways. All rights reserved.</p>
          <div className="footer-legal">
            {["Privacy Policy", "Terms of Use", "Cookie Settings"].map(item => (
              <a key={item} href="#" style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.8rem", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 56px 48px 32px;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 3fr;
          gap: 48px;
          margin-bottom: 48px;
        }
        .footer-links {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        .footer-legal { display: flex; gap: 20px; flex-wrap: wrap; }

        @media (max-width: 900px) {
          .footer-inner { padding: 40px 24px 28px; }
          .footer-grid { grid-template-columns: 1fr; gap: 32px; }
          .footer-links { grid-template-columns: repeat(2, 1fr); gap: 20px; }
        }
        @media (max-width: 480px) {
          .footer-inner { padding: 32px 16px 24px; }
          .footer-links { grid-template-columns: repeat(2, 1fr); gap: 16px; }
          .footer-bottom { flex-direction: column; align-items: flex-start; }
          .footer-legal { gap: 14px; }
        }
      `}</style>
    </footer>
  );
}
