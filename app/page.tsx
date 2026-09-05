"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SignatureSection from "@/components/SignatureSection";
import OrderingSection from "@/components/OrderingSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import CartPanel from "@/components/CartPanel";
import CheckoutModal from "@/components/CheckoutModal";
import FloatingCartBar from "@/components/FloatingCartBar";

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <>
      <Navbar onCartOpen={() => setCartOpen(true)} />
      <main>
        <HeroSection />
        <SignatureSection />
        <OrderingSection />
        <AboutSection />
      </main>
      <Footer />

      <FloatingCartBar onOpenCart={() => setCartOpen(true)} />

      <CartPanel
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => setCheckoutOpen(true)}
      />
      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </>
  );
}
