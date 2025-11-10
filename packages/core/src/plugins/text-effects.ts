
import type { AnimifyPlugin } from './index';

export const TextEffectsPlugin: AnimifyPlugin = {
  name: 'text-effects',
  version: '1.0.0',
  
  install(animify: any) {
    animify.typewriter = (
      element: HTMLElement,
      text: string,
      options: { speed?: number; cursor?: boolean } = {}
    ) => {
      const { speed = 50, cursor = true } = options;
      element.textContent = '';
      
      if (cursor) {
        const cursorEl = document.createElement('span');
        cursorEl.textContent = '|';
        cursorEl.style.animation = 'blink 1s infinite';
        element.appendChild(cursorEl);
      }
      
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          const textNode = document.createTextNode(text[i]);
          if (cursor) {
            element.insertBefore(textNode, element.lastChild);
          } else {
            element.appendChild(textNode);
          }
          i++;
        } else {
          clearInterval(interval);
        }
      }, speed);
    };
    
    animify.shuffleText = (
      element: HTMLElement,
      finalText: string,
      options: { duration?: number } = {}
    ) => {
      const { duration = 2000 } = options;
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
      const iterations = duration / 50;
      let iteration = 0;
      
      const interval = setInterval(() => {
        element.textContent = finalText.split('').map((char, index) => {
          if (index < iteration) {
            return finalText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
        
        iteration++;
        if (iteration > finalText.length) {
          clearInterval(interval);
          element.textContent = finalText;
        }
      }, 50);
    };
  }
};
