'use client';
import { useEffect, useRef } from 'react';

export default function Countdown({ target }: { target: string }) {
  const daysRef = useRef<HTMLSpanElement>(null);
  const hoursRef = useRef<HTMLSpanElement>(null);
  const minsRef = useRef<HTMLSpanElement>(null);
  const secsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const t = new Date(target).getTime();
    const pad = (n: number) => String(n).padStart(2, '0');

    const tick = () => {
      let left = isNaN(t) ? 0 : Math.max(0, t - Date.now());
      const d = Math.floor(left / 86400000); left -= d * 86400000;
      const h = Math.floor(left / 3600000); left -= h * 3600000;
      const m = Math.floor(left / 60000); left -= m * 60000;
      const s = Math.floor(left / 1000);
      if (daysRef.current) daysRef.current.textContent = pad(d);
      if (hoursRef.current) hoursRef.current.textContent = pad(h);
      if (minsRef.current) minsRef.current.textContent = pad(m);
      if (secsRef.current) secsRef.current.textContent = pad(s);
      if (d + h + m + s === 0) clearInterval(timer);
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="countdown" aria-label="Countdown to the event">
      <div className="countdown__box"><span ref={daysRef}>00</span><small>Days</small></div>
      <div className="countdown__box"><span ref={hoursRef}>00</span><small>Hours</small></div>
      <div className="countdown__box"><span ref={minsRef}>00</span><small>Mins</small></div>
      <div className="countdown__box"><span ref={secsRef}>00</span><small>Secs</small></div>
    </div>
  );
}
