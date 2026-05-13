import Icon from "@/components/ui/icon";

export function About() {
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

export function Works() {
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

export function Services() {
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
