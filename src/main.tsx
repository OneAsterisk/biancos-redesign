import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { SchedulePage } from "./pages/SchedulePage";
import { PhotosPage } from "./pages/PhotosPage";
import { VisitPage } from "./pages/VisitPage";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/schedule", element: <SchedulePage /> },
      { path: "/photos", element: <PhotosPage /> },
      { path: "/visit", element: <VisitPage /> },
      { path: "*", element: <Home /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
