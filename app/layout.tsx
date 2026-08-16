import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aryunoi-roiroti.vercel.app"),
  title: "อายุน้อยร้อยโรตี — โรตีแท้ต้นตำรับแดนใต้ มหาสารคาม",
  description:
    "ร้านอายุน้อยร้อยโรตี เมนูซิกเนเจอร์โรตีน้ำแกงและโรตีมะตะบะ สูตรต้นตำรับจากแดนใต้ ในมหาสารคาม เปิดทุกวัน (ยกเว้นวันเสาร์) 16:30–21:30 น.",
  keywords: [
    "อายุน้อยร้อยโรตี",
    "โรตี",
    "โรตีมหาสารคาม",
    "ร้านโรตีมหาสารคาม",
    "โรตีน้ำแกง",
    "โรตีมะตะบะ",
    "ร้านอาหารมหาสารคาม",
    "ชาชัก มหาสารคาม",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "อายุน้อยร้อยโรตี — โรตีแท้ต้นตำรับแดนใต้ มหาสารคาม",
    description: "รสสัมผัสต้นตำรับโรตีแท้ ส่งตรงจากแดนใต้ ในมหาสารคาม",
    url: "https://aryunoi-roiroti.vercel.app",
    siteName: "อายุน้อยร้อยโรตี",
    locale: "th_TH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
