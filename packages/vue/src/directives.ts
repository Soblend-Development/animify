import type { Directive } from 'vue';
import { AnimationController, GestureManager } from '@soblend/animify-core';
import type { Keyframe, AnimationConfig, GestureConfig } from '@soblend/animify-core';

interface AnimateBinding {
  keyframes: Keyframe[];
  config?: AnimationConfig;
}

export const vAnimate: Directive<HTMLElement, AnimateBinding> = {
  mounted(el, binding) {
    const { keyframes, config } = binding.value;
    const controller = new AnimationController(el);
    controller.animate(keyframes, config);
  },
};

export const vGesture: Directive<HTMLElement, GestureConfig> = {
  mounted(el, binding) {
    const gestureManager = new GestureManager(el, binding.value);
    (el as any).__gestureManager__ = gestureManager;
  },
  unmounted(el) {
    const gestureManager = (el as any).__gestureManager__;
    if (gestureManager) {
      gestureManager.destroy();
      delete (el as any).__gestureManager__;
    }
  },
};
