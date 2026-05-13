import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

// === AUDIO PLAYER COMPONENT ===
interface Track {
  id: number;
  title: string;
  category: string;
  duration: string;
}

const tracks: Track[] = [
  { id: 1, title: "Рекламный ролик — Автомобили", category: "Реклама", duration: "0:30" },
  { id: 2, title: "Документальный фильм — Природа", category: "Документалистика", duration: "1:15" },
  { id: 3, title: "Аудиокнига — Классика", category: "Аудиокниги", duration: "2:40" },
  { id: 4, title: "Корпоративная презентация", category: "B2B", duration: "0:55" },
  { id: 5, title: "Мультипликационный герой", category: "Анимация", duration: "0:45" },
];

function WaveVisualizer({ isPlaying }: { isPlaying: boolean }) {
  const bars = Array.from({ length: 28 });
  return (
    <div className="flex items-end gap-[2px] h-8">
      {bars.map((_, i) => (
        <div
          key={i}
          className="wave-bar rounded-sm"
          style={{
            width: '3px',
            height: `${30 + Math.sin(i * 0.5) * 40 + (i % 3) * 10}%`,
            background: `rgba(201, 162, 39, ${isPlaying ? 0.8 : 0.2})`,
            animationDuration: `${0.7 + (i % 5) * 0.15}s`,
            animationDelay: `${i * 0.04}s`,
            animationPlayState: isPlaying ? 'running' : 'paused',
          }}
        />
      ))}
    </div>
  );
}

