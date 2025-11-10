import { useEffect, useRef } from 'react';
import { GestureManager } from '@soblend/animify-core';
import type { GestureConfig } from '@soblend/animify-core';

export function useGesture(config: GestureConfig) {
  const ref = useRef<HTMLElement>(null);
  const gestureRef = useRef<GestureManager | null>(null);

  useEffect(() => {
    if (ref.current) {
      gestureRef.current = new GestureManager(ref.current, config);

      return () => {
        gestureRef.current?.destroy();
      };
    }
  }, [config]);

  return ref;
}
