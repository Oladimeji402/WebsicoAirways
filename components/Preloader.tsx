"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
          style={{
            position: "fixed", inset: 0, background: "#0a0f1e",
            zIndex: 9999, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "2rem",
          }}
        >
          {/* Plane icon */}
          <motion.svg
            width="64" height="64" viewBox="0 0 24 24" fill="none"
            initial={{ x: -150, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2A1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1l3.5 1v-1.5L13 19v-5.5z" fill="#8e2157" />
          </motion.svg>

          {/* Brand letters */}
          <div style={{ display: "flex", gap: "3px", alignItems: "center" }}>
            {"WEBSICO AIRWAYS".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.055, duration: 0.35 }}
                style={{ fontSize: "1.8rem", fontWeight: 700, color: char === " " ? "transparent" : "#fff", letterSpacing: "0.04em", width: char === " " ? "0.6rem" : "auto" }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Progress bar */}
          <div style={{ width: 220, height: 2, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
            <motion.div
              style={{ height: "100%", background: "#8e2157", borderRadius: 2 }}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.3, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
