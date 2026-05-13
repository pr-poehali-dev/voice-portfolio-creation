import { Nav, Hero } from "@/components/VoiceNav";
import { About, Works, Services } from "@/components/VoiceContent";
import { Demo } from "@/components/VoiceDemo";
import { Price, Contacts, Footer } from "@/components/VoicePricing";

export default function Index() {
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
    </div>
  );
}
