
import { describe, it, expect } from 'vitest';
import { Spring, Inertia, calculateSpringDuration } from '../physics';

describe('Spring Physics', () => {
  it('debería calcular duración del spring correctamente', () => {
    const duration = calculateSpringDuration({ stiffness: 100, damping: 10, mass: 1 });
    expect(duration).toBeGreaterThan(0);
  });

  it('debería crear instancia de Spring con configuración', () => {
    const spring = new Spring({ stiffness: 100, damping: 10, mass: 1 });
    expect(spring).toBeDefined();
  });
});

describe('Inertia Physics', () => {
  it('debería crear instancia de Inertia con velocidad', () => {
    const inertia = new Inertia({ velocity: 100, friction: 0.8 });
    expect(inertia).toBeDefined();
  });

  it('debería calcular distancia correctamente', () => {
    const inertia = new Inertia({ velocity: 100, friction: 0.8 });
    const distance = inertia.getDistance();
    expect(distance).toBeGreaterThan(0);
  });
});
