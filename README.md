
# @soblend/animify

Librería de animaciones extremadamente avanzada y moderna para JavaScript, diseñada para ofrecer máximo rendimiento y compatibilidad con todos los frameworks modernos.

## Características Principales

**Motor de Animación Avanzado**  
Basado en Web Animations API nativa del navegador para garantizar el máximo rendimiento y fluidez en todas las animaciones.

**Sistema de Física Realista**  
Implementación completa de física spring (resorte) y sistemas de inercia que permiten crear animaciones naturales y orgánicas.

**Más de 30 Funciones de Easing**  
Desde funciones básicas hasta complejas como elastic, bounce y back, permitiendo control total sobre la curva de aceleración de tus animaciones.

**Sistema Completo de Gestures**  
Soporte para drag, tap y hover con compatibilidad táctil completa, ideal para aplicaciones móviles y de escritorio.

**Timeline y Secuenciador Avanzado**  
Crea secuencias complejas de animaciones sincronizadas con control preciso del timing.

**Animaciones Vinculadas al Scroll**  
Sistema completo de scroll animations con scrubbing para experiencias de usuario interactivas.

**Animaciones SVG Avanzadas**  
Morphing de paths, animaciones de stroke, y transformaciones complejas de gráficos vectoriales.

**Transformaciones 3D con Aceleración GPU**  
Rotaciones, perspectiva y flips con rendering acelerado por hardware.

**TypeScript Completo**  
Tipos completos y documentación inline para una experiencia de desarrollo superior.

**Multi-Framework**  
Funciona nativamente con React, Vue, Next.js y JavaScript vanilla sin configuración adicional.

## Instalación

### JavaScript Vanilla / HTML

```bash
npm install @soblend/animify
```

### React

```bash
npm install @soblend/animify-react
```

### Vue

```bash
npm install @soblend/animify-vue
```

## Guía de Uso

### JavaScript Vanilla

#### Animación Básica

La forma más simple de crear una animación es usando `createAnimation`:

```javascript
import { createAnimation, Easing } from '@soblend/animify';

createAnimation('#box', [
  { transform: 'translateX(0px)' },
  { transform: 'translateX(300px)' }
], {
  duration: 1000,
  easing: Easing.easeOutCubic
});
```

Este código animará el elemento con id "box" moviéndolo 300 píxeles hacia la derecha en 1 segundo, usando una curva de aceleración cubic.

#### Configuración Avanzada

```javascript
createAnimation('#element', [
  { opacity: 0, transform: 'scale(0.5)' },
  { opacity: 1, transform: 'scale(1)' }
], {
  duration: 800,
  easing: Easing.easeOutBack,
  delay: 200,
  iterations: 1,
  direction: 'normal',
  fill: 'forwards'
});
```

### React

#### Hook useAnimation

El hook `useAnimation` proporciona una forma declarativa de animar elementos:

```jsx
import { useAnimation } from '@soblend/animify-react';

function MyComponent() {
  const { ref, animate } = useAnimation([
    { opacity: 0, transform: 'translateY(20px)' },
    { opacity: 1, transform: 'translateY(0px)' }
  ], { 
    duration: 500,
    easing: 'easeOutCubic'
  });

  return (
    <div ref={ref}>
      Contenido animado que aparece con fade-in
    </div>
  );
}
```

#### Componente Motion

Para casos de uso más simples, el componente `Motion` ofrece una API declarativa:

```jsx
import { Motion } from '@soblend/animify-react';

function App() {
  return (
    <Motion
      animate={[
        { scale: 1, opacity: 1 },
        { scale: 1.2, opacity: 0.8 }
      ]}
      whileHover={[{ scale: 1.1 }]}
      whileTap={[{ scale: 0.95 }]}
      transition={{ duration: 300 }}
    >
      Elemento interactivo con hover y click
    </Motion>
  );
}
```

#### Hook useSpring para Física

```jsx
import { useSpring } from '@soblend/animify-react';

function PhysicsComponent() {
  const { ref, setValue } = useSpring(0, 100, {
    stiffness: 100,
    damping: 10,
    mass: 1
  });

  return (
    <div ref={ref}>
      <button onClick={() => setValue(200)}>
        Animar con física spring
      </button>
    </div>
  );
}
```

