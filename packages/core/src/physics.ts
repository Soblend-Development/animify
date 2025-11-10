import type { SpringConfig, InertiaConfig } from './types';

export class Spring {
  private stiffness: number;
  private damping: number;
  private mass: number;
  private velocity: number;
  private restSpeed: number;
  private restDelta: number;
  private position: number;
  private target: number;
  private prevTime: number;

  constructor(
    initialValue: number,
    targetValue: number,
    config: SpringConfig = {}
  ) {
    this.stiffness = config.stiffness ?? 100;
    this.damping = config.damping ?? 10;
    this.mass = config.mass ?? 1;
    this.velocity = config.velocity ?? 0;
    this.restSpeed = config.restSpeed ?? 0.001;
    this.restDelta = config.restDelta ?? 0.001;
    this.position = initialValue;
    this.target = targetValue;
    this.prevTime = performance.now();
  }

  update(deltaTime: number): number {
    const springForce = -this.stiffness * (this.position - this.target);
    const dampingForce = -this.damping * this.velocity;
    const acceleration = (springForce + dampingForce) / this.mass;

    this.velocity += acceleration * deltaTime;
    this.position += this.velocity * deltaTime;

    return this.position;
  }

  isAtRest(): boolean {
    return (
      Math.abs(this.velocity) < this.restSpeed &&
      Math.abs(this.position - this.target) < this.restDelta
    );
  }

  getValue(): number {
    return this.position;
  }

  setTarget(newTarget: number): void {
    this.target = newTarget;
  }

  setVelocity(newVelocity: number): void {
    this.velocity = newVelocity;
  }
}

export class Inertia {
  private velocity: number;
  private power: number;
  private timeConstant: number;
  private modifyTarget?: (target: number) => number;
  private amplitude: number;
  private target: number;

  constructor(initialVelocity: number, config: InertiaConfig = {}) {
    this.velocity = initialVelocity;
    this.power = config.power ?? 0.8;
    this.timeConstant = config.timeConstant ?? 350;
    this.modifyTarget = config.modifyTarget;
    this.amplitude = this.power * this.velocity;
    this.target = this.modifyTarget
      ? this.modifyTarget(this.amplitude)
      : this.amplitude;
  }

  update(deltaTime: number, currentValue: number): number {
    const delta = this.target * (1 - Math.exp(-deltaTime / this.timeConstant));
    return currentValue + delta;
  }

  getVelocity(t: number): number {
    return this.amplitude * Math.exp(-t / this.timeConstant);
  }

  isComplete(t: number): boolean {
    return Math.abs(this.getVelocity(t)) < 0.01;
  }
}

export function calculateSpringDuration(config: SpringConfig = {}): number {
  const stiffness = config.stiffness ?? 100;
  const damping = config.damping ?? 10;
  const mass = config.mass ?? 1;

  const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
  
  if (dampingRatio < 1) {
    const naturalFreq = Math.sqrt(stiffness / mass);
    const dampedFreq = naturalFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
    return (2 * Math.PI * 5) / dampedFreq;
  }
  
  return 1000;
}

export function createSpringKeyframes(
  from: number,
  to: number,
  config: SpringConfig = {}
): Array<{ value: number; offset: number }> {
  const spring = new Spring(from, to, config);
  const duration = calculateSpringDuration(config);
  const keyframes: Array<{ value: number; offset: number }> = [];
  const steps = 60;

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const deltaTime = (duration * t) / 1000;
    spring.update(deltaTime);
    keyframes.push({
      value: spring.getValue(),
      offset: t,
    });
  }

  return keyframes;
}
