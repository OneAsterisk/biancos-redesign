// Class types and the static weekly schedule.
// This data matches the gym's real May 2026 calendar and serves as the
// fallback when no live Google Calendar is configured (see lib/googleCalendar.ts).

export interface ClassType {
  id: string;
  name: string;
  color: string;
  desc: string;
}

export interface ClassItem {
  /** Display time, e.g. "5:15 AM" */
  time: string;
  /** ClassType id */
  type: string;
  /** Optional ISO start/end — present for events sourced from Google Calendar.
   *  Used to build "Add to my Google Calendar" links. */
  start?: string;
  end?: string;
}

export interface ScheduleDay {
  day: string; // Mon, Tue, ...
  date: string; // "May 25"
  /** ISO date (yyyy-mm-dd) for the column, used when matching calendar events. */
  iso: string;
  /** When set, the day shows this notice instead of classes (e.g. holiday). */
  closed?: string;
  items: ClassItem[];
}

export const CLASS_TYPES: ClassType[] = [
  {
    id: "senior-strong",
    name: "Senior Strong",
    color: "#B8302A",
    desc: "Strength + mobility built for the 60+ crowd. Low-impact, big-impact.",
  },
  {
    id: "pump",
    name: "Pump",
    color: "#E8A33C",
    desc: "Barbell circuit. Wakes the whole town up at 5:15 a.m.",
  },
  {
    id: "yoga",
    name: "Yoga",
    color: "#5E8A6B",
    desc: "Vinyasa flow. Breath, balance, and a slow opener to the day.",
  },
  {
    id: "yoga-strong",
    name: "Yoga Strong",
    color: "#7A5AE0",
    desc: "Yoga shapes meets strength holds. Sweat earned.",
  },
];

export const classType = (id: string): ClassType =>
  CLASS_TYPES.find((c) => c.id === id) ?? {
    id,
    name: id,
    color: "#7A6E62",
    desc: "",
  };

// Static fallback week — mirrors the printed May 2026 calendar.
export const STATIC_WEEK: ScheduleDay[] = [
  {
    day: "Mon",
    date: "May 25",
    iso: "2026-05-25",
    closed: "Memorial Day · No Classes",
    items: [],
  },
  {
    day: "Tue",
    date: "May 26",
    iso: "2026-05-26",
    items: [
      { time: "5:15 AM", type: "pump" },
      { time: "8:15 AM", type: "senior-strong" },
    ],
  },
  {
    day: "Wed",
    date: "May 27",
    iso: "2026-05-27",
    items: [
      { time: "5:15 AM", type: "yoga" },
      { time: "8:15 AM", type: "senior-strong" },
      { time: "9:15 AM", type: "senior-strong" },
    ],
  },
  {
    day: "Thu",
    date: "May 28",
    iso: "2026-05-28",
    items: [
      { time: "5:15 AM", type: "pump" },
      { time: "8:15 AM", type: "senior-strong" },
    ],
  },
  {
    day: "Fri",
    date: "May 29",
    iso: "2026-05-29",
    items: [
      { time: "8:15 AM", type: "senior-strong" },
      { time: "9:15 AM", type: "senior-strong" },
    ],
  },
];
