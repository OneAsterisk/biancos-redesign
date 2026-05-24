import { Link } from "react-router-dom";
import { SERVICE_STRIP } from "../../../data/services";

export function HomeServicesStrip() {
  return (
    <section className="services-strip">
      <div className="container-x">
        <div className="strip-head">
          <div>
            <span
              className="eyebrow"
              style={{ color: "var(--cream)", opacity: 0.7 }}
            >
              What we do
            </span>
            <h2
              className="section-title"
              style={{ marginTop: 18, color: "var(--cream)" }}
            >
              Six ways to train.
            </h2>
          </div>
          <Link
            className="btn btn-ghost"
            to="/schedule"
            style={{ color: "var(--cream)", borderColor: "var(--cream)" }}
          >
            See the schedule <span className="btn-arrow" />
          </Link>
        </div>
        <div className="strip-list">
          {SERVICE_STRIP.map(([n, name, when]) => (
            <div className="strip-row" key={n}>
              <span className="strip-num">{n}</span>
              <span className="strip-name">{name}</span>
              <span className="strip-when">{when}</span>
              <span className="strip-arrow">→</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
