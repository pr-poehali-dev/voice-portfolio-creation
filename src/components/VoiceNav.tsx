import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'О мне', href: '#about' },
    { label: 'Работы', href: '#works' },
    { label: 'Демо', href: '#demo' },
    { label: 'Услуги', href: '#services' },
    { label: 'Прайс', href: '#price' },
    { label: 'Контакты', href: '#contacts' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(7,11,23,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,162,39,0.08)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <a href="#" className="font-display text-xl tracking-[0.35em] uppercase" style={{ color: 'var(--gold)' }}>
          ГОЛОС
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs tracking-[0.15em] uppercase text-white/40 hover:text-white/90 transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#contacts"
          className="hidden md:block text-xs tracking-[0.15em] uppercase px-5 py-2.5 transition-all duration-300 hover:bg-gold hover:text-black"
          style={{ border: '1px solid rgba(201,162,39,0.5)', color: 'var(--gold)' }}
        >
          Связаться
        </a>
        <button className="md:hidden" style={{ color: 'rgba(255,255,255,0.5)' }} onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={20} />
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden px-6 py-5 space-y-5 border-t" style={{ background: 'rgba(7,11,23,0.98)', borderColor: 'rgba(255,255,255,0.06)' }}>
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="block text-sm tracking-[0.12em] uppercase text-white/50 hover:text-white/90 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

export function Hero() {
  const bars = Array.from({ length: 56 });
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(30,60,160,0.25) 0%, rgba(212,168,32,0.05) 60%, transparent 100%)',
      }} />

      {/* Background wave */}
      <div className="absolute bottom-0 left-0 right-0 h-36 flex items-end justify-center gap-[2px] opacity-15 px-4">
        {bars.map((_, i) => (
          <div
            key={i}
            className="wave-bar flex-1 rounded-t-sm"
            style={{
              maxWidth: '14px',
              height: `${25 + Math.sin(i * 0.28) * 45 + Math.cos(i * 0.15) * 25}%`,
              background: 'var(--gold)',
              animationDuration: `${1.2 + (i % 7) * 0.2}s`,
              animationDelay: `${i * 0.06}s`,
            }}
          />
        ))}
      </div>

      {/* Circles */}
      <div className="absolute rounded-full glow-pulse" style={{ width: '520px', height: '520px', border: '1px solid rgba(201,162,39,0.08)', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
      <div className="absolute rounded-full" style={{ width: '320px', height: '320px', border: '1px solid rgba(201,162,39,0.05)', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <p className="text-xs tracking-[0.45em] uppercase mb-8 animate-fade-up" style={{ color: 'var(--gold)', animationDelay: '0.2s', opacity: 0 }}>
          Профессиональный голосовой актёр
        </p>

        <h1 className="font-display leading-none tracking-tight mb-6 animate-fade-up" style={{ fontSize: 'clamp(4rem,12vw,9rem)', animationDelay: '0.4s', opacity: 0 }}>
          <span className="text-shimmer">Алексей</span>
          <br />
          <span className="text-white/85 italic font-light">Воронов</span>
        </h1>

        <p className="text-base md:text-lg text-white/35 max-w-md mx-auto leading-relaxed mb-12 animate-fade-up" style={{ animationDelay: '0.6s', opacity: 0 }}>
          Голос, который продаёт, убеждает и запоминается.<br />Более 500 проектов за 12 лет.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.8s', opacity: 0 }}>
          <a
            href="#demo"
            className="group flex items-center justify-center gap-3 px-8 py-4 font-medium tracking-[0.1em] uppercase text-sm transition-all duration-300 hover:opacity-90"
            style={{ background: 'var(--gold)', color: '#070B17' }}
          >
            <Icon name="Play" size={16} style={{ color: '#070B17' }} />
            Слушать демо
          </a>
          <a
            href="#contacts"
            className="flex items-center justify-center gap-3 px-8 py-4 text-sm tracking-[0.1em] uppercase transition-all duration-300 hover:bg-white/5"
            style={{ border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)' }}
          >
            Обсудить проект
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up" style={{ animationDelay: '1.2s', opacity: 0 }}>
        <span className="text-xs tracking-[0.25em] uppercase text-white/15">Листать</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/15 to-transparent" />
      </div>
    </section>
  );
}
