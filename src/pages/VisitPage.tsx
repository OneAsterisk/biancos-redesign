import { PageHeader } from "../components/PageHeader";
import { Visit } from "../components/sections/Visit";

export function VisitPage() {
  return (
    <>
      <PageHeader
        eyebrow="Plan your visit"
        title="Come by. We're open."
        redWord="open"
        intro="601 S. Westwood Ave., Kingsford, MI. Staffed mornings and afternoons; member access 24/7."
      />
      <Visit standalone />
    </>
  );
}
