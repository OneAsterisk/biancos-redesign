import { HeritageCarousel } from "../HeritageCarousel";

export function Heritage() {
  return (
    <section className="heritage grain" id="about">
      <div className="container-x">
        <div className="heritage-grid">
          <div>
            <span className="eyebrow">Est. 1998 · Kingsford, MI</span>
            <h2 className="section-title" style={{ marginTop: 18 }}>
              A hometown gym,
              <br />
              <span style={{ color: "var(--red)" }}>twenty-eight</span> years strong.
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
              We're not a chain. We're the building on Westwood with the lights on at
              4:45 a.m. and the chalkboard out front. Three generations of Kingsford
              have walked through our doors — folks training for a 5K, grandparents
              keeping up with the grandkids, kids earning their first yellow belt.
              That's the job. <em>Feel better. Move better. Live better.</em>
            </p>

            <div className="stats">
              <div>
                <b>28</b>
                <span className="mono" style={{ marginTop: 8, display: "block", opacity: 0.7 }}>
                  Years open
                </span>
              </div>
              <div>
                <b>24/7</b>
                <span className="mono" style={{ marginTop: 8, display: "block", opacity: 0.7 }}>
                  Member access
                </span>
              </div>
              <div>
                <b>5</b>
                <span className="mono" style={{ marginTop: 8, display: "block", opacity: 0.7 }}>
                  Class formats
                </span>
              </div>
            </div>
          </div>

          <div className="heritage-photo">
            <div className="ribbon">Inside the building</div>
            <HeritageCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
