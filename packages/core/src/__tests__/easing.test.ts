
import { describe, it, expect } from 'vitest';
import { Easing, presets } from '../easing';

describe('Easing Functions', () => {
  it('debería tener todas las funciones de easing básicas', () => {
    expect(Easing.easeInQuad).toBeDefined();
    expect(Easing.easeOutQuad).toBeDefined();
    expect(Easing.easeInOutQuad).toBeDefined();
  });

  it('debería retornar valores entre 0 y 1', () => {
    const value = Easing.easeInQuad(0.5);
    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(1);
  });

  it('debería tener presets definidos', () => {
    expect(presets.smooth).toBeDefined();
    expect(presets.bouncy).toBeDefined();
    expect(presets.snappy).toBeDefined();
  });
});
