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

function FacebookIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
    </svg>
  );
}

const socialChannels = [
  {
    name: "Facebook",
    title: "อายุน้อยร้อยโรตี",
    handle: "AyuNoiRoiRoti",
    desc: "อัปเดตข่าวสาร เมนูใหม่ และโปรโมชั่นพิเศษของร้าน",
    href: "https://www.facebook.com/AyuNoiRoiRoti",
    actionText: "ไปยังเพจ Facebook",
    accentColor: "#1877F2",
    iconBg: "#1877F2",
    iconColor: "#ffffff",
    badgeText: "Facebook Page",
  },
  {
    name: "Instagram",
    title: "อายุน้อยร้อยโรตี",
    handle: "@aryunoi_roiroti",
    desc: "ชมรูปโรตีชวนหิว บรรยากาศร้าน และสตอรี่ความอร่อย",
    href: "https://www.instagram.com/aryunoi_roiroti/",
    actionText: "ไปยัง Instagram",
    accentColor: "#E1306C",
    iconBg: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
    iconColor: "#ffffff",
    badgeText: "Instagram",
  },
  {
    name: "TikTok",
    title: "อายุน้อยร้อยโรตี",
    handle: "@aryunoiroiroti",
    desc: "ชมคลิปทำโรตีสดใหม่สูตรปักษ์ใต้แท้ และความอร่อยเพลินๆ",
    href: "https://www.tiktok.com/@aryunoiroiroti",
    actionText: "ไปยัง TikTok",
    accentColor: "#00F2FE",
    iconBg: "linear-gradient(135deg, #010101 0%, #1a1a1a 100%)",
    iconColor: "#ffffff",
    badgeText: "TikTok Channel",
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
              margin: "0.75rem auto 0",
              lineHeight: 1.7,
            }}
            className="max-w-md md:max-w-none md:whitespace-nowrap"
          >
            เราคือร้าน<span style={{ color: "#fca5a5", fontWeight: 700 }}>โรตี</span>ต้นตำรับ
            ที่นำรสชาติแท้จาก<span style={{ color: "#04a882", fontWeight: 700 }}>แดนใต้</span>
            มาฝากคนมหาสารคาม{" "}
            <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>ทำสดทุกวัน</span>{" "}
            <span style={{ display: "inline-block", whiteSpace: "nowrap" }}>วัตถุดิบคัดสรร</span>
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
            {/* Quick social links */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.85rem 1.15rem",
                borderRadius: 12,
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                flexWrap: "wrap",
                gap: "0.6rem",
              }}
            >
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
                ติดตามเราได้ที่:
              </span>
              <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                {socialChannels.map((item) => (
                  <a
                    key={`quick-${item.name}`}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`ไปยังหน้า ${item.name} ของร้านอายุน้อยร้อยโรตี`}
                    title={`${item.name}: ${item.handle}`}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: item.iconBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: item.iconColor,
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                      boxShadow: `0 2px 8px ${item.accentColor}33`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px) scale(1.06)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0) scale(1)";
                    }}
                  >
                    {item.name === "Facebook" && <FacebookIcon size={18} />}
                    {item.name === "Instagram" && <InstagramIcon size={18} />}
                    {item.name === "TikTok" && <TikTokIcon size={18} />}
                  </a>
                ))}
              </div>
            </div>
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
              height="395"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ที่ตั้งร้านอายุน้อยร้อยโรตี"
            />
          </div>
        </div>

        {/* Social media showcase */}
        <div style={{ marginTop: "3.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
            <span
              style={{
                display: "inline-block",
                backgroundColor: "rgba(2,115,97,0.15)",
                color: "#04a882",
                fontSize: 12,
                fontWeight: 700,
                padding: "0.25rem 0.85rem",
                borderRadius: 100,
                marginBottom: "0.5rem",
                letterSpacing: "0.06em",
              }}
            >
              โซเชียลมีเดีย
            </span>
            <h3
              style={{
                color: "#ffffff",
                fontSize: "clamp(1.25rem, 3vw, 1.6rem)",
                fontWeight: 800,
                margin: "0 0 0.4rem",
              }}
            >
              ติดตามความอร่อยได้ทุกช่องทาง
            </h3>
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 14,
                margin: "0 auto",
                maxWidth: 480,
                lineHeight: 1.6,
              }}
            >
              พบกับโปรโมชั่นพิเศษ เมนูใหม่ และคลิปทำโรตีสดๆ ได้ที่เพจทางการของเรา
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {socialChannels.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`ไปยังหน้า ${item.name} ${item.handle} ของร้านอายุน้อยร้อยโรตี (เปิดหน้าต่างใหม่)`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 18,
                  padding: "1.35rem",
                  textDecoration: "none",
                  color: "#ffffff",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.backgroundColor = "rgba(255,255,255,0.07)";
                  el.style.borderColor = item.accentColor + "66";
                  el.style.transform = "translateY(-4px)";
                  el.style.boxShadow = `0 12px 28px ${item.accentColor}26`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.backgroundColor = "rgba(255,255,255,0.04)";
                  el.style.borderColor = "rgba(255,255,255,0.08)";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: item.iconBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: item.iconColor,
                        boxShadow: `0 4px 12px ${item.accentColor}33`,
                        flexShrink: 0,
                      }}
                    >
                      {item.name === "Facebook" && <FacebookIcon size={22} />}
                      {item.name === "Instagram" && <InstagramIcon size={22} />}
                      {item.name === "TikTok" && <TikTokIcon size={22} />}
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.55)",
                        backgroundColor: "rgba(255,255,255,0.06)",
                        padding: "0.25rem 0.65rem",
                        borderRadius: 20,
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      {item.badgeText}
                    </span>
                  </div>

                  <h4
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "#ffffff",
                      margin: "0 0 0.2rem",
                    }}
                  >
                    {item.name}
                  </h4>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: item.accentColor,
                      margin: "0 0 0.5rem",
                      wordBreak: "break-all",
                    }}
                  >
                    {item.handle}
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      color: "rgba(255,255,255,0.6)",
                      lineHeight: 1.5,
                      margin: "0 0 1.25rem",
                    }}
                  >
                    {item.desc}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "0.85rem",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    marginTop: "auto",
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#ffffff",
                    }}
                  >
                    {item.actionText}
                  </span>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      backgroundColor: "rgba(255,255,255,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    <ExternalLink size={14} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
