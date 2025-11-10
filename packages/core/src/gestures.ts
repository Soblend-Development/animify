import type { GestureConfig, DragInfo } from './types';

export class GestureManager {
  private element: HTMLElement;
  private config: GestureConfig;
  private isDragging = false;
  private startPoint = { x: 0, y: 0 };
  private currentPoint = { x: 0, y: 0 };
  private offset = { x: 0, y: 0 };
  private velocity = { x: 0, y: 0 };
  private lastTime = 0;
  private lastPoint = { x: 0, y: 0 };

  constructor(element: HTMLElement, config: GestureConfig = {}) {
    this.element = element;
    this.config = config;
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    if (this.config.drag) {
      this.element.addEventListener('pointerdown', this.onPointerDown);
    }

    if (this.config.tap) {
      this.element.addEventListener('click', this.onTap);
    }

    if (this.config.hover) {
      this.element.addEventListener('pointerenter', this.onHoverStart);
      this.element.addEventListener('pointerleave', this.onHoverEnd);
    }
  }

  private onPointerDown = (event: PointerEvent): void => {
    if (!this.config.drag) return;

    this.isDragging = true;
    this.startPoint = { x: event.clientX, y: event.clientY };
    this.currentPoint = { ...this.startPoint };
    this.lastPoint = { ...this.startPoint };
    this.lastTime = performance.now();

    this.element.setPointerCapture(event.pointerId);
    
    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);

    if (this.config.onDragStart) {
      this.config.onDragStart(event);
    }
  };

  private onPointerMove = (event: PointerEvent): void => {
    if (!this.isDragging) return;

    const now = performance.now();
    const dt = Math.max(now - this.lastTime, 1);

    this.currentPoint = { x: event.clientX, y: event.clientY };

    const delta = {
      x: this.currentPoint.x - this.lastPoint.x,
      y: this.currentPoint.y - this.lastPoint.y,
    };

    this.velocity = {
      x: delta.x / dt,
      y: delta.y / dt,
    };

    this.offset = {
      x: this.currentPoint.x - this.startPoint.x,
      y: this.currentPoint.y - this.startPoint.y,
    };

    if (this.config.drag === 'x') {
      this.offset.y = 0;
      delta.y = 0;
    } else if (this.config.drag === 'y') {
      this.offset.x = 0;
      delta.x = 0;
    }

    if (this.config.dragConstraints) {
      this.applyConstraints();
    }

    if (this.config.dragElastic) {
      this.applyElasticity();
    }

    const info: DragInfo = {
      point: { ...this.currentPoint },
      delta,
      offset: { ...this.offset },
      velocity: { ...this.velocity },
    };

    if (this.config.onDrag) {
      this.config.onDrag(event, info);
    }

    this.element.style.transform = `translate(${this.offset.x}px, ${this.offset.y}px)`;

    this.lastPoint = { ...this.currentPoint };
    this.lastTime = now;
  };

  private onPointerUp = (event: PointerEvent): void => {
    if (!this.isDragging) return;

    this.isDragging = false;

    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.onPointerUp);

    const info: DragInfo = {
      point: { ...this.currentPoint },
      delta: { x: 0, y: 0 },
      offset: { ...this.offset },
      velocity: { ...this.velocity },
    };

    if (this.config.onDragEnd) {
      this.config.onDragEnd(event, info);
    }

    if (this.config.dragMomentum) {
      this.applyMomentum();
    }
  };

  private applyConstraints(): void {
    const constraints = this.config.dragConstraints!;

    if (constraints.left !== undefined && this.offset.x < constraints.left) {
      this.offset.x = constraints.left;
    }
    if (constraints.right !== undefined && this.offset.x > constraints.right) {
      this.offset.x = constraints.right;
    }
    if (constraints.top !== undefined && this.offset.y < constraints.top) {
      this.offset.y = constraints.top;
    }
    if (constraints.bottom !== undefined && this.offset.y > constraints.bottom) {
      this.offset.y = constraints.bottom;
    }
  }

  private applyElasticity(): void {
    const elastic = this.config.dragElastic ?? 0.5;
    this.offset.x *= elastic;
    this.offset.y *= elastic;
  }

  private applyMomentum(): void {
    const friction = 0.95;
    let velocityX = this.velocity.x * 1000;
    let velocityY = this.velocity.y * 1000;

    const animate = () => {
      velocityX *= friction;
      velocityY *= friction;

      this.offset.x += velocityX * 0.016;
      this.offset.y += velocityY * 0.016;

      this.element.style.transform = `translate(${this.offset.x}px, ${this.offset.y}px)`;

      if (Math.abs(velocityX) > 0.1 || Math.abs(velocityY) > 0.1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  private onTap = (event: PointerEvent): void => {
    if (this.config.onTap) {
      this.config.onTap(event);
    }
  };

  private onHoverStart = (event: PointerEvent): void => {
    if (this.config.onHoverStart) {
      this.config.onHoverStart(event);
    }
  };

  private onHoverEnd = (event: PointerEvent): void => {
    if (this.config.onHoverEnd) {
      this.config.onHoverEnd(event);
    }
  };

  destroy(): void {
    this.element.removeEventListener('pointerdown', this.onPointerDown);
    this.element.removeEventListener('click', this.onTap);
    this.element.removeEventListener('pointerenter', this.onHoverStart);
    this.element.removeEventListener('pointerleave', this.onHoverEnd);
    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.onPointerUp);
  }
}

export function addGestures(
  element: HTMLElement | string,
  config: GestureConfig
): GestureManager {
  const el = typeof element === 'string'
    ? document.querySelector(element) as HTMLElement
    : element;

  if (!el) {
    throw new Error('Element not found');
  }

  return new GestureManager(el, config);
}
