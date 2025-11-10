import type { EasingFunction } from './types';

export const Easing = {
  linear: (t: number): number => t,

  easeIn: (t: number): number => t * t,
  easeOut: (t: number): number => t * (2 - t),
  easeInOut: (t: number): number => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),

  easeInCubic: (t: number): number => t * t * t,
  easeOutCubic: (t: number): number => --t * t * t + 1,
  easeInOutCubic: (t: number): number =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,

  easeInQuart: (t: number): number => t * t * t * t,
  easeOutQuart: (t: number): number => 1 - --t * t * t * t,
  easeInOutQuart: (t: number): number =>
    t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,

  easeInQuint: (t: number): number => t * t * t * t * t,
  easeOutQuint: (t: number): number => 1 + --t * t * t * t * t,
  easeInOutQuint: (t: number): number =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,

  easeInExpo: (t: number): number => (t === 0 ? 0 : Math.pow(2, 10 * (t - 1))),
  easeOutExpo: (t: number): number => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  easeInOutExpo: (t: number): number => {
    if (t === 0 || t === 1) return t;
    if (t < 0.5) return 0.5 * Math.pow(2, 10 * (2 * t - 1));
    return 0.5 * (2 - Math.pow(2, -10 * (2 * t - 1)));
  },

  easeInCirc: (t: number): number => 1 - Math.sqrt(1 - t * t),
  easeOutCirc: (t: number): number => Math.sqrt(1 - --t * t),
  easeInOutCirc: (t: number): number =>
    t < 0.5
      ? (1 - Math.sqrt(1 - 4 * t * t)) / 2
      : (Math.sqrt(1 - 4 * (t - 1) * (t - 1)) + 1) / 2,

  easeInBack: (t: number): number => {
    const c = 1.70158;
    return t * t * ((c + 1) * t - c);
  },
  easeOutBack: (t: number): number => {
    const c = 1.70158;
    return 1 + --t * t * ((c + 1) * t + c);
  },
  easeInOutBack: (t: number): number => {
    const c = 1.70158 * 1.525;
    if (t < 0.5) {
      return (2 * t * 2 * t * ((c + 1) * 2 * t - c)) / 2;
    }
    return ((2 * t - 2) * (2 * t - 2) * ((c + 1) * (2 * t - 2) + c) + 2) / 2;
  },

  easeInElastic: (t: number): number => {
    if (t === 0 || t === 1) return t;
    const c = (2 * Math.PI) / 3;
    return -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c);
  },
  easeOutElastic: (t: number): number => {
    if (t === 0 || t === 1) return t;
    const c = (2 * Math.PI) / 3;
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c) + 1;
  },
  easeInOutElastic: (t: number): number => {
    if (t === 0 || t === 1) return t;
    const c = (2 * Math.PI) / 4.5;
    return t < 0.5
      ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c)) / 2
      : (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c)) / 2 + 1;
  },

  easeInBounce: (t: number): number => 1 - Easing.easeOutBounce(1 - t),
  easeOutBounce: (t: number): number => {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (t < 1 / d1) {
      return n1 * t * t;
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75;
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375;
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
  },
  easeInOutBounce: (t: number): number =>
    t < 0.5 ? Easing.easeInBounce(2 * t) / 2 : (1 + Easing.easeOutBounce(2 * t - 1)) / 2,

  cubicBezier: (x1: number, y1: number, x2: number, y2: number): EasingFunction => {
    const a = (aA1: number, aA2: number) => 1.0 - 3.0 * aA2 + 3.0 * aA1;
    const b = (aA1: number, aA2: number) => 3.0 * aA2 - 6.0 * aA1;
    const c = (aA1: number) => 3.0 * aA1;

    const calcBezier = (aT: number, aA1: number, aA2: number) =>
      ((a(aA1, aA2) * aT + b(aA1, aA2)) * aT + c(aA1)) * aT;

    const getSlope = (aT: number, aA1: number, aA2: number) =>
      3.0 * a(aA1, aA2) * aT * aT + 2.0 * b(aA1, aA2) * aT + c(aA1);

    return (t: number): number => {
      if (t === 0 || t === 1) return t;

      let currentX: number;
      let currentT: number = t;
      const NEWTON_ITERATIONS = 4;

      for (let i = 0; i < NEWTON_ITERATIONS; ++i) {
        currentX = calcBezier(currentT, x1, x2) - t;
        const currentSlope = getSlope(currentT, x1, x2);
        if (currentSlope === 0.0) return currentT;
        currentT -= currentX / currentSlope;
      }

      return calcBezier(currentT, y1, y2);
    };
  },
};

export const presets = {
  smooth: Easing.cubicBezier(0.4, 0.0, 0.2, 1),
  snappy: Easing.cubicBezier(0.4, 0.0, 0.6, 1),
  bouncy: Easing.easeOutBounce,
  elastic: Easing.easeOutElastic,
};
