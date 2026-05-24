import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/schedule", label: "Schedule" },
  { to: "/photos", label: "Photos" },
  { to: "/visit", label: "Visit" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav-pill${scrolled ? " scrolled" : ""}`}>
      <Link to="/" className="nav-brand" style={{ textDecoration: "none" }}>
        <span className="nav-bullet" />
        Bianco's
      </Link>
      <div className="nav-links">
        {LINKS.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) => (isActive ? "on" : "")}
          >
            {l.label}
          </NavLink>
        ))}
        <Link to="/visit" className="cta">
          Join
        </Link>
      </div>
    </nav>
  );
}
