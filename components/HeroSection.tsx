"use client";
import { useEffect, useRef } from "react";
import { ChevronDown, UtensilsCrossed } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = badgeRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    const t = setTimeout(() => {
      el.style.transition = "all 0.8s ease 1s";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "#0a0a0a",
      }}
    >
      {/* Background image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Image
          src="/hero.jpg"
          alt="โรตีอายุน้อยร้อยโรตี"
          fill
          priority
          style={{ objectFit: "cover", opacity: 0.38 }}
          sizes="100vw"
        />
      </div>

      {/* Gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.85) 100%)",
        }}
      />

      {/* Accent glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 300,
          background: "radial-gradient(ellipse, rgba(2,115,97,0.18) 0%, transparent 70%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "2rem 1.5rem",
          maxWidth: 800,
          animation: "fadeInUp 1s ease forwards",
        }}
      >
        {/* Badge */}
        <div
          ref={badgeRef}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            backgroundColor: "rgba(2,115,97,0.2)",
            border: "1px solid rgba(2,115,97,0.5)",
            borderRadius: 100,
            padding: "0.35rem 1rem",
            marginBottom: "1.5rem",
            backdropFilter: "blur(8px)",
          }}
        >
          <UtensilsCrossed size={13} color="#04a882" />
          <span style={{ color: "#04a882", fontSize: 13, fontWeight: 600 }}>
            เปิดทุกวัน (ยกเว้น วันเสาร์) · 16:30 – 21:30 น.
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            color: "#ffffff",
            fontSize: "clamp(2.2rem, 6vw, 4rem)",
            fontWeight: 800,
            lineHeight: 1.25,
            marginBottom: "1.25rem",
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          }}
        >
          รสสัมผัสต้นตำรับ{" "}
          <span style={{ color: "#9b1315" }}>โรตี</span>
          แท้
          <br />
          ส่งตรงจาก{" "}
          <span style={{ color: "#04a882" }}>แดนใต้</span>
        </h1>

        {/* Sub-headline */}
        <p
          style={{
            color: "rgba(255,255,255,0.75)",
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
            fontWeight: 400,
            maxWidth: 580,
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
          }}
        >
          อายุน้อยร้อยโรตี พร้อมเสิร์ฟเมนูซิกเนเจอร์{" "}
          <span style={{ color: "#9b1315", fontWeight: 600 }}>โรตีน้ำแกง</span>{" "}
          และ{" "}
          <span style={{ color: "#9b1315", fontWeight: 600 }}>โรตีมะตะบะ</span>{" "}
          ในเมืองมหาสารคาม
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            id="cta-order"
            onClick={() => handleScroll("order")}
            style={{
              background: "linear-gradient(135deg, #027361, #04a882)",
              border: "none",
              borderRadius: 12,
              color: "#fff",
              cursor: "pointer",
              padding: "0.85rem 2rem",
              fontSize: 16,
              fontFamily: "Noto Sans Thai, sans-serif",
              fontWeight: 700,
              boxShadow: "0 4px 24px rgba(2,115,97,0.4)",
              transition: "all 0.2s ease",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(2,115,97,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 24px rgba(2,115,97,0.4)";
            }}
          >
            🛵 สั่งอาหารล่วงหน้า / รับที่ร้าน
          </button>

          <button
            id="cta-menu"
            onClick={() => handleScroll("signature")}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 12,
              color: "#fff",
              cursor: "pointer",
              padding: "0.85rem 2rem",
              fontSize: 16,
              fontFamily: "Noto Sans Thai, sans-serif",
              fontWeight: 600,
              backdropFilter: "blur(8px)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.14)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            }}
          >
            ดูเมนูทั้งหมด →
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.25rem",
          animation: "bounce 2s infinite",
          cursor: "pointer",
        }}
        onClick={() => handleScroll("signature")}
      >
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, letterSpacing: "0.1em" }}>
          SCROLL
        </span>
        <ChevronDown size={20} color="rgba(255,255,255,0.4)" />
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(6px); }
        }
      `}</style>
    </section>
  );
}
