export { AnimationController, createAnimation } from './animation';
export { Easing, presets } from './easing';
export { Spring, Inertia, calculateSpringDuration, createSpringKeyframes } from './physics';
export { GestureManager, addGestures } from './gestures';
export { Timeline, createTimeline } from './timeline';
export { ScrollAnimation, createScrollAnimation, ParallaxEffect, createParallax } from './scroll';
export { SVGAnimator, animateSVG, createSVGMorph } from './svg';
export { Transform3D, create3D, createCardFlip } from './transform3d';
export * from './utils';
export * from './types';

export const version = '1.0.0';
