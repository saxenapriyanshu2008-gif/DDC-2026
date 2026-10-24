'use client';
import { useEffect, useRef } from 'react';

export default function VideoPlayer({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting && !video.paused) video.pause();
        });
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="video-frame">
      <video ref={ref} src={src} poster={poster} controls playsInline preload="metadata" aria-label={label} />
    </div>
  );
}
