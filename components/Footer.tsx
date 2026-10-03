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

            {/* Social Links */}
            <div style={{ marginTop: "0.5rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: "0.5rem" }}>
                โซเชียลมีเดีย
              </p>
              <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                <a
                  href="https://www.facebook.com/AyuNoiRoiRoti"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook ร้านอายุน้อยร้อยโรตี"
                  title="Facebook: AyuNoiRoiRoti"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    backgroundColor: "#1877F2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    textDecoration: "none",
                    transition: "transform 0.2s, opacity 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)")}
                >
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/aryunoi_roiroti/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram ร้านอายุน้อยร้อยโรตี"
                  title="Instagram: @aryunoi_roiroti"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    textDecoration: "none",
                    transition: "transform 0.2s, opacity 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)")}
                >
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@aryunoiroiroti"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok ร้านอายุน้อยร้อยโรตี"
                  title="TikTok: @aryunoiroiroti"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    background: "#010101",
                    border: "1px solid rgba(255,255,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    textDecoration: "none",
                    transition: "transform 0.2s, opacity 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)")}
                >
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                  </svg>
                </a>
              </div>
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
