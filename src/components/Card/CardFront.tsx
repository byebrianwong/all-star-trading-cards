import type { Athlete } from '@/data/types';
import { SPORT_LABEL } from '@/data/types';
import { RarityBadge } from './RarityBadge';
import { Portrait, StatGrid, AbilityBox } from './CardElements';

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
          <Portrait initials={initials} accentColor={accentColor} secondaryColor={secondaryColor} />
        </div>

        <div className="text-center">
          <h3 className="font-display font-bold text-lg leading-tight tracking-tight text-white drop-shadow">
            {name}
          </h3>
          <p className="text-[11px] font-mono uppercase tracking-widest text-white/70 mt-0.5">
            {team} · {era}
          </p>
        </div>

        <StatGrid stats={stats} className="mt-3" />

        <AbilityBox ability={ability} className="mt-2" />

        <p className="mt-2 text-[10px] italic text-white/60 text-center leading-tight">{flavorText}</p>
      </div>
    </div>
  );
}