### Vue

#### Composable useAnimation

Vue 3 utiliza composables para integrar la funcionalidad de animación:

```vue
<script setup>
import { useAnimation } from '@soblend/animify-vue';

const { elementRef, animate } = useAnimation([
  { transform: 'rotate(0deg)', opacity: 0 },
  { transform: 'rotate(360deg)', opacity: 1 }
], { 
  duration: 1000,
  easing: 'easeInOutCubic'
});

function triggerAnimation() {
  animate();
}
</script>

<template>
  <div ref="elementRef" @click="triggerAnimation">
    Click para animar
  </div>
</template>
```

#### Directiva v-animate

Para casos más simples, puedes usar la directiva directamente en el template:

```vue
<template>
  <div v-animate="{ 
    keyframes: [
      { x: 0 },
      { x: 100 }
    ],
    options: { duration: 500 }
  }">
    Contenido animado
  </div>
</template>
```

## Características Avanzadas

### Sistema de Física Spring

El sistema de física spring permite crear animaciones que imitan el comportamiento de un resorte físico:

```javascript
import { createSpringKeyframes } from '@soblend/animify';

const keyframes = createSpringKeyframes(0, 100, {
  stiffness: 100,    // Rigidez del resorte (mayor = más rápido)
  damping: 10,       // Amortiguación (mayor = menos rebotes)
  mass: 1            // Masa del objeto (mayor = más lento)
});

createAnimation('#element', keyframes, { duration: 2000 });
```

**Parámetros del Spring:**
- `stiffness`: Controla la fuerza del resorte. Valores más altos hacen que la animación sea más rápida y brusca.
- `damping`: Controla la resistencia. Valores más altos reducen las oscilaciones.
- `mass`: Afecta la inercia. Valores más altos hacen que el objeto se mueva más lento.

### Sistema de Gestures

El sistema de gestures proporciona detección avanzada de interacciones del usuario:

```javascript
import { addGestures } from '@soblend/animify';

addGestures('#draggable', {
  drag: true,                    // Habilitar arrastre
  dragMomentum: true,            // Inercia después de soltar
  dragElastic: 0.2,              // Elasticidad en los límites
  dragConstraints: {             // Límites del arrastre
    left: 0, 
    right: 300,
    top: 0,
    bottom: 200
  },
  onDragStart: (event, info) => {
    console.log('Inicio de arrastre:', info.point);
  },
  onDrag: (event, info) => {
    console.log('Arrastrando:', info.offset, info.delta);
  },
  onDragEnd: (event, info) => {
    console.log('Fin de arrastre:', info.velocity);
  }
});
```

**Información proporcionada en callbacks:**
- `point`: Posición actual del puntero
- `offset`: Desplazamiento total desde el inicio
- `delta`: Cambio desde el último frame
- `velocity`: Velocidad de arrastre

### Timeline y Secuencias

Crea animaciones complejas sincronizadas con control preciso del timing:

```javascript
import { createTimeline } from '@soblend/animify';

const timeline = createTimeline();

timeline
  .add({
    target: '#box1',
    keyframes: [
      { transform: 'translateX(0px)' },
      { transform: 'translateX(100px)' }
    ],
    options: { duration: 500 }
  })
  .add({
    target: '#box2',
    keyframes: [
      { transform: 'translateY(0px)' },
      { transform: 'translateY(100px)' }
    ],
    options: { duration: 500 },
    offset: 200  // Comienza 200ms después del inicio del timeline
  })
  .add({
    target: '#box3',
    keyframes: [
      { opacity: 0 },
      { opacity: 1 }
    ],
    options: { duration: 300 },
    offset: '-=100'  // Comienza 100ms antes de que termine la animación anterior
  });

// Controles del timeline
timeline.play();
timeline.pause();
timeline.reverse();
timeline.seek(0.5);  // Ir al 50% del timeline
```

**Opciones de offset:**
- Número positivo: Milisegundos desde el inicio del timeline
- String con `+=`: Tiempo después del final de la animación anterior
- String con `-=`: Tiempo antes del final de la animación anterior

