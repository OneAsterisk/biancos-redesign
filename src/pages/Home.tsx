import {
  AboutTeaser,
  CtaStrip,
  HomeHero,
  HomeServicesStrip,
  ScheduleTeaser,
} from "../components/sections/home";

/** Landing page — each block lives in `components/sections/home/`. */
export function Home() {
  return (
    <>
      <HomeHero />
      <AboutTeaser />
      <HomeServicesStrip />
      <ScheduleTeaser />
      <CtaStrip />
    </>
  );
}
