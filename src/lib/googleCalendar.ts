// Read-from-Google-Calendar integration.
//
// The gym maintains a Google Calendar of classes; this module fetches the
// calendar's secret iCal feed and shapes events into the grid the Schedule page
// renders. Staff "add more classes" simply by adding events to the calendar.
//
// Configuration (see .env.example):
//   GOOGLE_CALENDAR_ICAL_URL — server-side iCal feed URL for /api/calendar.

import ICAL from "ical.js";
import {
  CLASS_TYPES,
  type ClassItem,
  type ClassType,
  type ScheduleDay,
} from "../data/classes";

const ICAL_FEED_URL = "/api/calendar";

export const calendarConfigured = Boolean(ICAL_FEED_URL);
export type ScheduleView = "day" | "week" | "month";

const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const MONTH_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const MAX_RECURRENCES_PER_EVENT = 500;

type IcalTime = InstanceType<typeof ICAL.Time>;

export interface ScheduleRange {
  start: Date;
  end: Date;
  label: string;
  emptyMessage: string;
}

const isoDate = (d: Date): string => {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

const formatTime = (d: Date): string =>
  d
    .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
    .replace(/ /g, " ");

const startOfDay = (ref: Date): Date => {
  const d = new Date(ref);
  d.setHours(0, 0, 0, 0);
  return d;
};

const addDays = (ref: Date, days: number): Date => {
  const d = new Date(ref);
  d.setDate(d.getDate() + days);
  return d;
};

/** Monday of the week containing `ref` (local time). */
export function weekStart(ref = new Date()): Date {
  const d = startOfDay(ref);
  const dow = d.getDay(); // 0 Sun … 6 Sat
  const diff = dow === 0 ? -6 : 1 - dow; // back to Monday
  d.setDate(d.getDate() + diff);
  return d;
}

function monthStart(ref = new Date()): Date {
  const d = startOfDay(ref);
  d.setDate(1);
  return d;
}

function formatRangeLabel(view: ScheduleView, start: Date, end: Date): string {
  if (view === "day") {
    return `${WEEKDAY_SHORT[start.getDay()]}, ${MONTH_LONG[start.getMonth()]} ${start.getDate()}`;
  }
  if (view === "month") {
    return `${MONTH_LONG[start.getMonth()]} ${start.getFullYear()}`;
  }

  const lastDay = addDays(end, -1);
  const sameMonth = start.getMonth() === lastDay.getMonth();
  if (sameMonth) {
    return `${MONTH_SHORT[start.getMonth()]} ${start.getDate()}–${lastDay.getDate()}`;
  }
  return `${MONTH_SHORT[start.getMonth()]} ${start.getDate()}–${MONTH_SHORT[lastDay.getMonth()]} ${lastDay.getDate()}`;
}

export function scheduleRange(view: ScheduleView, ref = new Date()): ScheduleRange {
  if (view === "day") {
    const start = startOfDay(ref);
    const end = addDays(start, 1);
    return {
      start,
      end,
      label: formatRangeLabel(view, start, end),
      emptyMessage: "No Classes Scheduled for Today",
    };
  }

  if (view === "month") {
    const start = monthStart(ref);
    const end = new Date(start);
    end.setMonth(start.getMonth() + 1);
    return {
      start,
      end,
      label: formatRangeLabel(view, start, end),
      emptyMessage: "No Classes Scheduled This Month",
    };
  }

  const start = weekStart(ref);
  const end = addDays(start, 7);
  return {
    start,
    end,
    label: formatRangeLabel(view, start, end),
    emptyMessage: "No Classes Scheduled This Week",
  };
}

export function emptyScheduleDays(range: ScheduleRange): ScheduleDay[] {
  const days: ScheduleDay[] = [];
  for (let d = new Date(range.start); d < range.end; d = addDays(d, 1)) {
    days.push({
      day: WEEKDAY_SHORT[d.getDay()],
      date: `${MONTH_SHORT[d.getMonth()]} ${d.getDate()}`,
      iso: isoDate(d),
      items: [],
    });
  }
  return days;
}

/** Match an event title to a known class type, or synthesize one from the title. */
function resolveType(summary: string, description = ""): ClassType {
  const s = summary.trim().toLowerCase();
  const known = CLASS_TYPES.find(
    (t) => s === t.name.toLowerCase() || s.includes(t.name.toLowerCase())
  );
  if (known) return known;
  const id = s.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return {
    id: `gcal-${id || "class"}`,
    name: summary.trim(),
    color: "#534940",
    desc: description,
  };
}

function isCancelled(component: InstanceType<typeof ICAL.Component>): boolean {
  const status = component.getFirstPropertyValue("status");
  return typeof status === "string" && status.toLowerCase() === "cancelled";
}

function addOccurrence(
  days: ScheduleDay[],
  discovered: Map<string, ClassType>,
  summary: string,
  description: string,
  startTime: IcalTime,
  endTime: IcalTime,
  range: ScheduleRange
): void {
  const start = startTime.toJSDate();
  const end = endTime.toJSDate();
  if (end <= range.start || start >= range.end) return;

  const day = days.find((candidate) => candidate.iso === isoDate(start));
  if (!day) return;

  const type = resolveType(summary, description);
  if (!CLASS_TYPES.some((t) => t.id === type.id)) discovered.set(type.id, type);

  const item: ClassItem = {
    time: startTime.isDate ? "All day" : formatTime(start),
    type: type.id,
    start: start.toISOString(),
    end: end.toISOString(),
  };
  day.items.push(item);
}

/**
 * Fetch the gym calendar for the requested range and return schedule days.
 * Also returns any class types discovered in the calendar that aren't in the
 * static list, so the filter pills can include them.
 *
 * Throws if the calendar isn't configured or the request fails; callers decide
 * whether to fall back to the static schedule.
 */
export async function fetchCalendarRange(
  view: ScheduleView,
  ref = new Date()
): Promise<{ days: ScheduleDay[]; types: ClassType[]; range: ScheduleRange }> {
  if (!ICAL_FEED_URL) {
    throw new Error("Google Calendar iCal feed is not configured.");
  }

  const range = scheduleRange(view, ref);
  const res = await fetch(ICAL_FEED_URL, { headers: { Accept: "text/calendar" } });
  if (!res.ok) {
    throw new Error(`Calendar iCal request failed (${res.status})`);
  }

  const icsText = await res.text();
  const calendar = ICAL.Component.fromString(icsText);
  const days = emptyScheduleDays(range);
  const discovered = new Map<string, ClassType>();

  for (const component of calendar.getAllSubcomponents("vevent")) {
    if (isCancelled(component)) continue;

    const event = new ICAL.Event(component);
    if (event.isRecurrenceException() || !event.summary) continue;

    const description = event.description || "";
    if (event.isRecurring()) {
      const iterator = event.iterator(ICAL.Time.fromJSDate(range.start));
      let occurrence = iterator.next();
      let count = 0;

      while (occurrence && count < MAX_RECURRENCES_PER_EVENT) {
        const details = event.getOccurrenceDetails(occurrence);
        addOccurrence(
          days,
          discovered,
          details.item.summary || event.summary,
          details.item.description || description,
          details.startDate,
          details.endDate,
          range
        );

        if (details.startDate.toJSDate() >= range.end) break;
        occurrence = iterator.next();
        count += 1;
      }
      continue;
    }

    addOccurrence(
      days,
      discovered,
      event.summary,
      description,
      event.startDate,
      event.endDate,
      range
    );
  }

  // Sort each day's classes by start time.
  for (const day of days) {
    day.items.sort((a, b) => (a.start ?? "").localeCompare(b.start ?? ""));
  }

  return { days, types: [...CLASS_TYPES, ...discovered.values()], range };
}
