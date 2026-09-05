"use client";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";

interface FloatingCartBarProps {
  onOpenCart: () => void;
}

export default function FloatingCartBar({ onOpenCart }: FloatingCartBarProps) {
  const totalItems = useCartStore((s) => s.totalItems());
  const totalPrice = useCartStore((s) => s.totalPrice());

  if (totalItems === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1rem",
        left: "1rem",
        right: "1rem",
        zIndex: 45,
        display: "flex",
        justifyContent: "center",
      }}
      className="md:hidden"
    >
      <button
        onClick={onOpenCart}
        aria-label="เปิดตะกร้าสินค้าเพื่อดูรายการและสั่งซื้อ"
        style={{
          width: "100%",
          maxWidth: 480,
          background: "linear-gradient(135deg, #111111, #1e1e1e)",
          border: "1.5px solid rgba(2,115,97,0.5)",
          borderRadius: 16,
          padding: "0.85rem 1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#ffffff",
          cursor: "pointer",
          boxShadow: "0 8px 30px rgba(0,0,0,0.35), 0 0 15px rgba(2,115,97,0.25)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              position: "relative",
              width: 38,
              height: 38,
              borderRadius: "50%",
              backgroundColor: "#027361",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <ShoppingCart size={18} color="#fff" />
            <span
              style={{
                position: "absolute",
                top: -3,
                right: -3,
                backgroundColor: "#dc2626",
                color: "#fff",
                borderRadius: "50%",
                width: 18,
                height: 18,
                fontSize: 10,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #111",
              }}
            >
              {totalItems}
            </span>
          </div>
          <div style={{ textAlign: "left" }}>
            <p style={{ margin: 0, fontSize: 13, color: "#a1a1aa" }}>ตะกร้าของคุณ ({totalItems} รายการ)</p>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#34d399" }}>
              ฿{totalPrice.toLocaleString()}
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.35rem",
            backgroundColor: "#027361",
            padding: "0.45rem 0.9rem",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 700,
            color: "#ffffff",
          }}
        >
          <span>ดูตะกร้า</span>
          <ArrowRight size={15} />
        </div>
      </button>
    </div>
  );
}
