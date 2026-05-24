import { Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";

export function NotFound() {
  return (
    <>
      <PageHeader
        eyebrow="404"
        title="Page not found."
        redWord="found"
        intro="That route isn't on the floor plan. Head back to the home page or pick a section below."
      />
      <section className="heritage grain">
        <div className="container-x" style={{ paddingBottom: 80 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link className="btn btn-primary" to="/">
              Home <span className="btn-arrow" />
            </Link>
            <Link className="btn btn-ghost" to="/schedule">
              Schedule
            </Link>
            <Link className="btn btn-ghost" to="/visit">
              Visit
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
