import { useEffect, useRef, useCallback } from 'react';
import { AnimationController } from '@soblend/animify-core';
import type { Keyframe, AnimationConfig } from '@soblend/animify-core';

export function useAnimation(
  keyframes: Keyframe[],
  config?: AnimationConfig
) {
  const ref = useRef<HTMLElement>(null);
  const controllerRef = useRef<AnimationController | null>(null);

  useEffect(() => {
    if (ref.current && !controllerRef.current) {
      controllerRef.current = new AnimationController(ref.current);
    }
  }, []);

  const animate = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.animate(keyframes, config);
    }
  }, [keyframes, config]);

  const stop = useCallback(() => {
    controllerRef.current?.stop();
  }, []);

  const pause = useCallback(() => {
    controllerRef.current?.pause();
  }, []);

  const play = useCallback(() => {
    controllerRef.current?.play();
  }, []);

  const reverse = useCallback(() => {
    controllerRef.current?.reverse();
  }, []);

  return {
    ref,
    animate,
    stop,
    pause,
    play,
    reverse,
    controller: controllerRef.current,
  };
}
