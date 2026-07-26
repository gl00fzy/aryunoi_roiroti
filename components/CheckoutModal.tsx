"use client";
import { useEffect, useRef, useState } from "react";
import { X, CheckCircle, Copy } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import QRCode from "qrcode";
import generatePayload from "promptpay-qr";

const PROMPTPAY_NUMBER = "0624982749";

const orderTypeLabel: Record<string, string> = {
  "dine-in":  "ทานที่ร้าน",
  "takeout":  "รับกลับบ้าน",
  "delivery": "เดลิเวอรี",
};

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const { items, orderType, pickupTime, customerNote, totalPrice, clearCart } = useCartStore();
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [confirmed, setConfirmed] = useState(false);
  const [copied, setCopied] = useState(false);
  const total = totalPrice();

  useEffect(() => {
    if (!open || total === 0) return;
    const payload = generatePayload(PROMPTPAY_NUMBER, { amount: total });
    QRCode.toDataURL(payload, {
      width: 260,
      margin: 2,
      color: { dark: "#111111", light: "#ffffff" },
      errorCorrectionLevel: "H",
    }).then(setQrDataUrl);
  }, [open, total]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setConfirmed(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleConfirm = () => {
    // Save order to LocalStorage
    const order = {
      id: `ORDER-${Date.now()}`,
      createdAt: new Date().toISOString(),
      items: items.map((i) => ({
        name: i.menuItem.name,
        qty: i.quantity,
        toppings: i.selectedToppings.map((t) => t.name),
        subtotal: i.subtotal,
      })),
      orderType,
      pickupTime,
      customerNote,
      total,
      status: "pending",
    };
    const existing = JSON.parse(localStorage.getItem("aryunoi-orders") || "[]");
    localStorage.setItem("aryunoi-orders", JSON.stringify([...existing, order]));
    setConfirmed(true);
    setTimeout(() => {
      clearCart();
      onClose();
      setConfirmed(false);
    }, 3000);
  };

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(PROMPTPAY_NUMBER).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!open) return null;

  if (confirmed) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 300, backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
        <div style={{ backgroundColor: "#fff", borderRadius: 24, padding: "3rem 2rem", textAlign: "center", maxWidth: 380, width: "100%", animation: "popIn 0.4s ease" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", backgroundColor: "rgba(2,115,97,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
            <CheckCircle size={44} color="#027361" />
          </div>
          <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#18181b", marginBottom: "0.75rem" }}>ยืนยันออเดอร์แล้ว!</h3>
          <p style={{ color: "#71717a", fontSize: 15, lineHeight: 1.6 }}>
            ขอบคุณที่ใช้บริการอายุน้อยร้อยโรตี<br />
            เราจะเตรียมอาหารให้พร้อมตามเวลาที่กำหนด 🙏
          </p>
        </div>
        <style jsx>{`
          @keyframes popIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        `}</style>
      </div>
    );
  }

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 300, backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{ backgroundColor: "#fff", borderRadius: 24, width: "100%", maxWidth: 520, maxHeight: "92vh", overflowY: "auto", animation: "popIn 0.3s ease" }}
      >
        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #111111, #1e1e1e)", padding: "1.5rem", borderRadius: "24px 24px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ color: "#fff", fontWeight: 800, fontSize: "1.2rem", margin: 0 }}>สรุปออเดอร์</h2>
            <p style={{ color: "#a1a1aa", fontSize: 13, margin: "0.2rem 0 0" }}>ชำระเงินผ่าน PromptPay</p>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={18} color="#fff" />
          </button>
        </div>

        <div style={{ padding: "1.5rem" }}>
          {/* Order info */}
          <div style={{ background: "#f8f8f8", borderRadius: 12, padding: "1rem", marginBottom: "1.25rem", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
            <div>
              <p style={{ color: "#71717a", fontSize: 12, margin: "0 0 0.2rem" }}>ประเภท</p>
              <p style={{ fontWeight: 700, fontSize: 14, color: "#18181b", margin: 0 }}>{orderTypeLabel[orderType]}</p>
            </div>
            {pickupTime && orderType !== "delivery" && (
              <div>
                <p style={{ color: "#71717a", fontSize: 12, margin: "0 0 0.2rem" }}>เวลารับ</p>
                <p style={{ fontWeight: 700, fontSize: 14, color: "#18181b", margin: 0 }}>{pickupTime} น.</p>
              </div>
            )}
            {customerNote && (
              <div>
                <p style={{ color: "#71717a", fontSize: 12, margin: "0 0 0.2rem" }}>หมายเหตุ</p>
                <p style={{ fontWeight: 700, fontSize: 14, color: "#18181b", margin: 0 }}>{customerNote}</p>
              </div>
            )}
          </div>

          {/* Items */}
          <div style={{ marginBottom: "1.25rem" }}>
            <p style={{ fontWeight: 700, fontSize: 14, color: "#18181b", marginBottom: "0.6rem" }}>รายการอาหาร</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {items.map((item) => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                  <div>
                    <span style={{ fontSize: 14, color: "#18181b", fontWeight: 600 }}>
                      {item.menuItem.name} ×{item.quantity}
                    </span>
                    {item.selectedToppings.length > 0 && (
                      <p style={{ color: "#71717a", fontSize: 12, margin: "0.1rem 0 0" }}>
                        + {item.selectedToppings.map((t) => t.name.replace("เพิ่ม", "")).join(", ")}
                      </p>
                    )}
                  </div>
                  <span style={{ color: "#027361", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>฿{item.subtotal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "0.85rem 1rem", background: "linear-gradient(135deg, rgba(2,115,97,0.08), rgba(2,115,97,0.04))", borderRadius: 12, marginBottom: "1.5rem", border: "1px solid rgba(2,115,97,0.15)" }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: "#18181b" }}>ยอดชำระทั้งหมด</span>
            <span style={{ fontWeight: 800, fontSize: "1.25rem", color: "#027361" }}>฿{total.toLocaleString()}</span>
          </div>

          {/* QR Code */}
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <p style={{ fontWeight: 700, fontSize: 15, color: "#18181b", marginBottom: "1rem" }}>
              สแกน QR Code ชำระผ่าน PromptPay
            </p>
            {qrDataUrl ? (
              <div style={{ display: "inline-block", padding: "1rem", background: "#fff", borderRadius: 16, border: "2px solid #f0f0f0", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qrDataUrl} alt="PromptPay QR Code" width={200} height={200} style={{ display: "block" }} />
              </div>
            ) : (
              <div style={{ width: 200, height: 200, borderRadius: 12, background: "#f4f4f5", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", color: "#a1a1aa" }}>
                กำลังสร้าง QR...
              </div>
            )}
            <div style={{ marginTop: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
              <span style={{ color: "#52525b", fontSize: 14 }}>เบอร์ PromptPay:</span>
              <span style={{ fontWeight: 700, fontSize: 14, color: "#18181b" }}>{PROMPTPAY_NUMBER}</span>
              <button
                onClick={handleCopyNumber}
                title="คัดลอกเบอร์"
                style={{ background: "none", border: "none", cursor: "pointer", color: copied ? "#027361" : "#a1a1aa", padding: "0.2rem", display: "flex", alignItems: "center" }}
              >
                <Copy size={14} />
              </button>
              {copied && <span style={{ color: "#027361", fontSize: 12 }}>คัดลอกแล้ว!</span>}
            </div>
            <p style={{ color: "#a1a1aa", fontSize: 12, marginTop: "0.4rem" }}>
              ชื่อบัญชี: อายุน้อยร้อยโรตี
            </p>
          </div>

          {/* Confirm button */}
          <button
            id="confirm-order-btn"
            onClick={handleConfirm}
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #027361, #04a882)",
              border: "none",
              borderRadius: 12,
              color: "#fff",
              cursor: "pointer",
              padding: "0.95rem",
              fontSize: 16,
              fontFamily: "Noto Sans Thai, sans-serif",
              fontWeight: 700,
              boxShadow: "0 4px 16px rgba(2,115,97,0.3)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.9"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; }}
          >
            ✅ ยืนยันการชำระเงินแล้ว
          </button>
          <p style={{ color: "#a1a1aa", fontSize: 12, textAlign: "center", marginTop: "0.6rem" }}>
            กดปุ่มหลังจากโอนเงินเรียบร้อยแล้ว
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes popIn { from { transform: scale(0.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
}
