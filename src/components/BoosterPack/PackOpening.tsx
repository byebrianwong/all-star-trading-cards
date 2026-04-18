import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Athlete, Rarity } from '@/data/types';
import { RARITY_LABEL } from '@/data/types';
import { ATHLETES } from '@/data/athletes';
import { pullCard, type PackType } from '@/lib/pullCard';
import { Pack } from './Pack';
import { PackReveal } from './PackReveal';

interface PackOpeningProps {
  packType?: PackType;
  onComplete: (athlete: Athlete) => void;
  onReset?: () => void;
}

type Phase = 'idle' | 'tearing' | 'flashing' | 'revealing' | 'revealed';

const RARITY_TEXT: Record<Rarity, string> = {
  common: 'text-ink-100',
  rare: 'text-rarity-rare',
  legendary: 'text-rarity-legendary',
  mythic: 'text-rarity-mythic',
};

// Rarer pulls get a longer, more dramatic flash.
const FLASH_DURATION: Record<Rarity, number> = {
  common: 400,
  rare: 500,
  legendary: 700,
  mythic: 900,
};

// Spring flip feels done around this point.
const FLIP_HOLD_MS = 900;

export function PackOpening({
  packType = 'standard',
  onComplete,
  onReset,
}: PackOpeningProps) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [pulled, setPulled] = useState<Athlete | null>(null);
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  const schedule = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  };

  const handleOpen = useCallback(() => {
    if (phase !== 'idle') return;
    const athlete = pullCard(ATHLETES, packType);
    setPulled(athlete);

    // idle → tearing
    setPhase('tearing');

    // tearing → flashing (after pack halves fly apart)
    schedule(() => setPhase('flashing'), 700);

    const flashMs = FLASH_DURATION[athlete.rarity];
    // flashing → revealing (after flash in + out)
    schedule(() => setPhase('revealing'), 700 + flashMs);

    // revealing → revealed (after flip settles)
    schedule(
      () => setPhase('revealed'),
      700 + flashMs + FLIP_HOLD_MS,
    );
  }, [packType, phase]);

  const handleReset = useCallback(() => {
    clearTimers();
    setPulled(null);
    setPhase('idle');
    onReset?.();
  }, [onReset]);

  const handleCollect = useCallback(() => {
    if (!pulled) return;
    clearTimers();
    onComplete(pulled);
  }, [onComplete, pulled]);

  const isTearing = phase === 'tearing';
  const flashMs = pulled ? FLASH_DURATION[pulled.rarity] : 400;
  const showReveal = phase === 'revealing' || phase === 'revealed';

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-[520px] px-6 py-12">
      <AnimatePresence mode="wait">
        {phase === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 180, damping: 20 }}
            className="flex flex-col items-center gap-8"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-ink-100 text-center tracking-tight">
              Open a{' '}
              <span
                className={
                  packType === 'premium'
                    ? 'text-rarity-legendary'
                    : 'text-rarity-rare'
                }
              >
                {packType}
              </span>{' '}
              pack
            </h2>
            <div className="animate-float">
              <Pack packType={packType} onOpen={handleOpen} />
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink-300">
              Click the pack to open
            </p>
          </motion.div>
        )}

        {(phase === 'tearing' || phase === 'flashing') && pulled && (
          <motion.div
            key="tearing"
            className="relative"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Left half */}
            <motion.div
              className="absolute top-0 left-0"
              initial={{ x: 0, y: 0, rotateZ: 0, opacity: 1 }}
              animate={
                isTearing || phase === 'flashing'
                  ? { x: -260, y: 40, rotateZ: -22, opacity: 0 }
                  : {}
              }
              transition={{ type: 'spring', stiffness: 120, damping: 16 }}
              style={{
                clipPath: 'polygon(0 0, 58% 0, 42% 100%, 0 100%)',
              }}
            >
              <Pack packType={packType} interactive={false} />
            </motion.div>
            {/* Right half */}
            <motion.div
              className="absolute top-0 left-0"
              initial={{ x: 0, y: 0, rotateZ: 0, opacity: 1 }}
              animate={
                isTearing || phase === 'flashing'
                  ? { x: 260, y: -30, rotateZ: 22, opacity: 0 }
                  : {}
              }
              transition={{ type: 'spring', stiffness: 120, damping: 16 }}
              style={{
                clipPath: 'polygon(58% 0, 100% 0, 100% 100%, 42% 100%)',
              }}
            >
              <Pack packType={packType} interactive={false} />
            </motion.div>
            {/* Invisible spacer so the layout reserves pack size */}
            <div className="invisible">
              <Pack packType={packType} interactive={false} />
            </div>
          </motion.div>
        )}

        {showReveal && pulled && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-8"
          >
            <PackReveal athlete={pulled} burst={phase === 'revealed'} />

            <AnimatePresence>
              {phase === 'revealed' && (
                <motion.div
                  key="cta"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ type: 'spring', stiffness: 180, damping: 20 }}
                  className="flex flex-col items-center gap-6"
                >
                  <h3
                    className={`font-display font-bold text-2xl md:text-3xl tracking-tight text-center ${RARITY_TEXT[pulled.rarity]}`}
                  >
                    You pulled a {RARITY_LABEL[pulled.rarity]}!
                  </h3>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleCollect}
                      className="px-5 py-2.5 rounded-full bg-ink-100 text-ink-950 font-display font-semibold text-sm hover:bg-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                    >
                      Add to collection
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-5 py-2.5 rounded-full bg-transparent text-ink-100 border border-white/20 font-display font-semibold text-sm hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                    >
                      Open another
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flash overlay */}
      <AnimatePresence>
        {phase === 'flashing' && (
          <motion.div
            key="flash"
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: flashMs / 1000,
              times: [0, 0.5, 1],
              ease: 'easeInOut',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
