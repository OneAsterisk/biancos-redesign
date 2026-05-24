/** Dedicated service sub-pages (Massage, Senior Strong, TaeKwon-Do, Wellness Way). */

import type { CarouselSlide } from "./carouselSlides";
import { ASSETS } from "./assets";
import {
  SENIOR_STRONG_CAROUSEL_SLIDES,
  SENIOR_STRONG_VIDEO,
} from "./seniorStrongMedia";

export type ServiceSlug =
  | "massage"
  | "senior-strong"
  | "taekwondo"
  | "wellness-way";

export interface ServiceContact {
  name: string;
  phone?: string;
  note?: string;
  href?: string;
  hrefLabel?: string;
}

export interface ServiceVideoConfig {
  title?: string;
  youtubeId?: string;
  src?: string;
  placeholder?: string;
}

export interface ServiceBlock {
  heading?: string;
  paragraphs?: string[];
  schedule?: string[];
  hours?: { label: string; value: string }[];
  contacts?: ServiceContact[];
  links?: { label: string; href: string; external?: boolean }[];
  imagePlaceholder?: string;
  imageSrc?: string;
  imageAlt?: string;
  /** `circle` for logos; `tall` for portrait photos; `wide` for banners; `fit` shows full image without crop. */
  imageLayout?: "default" | "wide" | "circle" | "tall" | "fit";
  carousel?: CarouselSlide[];
  video?: ServiceVideoConfig;
}

export interface ServicePageData {
  slug: ServiceSlug;
  path: `/services/${ServiceSlug}`;
  navLabel: string;
  eyebrow: string;
  title: string;
  redWord: string;
  intro: string;
  tag: string;
  blocks: ServiceBlock[];
}

