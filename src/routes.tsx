import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Home } from "./pages/Home";

const About = lazy(() =>
  import("./pages/About").then((m) => ({ default: m.About })),
);
const SchedulePage = lazy(() =>
  import("./pages/SchedulePage").then((m) => ({ default: m.SchedulePage })),
);
const PhotosPage = lazy(() =>
  import("./pages/PhotosPage").then((m) => ({ default: m.PhotosPage })),
);
const VisitPage = lazy(() =>
  import("./pages/VisitPage").then((m) => ({ default: m.VisitPage })),
);
const ServicePage = lazy(() =>
  import("./pages/ServicePage").then((m) => ({ default: m.ServicePage })),
);
const NotFound = lazy(() =>
  import("./pages/NotFound").then((m) => ({ default: m.NotFound })),
);

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/schedule", element: <SchedulePage /> },
      { path: "/photos", element: <PhotosPage /> },
      { path: "/visit", element: <VisitPage /> },
      { path: "/services/:slug", element: <ServicePage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
