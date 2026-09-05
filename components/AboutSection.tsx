"use client";
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";

const MAPS_QUERY = encodeURIComponent("อายุน้อยร้อยโรตี มหาสารคาม");
const MAPS_EMBED = `https://maps.google.com/maps?q=${MAPS_QUERY}&t=&z=17&ie=UTF8&iwloc=&output=embed`;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

const infoItems = [
  {
    icon: <Clock size={20} color="#027361" />,
    label: "เวลาให้บริการ",
    value: "16:30 – 21:30 น.",
    sub: "เปิดทุกวัน (ยกเว้น วันเสาร์)",
  },
  {
    icon: <Phone size={20} color="#027361" />,
    label: "โทรศัพท์",
    value: "062 498 2749",
    sub: "โทรสั่งล่วงหน้าได้เลย",
    href: "tel:0624982749",
  },
  {
    icon: <MapPin size={20} color="#027361" />,
    label: "ที่อยู่",
    value: "210 ซอย ศรีสวัสดิ์ดำเนิน",
    sub: "ตำบลตลาด อำเภอเมืองมหาสารคาม มหาสารคาม 44000",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{ backgroundColor: "#111111", padding: "5rem 1.5rem", color: "#fff" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: "rgba(2,115,97,0.2)",
              color: "#04a882",
              fontSize: 13,
              fontWeight: 700,
              padding: "0.3rem 1rem",
              borderRadius: 100,
              marginBottom: "0.75rem",
              letterSpacing: "0.08em",
            }}
          >
            เกี่ยวกับเรา
          </span>
          <h2
            style={{
              color: "#ffffff",
              fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
              fontWeight: 800,
              margin: 0,
            }}
          >
            ร้าน{" "}
            <span style={{ color: "#04a882" }}>อายุน้อย</span>
            <span style={{ color: "#f87171" }}>ร้อยโรตี</span>
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              marginTop: "0.75rem",
              fontSize: 15,
              maxWidth: 480,
              margin: "0.75rem auto 0",
              lineHeight: 1.7,
            }}
          >
            เราคือร้าน<span style={{ color: "#fca5a5", fontWeight: 700 }}>โรตี</span>ต้นตำรับ
            ที่นำรสชาติแท้จาก<span style={{ color: "#04a882", fontWeight: 700 }}>แดนใต้</span>
            มาฝากคนมหาสารคาม ทำสดทุกวัน วัตถุดิบคัดสรร
          </p>
        </div>

        {/* Grid: Info + Map */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            alignItems: "start",
          }}
        >
          {/* Info cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {infoItems.map((item, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16,
                  padding: "1.25rem",
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.backgroundColor = "rgba(2,115,97,0.1)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(2,115,97,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.backgroundColor = "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: "rgba(2,115,97,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 12, margin: "0 0 0.2rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      style={{ color: "#ffffff", fontWeight: 700, fontSize: 16, textDecoration: "none", display: "block" }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p style={{ color: "#ffffff", fontWeight: 700, fontSize: 16, margin: 0 }}>{item.value}</p>
                  )}
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, margin: "0.2rem 0 0", lineHeight: 1.5 }}>
                    {item.sub}
                  </p>
                </div>
              </div>
            ))}

            {/* Navigate button */}
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              id="navigate-btn"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.6rem",
                background: "linear-gradient(135deg, #027361, #04a882)",
                color: "#fff",
                padding: "0.85rem",
                borderRadius: 12,
                fontWeight: 700,
                fontSize: 15,
                fontFamily: "Noto Sans Thai, sans-serif",
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(2,115,97,0.3)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "0.88";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              }}
            >
              <ExternalLink size={16} />
              นำทางด้วย Google Maps
            </a>
          </div>

          {/* Map */}
          <div
            style={{
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            <iframe
              src={MAPS_EMBED}
              width="100%"
              height="380"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ที่ตั้งร้านอายุน้อยร้อยโรตี"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