### Animaciones de Scroll

Vincula animaciones al scroll del usuario con control preciso:

```javascript
import { createScrollAnimation } from '@soblend/animify';

createScrollAnimation('#parallax', [
  { transform: 'translateY(0px)', opacity: 1 },
  { transform: 'translateY(-200px)', opacity: 0 }
], {
  start: '0%',      // Inicio de la animación (top del viewport)
  end: '100%',      // Fin de la animación (bottom del viewport)
  scrub: true,      // Sincronizar con el scroll
  markers: false    // Mostrar marcadores de debug
});
```

**Configuración de rangos:**
- `start`: Define cuándo comienza la animación relativo al viewport
- `end`: Define cuándo termina la animación
- `scrub`: Si es `true`, la animación se sincroniza exactamente con el scroll

### Animaciones SVG

Sistema completo para animar gráficos vectoriales:

#### Dibujar Path

```javascript
import { animateSVG } from '@soblend/animify';

animateSVG('#svgPath').drawPath(2000);  // Dibuja el path en 2 segundos
```

#### Morphing de Shapes

Transforma suavemente entre diferentes formas SVG:

```javascript
import { createSVGMorph } from '@soblend/animify';

const elements = document.querySelectorAll('.morph-shape');
const paths = [
  'M 50 50 L 150 50 L 100 150 Z',  // Triángulo
  'M 50 50 L 150 50 L 150 150 L 50 150 Z',  // Cuadrado
  'M 100 50 A 50 50 0 1 1 100 150 A 50 50 0 1 1 100 50'  // Círculo
];

createSVGMorph(elements, paths, { 
  duration: 1000,
  stagger: 100,  // 100ms de delay entre cada elemento
  easing: 'easeInOutCubic'
});
```

#### Animaciones de Stroke

```javascript
animateSVG('#icon')
  .strokeDraw(1500)  // Anima el stroke-dashoffset
  .then(() => {
    console.log('Animación completada');
  });
```

### Transformaciones 3D

Crea efectos 3D impresionantes con aceleración GPU:

```javascript
import { create3D } from '@soblend/animify';

const transform = create3D('#card', { 
  perspective: 1000  // Distancia de perspectiva en píxeles
});

// Flip vertical
transform.flip('y', { 
  duration: 600,
  easing: 'easeInOutCubic'
});

// Flip horizontal
transform.flip('x', { duration: 600 });

// Rotaciones específicas
transform.rotateX(90, { duration: 500 });
transform.rotateY(180, { duration: 500 });
transform.rotateZ(45, { duration: 500 });

// Combinación de transformaciones
transform.set({
  rotateX: 45,
  rotateY: 45,
  scale: 1.2
}, { duration: 800 });
```

## Funciones de Easing

La librería incluye más de 30 funciones de easing predefinidas para controlar la aceleración de las animaciones.

### Categorías de Easing

**Básicas**
- `linear`: Velocidad constante
- `easeIn`: Comienza lento, termina rápido
- `easeOut`: Comienza rápido, termina lento
- `easeInOut`: Comienza y termina lento, rápido en el medio

**Cubic (curvas cúbicas)**
- `easeInCubic`, `easeOutCubic`, `easeInOutCubic`

**Quart (curvas cuárticas)**
- `easeInQuart`, `easeOutQuart`, `easeInOutQuart`

**Expo (exponenciales)**
- `easeInExpo`, `easeOutExpo`, `easeInOutExpo`

**Circ (circulares)**
- `easeInCirc`, `easeOutCirc`, `easeInOutCirc`

**Back (sobrepasan el objetivo)**
- `easeInBack`, `easeOutBack`, `easeInOutBack`

**Elastic (efecto elástico)**
- `easeInElastic`, `easeOutElastic`, `easeInOutElastic`

**Bounce (efecto rebote)**
- `easeInBounce`, `easeOutBounce`, `easeInOutBounce`

### Cubic Bezier Personalizado

Crea tus propias curvas de easing usando cubic-bezier:

```javascript
import { Easing } from '@soblend/animify';

const customEasing = Easing.cubicBezier(0.42, 0, 0.58, 1);

createAnimation('#element', keyframes, {
  duration: 1000,
  easing: customEasing
});
```

