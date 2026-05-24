import type { CarouselSlide } from "./carouselSlides";

export type { CarouselSlide };

export interface HeritageCarouselSlide extends CarouselSlide {}

export const HERITAGE_CAROUSEL_SLIDES: HeritageCarouselSlide[] = [
  {
    id: "her-exterior",
    label: "Westwood Ave. exterior",
    placeholder: "Drop in: front of the building, signage visible",
  },
  {
    id: "her-floor",
    label: "Main floor",
    placeholder: "Drop in: wide shot of the gym floor",
  },
  {
    id: "her-racks",
    label: "Squat racks",
    placeholder: "Drop in: free-weight platforms / racks",
  },
  {
    id: "her-cardio",
    label: "Cardio deck",
    placeholder: "Drop in: treadmills / bikes / rowers",
  },
  {
    id: "her-chalkboard",
    label: "The chalkboard",
    placeholder: "Drop in: motivational chalkboard wall",
  },
];
