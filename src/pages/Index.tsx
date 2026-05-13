import { useState, useEffect } from "react";
import { Nav, Hero } from "@/components/VoiceNav";
import { About, Works, Services } from "@/components/VoiceContent";
import { Demo } from "@/components/VoiceDemo";
import { Price, Contacts, Footer } from "@/components/VoicePricing";
import Icon from "@/components/ui/icon";

export default function Index() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: 'var(--dark)', minHeight: '100vh', color: 'var(--cream)' }}>
      <Nav />
      <Hero />
      <About />
      <Works />
      <Demo />
      <Services />
      <Price />
      <Contacts />
      <Footer />

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 z-50 w-11 h-11 flex items-center justify-center rounded-full transition-all duration-300"
        style={{
          background: 'var(--gold)',
          color: '#070B17',
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? 'auto' : 'none',
          transform: visible ? 'translateY(0)' : 'translateY(12px)',
          boxShadow: '0 0 20px rgba(212,168,32,0.35)',
        }}
        aria-label="Наверх"
      >
        <Icon name="ArrowUp" size={18} style={{ color: '#070B17' }} />
      </button>
    </div>
  );
}