import { Star, Crown, Flame, Gem } from 'lucide-react';
import type { Rarity } from '@/data/types';

const RARITY_META: Record<Rarity, { label: string; className: string; Icon: typeof Star }> = {
  common: {
    label: 'Common',
    className: 'bg-ink-700/80 text-ink-100 border border-white/10',
    Icon: Star,
  },
  rare: {
    label: 'Rare',
    className: 'bg-rarity-rare/20 text-rarity-rare border border-rarity-rare/40',
    Icon: Gem,
  },
  legendary: {
    label: 'Legendary',
    className: 'bg-rarity-legendary/40 text-white border border-rarity-legendary shadow-[0_0_12px_rgba(245,182,66,0.6)]',
    Icon: Crown,
  },
  mythic: {
    label: 'Mythic',
    className: 'bg-rarity-mythic/25 text-rarity-mythic border border-rarity-mythic/60',
    Icon: Flame,
  },
};

export function RarityBadge({ rarity, size = 'sm' }: { rarity: Rarity; size?: 'sm' | 'md' }) {
  const { label, className, Icon } = RARITY_META[rarity];
  const pad = size === 'md' ? 'px-2.5 py-1 text-xs' : 'px-2 py-0.5 text-[10px]';
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-mono font-bold uppercase tracking-wider ${pad} ${className}`}
    >
      <Icon className={size === 'md' ? 'w-3.5 h-3.5' : 'w-3 h-3'} />
      {label}
    </span>
  );
}
