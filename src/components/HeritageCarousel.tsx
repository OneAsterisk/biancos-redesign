import { useEffect, useState } from "react";
import { ImageSlot } from "./ImageSlot";

interface Slide {
  id: string;
  label: string;
  placeholder: string;
  src?: string;
}

const SLIDES: Slide[] = [
  { id: "her-exterior", label: "Westwood Ave. exterior", placeholder: "Drop in: front of the building, signage visible" },
  { id: "her-floor", label: "Main floor", placeholder: "Drop in: wide shot of the gym floor" },
  { id: "her-racks", label: "Squat racks", placeholder: "Drop in: free-weight platforms / racks" },
  { id: "her-cardio", label: "Cardio deck", placeholder: "Drop in: treadmills / bikes / rowers" },
  { id: "her-chalkboard", label: "The chalkboard", placeholder: "Drop in: motivational chalkboard wall" },
];

export function HeritageCarousel() {
  const [i, setI] = useState(0);
  const n = SLIDES.length;
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
        {SLIDES.map((s) => (
          <div className="carousel-slide" key={s.id}>
            <ImageSlot src={s.src} placeholder={s.placeholder} alt={s.label} />
          </div>
        ))}
      </div>

      <div className="carousel-dots">
        {SLIDES.map((s, idx) => (
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

      <div className="carousel-caption">{SLIDES[i].label}</div>

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
