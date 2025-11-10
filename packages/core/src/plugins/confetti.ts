
import type { AnimifyPlugin } from './index';

export interface ConfettiOptions {
  count?: number;
  colors?: string[];
  duration?: number;
  spread?: number;
}

export const ConfettiPlugin: AnimifyPlugin = {
  name: 'confetti',
  version: '1.0.0',
  
  install(animify: any) {
    animify.createConfetti = (
      element: HTMLElement,
      options: ConfettiOptions = {}
    ) => {
      const {
        count = 50,
        colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'],
        duration = 3000,
        spread = 360
      } = options;
      
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        document.body.appendChild(particle);
        
        const angle = (Math.random() * spread - spread / 2) * Math.PI / 180;
        const velocity = Math.random() * 500 + 200;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity - 200;
        
        particle.animate([
          { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
          { transform: `translate(${tx}px, ${ty}px) rotate(720deg)`, opacity: 0 }
        ], {
          duration: duration,
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => particle.remove();
      }
    };
  }
};
