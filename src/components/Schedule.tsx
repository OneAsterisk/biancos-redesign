import { useMemo, useState } from "react";
import { classType, type ClassItem, type ClassType, type ScheduleDay } from "../data/classes";
import { googleCalendarAddUrl } from "../lib/addToCalendar";
import { useSchedule } from "../hooks/useSchedule";
import type { ScheduleView } from "../lib/googleCalendar";

const VIEW_LABELS: Record<ScheduleView, string> = {
  day: "Day",
  week: "Week",
  month: "Month",
};

function FilterPill({
  type,
  active,
  onClick,
}: {
  type: ClassType;
  active: Set<string>;
  onClick: () => void;
}) {
  const on = active.has(type.id);
  return (
    <button
      className={"filter-pill" + (on ? " on" : "")}
      onClick={onClick}
      style={on ? { background: type.color, borderColor: type.color } : {}}
    >
      <span className="dot" style={{ background: on ? "#F2EAD9" : type.color }} />
      {type.name}
    </button>
  );
}

function ViewPill({
  view,
  active,
  onClick,
}: {
  view: ScheduleView;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button className={"view-pill" + (active ? " on" : "")} onClick={onClick}>
      {VIEW_LABELS[view]}
    </button>
  );
}

function ClassCard({
  item,
  day,
  dim,
  type,
}: {
  item: ClassItem;
  day: ScheduleDay;
  dim: boolean;
  type: ClassType;
}) {
  return (
    <div className={"class-card" + (dim ? " dim" : "")} style={{ borderLeftColor: type.color }}>
      <div className="time">{item.time}</div>
      <div className="name">{type.name}</div>
      <a
        className="add-cal"
        href={googleCalendarAddUrl(item, day)}
        target="_blank"
        rel="noopener noreferrer"
        title="Add this class to your Google Calendar"
      >
        + Google Calendar
      </a>
    </div>
  );
}

export function Schedule({ standalone = false }: { standalone?: boolean }) {
  const [view, setView] = useState<ScheduleView>("week");
  const { days, types, source, loading, range, emptyMessage } = useSchedule(view);

  const [active, setActive] = useState<Set<string> | null>(null);
  // Default to all types active; recomputed when the type list changes.
  const allIds = useMemo(() => new Set(types.map((t) => t.id)), [types]);
  const activeSet = active ?? allIds;
  const typeById = useMemo(() => new Map(types.map((t) => [t.id, t])), [types]);
  const hasClasses = days.some((day) => day.items.length > 0);

  const toggle = (id: string) => {
    setActive((prev) => {
      const base = prev ?? allIds;
      const next = new Set(base);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      // never let the user end with an empty filter
      return next.size === 0 ? new Set(allIds) : next;
    });
  };
  const showAll = () => setActive(new Set(allIds));

  return (
    <section className={`schedule${standalone ? " standalone" : ""}`} id="schedule">
      <div className="container-x">
        <div className="schedule-topline">
          <div className="view-row" aria-label="Schedule view">
            {(["day", "week", "month"] as const).map((candidate) => (
              <ViewPill
                key={candidate}
                view={candidate}
                active={view === candidate}
                onClick={() => setView(candidate)}
              />
            ))}
          </div>
          <span className="schedule-range-label">{range.label}</span>
        </div>

        <div className="filter-row">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {types.map((t) => (
              <FilterPill key={t.id} type={t} active={activeSet} onClick={() => toggle(t.id)} />
            ))}
          </div>
          <button className="btn-reset" onClick={showAll}>
            Reset
          </button>
        </div>

        {!loading && !hasClasses ? (
          <div className="schedule-empty">{emptyMessage}</div>
        ) : (
          <div className={`sched-grid sched-grid-${view}`}>
            {days.map((day) => (
              <div className="sched-day" key={day.iso}>
                <div>
                  <div className="day">{day.day}</div>
                  <div className="date">{day.date}</div>
                </div>
                {day.closed ? (
                  <div className="closed">{day.closed}</div>
                ) : day.items.length === 0 ? (
                  <div className="closed">No classes</div>
                ) : (
                  day.items.map((it, index) => (
                    <ClassCard
                      key={`${day.iso}-${it.start ?? it.time}-${it.type}-${index}`}
                      item={it}
                      day={day}
                      dim={!activeSet.has(it.type)}
                      type={typeById.get(it.type) ?? classType(it.type)}
                    />
                  ))
                )}
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            marginTop: 32,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            fontFamily: '"JetBrains Mono"',
            fontSize: 11,
            letterSpacing: ".16em",
            textTransform: "uppercase",
            opacity: 0.55,
          }}
        >
          <span>Dry, clean shoes required on the floor.</span>
          <span className="sched-source">
            {loading
              ? "Syncing calendar…"
              : source === "google"
                ? <>
                    <span className="live">● Live</span> from Google Calendar
                  </>
                : "24/7 access · Member swipe card"}
          </span>
        </div>
      </div>
    </section>
  );
}
