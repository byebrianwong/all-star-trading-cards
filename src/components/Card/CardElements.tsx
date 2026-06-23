import { Zap } from 'lucide-react';
import type { Athlete } from '@/data/types';

// The individual building blocks of a CardFront, pulled out so each can be
// rendered (and story-tested) on its own. They carry no outer-layout margins —
// the parent positions them — so they drop cleanly into any container.

const cx = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(' ');

// The round portrait medallion with the athlete's initials.
export function Portrait({
  initials,
  accentColor,
  secondaryColor,
  className,
}: Pick<Athlete, 'initials' | 'accentColor' | 'secondaryColor'> & { className?: string }) {
  return (
    <div
      className={cx(
        'relative w-36 h-36 rounded-full flex items-center justify-center shadow-2xl',
        className,
      )}
      style={{
        background: `radial-gradient(circle at 30% 30%, ${secondaryColor}, ${accentColor} 75%)`,
        boxShadow: `0 20px 40px -10px ${accentColor}, inset 0 2px 10px rgba(255,255,255,0.3)`,
      }}
    >
      <span className="text-5xl font-bold tracking-tight text-white drop-shadow-lg">{initials}</span>
      <div className="absolute inset-0 rounded-full ring-2 ring-white/30" />
    </div>
  );
}

// The four-column stat readout.
export function StatGrid({ stats, className }: { stats: Athlete['stats']; className?: string }) {
  return (
    <div className={cx('grid grid-cols-4 gap-1.5 bg-black/30 rounded-lg p-2 backdrop-blur-sm', className)}>
      {stats.map((s) => (
        <div key={s.label} className="text-center">
          <div className="font-mono font-bold text-sm text-white leading-none">{s.value}</div>
          <div className="text-[9px] font-mono uppercase tracking-wider text-white/60 mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

// The signature-ability callout box.
export function AbilityBox({ ability, className }: { ability: Athlete['ability']; className?: string }) {
  return (
    <div className={cx('rounded-lg bg-black/40 backdrop-blur-sm p-2.5 border border-white/10', className)}>
      <div className="flex items-center gap-1.5">
        <Zap className="w-3.5 h-3.5 text-yellow-300" />
        <span className="font-display font-bold text-xs uppercase tracking-wider text-yellow-200">
          {ability.name}
        </span>
      </div>
      <p className="mt-1 text-[10px] leading-snug text-white/85">{ability.description}</p>
    </div>
  );
}
