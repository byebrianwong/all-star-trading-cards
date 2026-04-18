import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Athlete, Rarity } from '@/data/types';
import { Card } from '@/components/Card/Card';

interface PackRevealProps {
  athlete: Athlete;
  onFlipComplete?: () => void;
  burst?: boolean;
}

const PARTICLE_COUNT: Record<Rarity, number> = {
  common: 4,
  rare: 8,
  legendary: 14,
  mythic: 20,
};

const PARTICLE_COLOR: Record<Rarity, string> = {
  common: 'bg-ink-300',
  rare: 'bg-rarity-rare',
  legendary: 'bg-rarity-legendary',
  mythic: 'bg-rarity-mythic',
};

const PARTICLE_SHADOW: Record<Rarity, string> = {
  common: '',
  rare: 'shadow-[0_0_12px_rgba(74,169,255,0.9)]',
  legendary: 'shadow-[0_0_14px_rgba(245,182,66,0.95)]',
  mythic: 'shadow-[0_0_16px_rgba(217,70,239,1)]',
};

interface Particle {
  angle: number;
  distance: number;
  size: number;
  delay: number;
  duration: number;
}

export function PackReveal({
  athlete,
  onFlipComplete,
  burst = false,
}: PackRevealProps) {
  const [flipped, setFlipped] = useState(true);

  // Trigger the flip after a short delay so it reads as a deliberate reveal.
  useEffect(() => {
    const t = window.setTimeout(() => setFlipped(false), 150);
    return () => window.clearTimeout(t);
  }, []);

  const count = PARTICLE_COUNT[athlete.rarity];
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2 + Math.random() * 0.4,
      distance: 110 + Math.random() * 110,
      size: 6 + Math.random() * 8,
      delay: Math.random() * 0.12,
      duration: 0.8 + Math.random() * 0.5,
    }));
  }, [count]);

  const color = PARTICLE_COLOR[athlete.rarity];
  const shadow = PARTICLE_SHADOW[athlete.rarity];

  return (
    <div className="relative flex items-center justify-center">
      {/* Particle burst (behind the card) */}
      {burst && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          {particles.map((p, i) => {
            const tx = Math.cos(p.angle) * p.distance;
            const ty = Math.sin(p.angle) * p.distance;
            return (
              <motion.div
                key={i}
                aria-hidden
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                animate={{
                  x: tx,
                  y: ty,
                  opacity: [0, 1, 0],
                  scale: [0.4, 1.2, 0.3],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  ease: 'easeOut',
                }}
                className={`absolute rounded-full ${color} ${shadow}`}
                style={{ width: p.size, height: p.size }}
              />
            );
          })}
        </div>
      )}

      <motion.div
        initial={{ scale: 0.6, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
        onAnimationComplete={onFlipComplete}
      >
        <Card
          athlete={athlete}
          flipped={flipped}
          interactive={false}
          size="lg"
        />
      </motion.div>
    </div>
  );
}
