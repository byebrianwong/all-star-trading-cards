import { Zap } from 'lucide-react';
import type { Athlete } from '@/data/types';
import { SPORT_LABEL } from '@/data/types';
import { RarityBadge } from './RarityBadge';

export function CardFront({ athlete }: { athlete: Athlete }) {
  const { name, team, sport, era, rarity, accentColor, secondaryColor, initials, jerseyNumber, stats, ability, flavorText } = athlete;

  return (
    <div className="relative w-full h-full rounded-[22px] overflow-hidden flex flex-col text-ink-100 font-display">
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, ${accentColor} 0%, ${secondaryColor} 100%)
          `,
        }}
      />
      <div
        className="absolute inset-0 opacity-60 mix-blend-overlay"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.45), transparent 55%),
            radial-gradient(ellipse at 70% 90%, rgba(0,0,0,0.45), transparent 60%)
          `,
        }}
      />

      <div className="relative flex-1 flex flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <RarityBadge rarity={rarity} />
            <div className="mt-1 text-[10px] font-mono uppercase tracking-widest text-white/70">
              {SPORT_LABEL[sport]}
            </div>
          </div>
          {jerseyNumber && (
            <div className="font-mono font-bold text-3xl leading-none text-white/90 drop-shadow">
              #{jerseyNumber}
            </div>
          )}
        </div>

        <div className="flex-1 flex items-center justify-center my-2">
          <div
            className="relative w-36 h-36 rounded-full flex items-center justify-center shadow-2xl"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${secondaryColor}, ${accentColor} 75%)`,
              boxShadow: `0 20px 40px -10px ${accentColor}, inset 0 2px 10px rgba(255,255,255,0.3)`,
            }}
          >
            <span className="text-5xl font-bold tracking-tight text-white drop-shadow-lg">{initials}</span>
            <div className="absolute inset-0 rounded-full ring-2 ring-white/30" />
          </div>
        </div>

        <div className="text-center">
          <h3 className="font-display font-bold text-lg leading-tight tracking-tight text-white drop-shadow">
            {name}
          </h3>
          <p className="text-[11px] font-mono uppercase tracking-widest text-white/70 mt-0.5">
            {team} · {era}
          </p>
        </div>

        <div className="mt-3 grid grid-cols-4 gap-1.5 bg-black/30 rounded-lg p-2 backdrop-blur-sm">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-mono font-bold text-sm text-white leading-none">{s.value}</div>
              <div className="text-[9px] font-mono uppercase tracking-wider text-white/60 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-2 rounded-lg bg-black/40 backdrop-blur-sm p-2.5 border border-white/10">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-yellow-300" />
            <span className="font-display font-bold text-xs uppercase tracking-wider text-yellow-200">
              {ability.name}
            </span>
          </div>
          <p className="mt-1 text-[10px] leading-snug text-white/85">{ability.description}</p>
        </div>

        <p className="mt-2 text-[10px] italic text-white/60 text-center leading-tight">{flavorText}</p>
      </div>
    </div>
  );
}
