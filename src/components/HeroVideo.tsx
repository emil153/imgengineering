"use client";

import { useEffect, useRef, useState } from "react";

type Props = { src: string; poster: string; width: number; height: number };

/**
 * Decorative, muted background-style video.
 * - Starts only if the visitor has not asked for reduced motion (WCAG 2.3.3).
 * - Always has a visible pause/play control (WCAG 2.2.2: motion longer than 5 s).
 * - The poster is the first frame, so layout and LCP do not depend on the video.
 */
export function HeroVideo({ src, poster, width, height }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!reduce.matches) {
      video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="relative h-full w-full">
      <video
        ref={ref}
        data-hero-video
        className="h-full w-full object-cover"
        width={width}
        height={height}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        data-video-toggle
        onClick={toggle}
        aria-pressed={!playing}
        className="absolute bottom-4 right-4 inline-flex h-10 items-center gap-2 bg-white/90 px-3 font-mono text-[11px] uppercase tracking-[0.12em] text-img-black transition-colors hover:bg-white"
      >
        <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
          {playing ? <path d="M4 3h3v10H4zM9 3h3v10H9z" /> : <path d="M4 2.5v11l9-5.5z" />}
        </svg>
        <span data-video-label>{playing ? "Пауза" : "Пусни видео"}</span>
      </button>
    </div>
  );
}
