import { useMemo, useState } from "react";
import { classType, type ClassItem, type ClassType, type ScheduleDay } from "../data/classes";
import { googleCalendarAddUrl } from "../lib/addToCalendar";
import { useSchedule } from "../hooks/useSchedule";

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

function ClassCard({ item, day, dim }: { item: ClassItem; day: ScheduleDay; dim: boolean }) {
  const type = classType(item.type);
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
  const { week, types, source, loading } = useSchedule();

  const [active, setActive] = useState<Set<string> | null>(null);
  // Default to all types active; recomputed when the type list changes.
  const allIds = useMemo(() => new Set(types.map((t) => t.id)), [types]);
  const activeSet = active ?? allIds;

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
        <div className="filter-row" style={{ justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {types.map((t) => (
              <FilterPill key={t.id} type={t} active={activeSet} onClick={() => toggle(t.id)} />
            ))}
          </div>
          <button className="btn-reset" onClick={showAll}>
            Reset
          </button>
        </div>

        <div className="sched-grid">
          {week.map((day) => (
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
                day.items.map((it, i) => (
                  <ClassCard key={i} item={it} day={day} dim={!activeSet.has(it.type)} />
                ))
              )}
            </div>
          ))}
        </div>

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
