import React, { useRef, useEffect, forwardRef } from 'react';
import { AnimationController } from '@soblend/animify-core';
import type { Keyframe, AnimationConfig, GestureConfig } from '@soblend/animify-core';
import { GestureManager } from '@soblend/animify-core';

interface MotionProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
  initial?: React.CSSProperties;
  animate?: Keyframe[];
  animationConfig?: AnimationConfig;
  gesture?: GestureConfig;
  whileHover?: Keyframe[];
  whileTap?: Keyframe[];
  children?: React.ReactNode;
}

export const Motion = forwardRef<HTMLElement, MotionProps>(
  (
    {
      as: Component = 'div',
      initial,
      animate,
      animationConfig,
      gesture,
      whileHover,
      whileTap,
      children,
      style,
      ...props
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLElement>(null);
    const controllerRef = useRef<AnimationController | null>(null);
    const gestureRef = useRef<GestureManager | null>(null);

    useEffect(() => {
      const element = internalRef.current;
      if (!element) return;

      if (animate) {
        controllerRef.current = new AnimationController(element);
        controllerRef.current.animate(animate, animationConfig);
      }

      if (gesture) {
        gestureRef.current = new GestureManager(element, gesture);
      }

      const hoverEnterHandler = () => {
        if (whileHover && controllerRef.current) {
          controllerRef.current.animate(whileHover, { duration: 200 });
        }
      };

      const hoverLeaveHandler = () => {
        if (controllerRef.current) {
          controllerRef.current.reverse();
        }
      };

      const tapDownHandler = () => {
        if (whileTap && controllerRef.current) {
          controllerRef.current.animate(whileTap, { duration: 100 });
        }
      };

      const tapUpHandler = () => {
        if (controllerRef.current) {
          controllerRef.current.reverse();
        }
      };

      if (whileHover) {
        element.addEventListener('mouseenter', hoverEnterHandler);
        element.addEventListener('mouseleave', hoverLeaveHandler);
      }

      if (whileTap) {
        element.addEventListener('pointerdown', tapDownHandler);
        element.addEventListener('pointerup', tapUpHandler);
      }

      return () => {
        gestureRef.current?.destroy();
        if (whileHover) {
          element.removeEventListener('mouseenter', hoverEnterHandler);
          element.removeEventListener('mouseleave', hoverLeaveHandler);
        }
        if (whileTap) {
          element.removeEventListener('pointerdown', tapDownHandler);
          element.removeEventListener('pointerup', tapUpHandler);
        }
      };
    }, [animate, animationConfig, gesture, whileHover, whileTap]);

    const refCallback = (node: HTMLElement | null): void => {
      (internalRef as React.MutableRefObject<HTMLElement | null>).current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    };

    return React.createElement(
      Component,
      {
        ...props,
        ref: refCallback,
        style: { ...initial, ...style },
      },
      children
    );
  }
);

Motion.displayName = 'Motion';
