export type EasingFunction = (t: number) => number;

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: EasingFunction | string;
  iterations?: number;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fill?: 'none' | 'forwards' | 'backwards' | 'both';
  endDelay?: number;
}

export interface AnimifyKeyframe {
  [property: string]: string | number | EasingFunction | undefined;
  offset?: number;
  easing?: string | EasingFunction;
}

export type Keyframe = AnimifyKeyframe;

export interface SpringConfig {
  stiffness?: number;
  damping?: number;
  mass?: number;
  velocity?: number;
  restSpeed?: number;
  restDelta?: number;
}

export interface InertiaConfig {
  velocity?: number;
  power?: number;
  timeConstant?: number;
  modifyTarget?: (target: number) => number;
}

export interface GestureConfig {
  drag?: boolean | 'x' | 'y';
  dragElastic?: number;
  dragConstraints?: { left?: number; right?: number; top?: number; bottom?: number };
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

export interface DragInfo {
  point: { x: number; y: number };
  delta: { x: number; y: number };
  offset: { x: number; y: number };
  velocity: { x: number; y: number };
}

export interface TimelineItem {
  target: Element | Element[];
  keyframes: Keyframe[];
  options?: AnimationConfig;
  offset?: number | string;
}

export interface ScrollAnimationConfig extends AnimationConfig {
  scrollSource?: Element;
  start?: number | string;
  end?: number | string;
  scrub?: boolean | number;
}

export interface MorphConfig {
  path: string;
  duration?: number;
  easing?: EasingFunction | string;
}

export interface Transform3DConfig {
  perspective?: number;
  rotateX?: number;
  rotateY?: number;
  rotateZ?: number;
  translateZ?: number;
  scaleZ?: number;
  transformOrigin?: string;
}