Los valores representan los puntos de control de la curva bezier. Puedes usar herramientas como [cubic-bezier.com](https://cubic-bezier.com) para visualizar y crear curvas personalizadas.

## Estructura del Proyecto

```
@soblend/animify/
├── packages/
│   ├── core/           # Motor principal de animación
│   ├── react/          # Bindings y hooks para React
│   ├── vue/            # Composables y directivas para Vue
│   └── vanilla/        # Paquete principal para JavaScript vanilla
└── examples/           # Ejemplos y demos de uso
    ├── index.html              # Demo principal
    ├── advanced-demos.html     # Demos avanzados
    └── real-world/             # Ejemplos de uso real
        ├── landing-page.html   # Ejemplo de landing page
        └── dashboard.html      # Ejemplo de dashboard
```

## API Completa

### Funciones Core

**createAnimation(element, keyframes, config)**  
Crea una animación básica en un elemento.
- `element`: Selector CSS o elemento DOM
- `keyframes`: Array de objetos con las propiedades a animar
- `config`: Objeto de configuración (duration, easing, delay, etc.)

**createTimeline()**  
Crea un timeline para secuencias de animaciones.
- Retorna: Objeto timeline con métodos add(), play(), pause(), reverse(), seek()

**addGestures(element, config)**  
Añade detección de gestures a un elemento.
- `element`: Selector CSS o elemento DOM
- `config`: Configuración de gestures (drag, tap, hover, etc.)

**createScrollAnimation(element, keyframes, config)**  
Crea una animación vinculada al scroll.
- `element`: Elemento a animar
- `keyframes`: Estados de la animación
- `config`: start, end, scrub, markers

**animateSVG(element)**  
Utilidades para animar elementos SVG.
- Retorna: Objeto con métodos drawPath(), strokeDraw(), etc.

**create3D(element, config)**  
Sistema de transformaciones 3D.
- Retorna: Objeto con métodos flip(), rotateX(), rotateY(), rotateZ(), set()

### React Hooks

**useAnimation(keyframes, config)**  
Hook principal de animación.
- Retorna: `{ ref, animate, isAnimating }`

**useSpring(from, to, config)**  
Hook para animaciones con física spring.
- Retorna: `{ ref, setValue, value }`

**useGesture(config)**  
Hook para detección de gestures.
- Retorna: `{ ref, handlers }`

**useScroll(keyframes, config)**  
Hook para animaciones de scroll.
- Retorna: `{ ref, scrollProgress }`

**Componente Motion**  
Componente wrapper con props de animación.
- Props: animate, whileHover, whileTap, transition, etc.

### Vue Composables

**useAnimation(keyframes, config)**  
Composable de animación.
- Retorna: `{ elementRef, animate, isAnimating }`

**useSpring(from, to, config)**  
Composable de física spring.
- Retorna: `{ elementRef, setValue, value }`

**useGesture(config)**  
Composable de gestures.
- Retorna: `{ elementRef, handlers }`

**Directivas**
- `v-animate`: Aplica animaciones declarativamente
- `v-gesture`: Añade gestures a elementos

## Optimización y Performance

### Aceleración GPU Automática

La librería automáticamente optimiza las animaciones para usar aceleración por GPU cuando es posible, especialmente para las propiedades:
- `transform` (translate, scale, rotate)
- `opacity`

### RequestAnimationFrame

Todas las animaciones utilizan `requestAnimationFrame` para sincronizarse con el ciclo de repintado del navegador, garantizando 60fps.

### Web Animations API

El motor está construido sobre la Web Animations API nativa, proporcionando el mejor rendimiento posible sin dependencias externas.

### Tree-Shaking

Los paquetes están optimizados para tree-shaking, asegurando que solo el código que utilizas se incluya en tu bundle final.

### Tamaño del Bundle

- Core: aproximadamente 15KB minificado + gzip
- React: aproximadamente 8KB minificado + gzip
- Vue: aproximadamente 8KB minificado + gzip

## Testing

La librería incluye un conjunto completo de tests unitarios con Vitest.

### Ejecutar Tests

```bash
# Ejecutar todos los tests
pnpm test

# Ejecutar tests en modo watch
pnpm test:watch

# Ejecutar tests con reporte de cobertura
pnpm test:coverage
```

### Escribir Tests

Los tests están organizados por módulo en `packages/core/src/__tests__/`:

```typescript
import { describe, it, expect } from 'vitest';
import { createAnimation } from '../animation';

describe('Animation', () => {
  it('should create animation with correct duration', () => {
    const element = document.createElement('div');
    const animation = createAnimation(element, [
      { opacity: 0 },
      { opacity: 1 }
    ], { duration: 1000 });
    
    expect(animation.effect.getTiming().duration).toBe(1000);
  });
});
```

## Sistema de Plugins

Animify incluye un sistema extensible de plugins que permite añadir funcionalidades personalizadas.

### Plugins Disponibles

**ConfettiPlugin**  
Efectos de confetti y partículas animadas.

```javascript
import { pluginManager, ConfettiPlugin } from '@soblend/animify-core/plugins';

pluginManager.register(ConfettiPlugin);

Animify.createConfetti(element, {
  count: 100,
  colors: ['#ff0000', '#00ff00', '#0000ff'],
  spread: 360,
  gravity: 0.5,
  velocity: 50
});
```

**TextEffectsPlugin**  
Efectos avanzados de texto.

```javascript
import { pluginManager, TextEffectsPlugin } from '@soblend/animify-core/plugins';

pluginManager.register(TextEffectsPlugin);

// Efecto máquina de escribir
Animify.typewriter(element, 'Texto a escribir', { 
  speed: 50,
  cursor: true
});

// Efecto de texto aleatorio
Animify.shuffleText(element, 'Texto final', { 
  duration: 2000,
  characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
});
```

### Crear Plugin Personalizado

```javascript
const MyCustomPlugin = {
  name: 'myCustomPlugin',
  version: '1.0.0',
  
  install(Animify) {
    Animify.customEffect = function(element, options) {
      // Implementación del efecto personalizado
      return createAnimation(element, [...], options);
    };
  }
};

pluginManager.register(MyCustomPlugin);
```

## Ejemplos de Uso Real

La carpeta `examples/` contiene demos completos de uso en diferentes contextos:

**index.html**  
Demo principal que muestra todas las características básicas de la librería.

**advanced-demos.html**  
Demostraciones de características avanzadas como partículas, loaders animados y morphing SVG.

**real-world/landing-page.html**  
Ejemplo completo de una landing page moderna con animaciones de scroll, parallax y efectos de entrada.

**real-world/dashboard.html**  
Ejemplo de dashboard interactivo con gráficos animados, transiciones y micro-interacciones.

## Licencia

MIT License

Copyright (c) 2024 Soblend

Se concede permiso, libre de cargos, a cualquier persona que obtenga una copia de este software y de los archivos de documentación asociados, a utilizar el Software sin restricción, incluyendo sin limitación los derechos a usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar, y/o vender copias del Software.

## Autor

Desarrollado por Soblend

## Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Soporte

Si encuentras algún bug o tienes preguntas:
- Abre un issue en GitHub
- Consulta la documentación completa
- Revisa los ejemplos en la carpeta `/examples`

## Roadmap

**Próximas Características**

Sistema de plugins más robusto  
Permitir extensiones de terceros con API documentada.

Soporte para CSS Houdini  
Aprovechar las APIs de bajo nivel del navegador para efectos avanzados.

Más templates y ejemplos  
Biblioteca de componentes y patrones comunes de animación.

Documentación interactiva  
Sitio web con demos en vivo y playground interactivo.

Playground online  
Editor en línea para probar y compartir animaciones.

Mejoras de performance  
Optimizaciones adicionales para dispositivos móviles.

## Changelog

**Version 1.0.0**
- Lanzamiento inicial
- Motor de animación completo
- Soporte para React y Vue
- Sistema de física spring
- Gestures y drag
- Timeline y secuencias
- Animaciones de scroll
- Transformaciones 3D
- Sistema de plugins
- Tests unitarios completos
