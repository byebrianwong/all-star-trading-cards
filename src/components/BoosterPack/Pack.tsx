import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { PackType } from '@/lib/pullCard';

interface PackProps {
  packType?: PackType;
  onOpen?: () => void;
  interactive?: boolean;
}

const GRADIENTS: Record<PackType, string> = {
  standard:
    'linear-gradient(155deg, #1e3a8a 0%, #4338ca 45%, #7c3aed 100%)',
  premium:
    'linear-gradient(155deg, #f5b642 0%, #ff7a45 50%, #ec4899 100%)',
};

const OVERLAY: Record<PackType, string> = {
  standard:
    'repeating-linear-gradient(45deg, rgba(74,169,255,0.08) 0 2px, transparent 2px 10px)',
  premium:
    'repeating-linear-gradient(45deg, rgba(255,215,150,0.12) 0 2px, transparent 2px 10px)',
};

export function Pack({
  packType = 'standard',
  onOpen,
  interactive = true,
}: PackProps) {
  const isPremium = packType === 'premium';

  return (
    <motion.button
      type="button"
      onClick={interactive ? onOpen : undefined}
      disabled={!interactive}
      aria-label={`Open ${packType} booster pack`}
      whileHover={interactive ? { y: -6, rotateY: 8, rotateX: -4 } : undefined}
      whileTap={interactive ? { scale: 0.97 } : undefined}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      className={`relative w-[220px] h-[320px] rounded-[22px] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
        isPremium ? 'shadow-glow-legendary' : 'shadow-card'
      } ${interactive ? 'cursor-pointer' : 'cursor-default'}`}
      style={{
        perspective: 1200,
        transformStyle: 'preserve-3d',
        background: GRADIENTS[packType],
      }}
    >
      {/* Texture overlay */}
      <div
        className="absolute inset-0 opacity-80 pointer-events-none"
        style={{ backgroundImage: OVERLAY[packType] }}
      />

      {/* Shimmer layer for premium */}
      {isPremium && (
        <div
          aria-hidden
          className="absolute inset-0 animate-shimmer pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage:
              'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)',
            backgroundSize: '200% 200%',
          }}
        />
      )}

      {/* Inner borders (mirrors CardBack aesthetic) */}
      <div className="absolute inset-3 rounded-[18px] border border-white/20 pointer-events-none" />
      <div className="absolute inset-6 rounded-[14px] border border-white/10 pointer-events-none" />

      {/* Top notch / tear line hint */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-1.5 rounded-full bg-white/25" />

      {/* Foil wordmark */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-6 text-ink-100">
        <div
          className={`w-24 h-24 rounded-full p-0.5 ${
            isPremium
              ? 'bg-gradient-to-br from-rarity-legendary via-rarity-mythic to-rarity-rare'
              : 'bg-gradient-to-br from-rarity-rare via-rarity-legendary to-rarity-mythic'
          }`}
        >
          <div className="w-full h-full rounded-full bg-ink-950/80 backdrop-blur-sm flex items-center justify-center">
            <Sparkles
              className={`w-12 h-12 ${
                isPremium ? 'text-rarity-legendary' : 'text-rarity-rare'
              }`}
            />
          </div>
        </div>

        <div className="mt-5 text-center">
          <div className="font-display font-bold tracking-tight text-2xl leading-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
            All-Stars
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-100/80 mt-1.5">
            Trading Cards
          </div>
        </div>

        <div className="mt-6 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/15">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-100">
            {isPremium ? 'Premium Pack' : 'Standard Pack'}
          </span>
        </div>
      </div>

      {/* Glossy highlight */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 0%, rgba(255,255,255,0.35), transparent 55%)',
        }}
      />
    </motion.button>
  );
}
