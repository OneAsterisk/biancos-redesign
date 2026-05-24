import { useEffect, useState } from "react";
import {
  CLASS_TYPES,
  STATIC_WEEK,
  type ClassType,
  type ScheduleDay,
} from "../data/classes";
import { calendarConfigured, fetchCalendarWeek } from "../lib/googleCalendar";

export type ScheduleSource = "static" | "google";

export interface ScheduleState {
  week: ScheduleDay[];
  types: ClassType[];
  source: ScheduleSource;
  loading: boolean;
  error: string | null;
}

/**
 * Provides the weekly schedule. If a Google Calendar is configured it loads
 * live events; otherwise (or on failure) it falls back to the static week
 * defined in data/classes.ts. The UI is identical either way.
 */
export function useSchedule(ref?: Date): ScheduleState {
  const [state, setState] = useState<ScheduleState>({
    week: STATIC_WEEK,
    types: CLASS_TYPES,
    source: "static",
    loading: calendarConfigured,
    error: null,
  });

  useEffect(() => {
    if (!calendarConfigured) return;
    let cancelled = false;

    fetchCalendarWeek(ref)
      .then(({ week, types }) => {
        if (cancelled) return;
        // Keep static week if the calendar returned an empty week.
        const hasClasses = week.some((d) => d.items.length > 0);
        setState({
          week: hasClasses ? week : STATIC_WEEK,
          types,
          source: hasClasses ? "google" : "static",
          loading: false,
          error: null,
        });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setState({
          week: STATIC_WEEK,
          types: CLASS_TYPES,
          source: "static",
          loading: false,
          error: err instanceof Error ? err.message : "Failed to load calendar.",
        });
      });

    return () => {
      cancelled = true;
    };
  }, [ref]);

  return state;
}
