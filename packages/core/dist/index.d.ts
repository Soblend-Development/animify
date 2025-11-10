type EasingFunction = (t: number) => number;
interface AnimationConfig {
    duration?: number;
    delay?: number;
    easing?: EasingFunction | string;
    iterations?: number;
    direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
    fill?: 'none' | 'forwards' | 'backwards' | 'both';
    endDelay?: number;
}
interface AnimifyKeyframe {
    [property: string]: string | number | EasingFunction | undefined;
    offset?: number;
    easing?: string | EasingFunction;
}
type Keyframe = AnimifyKeyframe;
interface SpringConfig {
    stiffness?: number;
    damping?: number;
    mass?: number;
    velocity?: number;
    restSpeed?: number;
    restDelta?: number;
}
interface InertiaConfig {
    velocity?: number;
    power?: number;
    timeConstant?: number;
    modifyTarget?: (target: number) => number;
}
interface GestureConfig {
    drag?: boolean | 'x' | 'y';
    dragElastic?: number;
    dragConstraints?: {
        left?: number;
        right?: number;
        top?: number;
        bottom?: number;
    };
    dragMomentum?: boolean;
    onDragStart?: (event: PointerEvent) => void;
    onDrag?: (event: PointerEvent, info: DragInfo) => void;
    onDragEnd?: (event: PointerEvent, info: DragInfo) => void;
    tap?: boolean;
    onTap?: (event: PointerEvent) => void;
    hover?: boolean;
    onHoverStart?: (event: PointerEvent) => void;
    onHoverEnd?: (event: PointerEvent) => void;
}
interface DragInfo {
    point: {
        x: number;
        y: number;
    };
    delta: {
        x: number;
        y: number;
    };
    offset: {
        x: number;
        y: number;
    };
    velocity: {
        x: number;
        y: number;
    };
}
interface TimelineItem {
    target: Element | Element[];
    keyframes: Keyframe[];
    options?: AnimationConfig;
    offset?: number | string;
}
interface ScrollAnimationConfig extends AnimationConfig {
    scrollSource?: Element;
    start?: number | string;
    end?: number | string;
    scrub?: boolean | number;
}
interface MorphConfig {
    path: string;
    duration?: number;
    easing?: EasingFunction | string;
}
interface Transform3DConfig {
    perspective?: number;
    rotateX?: number;
    rotateY?: number;
    rotateZ?: number;
    translateZ?: number;
    scaleZ?: number;
    transformOrigin?: string;
}

declare class AnimationController {
    private element;
    private animation;
    private rafId;
    constructor(element: Element);
    animate(keyframes: Keyframe[], config?: AnimationConfig): Animation;
    private processKeyframes;
    private processOptions;
    animateWithCustomEasing(from: number, to: number, property: string, easingFn: EasingFunction, duration?: number): Promise<void>;
    stop(): void;
    pause(): void;
    play(): void;
    reverse(): void;
    finish(): void;
    get currentTime(): number | null;
    set currentTime(time: number | null);
}
declare function createAnimation(element: Element | string, keyframes: Keyframe[], config?: AnimationConfig): AnimationController;

declare const Easing: {
    linear: (t: number) => number;
    easeIn: (t: number) => number;
    easeOut: (t: number) => number;
    easeInOut: (t: number) => number;
    easeInCubic: (t: number) => number;
    easeOutCubic: (t: number) => number;
    easeInOutCubic: (t: number) => number;
    easeInQuart: (t: number) => number;
    easeOutQuart: (t: number) => number;
    easeInOutQuart: (t: number) => number;
    easeInQuint: (t: number) => number;
    easeOutQuint: (t: number) => number;
    easeInOutQuint: (t: number) => number;
    easeInExpo: (t: number) => number;
    easeOutExpo: (t: number) => number;
    easeInOutExpo: (t: number) => number;
    easeInCirc: (t: number) => number;
    easeOutCirc: (t: number) => number;
    easeInOutCirc: (t: number) => number;
    easeInBack: (t: number) => number;
    easeOutBack: (t: number) => number;
    easeInOutBack: (t: number) => number;
    easeInElastic: (t: number) => number;
    easeOutElastic: (t: number) => number;
    easeInOutElastic: (t: number) => number;
    easeInBounce: (t: number) => number;
    easeOutBounce: (t: number) => number;
    easeInOutBounce: (t: number) => number;
    cubicBezier: (x1: number, y1: number, x2: number, y2: number) => EasingFunction;
};
declare const presets: {
    smooth: EasingFunction;
    snappy: EasingFunction;
    bouncy: (t: number) => number;
    elastic: (t: number) => number;
};

declare class Spring {
    private stiffness;
    private damping;
    private mass;
    private velocity;
    private restSpeed;
    private restDelta;
    private position;
    private target;
    private prevTime;
    constructor(initialValue: number, targetValue: number, config?: SpringConfig);
    update(deltaTime: number): number;
    isAtRest(): boolean;
    getValue(): number;
    setTarget(newTarget: number): void;
    setVelocity(newVelocity: number): void;
}
declare class Inertia {
    private velocity;
    private power;
    private timeConstant;
    private modifyTarget?;
    private amplitude;
    private target;
    constructor(initialVelocity: number, config?: InertiaConfig);
    update(deltaTime: number, currentValue: number): number;
    getVelocity(t: number): number;
    isComplete(t: number): boolean;
}
declare function calculateSpringDuration(config?: SpringConfig): number;
declare function createSpringKeyframes(from: number, to: number, config?: SpringConfig): Array<{
    value: number;
    offset: number;
}>;

