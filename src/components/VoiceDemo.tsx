import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

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

export function Demo() {
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
