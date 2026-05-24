/**
 * Image paths served from `public/assets/`.
 * Set `src` on drop-zones via these constants so a path change happens in one place.
 */
export const ASSETS = {
  building: "/assets/biancos-building-1024x726.jpg",
  buildingWebp: "/assets/biancos-building-1024x726.webp",
  logoWebp: "/assets/biancos-128.webp",
  logo: "/assets/biancos.jpg",
  taekwondo: {
    logo: "/assets/TK-logo-1024x1024.jpg",
    belts: "/assets/TK-belts-658x1024.jpg",
    beltMeaning: "/assets/belt-meaning.webp",
    flags: "/assets/TK-Flags-1-768x282.jpg",
  },
  massage: {
    heidi: "/assets/Massage-Heidi-1024x490.jpg",
    ironIvory: "/assets/iron-ivory.jpg",
    ironIvoryFacebook: "https://www.facebook.com/profile.php?id=100089386638733",
  },
  wellnessWay: {
    logo: "/assets/wellness-way-1024x538.jpg",
    staff: "/assets/wellness-way-Iron-Mtn-683x1024.jpg",
    facebook: "https://www.facebook.com/TWWIronMountain/",
    webpage: "https://www.thewellnessway.com/clinics/mi/ironmountain/wellness-center/",
  },
} as const;

/** Default placeholder copy for ImageSlot until real media is wired. */
export const IMAGE_PLACEHOLDERS = {
  logo: "Logo",
  homeHero: "Drop in: a candid photo of the gym floor or owners",
  homeAboutTeaser: "Drop in: a candid photo of the gym floor or owners",
} as const;
