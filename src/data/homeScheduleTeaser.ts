import { classType } from "./classes";

/** Curated highlights for the home schedule teaser (not a full week export). */
export interface HomeScheduleHighlight {
  /** e.g. "Tue · 5:15 AM" or "Daily · 8:15 AM" */
  when: string;
  /** ClassType id from classes.ts — drives name + color */
  typeId: string;
}

export const HOME_SCHEDULE_HIGHLIGHTS: HomeScheduleHighlight[] = [
  { when: "Tue · 5:15 AM", typeId: "pump" },
  { when: "Wed · 5:15 AM", typeId: "yoga" },
  { when: "Daily · 8:15 AM", typeId: "senior-strong" },
  { when: "Mon · 4:30 PM", typeId: "yoga-strong" },
];

export function homeScheduleTeaserRows(): {
  when: string;
  name: string;
  color: string;
}[] {
  return HOME_SCHEDULE_HIGHLIGHTS.map(({ when, typeId }) => {
    const type = classType(typeId);
    return { when, name: type.name, color: type.color };
  });
}
