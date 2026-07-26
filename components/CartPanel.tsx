"use client";
import { useEffect, useRef, useState } from "react";
import { X, Minus, Plus, Trash2, Clock, UtensilsCrossed, ShoppingBag, Truck } from "lucide-react";
import { useCartStore, OrderType } from "@/lib/cartStore";
import Image from "next/image";

interface CartPanelProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const orderTypeConfig: { type: OrderType; label: string; icon: React.ReactNode }[] = [
  { type: "dine-in",  label: "ทานที่ร้าน",    icon: <UtensilsCrossed size={15} /> },
  { type: "takeout",  label: "รับกลับบ้าน",    icon: <ShoppingBag size={15} /> },
  { type: "delivery", label: "เดลิเวอรี",       icon: <Truck size={15} /> },
];

export default function CartPanel({ open, onClose, onCheckout }: CartPanelProps) {
  const { items, orderType, pickupTime, customerNote, removeItem, updateQuantity, setOrderType, setPickupTime, setCustomerNote, totalPrice, totalItems } = useCartStore();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          backgroundColor: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(3px)",
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          maxWidth: 440,
          zIndex: 101,
          backgroundColor: "#ffffff",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.15)",
          display: "flex",
          flexDirection: "column",
          animation: "slideInRight 0.3s ease",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid #f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#111111",
          }}
        >
          <div>
            <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "1.15rem", margin: 0 }}>
              🛒 ตะกร้าของฉัน
            </h2>
            {totalItems() > 0 && (
              <p style={{ color: "#a1a1aa", fontSize: 13, margin: "0.2rem 0 0" }}>
                {totalItems()} รายการ
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <X size={18} color="#fff" />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem 1.5rem" }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
              <div style={{ fontSize: 60, marginBottom: "1rem" }}>🫙</div>
              <p style={{ color: "#71717a", fontSize: 16, fontWeight: 600 }}>ยังไม่มีรายการในตะกร้า</p>
              <p style={{ color: "#a1a1aa", fontSize: 14, marginTop: "0.5rem" }}>เลือกเมนูที่ชอบแล้วกด เพิ่ม ได้เลย</p>
            </div>
          ) : (
            <>
              {/* Cart items */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
                {items.map((cartItem) => (
                  <div
                    key={cartItem.id}
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      padding: "0.85rem",
                      backgroundColor: "#fafafa",
                      borderRadius: 12,
                      border: "1px solid #f0f0f0",
                    }}
                  >
                    <div style={{ position: "relative", width: 68, height: 68, borderRadius: 10, overflow: "hidden", flexShrink: 0 }}>
                      <Image src={cartItem.menuItem.image} alt={cartItem.menuItem.name} fill style={{ objectFit: "cover" }} sizes="68px" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 700, fontSize: 14, color: "#18181b", margin: "0 0 0.2rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {cartItem.menuItem.name}
                        {cartItem.selectedVariant && (
                          <span style={{ color: "#027361", fontWeight: 600, fontSize: 12, marginLeft: "0.35rem" }}>
                            ({cartItem.selectedVariant.name})
                          </span>
                        )}
                      </p>
                      {cartItem.selectedToppings.length > 0 && (
                        <p style={{ color: "#71717a", fontSize: 12, margin: "0 0 0.35rem", lineHeight: 1.4 }}>
                          + {cartItem.selectedToppings.map((t) => t.name.replace("เพิ่ม", "")).join(", ")}
                        </p>
                      )}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <button
                            onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
                            style={{ width: 26, height: 26, borderRadius: "50%", border: "1px solid #d4d4d8", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                          >
                            <Minus size={12} />
                          </button>
                          <span style={{ fontWeight: 700, fontSize: 15, minWidth: 20, textAlign: "center" }}>{cartItem.quantity}</span>
                          <button
                            onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                            style={{ width: 26, height: 26, borderRadius: "50%", border: "none", background: "#027361", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                          >
                            <Plus size={12} color="#fff" />
                          </button>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <span style={{ color: "#027361", fontWeight: 800, fontSize: 14 }}>฿{cartItem.subtotal}</span>
                          <button
                            onClick={() => removeItem(cartItem.id)}
                            style={{ background: "none", border: "none", cursor: "pointer", padding: "0.2rem", color: "#9b1315" }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Type */}
              <div style={{ marginBottom: "1.25rem" }}>
                <p style={{ fontWeight: 700, fontSize: 14, color: "#18181b", marginBottom: "0.6rem" }}>ประเภทการรับอาหาร</p>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {orderTypeConfig.map((o) => (
                    <button
                      key={o.type}
                      onClick={() => setOrderType(o.type)}
                      style={{
                        flex: 1,
                        padding: "0.55rem 0.5rem",
                        borderRadius: 10,
                        border: `1.5px solid ${orderType === o.type ? "#027361" : "#e4e4e7"}`,
                        backgroundColor: orderType === o.type ? "rgba(2,115,97,0.08)" : "#fff",
                        color: orderType === o.type ? "#027361" : "#52525b",
                        cursor: "pointer",
                        fontSize: 12,
                        fontFamily: "Noto Sans Thai, sans-serif",
                        fontWeight: orderType === o.type ? 700 : 500,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.25rem",
                        transition: "all 0.18s",
                      }}
                    >
                      {o.icon}
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pickup time */}
              {orderType !== "delivery" && (
                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 700, fontSize: 14, color: "#18181b", marginBottom: "0.5rem" }}>
                    <Clock size={15} color="#027361" />
                    กำหนดเวลารับ
                  </label>
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    min="16:30"
                    max="21:30"
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.85rem",
                      borderRadius: 10,
                      border: "1.5px solid #e4e4e7",
                      fontSize: 15,
                      fontFamily: "Noto Sans Thai, sans-serif",
                      color: "#18181b",
                      outline: "none",
                    }}
                    onFocus={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "#027361")}
                    onBlur={(e) => ((e.currentTarget as HTMLInputElement).style.borderColor = "#e4e4e7")}
                  />
                  <p style={{ color: "#a1a1aa", fontSize: 12, marginTop: "0.35rem" }}>เวลาให้บริการ 16:30 – 21:30 น.</p>
                </div>
              )}

              {/* Note */}
              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ fontWeight: 700, fontSize: 14, color: "#18181b", display: "block", marginBottom: "0.5rem" }}>
                  หมายเหตุเพิ่มเติม
                </label>
                <textarea
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  placeholder="เช่น ไม่เผ็ด, แยกน้ำแกง..."
                  rows={2}
                  style={{
                    width: "100%",
                    padding: "0.65rem 0.85rem",
                    borderRadius: 10,
                    border: "1.5px solid #e4e4e7",
                    fontSize: 14,
                    fontFamily: "Noto Sans Thai, sans-serif",
                    resize: "none",
                    outline: "none",
                    color: "#18181b",
                  }}
                  onFocus={(e) => ((e.currentTarget as HTMLTextAreaElement).style.borderColor = "#027361")}
                  onBlur={(e) => ((e.currentTarget as HTMLTextAreaElement).style.borderColor = "#e4e4e7")}
                />
              </div>
            </>
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div style={{ padding: "1.25rem 1.5rem", borderTop: "1px solid #f0f0f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
              <span style={{ fontWeight: 600, color: "#52525b" }}>ยอดรวมทั้งหมด</span>
              <span style={{ fontWeight: 800, fontSize: "1.2rem", color: "#027361" }}>฿{totalPrice().toLocaleString()}</span>
            </div>
            <button
              id="checkout-btn"
              onClick={() => { onClose(); onCheckout(); }}
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #027361, #04a882)",
                border: "none",
                borderRadius: 12,
                color: "#fff",
                cursor: "pointer",
                padding: "0.9rem",
                fontSize: 16,
                fontFamily: "Noto Sans Thai, sans-serif",
                fontWeight: 700,
                boxShadow: "0 4px 16px rgba(2,115,97,0.3)",
              }}
            >
              ยืนยันออเดอร์ · ชำระเงิน
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
