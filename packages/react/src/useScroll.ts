import { useEffect, useRef } from 'react';
import { ScrollAnimation } from '@soblend/animify-core';
import type { Keyframe, ScrollAnimationConfig } from '@soblend/animify-core';

export function useScroll(
  keyframes: Keyframe[],
  config?: ScrollAnimationConfig
) {
  const ref = useRef<HTMLElement>(null);
  const scrollAnimRef = useRef<ScrollAnimation | null>(null);

  useEffect(() => {
    if (ref.current) {
      scrollAnimRef.current = new ScrollAnimation(ref.current, keyframes, config);

      return () => {
        scrollAnimRef.current?.destroy();
      };
    }
  }, [keyframes, config]);

  return ref;
}
