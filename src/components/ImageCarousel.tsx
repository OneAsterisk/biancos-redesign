import { useEffect, useState } from "react";
import type { CarouselSlide } from "../data/carouselSlides";
import { ImageSlot } from "./ImageSlot";

interface ImageCarouselProps {
  slides: CarouselSlide[];
  /** BEM-style modifier, e.g. `service` → `carousel--service` */
  variant?: "default" | "service";
}

export function ImageCarousel({ slides, variant = "default" }: ImageCarouselProps) {
  const [i, setI] = useState(0);
  const n = slides.length;
  const go = (next: number) => setI(((next % n) + n) % n);

  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || n < 2) return;
    const t = setInterval(() => setI((prev) => (prev + 1) % n), 6000);
    return () => clearInterval(t);
  }, [paused, n]);

  if (n === 0) return null;

  const mod = variant === "service" ? " carousel--service" : "";

  return (
    <div
      className={`carousel${mod}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="carousel-track" style={{ transform: `translateX(-${i * 100}%)` }}>
        {slides.map((s) => (
          <div className="carousel-slide" key={s.id}>
            <ImageSlot src={s.src} placeholder={s.placeholder} alt={s.label} />
          </div>
        ))}
      </div>

      {n > 1 && (
        <>
          <div className="carousel-dots">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                className={idx === i ? "on" : ""}
                onClick={() => go(idx)}
                aria-label={`Show slide ${idx + 1}: ${s.label}`}
              />
            ))}
          </div>

          <div className="carousel-counter">
            {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </div>

          <div className="carousel-controls">
            <button type="button" className="carousel-btn" onClick={() => go(i - 1)} aria-label="Previous">
              <svg viewBox="0 0 16 16" aria-hidden>
                <polyline points="10,3 4,8 10,13" />
              </svg>
            </button>
            <button type="button" className="carousel-btn" onClick={() => go(i + 1)} aria-label="Next">
              <svg viewBox="0 0 16 16" aria-hidden>
                <polyline points="6,3 12,8 6,13" />
              </svg>
            </button>
          </div>
        </>
      )}

      <div className="carousel-caption">{slides[i].label}</div>
    </div>
  );
}
