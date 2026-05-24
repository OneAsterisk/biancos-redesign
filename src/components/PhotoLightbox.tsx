import { useCallback, useEffect } from "react";
import type { FacilityPhoto } from "../data/facilityPhotos";

interface PhotoLightboxProps {
  photos: FacilityPhoto[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}

export function PhotoLightbox({ photos, index, onClose, onChange }: PhotoLightboxProps) {
  const photo = photos[index];
  const count = photos.length;

  const go = useCallback(
    (next: number) => onChange(((next % count) + count) % count),
    [count, onChange],
  );

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") go(index - 1);
      if (e.key === "ArrowRight") go(index + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, onClose]);

  if (!photo) return null;

  return (
    <div
      className="photo-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${photo.label} — expanded view`}
      onClick={onClose}
    >
      <div className="photo-lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="photo-lightbox-close"
          onClick={onClose}
          aria-label="Close expanded photo"
        >
          <svg viewBox="0 0 16 16" aria-hidden>
            <line x1="4" y1="4" x2="12" y2="12" />
            <line x1="12" y1="4" x2="4" y2="12" />
          </svg>
        </button>

        <figure className="photo-lightbox-figure">
          <img
            src={photo.src}
            alt={photo.label}
            width={photo.width}
            height={photo.height}
            decoding="async"
          />
          <figcaption className="photo-lightbox-caption">{photo.label}</figcaption>
        </figure>

        {count > 1 && (
          <>
            <div className="photo-lightbox-counter">
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </div>

            <div className="photo-lightbox-controls">
              <button
                type="button"
                className="carousel-btn"
                onClick={() => go(index - 1)}
                aria-label="Previous photo"
              >
                <svg viewBox="0 0 16 16" aria-hidden>
                  <polyline points="10,3 4,8 10,13" />
                </svg>
              </button>
              <button
                type="button"
                className="carousel-btn"
                onClick={() => go(index + 1)}
                aria-label="Next photo"
              >
                <svg viewBox="0 0 16 16" aria-hidden>
                  <polyline points="6,3 12,8 6,13" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
