import type { TimelineItem, AnimationConfig, Keyframe } from './types';
import { AnimationController } from './animation';

export class Timeline {
  private items: Array<{
    controller: AnimationController;
    startTime: number;
    duration: number;
  }> = [];
  private totalDuration = 0;
  private currentTime = 0;
  private isPlaying = false;
  private rafId: number | null = null;
  private startTimestamp = 0;
  private speed = 1;

  add(item: TimelineItem): this {
    const elements = Array.isArray(item.target) ? item.target : [item.target];
    const offset = this.parseOffset(item.offset ?? 0);
    const duration = item.options?.duration ?? 300;

    elements.forEach((element) => {
      const controller = new AnimationController(element);
      const animation = controller.animate(item.keyframes, item.options);
      animation.pause();
      animation.currentTime = 0;

      this.items.push({
        controller,
        startTime: offset,
        duration,
      });

      const itemEndTime = offset + duration;
      if (itemEndTime > this.totalDuration) {
        this.totalDuration = itemEndTime;
      }
    });

    return this;
  }

  private parseOffset(offset: number | string): number {
    if (typeof offset === 'number') {
      return offset;
    }

    if (offset === '<') {
      return Math.max(0, this.totalDuration - 300);
    }

    if (offset.startsWith('<') || offset.startsWith('>')) {
      const modifier = parseFloat(offset.slice(1));
      return offset.startsWith('<')
        ? Math.max(0, this.totalDuration + modifier)
        : this.totalDuration + modifier;
    }

    if (offset.includes('%')) {
      const percentage = parseFloat(offset) / 100;
      return this.totalDuration * percentage;
    }

    return parseFloat(offset);
  }

  play(): void {
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.startTimestamp = performance.now() - this.currentTime;

    const animate = (timestamp: number) => {
      if (!this.isPlaying) return;

      this.currentTime = (timestamp - this.startTimestamp) * this.speed;

      this.items.forEach(({ controller, startTime, duration }) => {
        const localTime = this.currentTime - startTime;

        if (localTime >= 0 && localTime <= duration) {
          controller.currentTime = localTime;
        }
      });

      if (this.currentTime < this.totalDuration) {
        this.rafId = requestAnimationFrame(animate);
      } else {
        this.isPlaying = false;
        this.currentTime = this.totalDuration;
      }
    };

    this.rafId = requestAnimationFrame(animate);
  }

  pause(): void {
    this.isPlaying = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  stop(): void {
    this.pause();
    this.currentTime = 0;
    this.items.forEach(({ controller }) => controller.stop());
  }

  restart(): void {
    this.stop();
    this.play();
  }

  seek(time: number): void {
    this.currentTime = Math.max(0, Math.min(time, this.totalDuration));

    this.items.forEach(({ controller, startTime, duration }) => {
      const localTime = this.currentTime - startTime;

      if (localTime >= 0 && localTime <= duration) {
        controller.currentTime = localTime;
      }
    });
  }

  setSpeed(speed: number): void {
    this.speed = speed;
  }

  getDuration(): number {
    return this.totalDuration;
  }

  getCurrentTime(): number {
    return this.currentTime;
  }

  getProgress(): number {
    return this.totalDuration > 0 ? this.currentTime / this.totalDuration : 0;
  }
}

export function createTimeline(): Timeline {
  return new Timeline();
}
