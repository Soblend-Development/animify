import type { Transform3DConfig, AnimationConfig } from './types';
import { AnimationController } from './animation';

export class Transform3D {
  private element: HTMLElement;
  private currentTransform: Transform3DConfig = {};

  constructor(element: HTMLElement, config: Transform3DConfig = {}) {
    this.element = element;
    this.currentTransform = config;
    this.applyPerspective();
    this.updateTransform();
  }

  private applyPerspective(): void {
    if (this.currentTransform.perspective) {
      const parent = this.element.parentElement;
      if (parent) {
        parent.style.perspective = `${this.currentTransform.perspective}px`;
        parent.style.perspectiveOrigin = 'center center';
      }
    }
  }

  private buildTransformString(): string {
    const transforms: string[] = [];

    if (this.currentTransform.translateZ !== undefined) {
      transforms.push(`translateZ(${this.currentTransform.translateZ}px)`);
    }
    if (this.currentTransform.rotateX !== undefined) {
      transforms.push(`rotateX(${this.currentTransform.rotateX}deg)`);
    }
    if (this.currentTransform.rotateY !== undefined) {
      transforms.push(`rotateY(${this.currentTransform.rotateY}deg)`);
    }
    if (this.currentTransform.rotateZ !== undefined) {
      transforms.push(`rotateZ(${this.currentTransform.rotateZ}deg)`);
    }
    if (this.currentTransform.scaleZ !== undefined) {
      transforms.push(`scaleZ(${this.currentTransform.scaleZ})`);
    }

    return transforms.join(' ');
  }

  private updateTransform(): void {
    this.element.style.transform = this.buildTransformString();
    this.element.style.transformStyle = 'preserve-3d';
    
    if (this.currentTransform.transformOrigin) {
      this.element.style.transformOrigin = this.currentTransform.transformOrigin;
    }
  }

  rotateX(degrees: number, config?: AnimationConfig): Animation {
    const controller = new AnimationController(this.element);
    const from = this.currentTransform.rotateX ?? 0;

    return controller.animate(
      [
        { transform: this.buildTransformString() },
        { transform: this.updateRotateX(degrees) },
      ],
      config
    );
  }

  rotateY(degrees: number, config?: AnimationConfig): Animation {
    const controller = new AnimationController(this.element);
    const from = this.currentTransform.rotateY ?? 0;

    return controller.animate(
      [
        { transform: this.buildTransformString() },
        { transform: this.updateRotateY(degrees) },
      ],
      config
    );
  }

  rotateZ(degrees: number, config?: AnimationConfig): Animation {
    const controller = new AnimationController(this.element);

    return controller.animate(
      [
        { transform: this.buildTransformString() },
        { transform: this.updateRotateZ(degrees) },
      ],
      config
    );
  }

  private updateRotateX(degrees: number): string {
    this.currentTransform.rotateX = degrees;
    return this.buildTransformString();
  }

  private updateRotateY(degrees: number): string {
    this.currentTransform.rotateY = degrees;
    return this.buildTransformString();
  }

  private updateRotateZ(degrees: number): string {
    this.currentTransform.rotateZ = degrees;
    return this.buildTransformString();
  }

  translateZ(pixels: number, config?: AnimationConfig): Animation {
    const controller = new AnimationController(this.element);

    return controller.animate(
      [
        { transform: this.buildTransformString() },
        { transform: this.updateTranslateZ(pixels) },
      ],
      config
    );
  }

  private updateTranslateZ(pixels: number): string {
    this.currentTransform.translateZ = pixels;
    return this.buildTransformString();
  }

  flip(axis: 'x' | 'y' = 'y', config?: AnimationConfig): Animation {
    const controller = new AnimationController(this.element);
    const rotateKey = axis === 'x' ? 'rotateX' : 'rotateY';

    return controller.animate(
      [
        { transform: this.buildTransformString() },
        { transform: this.updateRotate(rotateKey, 180) },
      ],
      { duration: 600, ...config }
    );
  }

  private updateRotate(key: 'rotateX' | 'rotateY', degrees: number): string {
    this.currentTransform[key] = degrees;
    return this.buildTransformString();
  }

  cube(size: number = 200): HTMLElement[] {
    const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    const elements: HTMLElement[] = [];

    faces.forEach((face, index) => {
      const faceElement = document.createElement('div');
      faceElement.className = `cube-face cube-face-${face}`;
      faceElement.style.position = 'absolute';
      faceElement.style.width = `${size}px`;
      faceElement.style.height = `${size}px`;
      faceElement.style.transformStyle = 'preserve-3d';

      const transforms: { [key: string]: string } = {
        front: `translateZ(${size / 2}px)`,
        back: `rotateY(180deg) translateZ(${size / 2}px)`,
        right: `rotateY(90deg) translateZ(${size / 2}px)`,
        left: `rotateY(-90deg) translateZ(${size / 2}px)`,
        top: `rotateX(90deg) translateZ(${size / 2}px)`,
        bottom: `rotateX(-90deg) translateZ(${size / 2}px)`,
      };

      faceElement.style.transform = transforms[face];
      this.element.appendChild(faceElement);
      elements.push(faceElement);
    });

    return elements;
  }
}

export function create3D(
  element: HTMLElement | string,
  config?: Transform3DConfig
): Transform3D {
  const el = typeof element === 'string'
    ? document.querySelector(element) as HTMLElement
    : element;

  if (!el) {
    throw new Error('Element not found');
  }

  return new Transform3D(el, config);
}

export function createCardFlip(
  element: HTMLElement,
  frontContent: string,
  backContent: string
): Transform3D {
  const front = document.createElement('div');
  front.className = 'card-front';
  front.innerHTML = frontContent;
  front.style.position = 'absolute';
  front.style.width = '100%';
  front.style.height = '100%';
  front.style.backfaceVisibility = 'hidden';

  const back = document.createElement('div');
  back.className = 'card-back';
  back.innerHTML = backContent;
  back.style.position = 'absolute';
  back.style.width = '100%';
  back.style.height = '100%';
  back.style.backfaceVisibility = 'hidden';
  back.style.transform = 'rotateY(180deg)';

  element.appendChild(front);
  element.appendChild(back);

  return new Transform3D(element, { perspective: 1000 });
}
