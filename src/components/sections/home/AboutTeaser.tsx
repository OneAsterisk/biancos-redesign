import { Link } from "react-router-dom";
import { ImageSlot } from "../../ImageSlot";
import { ASSETS, IMAGE_PLACEHOLDERS } from "../../../data/assets";

export function AboutTeaser() {
  return (
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
            <ImageSlot
              src={ASSETS.building}
              webpSrc={ASSETS.buildingWebp}
              placeholder={IMAGE_PLACEHOLDERS.homeAboutTeaser}
              width={1024}
              height={726}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
