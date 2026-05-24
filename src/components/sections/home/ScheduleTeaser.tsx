import { Link } from "react-router-dom";
import { homeScheduleTeaserRows } from "../../../data/homeScheduleTeaser";

export function ScheduleTeaser() {
  const rows = homeScheduleTeaserRows();

  return (
    <section className="schedule-teaser">
      <div className="container-x">
        <div className="teaser-grid">
          <div>
            <span className="eyebrow">This week on the floor</span>
            <h2 className="section-title" style={{ marginTop: 18 }}>
              Five classes,
              <br />
              <span style={{ color: "var(--red)" }}>one floor.</span>
            </h2>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.6,
                marginTop: 24,
                maxWidth: 460,
                color: "var(--ink-2)",
              }}
            >
              Senior Strong four days a week, Pump and Yoga before sunrise, and
              Yoga Strong on Monday afternoons. Filter the full grid on the
              Schedule page.
            </p>
            <Link
              className="btn btn-primary"
              to="/schedule"
              style={{ marginTop: 24 }}
            >
              Full schedule <span className="btn-arrow" />
            </Link>
          </div>
          <div className="today-list">
            {rows.map((row) => (
              <div
                className="today-row"
                key={row.when}
                style={{ borderLeftColor: row.color }}
              >
                <span className="t-time">{row.when}</span>
                <span className="t-name">{row.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
