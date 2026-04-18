import { useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { useCallback, useRef } from 'react';

export interface TiltValues {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  foilAngle: MotionValue<number>;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  glareOpacity: MotionValue<number>;
  ref: React.RefObject<HTMLElement>;
  handlers: {
    onPointerMove: (e: React.PointerEvent<HTMLElement>) => void;
    onPointerLeave: () => void;
    onPointerEnter: () => void;
  };
}

const SPRING = { stiffness: 180, damping: 22, mass: 0.6 };
const MAX_TILT = 14;

export function useTilt(): TiltValues {
  const ref = useRef<HTMLElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, SPRING);
  const rotateY = useSpring(ry, SPRING);

  const px = useMotionValue(50);
  const py = useMotionValue(50);
  const pointerX = useSpring(px, SPRING);
  const pointerY = useSpring(py, SPRING);

  const glare = useMotionValue(0);
  const glareOpacity = useSpring(glare, SPRING);

  const foilAngle = useTransform([pointerX, pointerY], ([x, y]: number[]) => {
    return (x * 1.8 + y * 1.2) % 360;
  });

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      rx.set((0.5 - y) * 2 * MAX_TILT);
      ry.set((x - 0.5) * 2 * MAX_TILT);
      px.set(x * 100);
      py.set(y * 100);
    },
    [rx, ry, px, py],
  );

  const handlePointerLeave = useCallback(() => {
    rx.set(0);
    ry.set(0);
    px.set(50);
    py.set(50);
    glare.set(0);
  }, [rx, ry, px, py, glare]);

  const handlePointerEnter = useCallback(() => {
    glare.set(1);
  }, [glare]);

  return {
    rotateX,
    rotateY,
    foilAngle,
    pointerX,
    pointerY,
    glareOpacity,
    ref,
    handlers: {
      onPointerMove: handlePointerMove,
      onPointerLeave: handlePointerLeave,
      onPointerEnter: handlePointerEnter,
    },
  };
}
