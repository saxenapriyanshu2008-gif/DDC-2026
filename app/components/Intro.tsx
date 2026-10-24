'use client';
import { useEffect, useRef } from 'react';

export default function Intro() {
  const introRef = useRef<HTMLDivElement>(null);
  const s1Ref = useRef<HTMLDivElement>(null);
  const buRef = useRef<HTMLDivElement>(null);
  const s2Ref = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const word3Ref = useRef<HTMLSpanElement>(null);
  const playRef = useRef<(withSound: boolean) => void>(() => {});
  const finishRef = useRef<() => void>(() => {});

  useEffect(() => {
    const intro = introRef.current!;
    const s1 = s1Ref.current!;
    const bu = buRef.current!;
    const s2 = s2Ref.current!;
    const flash = flashRef.current!;
    const meta = metaRef.current!;
    const words = [word1Ref.current!, word2Ref.current!, word3Ref.current!];
    let timers: ReturnType<typeof setTimeout>[] = [];
    let audio: AudioContext | null = null;

    function at(ms: number, fn: () => void) {
      timers.push(setTimeout(fn, ms));
    }

    function ctx() {
      if (!audio) {
        const A = window.AudioContext || (window as never as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!A) return null;
        audio = new A();
      }
      if (audio.state === 'suspended') audio.resume();
      return audio;
    }

    function noise(ac: AudioContext, t: number, dur: number, vol: number, freq: number) {
      const n = Math.floor(ac.sampleRate * dur);
      const buf = ac.createBuffer(1, n, ac.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2);
      const src = ac.createBufferSource();
      const f = ac.createBiquadFilter();
      const g = ac.createGain();
      src.buffer = buf; f.type = 'bandpass'; f.frequency.value = freq; g.gain.value = vol;
      src.connect(f).connect(g).connect(ac.destination); src.start(t);
    }

    function boom(ac: AudioContext, t: number, big: boolean) {
      const o = ac.createOscillator(); const g = ac.createGain();
      o.frequency.setValueAtTime(big ? 150 : 120, t);
      o.frequency.exponentialRampToValueAtTime(38, t + 0.35);
      g.gain.setValueAtTime(big ? 1.0 : 0.75, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + (big ? 1.4 : 0.6));
      o.connect(g).connect(ac.destination); o.start(t); o.stop(t + 1.5);
      noise(ac, t, big ? 0.5 : 0.18, big ? 0.35 : 0.2, 1800);
    }

    function blip(ac: AudioContext, t: number, hz: number, vol: number) {
      const o = ac.createOscillator(); const g = ac.createGain();
      o.type = 'square'; o.frequency.value = hz;
      g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      o.connect(g).connect(ac.destination); o.start(t); o.stop(t + 0.15);
    }

    function riser(ac: AudioContext, t: number, dur: number) {
      const o = ac.createOscillator(); const g = ac.createGain(); const f = ac.createBiquadFilter();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(120, t); o.frequency.exponentialRampToValueAtTime(1400, t + dur);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.12, t + dur);
      f.type = 'lowpass'; f.frequency.setValueAtTime(400, t); f.frequency.exponentialRampToValueAtTime(5000, t + dur);
      o.connect(f).connect(g).connect(ac.destination); o.start(t); o.stop(t + dur + 0.02);
    }

    function score() {
      const ac = ctx(); if (!ac) return;
      const t = ac.currentTime + 0.05;
      for (let i = 0; i < 5; i++) noise(ac, t + 0.1 + i * 0.12, 0.05, 0.25, 3000 + i * 400);
      for (let i = 0; i < 8; i++) blip(ac, t + 0.75 + i * 0.045, 1600 + i * 60, 0.04);
      noise(ac, t + 1.6, 0.7, 0.35, 700);
      for (let i = 0; i < 8; i++) blip(ac, t + 1.65 + i * 0.055, 600 + i * 90, 0.03);
      riser(ac, t + 2.75, 0.85);
      boom(ac, t + 3.65, true);
      boom(ac, t + 4.25, false); boom(ac, t + 4.5, false); boom(ac, t + 4.75, false);
      noise(ac, t + 6.15, 0.6, 0.3, 900);
    }

    function reset() {
      timers.forEach(clearTimeout); timers = [];
      intro.className = 'intro';
      s1.className = 'intro__s1'; bu.className = 'intro__bu'; s2.className = 'intro__s2';
      flash.className = 'intro__flash'; meta.className = 'intro__meta';
      for (let i = 0; i < words.length; i++) words[i].classList.remove('on');
      void intro.offsetWidth;
    }

    function finish() {
      timers.forEach(clearTimeout); timers = [];
      intro.classList.add('lift');
      document.body.classList.remove('intro-open');
      at(720, () => intro.classList.add('is-gone'));
    }

    function play(withSound: boolean) {
      reset();
      document.body.classList.add('intro-open');
      if (withSound) score();
      at(80, () => s1.classList.add('on'));
      at(1500, () => s1.classList.add('out'));
      at(1650, () => bu.classList.add('on'));
      at(3500, () => bu.classList.add('out'));
      at(3650, () => {
        flash.classList.remove('go');
        void flash.offsetWidth;
        flash.classList.add('go');
        s2.classList.add('on');
      });
      at(4250, () => words[0].classList.add('on'));
      at(4500, () => words[1].classList.add('on'));
      at(4750, () => words[2].classList.add('on'));
      at(5100, () => meta.classList.add('on'));
      at(6200, finish);
    }

    playRef.current = play;
    finishRef.current = finish;
    play(false);

    return () => {
      timers.forEach(clearTimeout);
      document.body.classList.remove('intro-open');
    };
  }, []);

  return (
    <div className="intro" ref={introRef} id="intro" aria-label="DDC 2026 opening intro">
      <div className="intro__s1" ref={s1Ref}>
        <div className="intro__logo">
          <img src="/assets/acm-bennett-logo.png" alt="ACM Bennett" />
          <img className="ghost g1" src="/assets/acm-bennett-logo.png" alt="" />
          <img className="ghost g2" src="/assets/acm-bennett-logo.png" alt="" />
        </div>
        <div className="intro__presents" aria-label="presents">
          {'PRESENTS'.split('').map((c, i) => (
            <span key={i} style={{ '--i': i }}>{c}</span>
          ))}
        </div>
      </div>
      <div className="intro__bu" ref={buRef}>
        <img className="intro__bu-img" src="/assets/hero-bg.png" alt="Bennett University campus at sunset" />
        <div className="intro__bu-sweep" aria-hidden="true" />
        <div className="intro__bu-shade" aria-hidden="true" />
        <div className="intro__blinds" aria-hidden="true">
          {Array.from({ length: 8 }, (_, i) => (
            <i key={i} style={{ '--i': i }} />
          ))}
        </div>
        <div className="intro__bu-text">
          <p className="intro__bu-name">Bennett University</p>
          <p className="intro__bu-sub">Greater Noida &middot; 29 Oct 2026</p>
        </div>
      </div>
      <div className="intro__s2" ref={s2Ref}>
        <img className="intro__s2-img" src="/assets/hero-bg.png" alt="" />
        <div className="intro__s2-shade" aria-hidden="true" />
        <p className="intro__title">DDC<span>&rsquo;</span>26</p>
        <div className="intro__words">
          <span className="intro__word intro__word--1" ref={word1Ref}>DRINK</span>
          <span className="intro__word intro__word--2" ref={word2Ref}>DERIVE</span>
          <span className="intro__word intro__word--3" ref={word3Ref}>CODE</span>
        </div>
        <div className="intro__meta" ref={metaRef}>29 Oct 2026 &middot; Bennett University</div>
      </div>
      <div className="intro__flash" ref={flashRef} />
      <div className="intro__scan" aria-hidden="true" />
      <div className="intro__controls">
        <button className="intro__btn" type="button" onClick={() => playRef.current(true)}>Sound on</button>
        <button className="intro__btn" type="button" onClick={() => finishRef.current()}>Skip intro</button>
      </div>
    </div>
  );
}
