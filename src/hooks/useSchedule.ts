import { useEffect, useState } from "react";
import {
  CLASS_TYPES,
  STATIC_WEEK,
  type ClassType,
  type ScheduleDay,
} from "../data/classes";
import {
  calendarConfigured,
  emptyScheduleDays,
  fetchCalendarRange,
  scheduleRange,
  type ScheduleRange,
  type ScheduleView,
} from "../lib/googleCalendar";

export type ScheduleSource = "static" | "google";

export interface ScheduleState {
  days: ScheduleDay[];
  types: ClassType[];
  source: ScheduleSource;
  loading: boolean;
  error: string | null;
  range: ScheduleRange;
  emptyMessage: string;
}

function fallbackDays(view: ScheduleView, range: ScheduleRange): ScheduleDay[] {
  return view === "week" ? STATIC_WEEK : emptyScheduleDays(range);
}

function loadingDays(view: ScheduleView, range: ScheduleRange): ScheduleDay[] {
  return calendarConfigured ? emptyScheduleDays(range) : fallbackDays(view, range);
}

/**
 * Provides the schedule. If a Google Calendar iCal feed is configured it loads
 * live events; otherwise (or on failure) it falls back to the static week
 * defined in data/classes.ts.
 */
export function useSchedule(view: ScheduleView, ref?: Date): ScheduleState {
  const initialRange = scheduleRange(view, ref);
  const [state, setState] = useState<ScheduleState>({
    days: loadingDays(view, initialRange),
    types: CLASS_TYPES,
    source: "static",
    loading: calendarConfigured,
    error: null,
    range: initialRange,
    emptyMessage: initialRange.emptyMessage,
  });

  useEffect(() => {
    const range = scheduleRange(view, ref);
    setState((prev) => ({
      ...prev,
      days: loadingDays(view, range),
      types: CLASS_TYPES,
      source: "static",
      range,
      emptyMessage: range.emptyMessage,
      loading: calendarConfigured,
    }));

    if (!calendarConfigured) return;
    let cancelled = false;

    fetchCalendarRange(view, ref)
      .then(({ days, types, range }) => {
        if (cancelled) return;
        setState({
          days,
          types,
          source: "google",
          loading: false,
          error: null,
          range,
          emptyMessage: range.emptyMessage,
        });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setState({
          days: fallbackDays(view, range),
          types: CLASS_TYPES,
          source: "static",
          loading: false,
          error: err instanceof Error ? err.message : "Failed to load calendar.",
          range,
          emptyMessage: range.emptyMessage,
        });
      });

    return () => {
      cancelled = true;
    };
  }, [ref, view]);

  return state;
}
