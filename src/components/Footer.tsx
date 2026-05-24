import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-x">
        <div className="row">
          <div>
            <div className="brand">
              Bianco's
              <br />
              Fitness Center
            </div>
            <p
              style={{
                opacity: 0.6,
                fontSize: 13,
                lineHeight: 1.6,
                marginTop: 18,
                maxWidth: 300,
              }}
            >
              Premier fitness center of Kingsford, MI. Feel better. Move better.
              Live better.
            </p>
          </div>
          <div>
            <h4>Train</h4>
            <ul>
              <li><Link to="/schedule">Class schedule</Link></li>
              <li><Link to="/about">Programs</Link></li>
              <li><Link to="/services/senior-strong">Senior Strong</Link></li>
              <li><Link to="/services/taekwondo">TaeKwon-Do</Link></li>
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <li><Link to="/services/massage">Massage</Link></li>
              <li><Link to="/services/wellness-way">Wellness Way</Link></li>
              <li><Link to="/about">Our story</Link></li>
              <li><Link to="/photos">The floor</Link></li>
            </ul>
          </div>
          <div>
            <h4>Connect</h4>
            <ul>
              <li><a href="tel:9067791055">906 · 779 · 1055</a></li>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Email us</a></li>
            </ul>
          </div>
        </div>
        <div className="legal">
          <span>© 2026 Bianco's Fitness Center · Est. 1998</span>
          <span>601 S. Westwood Ave. · Kingsford, MI 49802</span>
        </div>
      </div>
    </footer>
  );
}
