import type { CarouselSlide } from "./carouselSlides";

/** Gallery slides for the Senior Strong service page. Add `src` under public/assets/. */
export const SENIOR_STRONG_CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: "ss-group-1",
    label: "Morning class on the floor",
    placeholder: "Drop in: Senior Strong group photo (studio wide shot)",
    src: "/assets/Senior-Strong-1-edited.jpg",
  },
  {
    id: "ss-group-2",
    label: "Coached strength work",
    placeholder: "Drop in: Senior Strong group photo (exercise in progress)",
    src: "/assets/Senior-Strong-2-768x576.jpg",
  },
  {
    id: "ss-3",
    label: "Bands, balls, and light weights",
    placeholder: "Drop in: Senior Strong equipment or coach assisting a member",
    src: "/assets/Senior-Strong-3-768x576.jpg",
  },
  {
    id: "ss-halloween",
    label: "Halloween fun",
    placeholder: "Drop in: Senior Strong Halloween photo",
    src: "/assets/Halloween-2025-1-1024x768.jpg",
  },
];

/**
 * Class video for Senior Strong.
 * Set `youtubeId` (e.g. "dQw4w9WgXcQ") or `src` (e.g. "/assets/senior-strong.mp4").
 */
export const SENIOR_STRONG_VIDEO = {
  title: "Senior Strong in action",
  src: "/assets/Senior-Strong-Video-Clip.mov",
  placeholder:
    "Drop in: Senior Strong class video — set youtubeId in seniorStrongMedia.ts or add an MP4 to public/assets/",
} as const;
