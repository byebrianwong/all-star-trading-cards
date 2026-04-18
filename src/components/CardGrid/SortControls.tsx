import { ArrowDownAZ, Sparkles, Trophy, Clock } from 'lucide-react';
import type { ComponentType, SVGProps } from 'react';

export type SortMode = 'name' | 'rarity' | 'sport' | 'recent';

interface SortControlsProps {
  value: SortMode;
  onChange: (v: SortMode) => void;
  totalCount: number;
}

interface Option {
  id: SortMode;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const OPTIONS: Option[] = [
  { id: 'recent', label: 'Recent', icon: Clock },
  { id: 'rarity', label: 'Rarity', icon: Sparkles },
  { id: 'sport', label: 'Sport', icon: Trophy },
  { id: 'name', label: 'Name', icon: ArrowDownAZ },
];

export function SortControls({ value, onChange, totalCount }: SortControlsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="font-mono uppercase tracking-widest text-[10px] text-ink-300">
          Collection
        </span>
        <span
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-ink-800/80 px-2.5 py-1 font-mono text-[11px] text-ink-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
          aria-label={`${totalCount} cards`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-rarity-legendary/90 shadow-[0_0_8px_rgba(245,182,66,0.8)]" />
          <span className="tabular-nums">{totalCount}</span>
          <span className="text-ink-300">cards</span>
        </span>
      </div>

      <div
        role="radiogroup"
        aria-label="Sort cards"
        className="relative inline-flex items-center gap-1 rounded-xl border border-white/10 bg-ink-800/80 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_8px_24px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md"
      >
        {OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const active = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(opt.id)}
              className={[
                'group relative inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-display font-medium transition-colors',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900',
                active
                  ? 'bg-gradient-to-b from-white/15 to-white/5 text-ink-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_1px_2px_rgba(0,0,0,0.5)]'
                  : 'text-ink-300 hover:text-ink-100 hover:bg-white/5',
              ].join(' ')}
            >
              <Icon
                className={[
                  'h-3.5 w-3.5 transition-transform',
                  active ? 'text-rarity-legendary' : 'text-ink-300 group-hover:text-ink-100',
                ].join(' ')}
                aria-hidden
              />
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
