import { useEffect, useId, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { SERVICE_NAV_LINKS } from "../data/servicePages";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/schedule", label: "Schedule" },
  { to: "/photos", label: "Photos" },
  { to: "/visit", label: "Visit" },
] as const;

function useServicesActive() {
  const { pathname } = useLocation();
  return pathname.startsWith("/services/");
}

export function Nav() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesActive = useServicesActive();
  const menuId = useId();
  const mobileMenuId = useId();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!servicesOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [servicesOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`nav-pill${scrolled ? " scrolled" : ""}${mobileOpen ? " menu-open" : ""}`}
      >
        <Link to="/" className="nav-brand" style={{ textDecoration: "none" }}>
          <span className="nav-bullet" />
          Bianco's
        </Link>

        <div className="nav-links">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={"end" in l ? l.end : undefined}
              className={({ isActive }) => (isActive ? "on" : "")}
            >
              {l.label}
            </NavLink>
          ))}

          <div
            className={`nav-dropdown${servicesOpen ? " open" : ""}`}
            ref={dropdownRef}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className={`nav-dropdown-trigger${servicesActive ? " on" : ""}`}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              aria-controls={menuId}
              onClick={() => setServicesOpen((o) => !o)}
            >
              Services
              <span className="nav-dropdown-caret" aria-hidden />
            </button>
            <div className="nav-dropdown-menu" id={menuId} role="menu">
              {SERVICE_NAV_LINKS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  role="menuitem"
                  className={({ isActive }) => (isActive ? "on" : "")}
                  onClick={() => setServicesOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          <Link to="/visit" className="cta">
            Join
          </Link>
        </div>

        <div className="nav-mobile-actions">
          <Link to="/visit" className="cta nav-cta-compact" onClick={closeMobile}>
            Join
          </Link>
          <button
            type="button"
            className={`nav-toggle${mobileOpen ? " open" : ""}`}
            aria-expanded={mobileOpen}
            aria-controls={mobileMenuId}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
          </button>
        </div>
      </nav>

      <div
        className={`nav-mobile${mobileOpen ? " open" : ""}`}
        aria-hidden={!mobileOpen}
        id={mobileMenuId}
      >
        <button
          type="button"
          className="nav-mobile-backdrop"
          aria-label="Close menu"
          tabIndex={mobileOpen ? 0 : -1}
          onClick={closeMobile}
        />
        <div className="nav-mobile-panel" role="dialog" aria-modal="true" aria-label="Site navigation">
          <p className="nav-mobile-label">Menu</p>
          <nav className="nav-mobile-links" aria-label="Primary">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={"end" in l ? l.end : undefined}
                className={({ isActive }) => (isActive ? "on" : "")}
                onClick={closeMobile}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav-mobile-services">
            <button
              type="button"
              className={`nav-mobile-services-trigger${servicesActive ? " on" : ""}`}
              aria-expanded={mobileServicesOpen}
              onClick={() => setMobileServicesOpen((o) => !o)}
            >
              Services
              <span className="nav-dropdown-caret" aria-hidden />
            </button>
            <div className={`nav-mobile-services-list${mobileServicesOpen ? " open" : ""}`}>
              {SERVICE_NAV_LINKS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => (isActive ? "on" : "")}
                  onClick={closeMobile}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          <Link to="/visit" className="btn btn-primary nav-mobile-join" onClick={closeMobile}>
            Start a membership <span className="btn-arrow" />
          </Link>
        </div>
      </div>
    </>
  );
}
