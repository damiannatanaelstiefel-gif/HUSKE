'use client';

import { useEffect, useRef } from 'react';

export default function HeroVideo() {
  const ref = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce && ref.current) {
      ref.current.removeAttribute('autoplay');
      ref.current.pause();
      ref.current.controls = true;
    }
  }, []);

  return (
    <video
      ref={ref}
      className="hero-video-el"
      src="/hero-recap.mp4"
      poster="/hero-recap-poster.jpg"
      autoPlay
      muted
      loop
      playsInline
      aria-label="Video resumen de eventos de HUSKE"
    />
  );
}
