"use client";
import { useEffect, useState } from "react";
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
  const {
    items,
    orderType,
    pickupTime,
    customerNote,
    customerName,
    customerPhone,
    deliveryAddress,
    totalPrice,
    clearCart,
  } = useCartStore();
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [confirmed, setConfirmed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [orderCopied, setOrderCopied] = useState(false);
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
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleClose = () => {
    setConfirmed(false);
    onClose();
  };

  const getOrderMessage = () => {
    let msg = `🛎️ *ออเดอร์ใหม่ - ร้านอายุน้อยร้อยโรตี*\n`;
    msg += `📋 ประเภท: ${orderTypeLabel[orderType] || orderType}\n`;
    if (customerName) msg += `👤 ผู้สั่ง: ${customerName}\n`;
    if (customerPhone) msg += `📞 เบอร์โทร: ${customerPhone}\n`;
    if (orderType === "delivery" && deliveryAddress) {
      msg += `📍 ที่อยู่จัดส่ง: ${deliveryAddress}\n`;
    }
    if (orderType !== "delivery" && pickupTime) {
      msg += `⏰ เวลารับอาหาร: ${pickupTime} น.\n`;
    }
    if (customerNote) msg += `📝 หมายเหตุ: ${customerNote}\n`;
    msg += `\n🛒 *รายการอาหาร:*\n`;
    items.forEach((item, idx) => {
      const variantStr = item.selectedVariant ? ` (${item.selectedVariant.name})` : "";
      const options = [
        item.selectedDrinkTemp,
        item.selectedSweetness,
        item.selectedServingStyle,
        ...item.selectedToppings.map((t) => t.name.replace("เพิ่ม", "")),
      ].filter(Boolean);
      const optStr = options.length > 0 ? ` [${options.join(", ")}]` : "";
      msg += `${idx + 1}. ${item.menuItem.name}${variantStr} ×${item.quantity}${optStr} = ฿${item.subtotal}\n`;
    });
    msg += `\n💰 *ยอดรวมชำระ: ฿${total.toLocaleString()}*\n`;
    msg += `✅ ชำระเงินผ่าน PromptPay เรียบร้อยแล้ว (แนบสลิปด้านล่าง)`;
    return msg;
  };

  const handleCopyOrder = () => {
    const msg = getOrderMessage();
    navigator.clipboard.writeText(msg).then(() => {
      setOrderCopied(true);
      setTimeout(() => setOrderCopied(false), 2500);
    });
  };

  const handleSendLine = () => {
    const msg = getOrderMessage();
    const lineUrl = `https://line.me/R/share?text=${encodeURIComponent(msg)}`;
    window.open(lineUrl, "_blank");
  };

  const handleConfirm = () => {
    // Save order to LocalStorage
    const order = {
      id: `ORDER-${Date.now()}`,
      createdAt: new Date().toISOString(),
      customerName,
      customerPhone,
      deliveryAddress,
      items: items.map((i) => ({
        name: i.menuItem.name,
        qty: i.quantity,
        variant: i.selectedVariant?.name,
        options: [i.selectedDrinkTemp, i.selectedSweetness, i.selectedServingStyle].filter(Boolean),
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
    }, 4000);
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
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
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
          <button aria-label="ปิดหน้าต่างสรุปออเดอร์" onClick={handleClose} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={18} color="#fff" />
          </button>
        </div>

        <div style={{ padding: "1.5rem" }}>
          {/* Order info */}
          <div style={{ background: "#f8f8f8", borderRadius: 12, padding: "1rem", marginBottom: "1.25rem", display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
            <div>
              <p style={{ color: "#71717a", fontSize: 12, margin: "0 0 0.2rem" }}>ประเภท</p>
              <p style={{ fontWeight: 700, fontSize: 14, color: "#18181b", margin: 0 }}>{orderTypeLabel[orderType] || orderType}</p>
            </div>
            {customerName && (
              <div>
                <p style={{ color: "#71717a", fontSize: 12, margin: "0 0 0.2rem" }}>ผู้สั่ง</p>
                <p style={{ fontWeight: 700, fontSize: 14, color: "#18181b", margin: 0 }}>{customerName}</p>
              </div>
            )}
            {customerPhone && (
              <div>
                <p style={{ color: "#71717a", fontSize: 12, margin: "0 0 0.2rem" }}>เบอร์โทร</p>
                <p style={{ fontWeight: 700, fontSize: 14, color: "#18181b", margin: 0 }}>{customerPhone}</p>
              </div>
            )}
            {pickupTime && orderType !== "delivery" && (
              <div>
                <p style={{ color: "#71717a", fontSize: 12, margin: "0 0 0.2rem" }}>เวลารับ</p>
                <p style={{ fontWeight: 700, fontSize: 14, color: "#18181b", margin: 0 }}>{pickupTime} น.</p>
              </div>
            )}
            {deliveryAddress && orderType === "delivery" && (
              <div style={{ width: "100%" }}>
                <p style={{ color: "#71717a", fontSize: 12, margin: "0 0 0.2rem" }}>ที่อยู่จัดส่ง</p>
                <p style={{ fontWeight: 600, fontSize: 14, color: "#18181b", margin: 0 }}>{deliveryAddress}</p>
              </div>
            )}
            {customerNote && (
              <div style={{ width: "100%" }}>
                <p style={{ color: "#71717a", fontSize: 12, margin: "0 0 0.2rem" }}>หมายเหตุ</p>
                <p style={{ fontWeight: 600, fontSize: 13, color: "#18181b", margin: 0 }}>{customerNote}</p>
              </div>
            )}
          </div>

          {/* Items */}
          <div style={{ marginBottom: "1.25rem" }}>
            <p style={{ fontWeight: 700, fontSize: 14, color: "#18181b", marginBottom: "0.6rem" }}>รายการอาหาร</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {items.map((item) => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                  <div>
                    <span style={{ fontSize: 14, color: "#18181b", fontWeight: 600 }}>
                      {item.menuItem.name}
                      {item.selectedVariant && ` (${item.selectedVariant.name})`}
                      {" ×"}{item.quantity}
                    </span>
                    {(item.selectedDrinkTemp || item.selectedSweetness || item.selectedServingStyle) && (
                      <p style={{ color: "#027361", fontSize: 12, margin: "0.1rem 0 0", fontWeight: 500 }}>
                        {[item.selectedDrinkTemp, item.selectedSweetness, item.selectedServingStyle].filter(Boolean).join(" · ")}
                      </p>
                    )}
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
          <div style={{ display: "flex", justifyContent: "space-between", padding: "0.85rem 1rem", background: "linear-gradient(135deg, rgba(2,115,97,0.08), rgba(2,115,97,0.04))", borderRadius: 12, marginBottom: "1.25rem", border: "1px solid rgba(2,115,97,0.15)" }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: "#18181b" }}>ยอดชำระทั้งหมด</span>
            <span style={{ fontWeight: 800, fontSize: "1.25rem", color: "#027361" }}>฿{total.toLocaleString()}</span>
          </div>

          {/* QR Code */}
          <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
            <p style={{ fontWeight: 700, fontSize: 15, color: "#18181b", marginBottom: "0.75rem" }}>
              สแกน QR Code ชำระผ่าน PromptPay
            </p>
            {qrDataUrl ? (
              <div style={{ display: "inline-block", padding: "0.85rem", background: "#fff", borderRadius: 16, border: "2px solid #f0f0f0", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qrDataUrl} alt="PromptPay QR Code" width={190} height={190} style={{ display: "block" }} />
              </div>
            ) : (
              <div style={{ width: 190, height: 190, borderRadius: 12, background: "#f4f4f5", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", color: "#a1a1aa" }}>
                กำลังสร้าง QR...
              </div>
            )}
            <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
              <span style={{ color: "#52525b", fontSize: 14 }}>เบอร์ PromptPay:</span>
              <span style={{ fontWeight: 700, fontSize: 14, color: "#18181b" }}>{PROMPTPAY_NUMBER}</span>
              <button
                onClick={handleCopyNumber}
                aria-label="คัดลอกเบอร์ PromptPay"
                title="คัดลอกเบอร์"
                style={{ background: "none", border: "none", cursor: "pointer", color: copied ? "#027361" : "#a1a1aa", padding: "0.2rem", display: "flex", alignItems: "center" }}
              >
                <Copy size={14} />
              </button>
              {copied && <span style={{ color: "#027361", fontSize: 12 }}>คัดลอกแล้ว!</span>}
            </div>
            <p style={{ color: "#a1a1aa", fontSize: 12, marginTop: "0.25rem" }}>
              ชื่อบัญชี: อายุน้อยร้อยโรตี
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {/* LINE Order Button */}
            <button
              onClick={handleSendLine}
              style={{
                width: "100%",
                backgroundColor: "#06c755",
                color: "#ffffff",
                border: "none",
                borderRadius: 12,
                cursor: "pointer",
                padding: "0.85rem",
                fontSize: 15,
                fontFamily: "Noto Sans Thai, sans-serif",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                boxShadow: "0 4px 14px rgba(6,199,85,0.3)",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.9")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
            >
              📲 ส่งออเดอร์ทาง LINE (พร้อมส่งสลิป)
            </button>

            {/* Copy order text button */}
            <button
              onClick={handleCopyOrder}
              style={{
                width: "100%",
                backgroundColor: "#f4f4f5",
                color: "#27272a",
                border: "1px solid #e4e4e7",
                borderRadius: 12,
                cursor: "pointer",
                padding: "0.75rem",
                fontSize: 14,
                fontFamily: "Noto Sans Thai, sans-serif",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.4rem",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#e4e4e7")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#f4f4f5")}
            >
              <Copy size={15} />
              {orderCopied ? "คัดลอกข้อความสรุปแล้ว!" : "คัดลอกข้อความสรุปออเดอร์"}
            </button>

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
                padding: "0.9rem",
                fontSize: 15,
                fontFamily: "Noto Sans Thai, sans-serif",
                fontWeight: 700,
                boxShadow: "0 4px 16px rgba(2,115,97,0.3)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.9"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
            >
              ✅ โอนเงินแล้ว & บันทึกออเดอร์
            </button>
          </div>
          <p style={{ color: "#a1a1aa", fontSize: 12, textAlign: "center", marginTop: "0.6rem" }}>
            💡 แนะนำกดส่งออเดอร์ทาง LINE เพื่อให้ทางร้านเตรียมอาหารและส่งสลิปได้รวดเร็วครับ
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes popIn { from { transform: scale(0.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
}
