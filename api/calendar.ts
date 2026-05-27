declare const process: {
  env: {
    GOOGLE_CALENDAR_ICAL_URL?: string;
  };
};

interface CalendarRequest {
  method?: string;
}

interface CalendarResponse {
  setHeader(name: string, value: string): void;
  status(code: number): CalendarResponse;
  json(body: { error: string }): void;
  send(body: string): void;
  end(): void;
}

const CALENDAR_ICAL_URL = process.env.GOOGLE_CALENDAR_ICAL_URL;
const ALLOWED_METHODS = ["GET", "HEAD", "OPTIONS"];

export default async function handler(req: CalendarRequest, res: CalendarResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", ALLOWED_METHODS.join(", "));
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (!req.method || !ALLOWED_METHODS.includes(req.method)) {
    res.setHeader("Allow", ALLOWED_METHODS.join(", "));
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!CALENDAR_ICAL_URL) {
    res.status(500).json({ error: "GOOGLE_CALENDAR_ICAL_URL is not configured" });
    return;
  }

  let upstream: Awaited<ReturnType<typeof fetch>>;
  try {
    upstream = await fetch(CALENDAR_ICAL_URL, {
      headers: { Accept: "text/calendar, text/plain;q=0.9, */*;q=0.8" },
    });
  } catch {
    res.status(502).json({ error: "Calendar feed request failed" });
    return;
  }

  if (!upstream.ok) {
    res.status(upstream.status).json({ error: "Calendar feed request failed" });
    return;
  }

  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
  res.setHeader("Content-Type", upstream.headers.get("content-type") ?? "text/calendar; charset=utf-8");

  if (req.method === "HEAD") {
    res.status(204).end();
    return;
  }

  res.status(200).send(await upstream.text());
}
