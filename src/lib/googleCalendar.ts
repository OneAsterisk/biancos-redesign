// Read-from-Google-Calendar integration.
//
// The gym maintains a Google Calendar of classes; this module fetches that
// calendar's events and shapes them into the weekly grid the Schedule page
// renders. Staff "add more classes" simply by adding events to the calendar.
//
// Configuration (see .env.example):
//   VITE_GOOGLE_CALENDAR_ID  — the calendar's ID (e.g. abc123@group.calendar.google.com)
//   VITE_GOOGLE_API_KEY      — a Google API key with the Calendar API enabled
//
// The calendar must be public ("Make available to public") for an API-key
// (read-only) request to succeed. If either var is missing or the request
// fails, callers fall back to the static schedule in data/classes.ts.

import {
  CLASS_TYPES,
  type ClassItem,
  type ClassType,
  type ScheduleDay,
} from "../data/classes";

const CALENDAR_ID = import.meta.env.VITE_GOOGLE_CALENDAR_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export const calendarConfigured = Boolean(CALENDAR_ID && API_KEY);

interface GCalDateTime {
  date?: string; // all-day, yyyy-mm-dd
  dateTime?: string; // RFC3339
}
interface GCalEvent {
  summary?: string;
  description?: string;
  start?: GCalDateTime;
  end?: GCalDateTime;
  status?: string;
}

const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const isoDate = (d: Date): string => {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

const formatTime = (d: Date): string =>
  d
    .toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })
    .replace(/ /g, " ");

/** Monday of the week containing `ref` (local time). */
export function weekStart(ref = new Date()): Date {
  const d = new Date(ref);
  d.setHours(0, 0, 0, 0);
  const dow = d.getDay(); // 0 Sun … 6 Sat
  const diff = dow === 0 ? -6 : 1 - dow; // back to Monday
  d.setDate(d.getDate() + diff);
  return d;
}

/** Match an event title to a known class type, or synthesize one from the title. */
function resolveType(summary: string): ClassType {
  const s = summary.trim().toLowerCase();
  const known = CLASS_TYPES.find(
    (t) => s === t.name.toLowerCase() || s.includes(t.name.toLowerCase())
  );
  if (known) return known;
  return {
    id: `gcal-${s.replace(/[^a-z0-9]+/g, "-")}`,
    name: summary.trim(),
    color: "#534940",
    desc: "",
  };
}

/**
 * Fetch the gym calendar for the Mon–Fri week containing `ref` and return the
 * five-day grid. Also returns any class types discovered in the calendar that
 * aren't in the static list, so the filter pills can include them.
 *
 * Throws if the calendar isn't configured or the request fails — callers
 * decide whether to fall back to the static schedule.
 */
export async function fetchCalendarWeek(
  ref = new Date()
): Promise<{ week: ScheduleDay[]; types: ClassType[] }> {
  if (!CALENDAR_ID || !API_KEY) {
    throw new Error("Google Calendar is not configured.");
  }

  const monday = weekStart(ref);
  const friEnd = new Date(monday);
  friEnd.setDate(monday.getDate() + 5); // exclusive upper bound (through Friday)

  const url = new URL(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
      CALENDAR_ID
    )}/events`
  );
  url.searchParams.set("key", API_KEY);
  url.searchParams.set("timeMin", monday.toISOString());
  url.searchParams.set("timeMax", friEnd.toISOString());
  url.searchParams.set("singleEvents", "true");
  url.searchParams.set("orderBy", "startTime");
  url.searchParams.set("maxResults", "100");

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`Calendar request failed (${res.status})`);
  }
  const data: { items?: GCalEvent[] } = await res.json();
  const events = data.items ?? [];

  // Build the five day columns.
  const week: ScheduleDay[] = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return {
      day: WEEKDAY_SHORT[d.getDay()],
      date: `${MONTH_SHORT[d.getMonth()]} ${d.getDate()}`,
      iso: isoDate(d),
      items: [],
    };
  });

  const discovered = new Map<string, ClassType>();

  for (const ev of events) {
    if (ev.status === "cancelled" || !ev.summary) continue;
    const startStr = ev.start?.dateTime ?? ev.start?.date;
    if (!startStr) continue;
    const start = new Date(startStr);
    const dayIso = isoDate(start);
    const day = week.find((w) => w.iso === dayIso);
    if (!day) continue;

    const type = resolveType(ev.summary);
    if (!CLASS_TYPES.some((t) => t.id === type.id)) discovered.set(type.id, type);

    const item: ClassItem = {
      time: ev.start?.dateTime ? formatTime(start) : "All day",
      type: type.id,
      start: ev.start?.dateTime ?? `${dayIso}T00:00:00`,
      end: ev.end?.dateTime ?? ev.end?.date,
    };
    day.items.push(item);
  }

  // Sort each day's classes by start time.
  for (const day of week) {
    day.items.sort((a, b) => (a.start ?? "").localeCompare(b.start ?? ""));
  }

  return { week, types: [...CLASS_TYPES, ...discovered.values()] };
}
