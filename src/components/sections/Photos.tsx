import { ImageSlot } from "../ImageSlot";
import { FACILITY_PHOTOS } from "../../data/photos";

export function Photos({ standalone = false }: { standalone?: boolean }) {
  return (
    <section className={`photos grain${standalone ? " standalone" : ""}`} id="photos">
      <div className="container-x">
        <div className="photo-grid">
          {FACILITY_PHOTOS.map((p) => (
            <div className={p.cls} key={p.id}>
              <ImageSlot src={p.src} placeholder={p.placeholder} alt={p.label} />
              <span className="photo-label">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
