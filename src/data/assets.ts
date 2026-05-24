/**
 * Image paths served from `public/assets/`.
 * Set `src` on drop-zones via these constants so a path change happens in one place.
 */
export const ASSETS = {
  building: "/assets/biancos-building-1024x726.jpg",
  taekwondo: {
    logo: "/assets/TK-logo-1024x1024.jpg",
    belts: "/assets/TK-belts-658x1024.jpg",
    beltMeaning: "/assets/belt-meaning.webp",
    flags: "/assets/TK-Flags-1-768x282.jpg",
  },
} as const;

/** Default placeholder copy for ImageSlot until real media is wired. */
export const IMAGE_PLACEHOLDERS = {
  logo: "Logo",
  homeHero: "Drop in: a candid photo of the gym floor or owners",
  homeAboutTeaser: "Drop in: a candid photo of the gym floor or owners",
} as const;