function AudioPlayer() {
  const [currentTrack, setCurrentTrack] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlay = (id: number) => {
    if (currentTrack === id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(id);
      setIsPlaying(true);
      setProgress(0);
    }
  };

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { setIsPlaying(false); return 0; }
        return p + 0.4;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="space-y-3">
      {tracks.map((track) => {
        const active = currentTrack === track.id;
        return (
          <div
            key={track.id}
            className="card-hover group relative border rounded-lg overflow-hidden cursor-pointer"
            style={{
              borderColor: active ? 'rgba(201,162,39,0.3)' : 'rgba(255,255,255,0.05)',
              background: active ? 'rgba(201,162,39,0.06)' : 'rgba(255,255,255,0.02)',
            }}
            onClick={() => handlePlay(track.id)}
          >
            {active && (
              <div
                className="absolute top-0 left-0 h-full transition-all duration-200"
                style={{ width: `${progress}%`, background: 'rgba(201,162,39,0.07)' }}
              />
            )}
            <div className="relative flex items-center gap-4 px-5 py-4">
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                style={{
                  background: active ? 'var(--gold)' : 'rgba(255,255,255,0.06)',
                  boxShadow: active ? '0 0 20px rgba(201,162,39,0.4)' : 'none',
                }}
              >
                <Icon
                  name={active && isPlaying ? "Pause" : "Play"}
                  size={15}
                  style={{ color: active ? '#0D0B08' : 'rgba(255,255,255,0.5)', marginLeft: active && isPlaying ? 0 : 2 }}
                />
              </button>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(201,162,39,0.12)', color: 'var(--gold)' }}>
                    {track.category}
                  </span>
                </div>
                <p className="text-sm font-medium text-white/70 truncate">{track.title}</p>
                {active && (
                  <div className="mt-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={progress}
                      onChange={(e) => setProgress(Number(e.target.value))}
                      className="progress-bar w-full"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                {active && (
                  <div className="hidden sm:block">
                    <WaveVisualizer isPlaying={isPlaying} />
                  </div>
                )}
                <span className="text-xs text-white/25 flex-shrink-0">{track.duration}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// === NAV ===
function Nav() {
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

// === HERO ===
function Hero() {
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

// === ABOUT ===
function About() {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--gold)' }}>О мне</p>
          <h2 className="font-display text-5xl md:text-6xl leading-tight mb-8 text-white/85">
            Голос как<br /><em>инструмент</em>
          </h2>
          <div className="divider-line mb-8" />
          <p className="text-white/45 leading-relaxed mb-5">
            Более 12 лет я превращаю тексты в живые истории. Работал с крупнейшими российскими и международными брендами — от рекламных роликов до аудиокниг.
          </p>
          <p className="text-white/45 leading-relaxed mb-10">
            Профессиональная студия с высококачественным оборудованием. Чистый тембр, широкий диапазон — от мягкого повествования до энергичного промо.
          </p>
          <div className="grid grid-cols-3 gap-6">
            {[
              { num: '500+', label: 'Проектов' },
              { num: '12', label: 'Лет опыта' },
              { num: '50+', label: 'Клиентов' },
            ].map(s => (
              <div key={s.label}>
                <div className="font-display text-4xl mb-1" style={{ color: 'var(--gold)' }}>{s.num}</div>
                <div className="text-xs tracking-[0.15em] uppercase text-white/25">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div
            className="aspect-[3/4] rounded-lg flex flex-col items-center justify-center gap-4"
            style={{ background: 'rgba(201,162,39,0.04)', border: '1px solid rgba(201,162,39,0.12)' }}
          >
            <Icon name="Mic" size={60} style={{ color: 'rgba(201,162,39,0.2)' }} />
            <span className="text-xs tracking-widest uppercase text-white/15">Ваше фото</span>
          </div>
          <div
            className="absolute -bottom-6 -left-6 px-6 py-4 rounded-lg"
            style={{ background: 'var(--gold)' }}
          >
            <div className="font-display text-3xl font-semibold" style={{ color: '#070B17' }}>№1</div>
            <div className="text-xs tracking-wider uppercase font-medium" style={{ color: 'rgba(7,11,23,0.6)' }}>в своём деле</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// === WORKS ===
function Works() {
  const works = [
    { title: "Федеральная рекламная кампания", client: "Автоконцерн", year: "2024", type: "Реклама" },
    { title: "Документальный цикл «Россия»", client: "Телеканал", year: "2023", type: "Кино" },
    { title: "Аудиокнига «Мастер и Маргарита»", client: "Издательство", year: "2023", type: "Книги" },
    { title: "Корпоративный тренинг", client: "Банк ТОП-5", year: "2024", type: "B2B" },
    { title: "Мобильная игра «Герои»", client: "GameStudio", year: "2024", type: "Игры" },
    { title: "Подкаст «Наука просто»", client: "Медиахолдинг", year: "2023", type: "Подкасты" },
  ];

  return (
    <section id="works" className="py-32 px-6" style={{ background: 'rgba(255,255,255,0.01)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--gold)' }}>Работы</p>
            <h2 className="font-display text-5xl md:text-6xl text-white/85">Избранные<br /><em>проекты</em></h2>
          </div>
          <div className="divider-line" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.04)' }}>
          {works.map((w, i) => (
            <div
              key={i}
              className="card-hover group p-8 cursor-pointer"
              style={{ background: '#070B17' }}
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(201,162,39,0.1)', color: 'var(--gold)' }}>
                  {w.type}
                </span>
                <span className="text-xs text-white/20">{w.year}</span>
              </div>
              <h3 className="font-display text-xl text-white/70 mb-3 group-hover:text-white/90 transition-colors">{w.title}</h3>
              <p className="text-xs text-white/25 tracking-wider uppercase">{w.client}</p>
              <div className="mt-6 flex items-center gap-2 text-xs text-white/20 group-hover:text-white/50 transition-colors">
                <Icon name="ArrowUpRight" size={14} />
                <span>Подробнее</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// === DEMO ===
function Demo() {
  return (
    <section id="demo" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--gold)' }}>Демо</p>
          <h2 className="font-display text-5xl md:text-6xl text-white/85 mb-4">
            Услышьте<br /><em>разницу</em>
          </h2>
          <p className="text-white/35 max-w-sm mx-auto">Выберите любой трек и оцените качество звучания</p>
        </div>

        <div
          className="rounded-xl p-8"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="flex items-center gap-2 mb-8">
            <div className="w-2 h-2 rounded-full bg-red-500/50" />
            <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(201,162,39,0.5)' }} />
            <div className="w-2 h-2 rounded-full bg-green-500/50" />
            <span className="ml-3 text-xs text-white/15 tracking-wider font-mono">demo_tracks.wav</span>
          </div>
          <AudioPlayer />
        </div>

        <p className="text-center text-xs text-white/15 mt-6 tracking-wide">
          Демо представлены в ознакомительных целях. Исходники — по запросу.
        </p>
      </div>
    </section>
  );
}

// === SERVICES ===
function Services() {
  const services = [
    { icon: "Radio", title: "Реклама и промо", desc: "ТВ, радио, интернет. Любые форматы от 15 сек до 5 минут. Срочное исполнение за 24 часа.", price: "от 3 000 ₽" },
    { icon: "BookOpen", title: "Аудиокниги", desc: "Полное озвучание книг с соблюдением авторского стиля. Диалоги, атмосфера, характеры.", price: "от 1 500 ₽/час" },
    { icon: "Film", title: "Кино и сериалы", desc: "Документальные фильмы, закадровый текст, дублирование. Студийное качество.", price: "от 5 000 ₽" },
    { icon: "Gamepad2", title: "Игры и анимация", desc: "Персонажи, системные сообщения, интерфейс. Широкий диапазон образов.", price: "от 2 000 ₽" },
    { icon: "Building2", title: "Корпоративный контент", desc: "Обучающие курсы, презентации, IVR. Профессиональный деловой тон.", price: "от 4 000 ₽" },
    { icon: "Mic2", title: "Подкасты и YouTube", desc: "Вступление, интро, рекламные вставки. Тёплый, располагающий голос.", price: "от 1 000 ₽" },
  ];

  return (
    <section id="services" className="py-32 px-6" style={{ background: 'rgba(201,162,39,0.015)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--gold)' }}>Услуги</p>
          <h2 className="font-display text-5xl md:text-6xl text-white/85">Что я<br /><em>предлагаю</em></h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <div
              key={i}
              className="card-hover p-7 rounded-lg"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-5" style={{ background: 'rgba(201,162,39,0.1)' }}>
                <Icon name={s.icon} size={20} style={{ color: 'var(--gold)' }} />
              </div>
              <h3 className="font-medium text-white/75 mb-2">{s.title}</h3>
              <p className="text-sm text-white/30 leading-relaxed mb-4">{s.desc}</p>
              <div className="text-sm font-medium" style={{ color: 'var(--gold)' }}>{s.price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// === PRICE ===
function Price() {
  const plans = [
    {
      name: "Базовый", price: "3 000", unit: "₽ / минута",
      features: ["Ролики до 3 минут", "1 правка включена", "Срок: 3 рабочих дня", "MP3 / WAV"],
      featured: false,
    },
    {
      name: "Стандарт", price: "8 000", unit: "₽ / проект",
      features: ["Ролики до 15 минут", "3 правки включены", "Срок: 2 рабочих дня", "MP3 / WAV / AIFF", "Приоритетная очередь"],
      featured: true,
    },
    {
      name: "Премиум", price: "Договорная", unit: "цена",
      features: ["Проекты любого объёма", "Неограниченные правки", "Срок: согласуется", "Все форматы", "Личный менеджер", "NDA по запросу"],
      featured: false,
    },
  ];

  return (
    <section id="price" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--gold)' }}>Прайс</p>
          <h2 className="font-display text-5xl md:text-6xl text-white/85">Честные<br /><em>цены</em></h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((p, i) => (
            <div
              key={i}
              className="card-hover relative p-8 rounded-xl"
              style={{
                background: p.featured ? 'rgba(201,162,39,0.07)' : 'rgba(255,255,255,0.02)',
                border: p.featured ? '1px solid rgba(201,162,39,0.3)' : '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {p.featured && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs tracking-wider uppercase"
                  style={{ background: 'var(--gold)', color: '#0D0B08' }}
                >
                  Популярный
                </div>
              )}
              <p className="text-xs tracking-[0.2em] uppercase text-white/25 mb-4">{p.name}</p>
              <div className="font-display text-4xl mb-1" style={{ color: p.featured ? 'var(--gold)' : 'rgba(255,255,255,0.8)' }}>
                {p.price}
              </div>
              <p className="text-xs text-white/20 mb-8">{p.unit}</p>
              <ul className="space-y-3 mb-8">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-white/45">
                    <Icon name="Check" size={13} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contacts"
                className="block text-center py-3 text-sm tracking-[0.1em] uppercase transition-all duration-300 hover:opacity-85"
                style={p.featured
                  ? { background: 'var(--gold)', color: '#070B17' }
                  : { border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.4)' }
                }
              >
                Выбрать
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-white/15 mt-8">
          Индивидуальные условия для постоянных клиентов и крупных проектов
        </p>
      </div>
    </section>
  );
}

// === CONTACTS ===
function Contacts() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  return (
    <section id="contacts" className="py-32 px-6" style={{ background: 'rgba(255,255,255,0.01)' }}>
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        <div>
          <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--gold)' }}>Контакты</p>
          <h2 className="font-display text-5xl md:text-6xl text-white/85 mb-6">
            Начнём<br /><em>работать?</em>
          </h2>
          <p className="text-white/35 leading-relaxed mb-12">
            Расскажите о вашем проекте — и я предложу оптимальное решение в течение нескольких часов.
          </p>

          <div className="space-y-6">
            {[
              { icon: "Mail", label: "Email", value: "aleksey@voronov.ru" },
              { icon: "Phone", label: "Телефон", value: "+7 (999) 123-45-67" },
              { icon: "MessageCircle", label: "Telegram", value: "@voronov_voice" },
            ].map(c => (
              <div key={c.label} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(201,162,39,0.1)' }}>
                  <Icon name={c.icon} size={18} style={{ color: 'var(--gold)' }} />
                </div>
                <div>
                  <div className="text-xs text-white/20 tracking-wider uppercase mb-0.5">{c.label}</div>
                  <div className="text-sm text-white/60">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {[
            { key: 'name', label: 'Ваше имя', placeholder: 'Иван Петров', type: 'text' },
            { key: 'email', label: 'Email', placeholder: 'ivan@company.ru', type: 'email' },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-xs tracking-[0.15em] uppercase text-white/25 mb-2">{f.label}</label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                value={form[f.key as keyof typeof form]}
                onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                className="w-full px-4 py-3 text-sm bg-transparent text-white/65 placeholder-white/15 outline-none transition-all duration-200"
                style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px' }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(201,162,39,0.4)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
              />
            </div>
          ))}
          <div>
            <label className="block text-xs tracking-[0.15em] uppercase text-white/25 mb-2">Сообщение</label>
            <textarea
              rows={5}
              placeholder="Расскажите о проекте: тематика, хронометраж, сроки..."
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 text-sm bg-transparent text-white/65 placeholder-white/15 outline-none resize-none transition-all duration-200"
              style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '4px' }}
              onFocus={(e) => e.target.style.borderColor = 'rgba(201,162,39,0.4)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 text-sm tracking-[0.15em] uppercase font-medium transition-all duration-300 hover:opacity-90"
            style={{ background: 'var(--gold)', color: '#070B17' }}
          >
            Отправить заявку
          </button>
        </form>
      </div>
    </section>
  );
}

// === FOOTER ===
function Footer() {
  return (
    <footer className="py-10 px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-display text-lg tracking-[0.35em] uppercase" style={{ color: 'var(--gold)' }}>
          ГОЛОС
        </div>
        <p className="text-xs text-white/15">© 2024 Алексей Воронов. Все права защищены.</p>
        <div className="flex items-center gap-6">
          {['ВКонтакте', 'Telegram', 'YouTube'].map(s => (
            <a key={s} href="#" className="text-xs tracking-wider uppercase text-white/20 hover:text-white/50 transition-colors">
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// === MAIN ===
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