// Services grid (About page) and the condensed services strip (Home).

export interface Service {
  num: string;
  title: string;
  copy: string;
  tag: string;
}

export const SERVICES: Service[] = [
  {
    num: "01",
    title: "Open Gym Floor",
    copy: "Free-weight room, racks, machines, and full cardio. Open 24/7 with a member swipe card.",
    tag: "Members",
  },
  {
    num: "02",
    title: "Senior Strong",
    copy: "Low-impact strength built for the 60+ crowd. Two morning sessions, four days a week.",
    tag: "Class",
  },
  {
    num: "03",
    title: "Pump & Yoga",
    copy: "Barbell circuits and breath-led flow. Early-morning slots so you’re done before work.",
    tag: "Class",
  },
  {
    num: "04",
    title: "TaeKwon-Do",
    copy: "Traditional ITF curriculum for all ages — yellow belt to black. Wednesday evenings.",
    tag: "Program",
  },
  {
    num: "05",
    title: "Massage Therapy",
    copy: "Licensed therapist on site. Recovery, deep-tissue, and sport-specific work by appointment.",
    tag: "By appt.",
  },
  {
    num: "06",
    title: "Wellness Way",
    copy: "Walk-in nutrition, recovery, and wellness coaching for members and the broader Kingsford community.",
    tag: "Program",
  },
];

// Condensed list used on the Home services strip.
export const SERVICE_STRIP: { num: string; name: string; when: string; to?: string }[] = [
  { num: "01", name: "Open floor", when: "24/7 with swipe card" },
  { num: "02", name: "Senior Strong", when: "Mon · Wed · Fri", to: "/services/senior-strong" },
  { num: "03", name: "Pump", when: "Tue · Thu · 5:15a" },
  { num: "04", name: "Yoga & Yoga Strong", when: "Wed · Mon" },
  { num: "05", name: "TaeKwon-Do", when: "Wed evenings", to: "/services/taekwondo" },
  { num: "06", name: "Massage Therapy", when: "By appointment", to: "/services/massage" },
];