declare class GestureManager {
    private element;
    private config;
    private isDragging;
    private startPoint;
    private currentPoint;
    private offset;
    private velocity;
    private lastTime;
    private lastPoint;
    constructor(element: HTMLElement, config?: GestureConfig);
    private setupEventListeners;
    private onPointerDown;
    private onPointerMove;
    private onPointerUp;
    private applyConstraints;
    private applyElasticity;
    private applyMomentum;
    private onTap;
    private onHoverStart;
    private onHoverEnd;
    destroy(): void;
}
declare function addGestures(element: HTMLElement | string, config: GestureConfig): GestureManager;

declare class Timeline {
    private items;
    private totalDuration;
    private currentTime;
    private isPlaying;
    private rafId;
    private startTimestamp;
    private speed;
    add(item: TimelineItem): this;
    private parseOffset;
    play(): void;
    pause(): void;
    stop(): void;
    restart(): void;
    seek(time: number): void;
    setSpeed(speed: number): void;
    getDuration(): number;
    getCurrentTime(): number;
    getProgress(): number;
}
declare function createTimeline(): Timeline;

declare class ScrollAnimation {
    private element;
    private config;
    private controller;
    private scrollSource;
    private startValue;
    private endValue;
    private isActive;
    constructor(element: HTMLElement, keyframes: Keyframe[], config?: ScrollAnimationConfig);
    private parseScrollValue;
    private setupScrollListener;
    private calculateProgress;
    destroy(): void;
}
declare function createScrollAnimation(element: HTMLElement | string, keyframes: Keyframe[], config?: ScrollAnimationConfig): ScrollAnimation;
declare class ParallaxEffect {
    private elements;
    add(element: HTMLElement | string, speed?: number, direction?: 'vertical' | 'horizontal'): this;
    start(): void;
}
declare function createParallax(): ParallaxEffect;

declare class SVGAnimator {
    private element;
    constructor(element: SVGElement);
    morphPath(targetPath: string, config: MorphConfig): Promise<void>;
    animateStrokeDashoffset(from: number, to: number, duration?: number): Animation;
    drawPath(duration?: number): Animation;
    animatePoints(targetPoints: string, duration?: number): Animation;
    scale(scale: number, config?: AnimationConfig): Animation;
    rotate(degrees: number, config?: AnimationConfig): Animation;
}
declare function animateSVG(element: SVGElement | string): SVGAnimator;
declare function createSVGMorph(elements: SVGElement[], paths: string[], config?: MorphConfig & {
    stagger?: number;
}): Promise<void[]>;

declare class Transform3D {
    private element;
    private currentTransform;
    constructor(element: HTMLElement, config?: Transform3DConfig);
    private applyPerspective;
    private buildTransformString;
    private updateTransform;
    rotateX(degrees: number, config?: AnimationConfig): Animation;
    rotateY(degrees: number, config?: AnimationConfig): Animation;
    rotateZ(degrees: number, config?: AnimationConfig): Animation;
    private updateRotateX;
    private updateRotateY;
    private updateRotateZ;
    translateZ(pixels: number, config?: AnimationConfig): Animation;
    private updateTranslateZ;
    flip(axis?: 'x' | 'y', config?: AnimationConfig): Animation;
    private updateRotate;
    cube(size?: number): HTMLElement[];
}
declare function create3D(element: HTMLElement | string, config?: Transform3DConfig): Transform3D;
declare function createCardFlip(element: HTMLElement, frontContent: string, backContent: string): Transform3D;

declare function clamp(value: number, min: number, max: number): number;
declare function lerp(start: number, end: number, t: number): number;
declare function normalize(value: number, min: number, max: number): number;
declare function map(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number;
declare function distance(x1: number, y1: number, x2: number, y2: number): number;
declare function angle(x1: number, y1: number, x2: number, y2: number): number;
declare function randomRange(min: number, max: number): number;
declare function randomInt(min: number, max: number): number;
declare function degrees(radians: number): number;
declare function radians(degrees: number): number;
declare function debounce<T extends (...args: unknown[]) => unknown>(func: T, wait: number): (...args: Parameters<T>) => void;
declare function throttle<T extends (...args: unknown[]) => unknown>(func: T, limit: number): (...args: Parameters<T>) => void;
declare function rafThrottle<T extends (...args: unknown[]) => unknown>(func: T): (...args: Parameters<T>) => void;
declare function prefersReducedMotion(): boolean;
declare function supportsWebAnimations(): boolean;
declare function getGPUTier(): 'high' | 'medium' | 'low';

declare const version = "1.0.0";

export { type AnimationConfig, AnimationController, type AnimifyKeyframe, type DragInfo, Easing, type EasingFunction, type GestureConfig, GestureManager, Inertia, type InertiaConfig, type Keyframe, type MorphConfig, ParallaxEffect, SVGAnimator, ScrollAnimation, type ScrollAnimationConfig, Spring, type SpringConfig, Timeline, type TimelineItem, Transform3D, type Transform3DConfig, addGestures, angle, animateSVG, calculateSpringDuration, clamp, create3D, createAnimation, createCardFlip, createParallax, createSVGMorph, createScrollAnimation, createSpringKeyframes, createTimeline, debounce, degrees, distance, getGPUTier, lerp, map, normalize, prefersReducedMotion, presets, radians, rafThrottle, randomInt, randomRange, supportsWebAnimations, throttle, version };
