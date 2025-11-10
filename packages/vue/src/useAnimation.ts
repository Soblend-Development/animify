import { ref, onMounted, onUnmounted, type Ref } from 'vue';
import { AnimationController } from '@soblend/animify-core';
import type { Keyframe, AnimationConfig } from '@soblend/animify-core';

export function useAnimation(keyframes: Keyframe[], config?: AnimationConfig) {
  const elementRef: Ref<HTMLElement | null> = ref(null);
  let controller: AnimationController | null = null;

  onMounted(() => {
    if (elementRef.value) {
      controller = new AnimationController(elementRef.value);
      controller.animate(keyframes, config);
    }
  });

  onUnmounted(() => {
    controller?.stop();
  });

  const animate = () => {
    controller?.animate(keyframes, config);
  };

  const stop = () => {
    controller?.stop();
  };

  const pause = () => {
    controller?.pause();
  };

  const play = () => {
    controller?.play();
  };

  const reverse = () => {
    controller?.reverse();
  };

  return {
    elementRef,
    animate,
    stop,
    pause,
    play,
    reverse,
  };
}
