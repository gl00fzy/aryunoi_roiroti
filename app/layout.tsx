import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-noto-sans-thai",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aryunoi-roiroti.vercel.app"),
  title: "อายุน้อยร้อยโรตี — ร้านโรตีมหาสารคาม โรตีสารคาม โรตีมมส สูตรต้นตำรับแดนใต้",
  description:
    "ร้านอายุน้อยร้อยโรตี ร้านโรตีมหาสารคาม โรตีสารคาม โรตีมมส เมนูซิกเนเจอร์โรตีน้ำแกงและโรตีมะตะบะ สูตรต้นตำรับจากแดนใต้ เปิดทุกวัน (ยกเว้นวันเสาร์) 16:30–21:30 น.",
  keywords: [
    "อายุน้อยร้อยโรตี",
    "โรตีมหาสารคาม",
    "โรตีสารคาม",
    "ร้านโรตี",
    "โรตีใกล้ฉัน",
    "โรตีมมส",
    "ร้านโรตีมหาสารคาม",
    "โรตีน้ำแกง",
    "โรตีมะตะบะ",
    "ชาชัก มหาสารคาม",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "อายุน้อยร้อยโรตี — ร้านโรตีมหาสารคาม โรตีสารคาม โรตีมมส",
    description: "รสสัมผัสต้นตำรับโรตีแท้ ส่งตรงจากแดนใต้ ร้านโรตีมหาสารคาม ใกล้มมส.",
    url: "https://aryunoi-roiroti.vercel.app",
    siteName: "อายุน้อยร้อยโรตี",
    locale: "th_TH",
    type: "website",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "ร้านอายุน้อยร้อยโรตี มหาสารคาม",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "อายุน้อยร้อยโรตี",
  "alternateName": ["โรตีมหาสารคาม", "โรตีสารคาม", "โรตีมมส", "ร้านโรตีมหาสารคาม"],
  "description": "ร้านโรตีสูตรต้นตำรับแดนใต้ โรตีน้ำแกง โรตีมะตะบะ ชาชัก มหาสารคาม",
  "url": "https://aryunoi-roiroti.vercel.app",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "เมืองมหาสารคาม",
    "addressRegion": "มหาสารคาม",
    "addressCountry": "TH"
  },
  "servesCuisine": "Thai, Roti, Desserts",
  "priceRange": "฿"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${notoSansThai.variable} ${notoSansThai.className} min-h-full flex flex-col antialiased`}>{children}</body>
    </html>
  );
}
