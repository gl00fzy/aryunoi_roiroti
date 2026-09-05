"use client";
import { Phone, MapPin, Clock } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      id="contact"
      style={{
        backgroundColor: "#0a0a0a",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "3rem 1.5rem 2rem",
        color: "rgba(255,255,255,0.55)",
        fontFamily: "Noto Sans Thai, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "2rem",
        }}
      >
        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #027361, #04a882)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 800,
                color: "#fff",
              }}
            >
              ร
            </div>
            <div>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: 14, lineHeight: 1.2, margin: 0 }}>อายุน้อย</p>
              <p style={{ margin: 0, lineHeight: 1.2 }}>
                <span style={{ color: "#9b1315", fontWeight: 800, fontSize: 14 }}>ร้อยโรตี</span>
              </p>
            </div>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.7, margin: 0 }}>
            <span style={{ color: "#9b1315" }}>โรตี</span>ต้นตำรับแท้จาก{" "}
            <span style={{ color: "#04a882" }}>แดนใต้</span>{" "}
            ทำสดทุกวัน ในมหาสารคาม
          </p>
        </div>

        {/* Quick links */}
        <div>
          <p style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: "0.85rem" }}>เมนูหลัก</p>
          {["เมนูอาหาร", "สั่งอาหารล่วงหน้า", "เกี่ยวกับเรา", "ติดต่อเรา"].map((link, i) => (
            <a
              key={i}
              href={["#signature", "#order", "#about", "#contact"][i]}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(["#signature", "#order", "#about", "#contact"][i])?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{ display: "block", color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none", marginBottom: "0.5rem", transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#04a882")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.5)")}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Contact */}
        <div>
          <p style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: "0.85rem" }}>ติดต่อเรา</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
            <a href="tel:0624982749" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.55)", textDecoration: "none", fontSize: 13 }}>
              <Phone size={14} color="#04a882" />
              062 498 2749
            </a>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("อายุน้อยร้อยโรตี มหาสารคาม")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: 13, color: "rgba(255,255,255,0.55)", textDecoration: "none" }}
            >
              <MapPin size={14} color="#04a882" style={{ flexShrink: 0, marginTop: 2 }} />
              <span>210 ซอยศรีสวัสดิ์ดำเนิน ต.ตลาด อ.เมืองมหาสารคาม มหาสารคาม 44000</span>
            </a>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: 13 }}>
              <Clock size={14} color="#04a882" />
              <span>16:30 – 21:30 น. (ปิดวันเสาร์)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: 1100,
          margin: "2rem auto 0",
          paddingTop: "1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
          fontSize: 12,
        }}
      >
        <span>© {year} อายุน้อยร้อยโรตี · All rights reserved</span>
        <span style={{ color: "rgba(255,255,255,0.3)" }}>
          Made with ❤️ for มหาสารคาม
        </span>
      </div>
    </footer>
  );
}
