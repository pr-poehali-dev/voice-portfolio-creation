import { useState } from "react";
import Icon from "@/components/ui/icon";

export function Price() {
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

export function Contacts() {
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

export function Footer() {
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
