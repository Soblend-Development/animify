import { ref, onMounted, onUnmounted, watch } from 'vue';
import { Spring } from '@soblend/animify-core';
import type { SpringConfig } from '@soblend/animify-core';

export function useSpring(
  initialValue: number,
  targetValue: number,
  config?: SpringConfig
) {
  const value = ref(initialValue);
  let spring: Spring | null = null;
  let rafId: number | null = null;

  const startAnimation = () => {
    spring = new Spring(value.value, targetValue, config);

    const animate = () => {
      if (!spring) return;

      value.value = spring.update(0.016);

      if (!spring.isAtRest()) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
  };

  onMounted(() => {
    startAnimation();
  });

  watch(() => targetValue, () => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
    }
    startAnimation();
  });

  onUnmounted(() => {
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
    }
  });

  return value;
}
