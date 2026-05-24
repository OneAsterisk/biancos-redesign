import { Link } from "react-router-dom";

export function CtaStrip() {
  return (
    <section className="cta-strip">
      <div className="container-x">
        <div className="cta-grid">
          <h2
            className="display"
            style={{
              fontSize: "clamp(56px, 9vw, 140px)",
              textTransform: "uppercase",
            }}
          >
            First class
            <br />
            is <span style={{ color: "var(--red)" }}>on us.</span>
          </h2>
          <div>
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.55,
                maxWidth: 400,
                margin: 0,
              }}
            >
              Walk in during staffed hours or book a tour. We'll show you the
              racks, the recovery room, and the chalkboard that started it all.
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 24,
                flexWrap: "wrap",
              }}
            >
              <Link className="btn btn-primary" to="/visit">
                Start a membership <span className="btn-arrow" />
              </Link>
              <Link className="btn btn-ghost" to="/photos">
                Tour the floor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