export const SERVICE_PAGES: ServicePageData[] = [
  {
    slug: "massage",
    path: "/services/massage",
    navLabel: "Massage",
    eyebrow: "Recovery · On site",
    title: "Three therapists under one roof.",
    redWord: "therapists",
    intro:
      "Licensed massage on the Bianco's campus — therapeutic, deep-tissue, and sport-specific work by appointment. Enter through the north doors and take a right at the front desk.",
    tag: "By appointment",
    blocks: [
      {
        paragraphs: [
          "We keep three massage therapists on site so members can book recovery around a lift or a class. Walk-ins depend on availability; calling ahead is the surest way to get a slot.",
          "When you arrive, use the north entrance, check in at the front desk, and they'll point you to the therapy room.",
        ],
      },
      {
        heading: "Therapeutic Massage by Heidi Rizzo",
        paragraphs: [
          "Heidi offers therapeutic massage with a focus on recovery and chronic tension. Contact her directly to schedule.",
        ],
        imagePlaceholder: "Drop in: Heidi Rizzo business card or headshot",
      },
      {
        heading: "Iron & Ivory Massage Therapies",
        paragraphs: [
          "Marissa and Abygail practice at Iron & Ivory Massage Therapies, also located at Bianco's. Follow their page for specials and availability.",
        ],
        contacts: [
          { name: "Marissa", note: "Iron & Ivory" },
          { name: "Abygail", note: "Iron & Ivory" },
        ],
        links: [
          {
            label: "Iron & Ivory on Facebook",
            href: "https://www.facebook.com",
            external: true,
          },
        ],
      },
    ],
  },
  {
    slug: "senior-strong",
    path: "/services/senior-strong",
    navLabel: "Senior Strong",
    eyebrow: "Program · 60+",
    title: "Strength built for the long run.",
    redWord: "long",
    intro:
      "Low-impact strength and balance for the 60+ crowd — coached sessions in a supportive group, right on the main gym floor.",
    tag: "Class",
    blocks: [
      {
        paragraphs: [
          "Bianco’s Fitness Center has a specialized program called Senior Strong, and it is designed to help elderly clients build their strength, mobility, and resilience as they navigate the challenges of aging. The class starts off with a warm-up that is an aerobic type workout. After a good warm-up, other exercises are included to work out different parts of the body. The class will work with dumbbells, bands, balls and sometimes yoga.",
          "Everyone is welcome to attend this class, and we encourage everyone to only do what your comfortable doing and at your own pace. You are not required to keep up a certain pace, or do every exercise. If you or anyone you know is interested, please stop in during staffed hours or give us a call. If you would like to see the scheduled classes for Senior Strong, please go to our “Class Schedule” page!",
        ],
      },
      {
        heading: "When we meet",
        schedule: [
          "Monday · Wednesday · Friday",
          "8:15 AM — morning session",
          "Additional afternoon slots as posted on the schedule",
        ],
        links: [{ label: "See this week's classes", href: "/schedule" }],
      },
      {
        heading: "On the floor",
        paragraphs: [
          "Classes run in the studio with coaches who know the Kingsford regulars by name. Bring water, wear comfortable shoes, and plan to stay for the full session.",
        ],
        carousel: SENIOR_STRONG_CAROUSEL_SLIDES,
      },
      {
        heading: "See it in action",
        video: {
          title: SENIOR_STRONG_VIDEO.title,
          src: SENIOR_STRONG_VIDEO.src,
          placeholder: SENIOR_STRONG_VIDEO.placeholder,
        },
      },
    ],
  },
  {
    slug: "taekwondo",
    path: "/services/taekwondo",
    navLabel: "TaeKwon-Do",
    eyebrow: "Program · ITF",
    title: "Traditional martial arts, Wednesday nights.",
    redWord: "Wednesday",
    intro:
      "Black Dragon TaeKwon-Do U.S.I.T.F. — youth and adult classes taught on site every Wednesday evening.",
    tag: "Program",
    blocks: [
      {
        paragraphs: [
          "Black Dragon TaeKwon-Do U.S.I.T.F. meets at Bianco's every Wednesday. Youth and adult sessions run back-to-back so families can train in one trip — from first white belt through black.",
        ],
        imageSrc: ASSETS.taekwondo.logo,
        imageAlt: "Black Dragon TaeKwon-Do U.S.I.T.F. program logo",
        imagePlaceholder: "Black Dragon TaeKwon-Do program logo",
        imageLayout: "circle",
      },
      {
        heading: "Every Wednesday",
        schedule: [
          "Youth — 5:30 PM to 6:25 PM",
          "Adult — 6:30 PM to 7:45 PM",
        ],
      },
      {
        heading: "Taekwon-Do Federation license",
        contacts: [
          {
            name: "Chris Abraham",
            phone: "(906) 284-9044",
            note: "License holder",
          },
        ],
      },
      {
        heading: "On the wall",
        imageSrc: ASSETS.taekwondo.belts,
        imageAlt: "TaeKwon-Do rank belts on display",
        imagePlaceholder: "TKD belt display",
        imageLayout: "tall",
      },
      {
        heading: "What the colors mean",
        imageSrc: ASSETS.taekwondo.beltMeaning,
        imageAlt: "TaeKwon-Do belt color meanings chart",
        imagePlaceholder: "Belt meaning chart",
        imageLayout: "fit",
      },
      {
        imageSrc: ASSETS.taekwondo.flags,
        imageAlt: "United States and South Korean flags",
        imagePlaceholder: "US and South Korean flags",
        imageLayout: "wide",
      },
    ],
  },
  {
    slug: "wellness-way",
    path: "/services/wellness-way",
    navLabel: "Wellness Way",
    eyebrow: "Clinic · Partner",
    title: "Wellness coaching on campus.",
    redWord: "Wellness",
    intro:
      "The Wellness Way clinic at Bianco's — walk-in nutrition, recovery, and wellness coaching for members and the broader Kingsford community.",
    tag: "Partner",
    blocks: [
      {
        paragraphs: [
          "The Wellness Way operates a clinic inside Bianco's Fitness Center, offering a puzzle-piece approach to health — connecting nutrition, movement, and recovery so the pieces fit together.",
          "Members and non-members alike can stop in during clinic hours or follow their Facebook page for updates and events.",
        ],
        imagePlaceholder: "Drop in: The Wellness Way logo",
        links: [
          {
            label: "Visit The Wellness Way website",
            href: "https://www.thewellnessway.com",
            external: true,
          },
        ],
      },
      {
        heading: "Clinic hours",
        hours: [
          { label: "Monday", value: "9:00 — 5:00" },
          { label: "Tuesday", value: "9:00 — 5:00" },
          { label: "Wednesday", value: "9:00 — 5:00" },
          { label: "Thursday", value: "9:00 — 5:00" },
          { label: "Friday", value: "9:00 — 5:00" },
        ],
        links: [
          {
            label: "The Wellness Way on Facebook",
            href: "https://www.facebook.com",
            external: true,
          },
        ],
      },
      {
        imagePlaceholder: "Drop in: Wellness Way staff photo",
      },
    ],
  },
];

export const SERVICE_NAV_LINKS = SERVICE_PAGES.map((p) => ({
  to: p.path,
  label: p.navLabel,
}));

export function getServicePage(
  slug: string | undefined,
): ServicePageData | undefined {
  return SERVICE_PAGES.find((p) => p.slug === slug);
}

/** Map About-page service titles to dedicated routes when available. */
export const SERVICE_TITLE_PATHS: Record<string, `/services/${ServiceSlug}`> = {
  "Senior Strong": "/services/senior-strong",
  "TaeKwon-Do": "/services/taekwondo",
  "Massage Therapy": "/services/massage",
  "Wellness Way": "/services/wellness-way",
};
