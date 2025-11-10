import * as vue from 'vue';
import { Ref, Directive } from 'vue';
import { Keyframe, AnimationConfig, SpringConfig, GestureConfig } from '@soblend/animify-core';
export * from '@soblend/animify-core';

declare function useAnimation(keyframes: Keyframe[], config?: AnimationConfig): {
    elementRef: Ref<HTMLElement | null, HTMLElement | null>;
    animate: () => void;
    stop: () => void;
    pause: () => void;
    play: () => void;
    reverse: () => void;
};

declare function useSpring(initialValue: number, targetValue: number, config?: SpringConfig): vue.Ref<number, number>;

declare function useGesture(config: GestureConfig): Ref<HTMLElement | null, HTMLElement | null>;

interface AnimateBinding {
    keyframes: Keyframe[];
    config?: AnimationConfig;
}
declare const vAnimate: Directive<HTMLElement, AnimateBinding>;
declare const vGesture: Directive<HTMLElement, GestureConfig>;

export { useAnimation, useGesture, useSpring, vAnimate, vGesture };
