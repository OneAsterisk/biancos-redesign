import { PageHeader } from "../components/PageHeader";
import { Heritage } from "../components/sections/Heritage";
import { Services } from "../components/sections/Services";

export function About() {
  return (
    <>
      <PageHeader
        eyebrow="About · Est. 1998"
        title="The story behind the racks."
        redWord="story"
        intro="Three generations of Kingsford have walked through our doors. Here's how we got here, who runs the place, and what we mean when we say feel better, move better, live better."
      />
      <Heritage />
      <Services />
    </>
  );
}
