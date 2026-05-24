import { FacilityMasonry } from "../FacilityMasonry";

export function Photos({ standalone = false }: { standalone?: boolean }) {
  return (
    <section className={`photos grain${standalone ? " standalone" : ""}`} id="photos">
      <p className="container-x photos-hint">Scroll to explore →</p>
      <FacilityMasonry />
    </section>
  );
}
