'use client';
import { useEffect, useRef } from 'react';

export default function Intro() {
  const introRef = useRef<HTMLDivElement>(null);
  const buRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const intro = introRef.current!;
    const bu = buRef.current!;
    let timers: ReturnType<typeof setTimeout>[] = [];

    function at(ms: number, fn: () => void) {
      timers.push(setTimeout(fn, ms));
    }

    function finish() {
      timers.forEach(clearTimeout); timers = [];
      intro.classList.add('lift');
      document.body.classList.remove('intro-open');
      at(720, () => intro.classList.add('is-gone'));
    }

    document.body.classList.add('intro-open');
    at(80, () => bu.classList.add('on'));
    at(2400, finish);

    return () => {
      timers.forEach(clearTimeout);
      document.body.classList.remove('intro-open');
    };
  }, []);

  return (
    <div className="intro" ref={introRef} id="intro" aria-label="Loading">
      <div className="intro__bu" ref={buRef}>
        <img className="intro__bu-img" src="/assets/hero-bg.png" alt="Bennett University campus at sunset" />
        <div className="intro__bu-sweep" aria-hidden="true" />
        <div className="intro__blinds" aria-hidden="true">
          {Array.from({ length: 8 }, (_, i) => (
            <i key={i} style={{ '--i': i }} />
          ))}
        </div>
      </div>
      <div className="intro__scan" aria-hidden="true" />
    </div>
  );
}
