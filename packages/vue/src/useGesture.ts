import { ref, onMounted, onUnmounted, type Ref } from 'vue';
import { GestureManager } from '@soblend/animify-core';
import type { GestureConfig } from '@soblend/animify-core';

export function useGesture(config: GestureConfig) {
  const elementRef: Ref<HTMLElement | null> = ref(null);
  let gestureManager: GestureManager | null = null;

  onMounted(() => {
    if (elementRef.value) {
      gestureManager = new GestureManager(elementRef.value, config);
    }
  });

  onUnmounted(() => {
    gestureManager?.destroy();
  });

  return elementRef;
}
