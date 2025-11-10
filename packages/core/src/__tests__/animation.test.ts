
import { describe, it, expect, vi } from 'vitest';
import { createAnimation, AnimationController } from '../animation';

describe('AnimationController', () => {
  it('debería crear una animación básica', () => {
    const element = document.createElement('div');
    const animation = createAnimation(
      element,
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: 1000 }
    );
    
    expect(animation).toBeInstanceOf(AnimationController);
  });

  it('debería pausar y reanudar animaciones', async () => {
    const element = document.createElement('div');
    const animation = createAnimation(
      element,
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: 1000 }
    );
    
    animation.pause();
    expect(animation.isPaused()).toBe(true);
    
    animation.play();
    expect(animation.isPaused()).toBe(false);
  });

  it('debería ejecutar callbacks onComplete', async () => {
    const element = document.createElement('div');
    const onComplete = vi.fn();
    
    const animation = createAnimation(
      element,
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: 100, onComplete }
    );
    
    await new Promise(resolve => setTimeout(resolve, 150));
    expect(onComplete).toHaveBeenCalled();
  });
});
