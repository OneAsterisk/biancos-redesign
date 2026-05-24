export function Visit({ standalone = false }: { standalone?: boolean }) {
  return (
    <section className={`visit${standalone ? " standalone" : ""}`} id="visit">
      <div className="container-x">
        <div className="visit-grid">
          <div>
            <h3 className="oswald" style={{ fontWeight: 600, fontSize: 13, opacity: 0.55, margin: "0 0 12px" }}>
              Get in touch
            </h3>
            <p style={{ maxWidth: 480, opacity: 0.88, fontSize: 17, lineHeight: 1.6, margin: 0 }}>
              First class is on the house. Walk in during staffed hours, or book a tour
              and we'll show you the racks, the recovery room, and the chalkboard that
              started it all.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
              <a className="btn btn-primary" href="#">
                Start a membership <span className="btn-arrow" />
              </a>
              <a className="btn btn-ghost" href="#" style={{ color: "var(--cream)", borderColor: "var(--cream)" }}>
                Book a tour
              </a>
            </div>
            <div className="badge247">24/7 access with member swipe card</div>

            <h3 className="oswald" style={{ fontWeight: 600, fontSize: 13, opacity: 0.55, margin: "48px 0 12px" }}>
              Find us
            </h3>
            <div
              style={{
                fontFamily: '"Anton"',
                fontSize: "clamp(36px,5vw,56px)",
                lineHeight: 1,
                textTransform: "uppercase",
                letterSpacing: ".01em",
              }}
            >
              601 S. Westwood Ave.
            </div>
            <div style={{ fontFamily: '"Oswald"', fontSize: 18, letterSpacing: ".04em", marginTop: 6, opacity: 0.85 }}>
              Kingsford, Michigan 49802
            </div>
            <a
              href="tel:9067791055"
              style={{
                textDecoration: "none",
                display: "inline-block",
                marginTop: 24,
                fontFamily: '"Anton"',
                fontSize: 40,
                color: "var(--red)",
                textTransform: "uppercase",
                letterSpacing: ".01em",
              }}
            >
              906 · 779 · 1055
            </a>
          </div>

          <div>
            <h3 className="oswald" style={{ fontWeight: 600, fontSize: 13, opacity: 0.55, margin: "0 0 12px" }}>
              Staffed hours
            </h3>
            <div className="hours-table">
              <div className="hours-row">
                <span className="lbl">Mon — Fri</span>
                <span className="val">7:00 — 12:00</span>
              </div>
              <div className="hours-row">
                <span className="lbl">Mon — Thu</span>
                <span className="val">3:30 — 6:00</span>
              </div>
              <div className="hours-row muted">
                <span className="lbl">Sat — Sun</span>
                <span className="val">Floor open · unstaffed</span>
              </div>
            </div>

            <h3 className="oswald" style={{ fontWeight: 600, fontSize: 13, opacity: 0.55, margin: "48px 0 12px" }}>
              This week on the floor
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                ["Tue · 5:15 AM", "Pump"],
                ["Wed · 5:15 AM", "Yoga"],
                ["Daily · 8:15 AM", "Senior Strong"],
                ["Mon · 4:30 PM", "Yoga Strong"],
              ].map(([t, n]) => (
                <div
                  key={t}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px 0",
                    borderBottom: "1px solid rgba(242,234,217,.1)",
                  }}
                >
                  <span style={{ fontFamily: '"Oswald"', fontSize: 14, letterSpacing: ".08em", textTransform: "uppercase" }}>
                    {t}
                  </span>
                  <span style={{ fontFamily: '"Anton"', fontSize: 20, textTransform: "uppercase", letterSpacing: ".01em" }}>
                    {n}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
