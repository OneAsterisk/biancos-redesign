import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const calendarUrl = env.GOOGLE_CALENDAR_ICAL_URL;

  return {
    plugins: [react(), tailwindcss()],
    server: calendarUrl
      ? {
          proxy: {
            "/api/calendar": {
              target: new URL(calendarUrl).origin,
              changeOrigin: true,
              rewrite: () => {
                const url = new URL(calendarUrl);
                return `${url.pathname}${url.search}`;
              },
            },
          },
        }
      : undefined,
  };
});
