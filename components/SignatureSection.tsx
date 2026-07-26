"use client";
import Image from "next/image";
import { Star, Award } from "lucide-react";

const signatures = [
  {
    id: "sig-namkaeng",
    name: (
      <>
        <span style={{ color: "#9b1315" }}>โรตี</span>น้ำแกง
      </>
    ),
    nameText: "โรตีน้ำแกง",
    badge: "ซิกเนเจอร์",
    badgeColor: "#027361",
    description: (
      <>
        สูตรเข้มข้น หอมเครื่องเทศแท้จาก{" "}
        <span style={{ color: "#027361", fontWeight: 700 }}>แดนใต้</span>{" "}
        ทอดกรอบสดใหม่ทุกชิ้น เสิร์ฟพร้อมน้ำแกงมัสมั่นร้อนๆ รสชาติดั้งเดิม ที่หาไม่ได้ที่ไหน
      </>
    ),
    image: "/roti-namkaeng-new.jpg",
    price: "฿50–60",
    stars: 5,
    icon: <Star size={14} fill="#f59e0b" color="#f59e0b" />,
  },
  {
    id: "sig-mataba",
    name: (
      <>
        <span style={{ color: "#9b1315" }}>โรตี</span>มะตะบะ
      </>
    ),
    nameText: "โรตีมะตะบะ",
    badge: "Best Seller",
    badgeColor: "#9b1315",
    description: (
      <>
        ไส้แน่น ไร้น้ำมัน อัดแน่นด้วยคุณภาพ เนื้อสับผัดกับเครื่องเทศ{" "}
        <span style={{ color: "#027361", fontWeight: 700 }}>แดนใต้</span>{" "}
        ห่อด้วย{" "}
        <span style={{ color: "#9b1315", fontWeight: 700 }}>โรตี</span>{" "}
        กรอบ ทอดจนสีทองสวย อร่อยทุกคำ
      </>
    ),
    image: "/roti-mataba-new.jpg",
    price: "฿55",
    stars: 5,
    icon: <Award size={14} color="#f59e0b" />,
  },
];

export default function SignatureSection() {
  return (
    <section
      id="signature"
      style={{
        backgroundColor: "#f8f8f8",
        padding: "5rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: "rgba(2,115,97,0.1)",
              color: "#027361",
              fontSize: 13,
              fontWeight: 700,
              padding: "0.3rem 1rem",
              borderRadius: 100,
              marginBottom: "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            เมนูเด็ดซิกเนเจอร์
          </span>
          <h2
            style={{
              color: "#18181b",
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 800,
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            ต้นตำรับ{" "}
            <span style={{ color: "#9b1315" }}>โรตี</span>
            แท้{" "}
            <span style={{ color: "#027361" }}>แดนใต้</span>
          </h2>
          <p
            style={{
              color: "#71717a",
              fontSize: 16,
              marginTop: "0.75rem",
              maxWidth: 500,
              margin: "0.75rem auto 0",
            }}
          >
            คัดสรรวัตถุดิบคุณภาพ สูตรดั้งเดิมจากภาคใต้ ทำสดทุกวัน
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
          }}
        >
          {signatures.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
                transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-8px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 48px rgba(0,0,0,0.14)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 20px rgba(0,0,0,0.08)";
              }}
            >
              {/* Image */}
              <div style={{ position: "relative", height: 260, overflow: "hidden" }}>
                <Image
                  src={item.image}
                  alt={item.nameText}
                  fill
                  style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="hover:scale-105"
                />
                {/* Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    backgroundColor: item.badgeColor,
                    color: "#fff",
                    padding: "0.3rem 0.8rem",
                    borderRadius: 100,
                    fontSize: 12,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {item.icon}
                  {item.badge}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "1.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    marginBottom: "0.75rem",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: 800,
                      color: "#18181b",
                      margin: 0,
                    }}
                  >
                    {item.name}
                  </h3>
                  <span
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 800,
                      color: "#027361",
                    }}
                  >
                    {item.price}
                  </span>
                </div>

                {/* Stars */}
                <div style={{ display: "flex", gap: "2px", marginBottom: "0.75rem" }}>
                  {Array.from({ length: item.stars }).map((_, i) => (
                    <Star key={i} size={13} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>

                <p style={{ color: "#52525b", fontSize: 15, lineHeight: 1.65, margin: 0 }}>
                  {item.description}
                </p>

                {/* Divider */}
                <div
                  style={{
                    marginTop: "1.25rem",
                    paddingTop: "1.25rem",
                    borderTop: "1px solid #f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "#027361",
                    }}
                  />
                  <span style={{ color: "#71717a", fontSize: 13 }}>
                    ทำสดทุกวัน · วัตถุดิบคุณภาพ
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
