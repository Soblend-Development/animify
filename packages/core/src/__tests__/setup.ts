
import { beforeAll } from 'vitest';

beforeAll(() => {
  // Mock Web Animations API si no está disponible
  if (!Element.prototype.animate) {
    Element.prototype.animate = function() {
      return {
        play: () => {},
        pause: () => {},
        cancel: () => {},
        finish: () => {},
        playbackRate: 1,
      } as any;
    };
  }
});
