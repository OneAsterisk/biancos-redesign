import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";

/** Reset scroll position when navigating between pages. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}
