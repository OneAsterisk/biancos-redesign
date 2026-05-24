import { useEffect, useState } from "react";
import { ImageSlot } from "./ImageSlot";
import { HERITAGE_CAROUSEL_SLIDES } from "../data/heritageCarousel";

export function HeritageCarousel() {
  const [i, setI] = useState(0);
  const n = HERITAGE_CAROUSEL_SLIDES.length;
  const go = (next: number) => setI(((next % n) + n) % n);

  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((prev) => (prev + 1) % n), 6000);
    return () => clearInterval(t);
  }, [paused, n]);

  return (
    <div
      className="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="carousel-track" style={{ transform: `translateX(-${i * 100}%)` }}>
        {HERITAGE_CAROUSEL_SLIDES.map((s) => (
          <div className="carousel-slide" key={s.id}>
            <ImageSlot src={s.src} placeholder={s.placeholder} alt={s.label} />
          </div>
        ))}
      </div>

      <div className="carousel-dots">
        {HERITAGE_CAROUSEL_SLIDES.map((s, idx) => (
          <button
            key={s.id}
            className={idx === i ? "on" : ""}
            onClick={() => go(idx)}
            aria-label={`Show slide ${idx + 1}`}
          />
        ))}
      </div>

      <div className="carousel-counter">
        {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
      </div>

      <div className="carousel-caption">{HERITAGE_CAROUSEL_SLIDES[i].label}</div>

      <div className="carousel-controls">
        <button className="carousel-btn" onClick={() => go(i - 1)} aria-label="Previous">
          <svg viewBox="0 0 16 16">
            <polyline points="10,3 4,8 10,13" />
          </svg>
        </button>
        <button className="carousel-btn" onClick={() => go(i + 1)} aria-label="Next">
          <svg viewBox="0 0 16 16">
            <polyline points="6,3 12,8 6,13" />
          </svg>
        </button>
      </div>
    </div>
  );
}
