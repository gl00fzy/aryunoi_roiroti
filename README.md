# 🫓 อร่อยหน่อย ร้อยโรตี (Aryunoi RoiRoti)

เว็บแอปพลิเคชันสำหรับสั่งซื้อโรตีออนไลน์แบบครบวงจร พัฒนาด้วย **Next.js 16 (App Router)**, **React 19**, **TypeScript** และ **Tailwind CSS v4** พร้อมระบบจัดการตะกร้าสินค้าแบบเรียลไทม์ และระบบชำระเงินด้วย QR Code PromptPay อัตโนมัติ

---

## 🌟 ฟีเจอร์หลัก (Features)

- **หน้าแรก & เมนูแนะนำ (Hero & Signature Menu):** แสดงผลเมนูโรตีไฮไลท์ ดีไซน์สวยงาม ทันสมัย และรองรับ Responsive บนทุกอุปกรณ์
- **ระบบสั่งซื้อสินค้า (Ordering System):** เลือกระดับความหวาน ท็อปปิ้ง และจำนวนสินค้าที่ต้องการได้อย่างสะดวก
- **ระบบจัดการตะกร้าสินค้า (Shopping Cart):** ใช้ **Zustand** ในการจัดการ State ของตะกร้าสินค้าอย่างรวดเร็วและลื่นไหล
- **ระบบชำระเงินด้วย PromptPay QR Code:** เจนเนอเรต QR Code พร้อมรับเงินตามยอดรวมการสั่งซื้อจริงอัตโนมัติด้วย `promptpay-qr` และ `qrcode`
- **ระบบสรุปและยืนยันคำสั่งซื้อ (Checkout Modal):** ตรวจสอบรายการและกรอกข้อมูลจัดส่งก่อนกดยืนยันการสั่งซื้อ

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Payment & QR Code:** `promptpay-qr` & `qrcode`

---

## 🚀 ขั้นตอนการติดตั้งและใช้งาน (Getting Started)

### 1. ติดตั้ง Dependencies

```bash
npm install
```

### 2. รัน Development Server

```bash
npm run dev
```

เปิดบราวเซอร์ไปที่ [http://localhost:3000](http://localhost:3000) เพื่อดูผลลัพธ์

### 3. Build สำหรับ Production

```bash
npm run build
npm run start
```

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```text
aryunoi-roiroti/
├── app/                  # Next.js App Router (Layouts, Pages, Global CSS)
├── components/           # UI Components (Navbar, HeroSection, OrderingSection, CartPanel, CheckoutModal, ฯลฯ)
├── public/               # รูปภาพและ Static Assets
├── package.json          # รายการ Dependencies และ Scripts
└── tsconfig.json         # การตั้งค่า TypeScript
```
