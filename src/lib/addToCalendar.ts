// Builds "Add to my Google Calendar" template links for a class.
// These open Google Calendar pre-filled so a visitor can save the class to
// their own calendar — no API key or auth required.

import { classType, type ClassItem, type ScheduleDay } from "../data/classes";

const GYM_LOCATION = "Bianco's Fitness Center, 601 S. Westwood Ave., Kingsford, MI 49802";

/** Parse a display time like "5:15 AM" into { h, m } (24h). */
function parseTime(time: string): { h: number; m: number } {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})\s*([AP]M)?$/i);
  if (!match) return { h: 9, m: 0 };
  let h = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  const ampm = match[3]?.toUpperCase();
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return { h, m };
}

/** Format a Date as Google Calendar's local-floating stamp: YYYYMMDDTHHmmss. */
function stamp(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return (
    `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}` +
    `T${p(d.getHours())}${p(d.getMinutes())}00`
  );
}

/**
 * Resolve a class item to concrete start/end Date objects.
 * Prefers ISO times from a live calendar event; otherwise derives them from
 * the day's ISO date + the displayed time (defaulting to a 60-minute class).
 */
function resolveTimes(item: ClassItem, dayIso: string): { start: Date; end: Date } {
  if (item.start) {
    const start = new Date(item.start);
    const end = item.end ? new Date(item.end) : new Date(start.getTime() + 60 * 60 * 1000);
    return { start, end };
  }
  const { h, m } = parseTime(item.time);
  const start = new Date(`${dayIso}T00:00:00`);
  start.setHours(h, m, 0, 0);
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  return { start, end };
}

/** Build a Google Calendar "add event" URL for a single class occurrence. */
export function googleCalendarAddUrl(item: ClassItem, day: ScheduleDay): string {
  const type = classType(item.type);
  const { start, end } = resolveTimes(item, day.iso);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${type.name} · Bianco's Fitness`,
    dates: `${stamp(start)}/${stamp(end)}`,
    details: type.desc || `${type.name} at Bianco's Fitness Center.`,
    location: GYM_LOCATION,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
