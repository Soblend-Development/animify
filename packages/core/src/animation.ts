import type { AnimationConfig, Keyframe, EasingFunction } from './types';
import { Easing } from './easing';

export class AnimationController {
  private element: Element;
  private animation: Animation | null = null;
  private rafId: number | null = null;

  constructor(element: Element) {
    this.element = element;
  }

  animate(keyframes: Keyframe[], config: AnimationConfig = {}): Animation {
    const processedKeyframes = this.processKeyframes(keyframes);
    const options = this.processOptions(config);

    if ('animate' in this.element) {
      this.animation = (this.element as HTMLElement).animate(
        processedKeyframes as any[],
        options
      );
      return this.animation;
    }

    throw new Error('Web Animations API not supported');
  }

  private processKeyframes(keyframes: Keyframe[]): any[] {
    return keyframes.map((kf) => {
      const processed = { ...kf };
      delete processed.easing;
      return processed;
    });
  }

  private processOptions(config: AnimationConfig): KeyframeAnimationOptions {
    const options: KeyframeAnimationOptions = {
      duration: config.duration ?? 300,
      delay: config.delay ?? 0,
      iterations: config.iterations ?? 1,
      direction: config.direction ?? 'normal',
      fill: config.fill ?? 'both',
      endDelay: config.endDelay ?? 0,
    };

    if (typeof config.easing === 'string') {
      options.easing = config.easing;
    } else {
      options.easing = 'linear';
    }

    return options;
  }

  animateWithCustomEasing(
    from: number,
    to: number,
    property: string,
    easingFn: EasingFunction,
    duration: number = 300
  ): Promise<void> {
    return new Promise((resolve) => {
      const startTime = performance.now();
      const delta = to - from;

      const update = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easingFn(progress);
        const currentValue = from + delta * easedProgress;

        (this.element as HTMLElement).style.setProperty(
          property,
          `${currentValue}px`
        );

        if (progress < 1) {
          this.rafId = requestAnimationFrame(update);
        } else {
          resolve();
        }
      };

      this.rafId = requestAnimationFrame(update);
    });
  }

  stop(): void {
    if (this.animation) {
      this.animation.cancel();
      this.animation = null;
    }
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  pause(): void {
    if (this.animation) {
      this.animation.pause();
    }
  }

  play(): void {
    if (this.animation) {
      this.animation.play();
    }
  }

  reverse(): void {
    if (this.animation) {
      this.animation.reverse();
    }
  }

  finish(): void {
    if (this.animation) {
      this.animation.finish();
    }
  }

  get currentTime(): number | null {
    return this.animation?.currentTime as number | null;
  }

  set currentTime(time: number | null) {
    if (this.animation && time !== null) {
      this.animation.currentTime = time;
    }
  }
}

export function createAnimation(
  element: Element | string,
  keyframes: Keyframe[],
  config?: AnimationConfig
): AnimationController {
  const el = typeof element === 'string' 
    ? document.querySelector(element)
    : element;

  if (!el) {
    throw new Error('Element not found');
  }

  const controller = new AnimationController(el);
  controller.animate(keyframes, config);
  return controller;
}
