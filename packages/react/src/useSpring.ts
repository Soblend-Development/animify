import { useState, useEffect, useRef } from 'react';
import { Spring } from '@soblend/animify-core';
import type { SpringConfig } from '@soblend/animify-core';

export function useSpring(
  initialValue: number,
  targetValue: number,
  config?: SpringConfig
) {
  const [value, setValue] = useState(initialValue);
  const springRef = useRef<Spring | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    springRef.current = new Spring(initialValue, targetValue, config);

    const animate = () => {
      if (!springRef.current) return;

      const newValue = springRef.current.update(0.016);
      setValue(newValue);

      if (!springRef.current.isAtRest()) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [initialValue, targetValue, config]);

  return value;
}
