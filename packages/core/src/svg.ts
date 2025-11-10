import type { MorphConfig, AnimationConfig } from './types';
import { AnimationController } from './animation';

export class SVGAnimator {
  private element: SVGElement;

  constructor(element: SVGElement) {
    this.element = element;
  }

  morphPath(targetPath: string, config: MorphConfig): Promise<void> {
    const currentPath = this.element.getAttribute('d') || '';
    
    return new Promise((resolve) => {
      const controller = new AnimationController(this.element);
      
      controller.animate(
        [
          { d: currentPath },
          { d: targetPath },
        ],
        {
          duration: config.duration ?? 500,
          easing: config.easing ?? 'ease-in-out',
          fill: 'forwards',
        }
      );

      setTimeout(() => resolve(), config.duration ?? 500);
    });
  }

  animateStrokeDashoffset(
    from: number,
    to: number,
    duration: number = 1000
  ): Animation {
    const controller = new AnimationController(this.element);
    
    return controller.animate(
      [
        { strokeDashoffset: from },
        { strokeDashoffset: to },
      ],
      { duration, fill: 'forwards' }
    );
  }

  drawPath(duration: number = 1000): Animation {
    const length = (this.element as SVGPathElement).getTotalLength?.() || 0;
    
    this.element.style.strokeDasharray = `${length}`;
    this.element.style.strokeDashoffset = `${length}`;

    return this.animateStrokeDashoffset(length, 0, duration);
  }

  animatePoints(targetPoints: string, duration: number = 500): Animation {
    const controller = new AnimationController(this.element);
    const currentPoints = this.element.getAttribute('points') || '';

    return controller.animate(
      [
        { points: currentPoints },
        { points: targetPoints },
      ],
      { duration, fill: 'forwards' }
    );
  }

  scale(scale: number, config?: AnimationConfig): Animation {
    const controller = new AnimationController(this.element);
    
    return controller.animate(
      [
        { transform: 'scale(1)' },
        { transform: `scale(${scale})` },
      ],
      config
    );
  }

  rotate(degrees: number, config?: AnimationConfig): Animation {
    const controller = new AnimationController(this.element);
    
    return controller.animate(
      [
        { transform: 'rotate(0deg)' },
        { transform: `rotate(${degrees}deg)` },
      ],
      config
    );
  }
}

export function animateSVG(element: SVGElement | string): SVGAnimator {
  const el = typeof element === 'string'
    ? document.querySelector(element) as SVGElement
    : element;

  if (!el) {
    throw new Error('SVG element not found');
  }

  return new SVGAnimator(el);
}

export function createSVGMorph(
  elements: SVGElement[],
  paths: string[],
  config?: MorphConfig & { stagger?: number }
): Promise<void[]> {
  const stagger = config?.stagger ?? 0;
  
  return Promise.all(
    elements.map((element, index) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          const animator = new SVGAnimator(element);
          const morphConfig: MorphConfig = {
            path: paths[index] || paths[0],
            duration: config?.duration,
            easing: config?.easing,
          };
          animator.morphPath(paths[index] || paths[0], morphConfig).then(resolve);
        }, index * stagger);
      });
    })
  );
}
