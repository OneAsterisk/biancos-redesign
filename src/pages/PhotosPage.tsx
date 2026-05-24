import { PageHeader } from "../components/PageHeader";
import { Photos } from "../components/sections/Photos";

export function PhotosPage() {
  return (
    <>
      <PageHeader
        eyebrow="The floor"
        title="Step inside Bianco's."
        redWord="inside"
        intro="A look around the building — racks, machines, cardio deck, and the wall the whole town has chalked on."
      />
      <Photos standalone />
    </>
  );
}
