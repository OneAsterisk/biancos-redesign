import { PageHeader } from "../components/PageHeader";
import { Schedule } from "../components/Schedule";

export function SchedulePage() {
  return (
    <>
      <PageHeader
        eyebrow="Class schedule"
        title="This week on the floor."
        redWord="week"
        intro="Five class formats, one schedule. Tap a pill to filter, add any class to your own Google Calendar — or come anytime; the floor is open 24/7 with a swipe card."
      />
      <Schedule standalone />
    </>
  );
}
