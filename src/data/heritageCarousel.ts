import type { CarouselSlide } from "./carouselSlides";
import { ASSETS } from "./assets";
import { FACILITY_PHOTOS } from "./facilityPhotos";

export type { CarouselSlide };

export interface HeritageCarouselSlide extends CarouselSlide {}

const facilityPhotoSrc = (id: string) =>
  FACILITY_PHOTOS.find((photo) => photo.id === id)?.src;

export const HERITAGE_CAROUSEL_SLIDES: HeritageCarouselSlide[] = [
  {
    id: "her-exterior",
    label: "Westwood Ave. exterior",
    placeholder: "Drop in: front of the building, signage visible",
    src: ASSETS.building,
  },
  {
    id: "her-floor",
    label: "Main floor",
    placeholder: "Drop in: wide shot of the gym floor",
    src: facilityPhotoSrc("fac-floor-1"),
  },
  {
    id: "her-racks",
    label: "Free-weight area",
    placeholder: "Drop in: free-weight platforms / racks",
    src: facilityPhotoSrc("fac-floor-2"),
  },
  {
    id: "her-cardio",
    label: "Cardio deck",
    placeholder: "Drop in: treadmills / bikes / rowers",
    src: facilityPhotoSrc("fac-cardio"),
  },
  {
    id: "her-studio",
    label: "Studio room",
    placeholder: "Drop in: group studio / class space",
    src: facilityPhotoSrc("fac-studio-1"),
  },
];
