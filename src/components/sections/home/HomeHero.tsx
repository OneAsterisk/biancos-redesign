import { Link } from "react-router-dom";
import { ImageSlot } from "../../ImageSlot";
import { Marquee } from "../../Marquee";
import { ASSETS, IMAGE_PLACEHOLDERS } from "../../../data/assets";

export function HomeHero() {
  return (
    <section className="hero" id="top">
      <div className="container-x">
        <div
          className="flex"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 32,
            position: "relative",
            zIndex: 2,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 64, height: 64, flex: "0 0 64px" }}>
              <ImageSlot placeholder={IMAGE_PLACEHOLDERS.logo} shape="circle" />
            </div>
            <div className="stack-tight">
              <div className="mono" style={{ color: "var(--ink-3)" }}>
                Kingsford · Michigan
              </div>
              <div className="oswald" style={{ fontSize: 14, fontWeight: 600 }}>
                Feel Better · Move Better · Live Better
              </div>
            </div>
          </div>
          <div
            className="flex"
            style={{ display: "flex", gap: 24, alignItems: "center" }}
          >
            <span className="mono" style={{ color: "var(--ink-3)" }}>
              Est. 1998
            </span>
            <span className="chip chip-red">24/7 open floor</span>
          </div>
        </div>

        <div className="rule" />

        <div className="hero-grid" style={{ paddingTop: 56 }}>
          <h1 className="display" style={{ fontSize: "var(--hero-headline)" }}>
            Train where
            <br />
            <span className="red">Kingsford</span> trains.
            <br />
            <span className="text-stroke-ink">Since 1998.</span>
          </h1>

          <div className="hero-meta">
            <div>
              <span className="mono" style={{ color: "var(--ink-3)" }}>
                (01) The pitch
              </span>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.55,
                  margin: "12px 0 0",
                  maxWidth: 380,
                }}
              >
                A real gym for the Upper Peninsula. Strength, classes, recovery,
                and a 24/7 floor — run by the same family since '98.
              </p>
            </div>
            <div>
              <span className="mono" style={{ color: "var(--ink-3)" }}>
                (02) Get in
              </span>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  marginTop: 14,
                  flexWrap: "wrap",
                }}
              >
                <Link className="btn btn-primary" to="/visit">
                  Become a member <span className="btn-arrow" />
                </Link>
                <Link className="btn btn-ghost" to="/schedule">
                  See classes
                </Link>
              </div>
            </div>
            <div>
              <span className="mono" style={{ color: "var(--ink-3)" }}>
                (03) This week
              </span>
              <div
                style={{
                  fontFamily: '"Anton"',
                  fontSize: 32,
                  lineHeight: 1,
                  marginTop: 12,
                  textTransform: "uppercase",
                }}
              >
                5:15 Pump
                <br />
                <span style={{ color: "var(--red)" }}>8:15 Senior Strong</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-photo">
          <div className="hero-stamp">
            <small>Bianco's · Est.</small>
            <b>1998</b>
            <em>Feel · Move · Live</em>
          </div>
          <ImageSlot
            src={ASSETS.building}
            placeholder={IMAGE_PLACEHOLDERS.homeHero}
          />
        </div>
      </div>

      <Marquee />
    </section>
  );
}
