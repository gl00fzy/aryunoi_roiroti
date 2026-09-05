"use client";
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, MapPin, Phone } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";

const navLinks = [
  { label: "เมนู", href: "#signature" },
  { label: "สั่งอาหาร", href: "#order" },
  { label: "เกี่ยวกับเรา", href: "#about" },
  { label: "ติดต่อ", href: "#contact" },
];

interface NavbarProps {
  onCartOpen: () => void;
}

export default function Navbar({ onCartOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: scrolled ? "rgba(17,17,17,0.97)" : "#111111",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 68,
          }}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #027361, #04a882)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                fontWeight: 800,
                color: "#fff",
                flexShrink: 0,
              }}
            >
              ร
            </div>
            <div>
              <p style={{ color: "#ffffff", fontWeight: 700, fontSize: 15, lineHeight: 1.2, margin: 0 }}>
                อายุน้อย
              </p>
              <p style={{ margin: 0, lineHeight: 1.2 }}>
                <span style={{ color: "#f87171", fontWeight: 800, fontSize: 15 }}>ร้อย</span>
                <span style={{ color: "#f87171", fontWeight: 800, fontSize: 15 }}>โรตี</span>
              </p>
            </div>
          </a>

          {/* Desktop Links */}
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="hidden md:flex">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#d4d4d8",
                  cursor: "pointer",
                  fontSize: 15,
                  fontFamily: "Noto Sans Thai, sans-serif",
                  fontWeight: 500,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.color = "#04a882")}
                onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.color = "#d4d4d8")}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {/* Cart button */}
            <button
              id="cart-btn"
              aria-label="เปิดตะกร้าสินค้า"
              onClick={onCartOpen}
              style={{
                position: "relative",
                background: "none",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 8,
                color: "#ffffff",
                cursor: "pointer",
                padding: "0.4rem 0.6rem",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#027361";
                (e.currentTarget as HTMLButtonElement).style.color = "#04a882";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)";
                (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
              }}
            >
              <ShoppingCart size={18} />
              {totalItems > 0 && (
                <span
                  style={{
                    background: "#dc2626",
                    color: "#fff",
                    borderRadius: "50%",
                    width: 20,
                    height: 20,
                    fontSize: 11,
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {totalItems}
                </span>
              )}
            </button>

            {/* CTA */}
            <button
              onClick={() => handleNav("#order")}
              style={{
                background: "linear-gradient(135deg, #027361, #04a882)",
                border: "none",
                borderRadius: 8,
                color: "#fff",
                cursor: "pointer",
                padding: "0.45rem 1rem",
                fontSize: 14,
                fontFamily: "Noto Sans Thai, sans-serif",
                fontWeight: 700,
                transition: "opacity 0.2s",
              }}
              className="hidden sm:block"
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.85")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
            >
              สั่งเลย
            </button>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "ปิดเมนู" : "เปิดเมนู"}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
              className="flex md:hidden"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            style={{
              backgroundColor: "#1a1a1a",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              padding: "1rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#d4d4d8",
                  cursor: "pointer",
                  fontSize: 16,
                  fontFamily: "Noto Sans Thai, sans-serif",
                  fontWeight: 500,
                  textAlign: "left",
                  padding: "0.4rem 0",
                }}
              >
                {l.label}
              </button>
            ))}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("อายุน้อยร้อยโรตี มหาสารคาม")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", gap: "0.5rem", alignItems: "center", paddingTop: "0.5rem", borderTop: "1px solid rgba(255,255,255,0.08)", textDecoration: "none" }}
            >
              <MapPin size={14} color="#027361" />
              <span style={{ color: "#a1a1aa", fontSize: 13 }}>210 ซอยศรีสวัสดิ์ฯ มหาสารคาม</span>
            </a>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <Phone size={14} color="#027361" />
              <span style={{ color: "#a1a1aa", fontSize: 13 }}>062 498 2749</span>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
