# Bianco's Fitness Center — Website

A sleek, heritage-strength redesign for Bianco's Fitness Center (Kingsford, MI,
est. 1998), implemented from the Claude Design handoff bundle.

**Stack:** Vite · React 18 · TypeScript · Tailwind CSS v4 · React Router

- **Palette:** weathered cream `#F2EAD9` · heritage red `#B8302A` · warm black `#161310`
- **Type:** Anton (display) · Oswald (subheads) · DM Sans (body) · JetBrains Mono (eyebrows/stamps)

## Pages

| Route        | Page     | Contents                                                              |
| ------------ | -------- | -------------------------------------------------------------------- |
| `/`          | Home     | Hero + marquee, about teaser, services strip, schedule teaser, CTA   |
| `/about`     | About    | Story header, heritage section with photo carousel, services grid    |
| `/schedule`  | Schedule | Filterable weekly grid + Google Calendar integration (see below)     |
| `/photos`    | Photos   | Asymmetric facility-tour grid                                        |
| `/visit`     | Visit    | Hours, address, phone, this-week classes                            |

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build
```

## Google Calendar integration

The Schedule page supports Google Calendar two ways, both optional:

### 1. Read classes from the gym's calendar (auto-populate the grid)

Staff maintain a Google Calendar of classes; the website reads it and renders
the current Mon–Fri week. "Adding more classes" is just adding events to that
calendar — no code change needed.

**Setup:**

1. Create (or pick) the Google Calendar that holds your classes. Name each
   event after the class — e.g. `Pump`, `Senior Strong`, `Yoga`, `Yoga Strong`.
   Titles are matched (case-insensitively) to the known class types in
   [`src/data/classes.ts`](src/data/classes.ts); unknown titles still appear and
   get their own filter pill.
2. Make the calendar public: **Google Calendar → Settings → [your calendar] →
   Access permissions → "Make available to public" (See all event details).**
3. Copy the **Calendar ID** from **Settings → Integrate calendar**.
4. In [Google Cloud Console](https://console.cloud.google.com/), enable the
   **Google Calendar API** and create an **API key**.
5. Copy `.env.example` to `.env` and fill in:

   ```
   VITE_GOOGLE_CALENDAR_ID=your-calendar-id@group.calendar.google.com
   VITE_GOOGLE_API_KEY=your-api-key
   ```

6. Restart the dev server. The schedule footer shows **● Live from Google
   Calendar** when events are loading from the calendar.

**Fallback:** If the env vars are unset, the request fails, or the week has no
events, the grid falls back to the static schedule in `src/data/classes.ts`
(the printed May 2026 calendar). The UI is identical either way.

> Security note: an API key embedded in a frontend build is publicly visible.
> Restrict it in the Cloud Console to the Calendar API and your site's HTTP
> referrer. The key only grants read access to calendars you've made public.

### 2. "Add to my Google Calendar" links

Every class card has a **+ Google Calendar** link that opens Google Calendar
pre-filled with that class's time, location, and description, so visitors can
save it to their own calendar. This needs no API key and works for both static
and live schedules. See [`src/lib/addToCalendar.ts`](src/lib/addToCalendar.ts).

## Project structure

```
src/
  main.tsx              Router + entry
  App.tsx               Layout (Nav + Outlet + Footer)
  index.css             Tailwind v4 theme tokens, type system, effects
  sections.css          Ported section layout from the design prototype
  components/           Nav, Footer, Hero, Marquee, ImageSlot, PageHeader,
                        HeritageCarousel, Schedule, sections/*
  pages/                Home, About, SchedulePage, PhotosPage, VisitPage
  data/                 classes.ts (class types + static week), services.ts
  lib/                  googleCalendar.ts (read), addToCalendar.ts (add-link)
  hooks/                useSchedule.ts (merges live + static)
```

## Photos / drop-zones

The design uses placeholder "drop-zones" for client-supplied photos. They render
as labeled placeholders via the `ImageSlot` component until you pass a `src`:

- **Home:** logo badge (nav), hero shot, about-teaser photo
- **About:** 5 carousel slides (`src/components/HeritageCarousel.tsx`)
- **Photos:** 6 facility photos (`src/components/sections/Photos.tsx`)

Drop real images into `src/assets/` and set the `src` prop on the relevant slot.

## Notes

- The design tool's "Tweaks / density" authoring panel was intentionally not
  ported — it's an authoring artifact, not a site feature. The density CSS
  tokens remain in `index.css` if you ever want to expose a density switch.
- Coach names, membership pricing, and exact hours were placeholders/derived in
  the design — confirm with the client before launch.
