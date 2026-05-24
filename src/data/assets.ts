/**
 * Image paths served from `public/assets/`.
 * Set `src` on drop-zones via these constants so a path change happens in one place.
 */
export const ASSETS = {
  building: "/assets/biancos-building-1024x726.jpg",
} as const;

/** Default placeholder copy for ImageSlot until real media is wired. */
export const IMAGE_PLACEHOLDERS = {
  logo: "Logo",
  homeHero: "Drop in: a candid photo of the gym floor or owners",
  homeAboutTeaser: "Drop in: a candid photo of the gym floor or owners",
} as const;
