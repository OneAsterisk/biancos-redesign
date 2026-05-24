import { SERVICES } from "../../data/services";

export function Services() {
  return (
    <section className="services" id="services">
      <div className="container-x">
        <div className="svc-head">
          <div>
            <span className="eyebrow">What we do</span>
            <h2 className="section-title" style={{ marginTop: 18 }}>
              Train, recover,
              <br />
              repeat — <span style={{ color: "var(--red)" }}>your way.</span>
            </h2>
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--ink-2)", margin: 0 }}>
            Pick a class, walk on the floor at 2 a.m., or book a massage on the way
            out. Six ways to train under one roof — same membership covers all of it.
          </p>
        </div>

        <div className="svc-grid">
          {SERVICES.map((s) => (
            <div className="svc-card" key={s.num}>
              <div className="flex" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="svc-num">{s.num} / 06</span>
                <span className="chip">{s.tag}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.copy}</p>
              <div className="svc-foot">
                <span>Learn more</span>
                <span className="svc-arrow">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
