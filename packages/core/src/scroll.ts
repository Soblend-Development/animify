import type { ScrollAnimationConfig, Keyframe } from './types';
import { AnimationController } from './animation';

export class ScrollAnimation {
  private element: HTMLElement;
  private config: ScrollAnimationConfig;
  private controller: AnimationController;
  private scrollSource: Element;
  private startValue: number;
  private endValue: number;
  private isActive = false;

  constructor(
    element: HTMLElement,
    keyframes: Keyframe[],
    config: ScrollAnimationConfig = {}
  ) {
    this.element = element;
    this.config = config;
    this.controller = new AnimationController(element);
    this.scrollSource = config.scrollSource ?? document.documentElement;

    this.startValue = this.parseScrollValue(config.start ?? 0);
    this.endValue = this.parseScrollValue(config.end ?? '100%');

    this.setupScrollListener(keyframes);
  }

  private parseScrollValue(value: number | string): number {
    if (typeof value === 'number') {
      return value;
    }

    if (value.includes('%')) {
      const percentage = parseFloat(value) / 100;
      const maxScroll = this.scrollSource.scrollHeight - this.scrollSource.clientHeight;
      return maxScroll * percentage;
    }

    if (value.includes('vh')) {
      const vh = parseFloat(value);
      return (window.innerHeight * vh) / 100;
    }

    return parseFloat(value);
  }

  private setupScrollListener(keyframes: Keyframe[]): void {
    const animation = this.controller.animate(keyframes, {
      ...this.config,
      duration: 1000,
      fill: 'both',
    });

    animation.pause();

    const updateAnimation = () => {
      const scrollY = this.scrollSource.scrollTop || window.scrollY;
      const progress = this.calculateProgress(scrollY);

      if (this.config.scrub) {
        const scrubAmount = typeof this.config.scrub === 'number' 
          ? this.config.scrub 
          : 0;
        
        const targetTime = progress * 1000;
        const currentTime = animation.currentTime as number || 0;
        const newTime = currentTime + (targetTime - currentTime) * (1 - scrubAmount);
        
        animation.currentTime = newTime;
      } else {
        animation.currentTime = progress * 1000;
      }
    };

    this.scrollSource.addEventListener('scroll', updateAnimation, { passive: true });
    window.addEventListener('resize', updateAnimation, { passive: true });

    updateAnimation();

    this.isActive = true;
  }

  private calculateProgress(scrollY: number): number {
    if (scrollY <= this.startValue) return 0;
    if (scrollY >= this.endValue) return 1;

    return (scrollY - this.startValue) / (this.endValue - this.startValue);
  }

  destroy(): void {
    this.controller.stop();
    this.isActive = false;
  }
}

export function createScrollAnimation(
  element: HTMLElement | string,
  keyframes: Keyframe[],
  config?: ScrollAnimationConfig
): ScrollAnimation {
  const el = typeof element === 'string'
    ? document.querySelector(element) as HTMLElement
    : element;

  if (!el) {
    throw new Error('Element not found');
  }

  return new ScrollAnimation(el, keyframes, config);
}

export class ParallaxEffect {
  private elements: Array<{
    element: HTMLElement;
    speed: number;
    direction: 'vertical' | 'horizontal';
  }> = [];

  add(
    element: HTMLElement | string,
    speed: number = 0.5,
    direction: 'vertical' | 'horizontal' = 'vertical'
  ): this {
    const el = typeof element === 'string'
      ? document.querySelector(element) as HTMLElement
      : element;

    if (!el) {
      throw new Error('Element not found');
    }

    this.elements.push({ element: el, speed, direction });
    return this;
  }

  start(): void {
    const update = () => {
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      this.elements.forEach(({ element, speed, direction }) => {
        if (direction === 'vertical') {
          const offset = scrollY * speed;
          element.style.transform = `translateY(${-offset}px)`;
        } else {
          const offset = scrollX * speed;
          element.style.transform = `translateX(${-offset}px)`;
        }
      });

      requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }
}

export function createParallax(): ParallaxEffect {
  return new ParallaxEffect();
}
