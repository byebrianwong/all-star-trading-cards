import { motion, useTransform, type MotionStyle } from 'framer-motion';
import type { Athlete, Rarity } from '@/data/types';
import { useTilt } from '@/hooks/useTilt';
import { CardFront } from './CardFront';
import { CardBack } from './CardBack';

interface CardProps {
  athlete: Athlete;
  layoutId?: string;
  flipped?: boolean;
  onClick?: () => void;
  interactive?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const RARITY_GLOW: Record<Rarity, string> = {
  common: 'shadow-card',
  rare: 'shadow-card shadow-glow-rare',
  legendary: 'shadow-card shadow-glow-legendary',
  mythic: 'shadow-card shadow-glow-mythic',
};

const RARITY_BORDER: Record<Rarity, string> = {
  common: 'ring-1 ring-white/10',
  rare: 'ring-1 ring-rarity-rare/60',
  legendary: 'ring-2 ring-rarity-legendary/70',
  mythic: 'ring-2 ring-rarity-mythic/80',
};

const SIZE = {
  sm: 'w-56 h-80',
  md: 'w-72 h-[26rem]',
  lg: 'w-80 h-[28rem]',
};

const FOIL_INTENSITY: Record<Rarity, number> = {
  common: 0.08,
  rare: 0.22,
  legendary: 0.35,
  mythic: 0.5,
};

export function Card({
  athlete,
  layoutId,
  flipped = false,
  onClick,
  interactive = true,
  size = 'md',
  className = '',
}: CardProps) {
  const { rotateX, rotateY, pointerX, pointerY, foilAngle, glareOpacity, ref, handlers } = useTilt();

  const foilOpacityMV = useTransform(glareOpacity, (v) => v * FOIL_INTENSITY[athlete.rarity]);

  const baseStyle: MotionStyle = interactive
    ? {
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }
    : { transformStyle: 'preserve-3d' };

  const highlightStyle = interactive
    ? ({
        '--pointer-x': useTransform(pointerX, (v) => `${v}%`),
        '--pointer-y': useTransform(pointerY, (v) => `${v}%`),
        opacity: glareOpacity,
      } as MotionStyle)
    : { opacity: 0 };

  const foilStyle = interactive
    ? ({
        '--foil-angle': useTransform(foilAngle, (v) => `${v}deg`),
        opacity: foilOpacityMV,
      } as MotionStyle)
    : { opacity: 0 };

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      layoutId={layoutId}
      onClick={onClick}
      {...(interactive ? handlers : {})}
      whileHover={interactive ? { y: -4, scale: 1.02 } : undefined}
      whileTap={interactive ? { scale: 0.98 } : undefined}
      className={`${SIZE[size]} relative rounded-[24px] ${RARITY_GLOW[athlete.rarity]} ${RARITY_BORDER[athlete.rarity]} focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${className}`}
      style={{ perspective: 1200 }}
      type="button"
      aria-label={`${athlete.name} — ${athlete.team}`}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        style={baseStyle}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 140, damping: 16 }}
      >
        <div className="absolute inset-0 backface-hidden" style={{ transform: 'rotateY(0deg)' }}>
          <CardFront athlete={athlete} />
          <motion.div
            aria-hidden
            className="absolute inset-0 rounded-[22px] pointer-events-none bg-radial-highlight mix-blend-soft-light"
            style={highlightStyle}
          />
          <motion.div
            aria-hidden
            className="absolute inset-0 rounded-[22px] pointer-events-none bg-foil-holo mix-blend-color-dodge"
            style={foilStyle}
          />
        </div>
        <div className="absolute inset-0 backface-hidden" style={{ transform: 'rotateY(180deg)' }}>
          <CardBack />
        </div>
      </motion.div>
    </motion.button>
  );
}
