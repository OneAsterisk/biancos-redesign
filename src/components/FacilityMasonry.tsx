import { useMemo, useState } from "react";
import { FACILITY_PHOTOS, type FacilityPhoto } from "../data/facilityPhotos";
import { PhotoLightbox } from "./PhotoLightbox";

const COLUMN_COUNT = 5;

function distributePhotos(photos: FacilityPhoto[], count: number) {
  const columns: FacilityPhoto[][] = Array.from({ length: count }, () => []);
  const heights = new Array<number>(count).fill(0);

  for (const photo of photos) {
    let shortest = 0;
    for (let i = 1; i < count; i++) {
      if (heights[i] < heights[shortest]) shortest = i;
    }
    columns[shortest].push(photo);
    heights[shortest] += photo.height / photo.width;
  }

  return columns;
}

function photoIndex(photo: FacilityPhoto) {
  return FACILITY_PHOTOS.findIndex((p) => p.id === photo.id);
}

export function FacilityMasonry() {
  const columns = useMemo(() => distributePhotos(FACILITY_PHOTOS, COLUMN_COUNT), []);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div
        className="photos-scroll"
        tabIndex={0}
        role="region"
        aria-label="Facility photo gallery — scroll horizontally"
      >
        <div className="photos-masonry">
          {columns.map((column, columnIndex) => (
            <div className="photos-masonry-col" key={columnIndex}>
              {column.map((photo) => (
                <figure className="photos-masonry-item" key={photo.id}>
                  <button
                    type="button"
                    className="photos-masonry-trigger"
                    onClick={() => setActiveIndex(photoIndex(photo))}
                    aria-label={`Expand photo: ${photo.label}`}
                  >
                    <img
                      src={photo.src}
                      alt=""
                      width={photo.width}
                      height={photo.height}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="photo-label">{photo.label}</span>
                  </button>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <PhotoLightbox
          photos={FACILITY_PHOTOS}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onChange={setActiveIndex}
        />
      )}
    </>
  );
}
