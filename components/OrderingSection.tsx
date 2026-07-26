"use client";
import { useState } from "react";
import Image from "next/image";
import { Plus, Minus, ShoppingCart, X, Check } from "lucide-react";
import {
  menuItems,
  toppings,
  categoryLabel,
  toppingGroupLabel,
  type Category,
  type ToppingGroup,
  type MenuItem,
  type Topping,
  type Variant,
} from "@/lib/menuData";
import { useCartStore } from "@/lib/cartStore";

// ─── Option Modal ────────────────────────────────────────────
function OptionModal({
  item,
  onClose,
  onAdd,
}: {
  item: MenuItem;
  onClose: () => void;
  onAdd: (toppings: Topping[], qty: number, variant?: Variant) => void;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [qty, setQty] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<Variant | undefined>(
    item.variants?.[0]
  );

  const applicableToppings = item.toppingIds
    ? toppings.filter((t) => item.toppingIds!.includes(t.id))
    : [];

  // Group toppings by group
  const toppingsByGroup = applicableToppings.reduce(
    (acc, t) => {
      if (!acc[t.group]) acc[t.group] = [];
      acc[t.group].push(t);
      return acc;
    },
    {} as Record<ToppingGroup, Topping[]>
  );

  const toggleTopping = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectedToppings = toppings.filter((t) => selected.has(t.id));
  const toppingTotal = selectedToppings.reduce((s, t) => s + t.price, 0);
  const basePrice = selectedVariant ? selectedVariant.price : item.price;
  const total = (basePrice + toppingTotal) * qty;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        backgroundColor: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        padding: "0",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "20px 20px 0 0",
          width: "100%",
          maxWidth: 520,
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "1.5rem",
          animation: "slideUp 0.3s ease",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
          <div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#18181b", margin: 0 }}>{item.name}</h3>
            <p style={{ color: "#71717a", fontSize: 14, margin: "0.25rem 0 0" }}>{item.description}</p>
          </div>
          <button
            onClick={onClose}
            style={{ background: "#f4f4f5", border: "none", borderRadius: "50%", padding: "0.4rem", cursor: "pointer", marginLeft: "0.5rem", flexShrink: 0 }}
          >
            <X size={18} color="#52525b" />
          </button>
        </div>

        {/* Item image small */}
        <div style={{ position: "relative", height: 160, borderRadius: 12, overflow: "hidden", marginBottom: "1.25rem" }}>
          <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} sizes="520px" />
          <div style={{ position: "absolute", bottom: 10, right: 10, background: "#027361", color: "#fff", borderRadius: 8, padding: "0.3rem 0.7rem", fontWeight: 700, fontSize: 15 }}>
            ฿{basePrice}
          </div>
        </div>

        {/* Variant selection (e.g. ไก่ / เนื้อ) */}
        {item.variants && item.variants.length > 0 && (
          <div style={{ marginBottom: "1.25rem" }}>
            <p style={{ fontWeight: 700, fontSize: 15, color: "#18181b", marginBottom: "0.75rem" }}>
              เลือกประเภทเนื้อสัตว์
            </p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {item.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  style={{
                    flex: 1,
                    padding: "0.7rem 0.85rem",
                    borderRadius: 10,
                    border: `1.5px solid ${selectedVariant?.id === v.id ? "#027361" : "#e4e4e7"}`,
                    backgroundColor: selectedVariant?.id === v.id ? "rgba(2,115,97,0.06)" : "#fafafa",
                    cursor: "pointer",
                    transition: "all 0.18s ease",
                    fontFamily: "Noto Sans Thai, sans-serif",
                    fontSize: 15,
                    fontWeight: selectedVariant?.id === v.id ? 700 : 500,
                    color: selectedVariant?.id === v.id ? "#027361" : "#52525b",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.2rem",
                  }}
                >
                  <span>{v.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: selectedVariant?.id === v.id ? "#027361" : "#71717a" }}>
                    ฿{v.price}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Toppings grouped */}
        {applicableToppings.length > 0 && (
          <div style={{ marginBottom: "1.25rem" }}>
            <p style={{ fontWeight: 700, fontSize: 15, color: "#18181b", marginBottom: "0.75rem" }}>
              เลือกท็อปปิ้งเพิ่มเติม (เลือกได้มากกว่า 1 อย่าง)
            </p>
            {(Object.keys(toppingsByGroup) as ToppingGroup[]).map((group) => (
              <div key={group} style={{ marginBottom: "0.75rem" }}>
                <p style={{ fontSize: 13, color: "#71717a", fontWeight: 600, marginBottom: "0.4rem", paddingLeft: "0.25rem" }}>
                  {toppingGroupLabel[group]}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {toppingsByGroup[group].map((t) => (
                    <label
                      key={t.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "0.6rem 0.85rem",
                        borderRadius: 10,
                        border: `1.5px solid ${selected.has(t.id) ? "#027361" : "#e4e4e7"}`,
                        backgroundColor: selected.has(t.id) ? "rgba(2,115,97,0.06)" : "#fafafa",
                        cursor: "pointer",
                        transition: "all 0.18s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: 5,
                            border: `2px solid ${selected.has(t.id) ? "#027361" : "#d4d4d8"}`,
                            backgroundColor: selected.has(t.id) ? "#027361" : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            transition: "all 0.18s",
                          }}
                        >
                          {selected.has(t.id) && <Check size={12} color="#fff" strokeWidth={3} />}
                        </div>
                        <span style={{ fontSize: 15, color: "#18181b" }}>{t.name}</span>
                      </div>
                      <span style={{ color: "#027361", fontWeight: 700, fontSize: 14 }}>+฿{t.price}</span>
                      <input
                        type="checkbox"
                        checked={selected.has(t.id)}
                        onChange={() => toggleTopping(t.id)}
                        style={{ display: "none" }}
                      />
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Note */}
        {item.note && (
          <div style={{ backgroundColor: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10, padding: "0.65rem 0.85rem", marginBottom: "1.25rem", fontSize: 13, color: "#92400e" }}>
            💡 {item.note}
          </div>
        )}

        {/* Quantity */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem", padding: "0.75rem 1rem", background: "#f4f4f5", borderRadius: 12 }}>
          <span style={{ fontWeight: 600, fontSize: 15 }}>จำนวน</span>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              style={{ width: 34, height: 34, borderRadius: "50%", border: "1.5px solid #d4d4d8", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Minus size={16} />
            </button>
            <span style={{ fontSize: 18, fontWeight: 700, minWidth: 24, textAlign: "center" }}>{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              style={{ width: 34, height: 34, borderRadius: "50%", border: "none", background: "#027361", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Plus size={16} color="#fff" />
            </button>
          </div>
        </div>

        {/* Add to cart button */}
        <button
          onClick={() => { onAdd(selectedToppings, qty, selectedVariant); onClose(); }}
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            boxShadow: "0 4px 16px rgba(2,115,97,0.3)",
          }}
        >
          <ShoppingCart size={18} />
          เพิ่มลงตะกร้า · ฿{total.toLocaleString()}
        </button>
      </div>
      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─── Menu Card ───────────────────────────────────────────────
function MenuCard({ item, onSelect }: { item: MenuItem; onSelect: () => void }) {
  const priceDisplay = item.variants
    ? `฿${item.variants[0].price}–${item.variants[item.variants.length - 1].price}`
    : `฿${item.price}`;

  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid #f0f0f0",
        boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.12)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 8px rgba(0,0,0,0.06)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
        <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover", transition: "transform 0.4s" }} sizes="(max-width: 768px) 100vw, 33vw" />
        {item.badge && (
          <div style={{ position: "absolute", top: 10, left: 10, backgroundColor: item.badge === "Best Seller" ? "#9b1315" : "#027361", color: "#fff", padding: "0.2rem 0.6rem", borderRadius: 100, fontSize: 11, fontWeight: 700 }}>
            {item.badge}
          </div>
        )}
      </div>
      <div style={{ padding: "1rem", flex: 1, display: "flex", flexDirection: "column" }}>
        <h4 style={{ fontWeight: 700, fontSize: "1.05rem", color: "#18181b", margin: "0 0 0.35rem" }}>
          {item.name.includes("โรตี") ? (
            <>
              <span style={{ color: "#9b1315" }}>โรตี</span>
              {item.name.replace("โรตี", "")}
            </>
          ) : item.name}
        </h4>
        <p style={{ color: "#71717a", fontSize: 13, lineHeight: 1.55, margin: "0 0 auto", flex: 1 }}>
          {item.description}
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid #f4f4f5" }}>
          <span style={{ color: "#027361", fontWeight: 800, fontSize: "1.1rem" }}>{priceDisplay}</span>
          <button
            id={`add-${item.id}`}
            onClick={onSelect}
            style={{
              background: "linear-gradient(135deg, #027361, #04a882)",
              border: "none",
              borderRadius: 8,
              color: "#fff",
              cursor: "pointer",
              padding: "0.4rem 0.85rem",
              fontSize: 13,
              fontFamily: "Noto Sans Thai, sans-serif",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            <Plus size={14} /> เพิ่ม / เลือกท็อปปิ้ง
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main OrderingSection ────────────────────────────────────
export default function OrderingSection({ onCheckout }: { onCheckout: () => void }) {
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  const categories: (Category | "all")[] = ["all", "sweet", "savory", "drink"];
  const categoryLabelAll: Record<Category | "all", string> = { all: "ทั้งหมด", ...categoryLabel };

  // Filter items
  const filtered = activeCategory === "all" ? menuItems : menuItems.filter((m) => m.category === activeCategory);

  return (
    <section
      id="order"
      style={{ backgroundColor: "#ffffff", padding: "5rem 1.5rem" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: "rgba(155,19,21,0.1)",
              color: "#9b1315",
              fontSize: 13,
              fontWeight: 700,
              padding: "0.3rem 1rem",
              borderRadius: 100,
              marginBottom: "0.75rem",
              letterSpacing: "0.08em",
            }}
          >
            สั่งอาหารออนไลน์
          </span>
          <h2
            style={{
              color: "#18181b",
              fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
              fontWeight: 800,
              margin: 0,
            }}
          >
            เลือกเมนูโปรด เพิ่มท็อปปิ้งตามใจชอบ
          </h2>
          <p style={{ color: "#71717a", marginTop: "0.5rem", fontSize: 15 }}>
            คลิกปุ่ม &quot;เพิ่ม / เลือกท็อปปิ้ง&quot; เพื่อเลือกท็อปปิ้งเพิ่มเติมได้เลยครับ
          </p>
        </div>

        {/* Category Filter */}
        <div
          style={{
            display: "flex",
            gap: "0.6rem",
            justifyContent: "center",
            marginBottom: "2.5rem",
            flexWrap: "wrap",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-${cat}`}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "0.5rem 1.25rem",
                borderRadius: 100,
                border: `1.5px solid ${activeCategory === cat ? "#027361" : "#e4e4e7"}`,
                backgroundColor: activeCategory === cat ? "#027361" : "#fff",
                color: activeCategory === cat ? "#fff" : "#52525b",
                cursor: "pointer",
                fontSize: 14,
                fontFamily: "Noto Sans Thai, sans-serif",
                fontWeight: activeCategory === cat ? 700 : 500,
                transition: "all 0.2s ease",
              }}
            >
              {categoryLabelAll[cat]}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2.5rem",
          }}
        >
          {filtered.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              onSelect={() => setSelectedItem(item)}
            />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "3rem", color: "#71717a" }}>
            <p style={{ fontSize: 48, marginBottom: "1rem" }}>🍽️</p>
            <p style={{ fontWeight: 600 }}>ไม่พบเมนูในหมวดนี้</p>
          </div>
        )}

        {/* Delivery note */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(2,115,97,0.06), rgba(2,115,97,0.02))",
            border: "1px solid rgba(2,115,97,0.2)",
            borderRadius: 16,
            padding: "1.25rem 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <p style={{ fontWeight: 700, fontSize: 15, color: "#18181b", margin: "0 0 0.25rem" }}>
              🛵 สั่งผ่านแอปเดลิเวอรี
            </p>
            <p style={{ color: "#71717a", fontSize: 13, margin: 0 }}>
              สั่งผ่าน Grab Food และ Line Man ได้แล้ววันนี้
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a
              href="https://food.grab.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                backgroundColor: "#00b14f",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.85")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
            >
              🟢 Grab Food
            </a>
            <a
              href="https://liff.line.me/1601919508-Mekm4L15"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                backgroundColor: "#00c300",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.85")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
            >
              💚 Line Man
            </a>
          </div>
        </div>
      </div>

      {/* Option Modal */}
      {selectedItem && (
        <OptionModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAdd={(tops, qty, variant) => addItem(selectedItem, tops, qty, variant)}
        />
      )}
    </section>
  );
}
