import { Link } from "react-router-dom";
import { Hero } from "../components/Hero";
import { ImageSlot } from "../components/ImageSlot";
import { SERVICE_STRIP } from "../data/services";

const TEASER_CLASSES: { t: string; n: string; color: string }[] = [
  { t: "Tue · 5:15 AM", n: "Pump", color: "#E8A33C" },
  { t: "Wed · 5:15 AM", n: "Yoga", color: "#5E8A6B" },
  { t: "Daily · 8:15 AM", n: "Senior Strong", color: "#B8302A" },
  { t: "Mon · 4:30 PM", n: "Yoga Strong", color: "#7A5AE0" },
];

export function Home() {
  return (
    <>
      <Hero />

      {/* About teaser */}
      <section className="heritage grain">
        <div className="container-x">
          <div className="teaser-grid">
            <div>
              <span className="eyebrow">About</span>
              <h2 className="section-title" style={{ marginTop: 18 }}>
                A hometown gym,
                <br />
                <span style={{ color: "var(--red)" }}>twenty-eight</span> years
                strong.
              </h2>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.65,
                  marginTop: 28,
                  maxWidth: 560,
                  color: "var(--ink-2)",
                }}
              >
                We're not a chain. We are a locally owned and operated gym. We
                have been in the community since 1998. We value community,
                quality, and consistency. We are proud to be a part of the
                community and to provide a space for people to come together and
                get strong.
              </p>
              <Link
                className="btn btn-ghost"
                to="/about"
                style={{ marginTop: 28 }}
              >
                Read our story <span className="btn-arrow" />
              </Link>
            </div>
            <div className="teaser-photo">
              <ImageSlot placeholder="Drop in: a candid photo of the gym floor or owners" />
            </div>
          </div>
        </div>
      </section>

      {/* Services strip */}
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

      {/* Schedule teaser */}
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
                Senior Strong four days a week, Pump and Yoga before sunrise,
                and Yoga Strong on Monday afternoons. Filter the full grid on
                the Schedule page.
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
              {TEASER_CLASSES.map((c, i) => (
                <div
                  className="today-row"
                  key={i}
                  style={{ borderLeftColor: c.color }}
                >
                  <span className="t-time">{c.t}</span>
                  <span className="t-name">{c.n}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA strip */}
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
                racks, the recovery room, and the chalkboard that started it
                all.
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
    </>
  );
}
