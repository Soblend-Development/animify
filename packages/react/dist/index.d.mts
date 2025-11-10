import * as React from 'react';
import React__default from 'react';
import { Keyframe, AnimationConfig, AnimationController, SpringConfig, GestureConfig, ScrollAnimationConfig } from '@soblend/animify-core';
export * from '@soblend/animify-core';

declare function useAnimation(keyframes: Keyframe[], config?: AnimationConfig): {
    ref: React.RefObject<HTMLElement>;
    animate: () => void;
    stop: () => void;
    pause: () => void;
    play: () => void;
    reverse: () => void;
    controller: AnimationController | null;
};

declare function useSpring(initialValue: number, targetValue: number, config?: SpringConfig): number;

declare function useGesture(config: GestureConfig): React.RefObject<HTMLElement>;

declare function useScroll(keyframes: Keyframe[], config?: ScrollAnimationConfig): React.RefObject<HTMLElement>;

interface MotionProps extends React__default.HTMLAttributes<HTMLElement> {
    as?: keyof JSX.IntrinsicElements;
    initial?: React__default.CSSProperties;
    animate?: Keyframe[];
    animationConfig?: AnimationConfig;
    gesture?: GestureConfig;
    whileHover?: Keyframe[];
    whileTap?: Keyframe[];
    children?: React__default.ReactNode;
}
declare const Motion: React__default.ForwardRefExoticComponent<MotionProps & React__default.RefAttributes<HTMLElement>>;

export { Motion, useAnimation, useGesture, useScroll, useSpring };
