import { Link } from "react-router-dom";
import type { ServiceBlock, ServicePageData } from "../../data/servicePages";
import { ImageSlot } from "../ImageSlot";
import { ImageCarousel } from "../ImageCarousel";
import { ServiceVideo } from "../ServiceVideo";

function serviceImageClass(layout?: ServiceBlock["imageLayout"]) {
  switch (layout) {
    case "wide":
      return " service-image--wide";
    case "circle":
      return " service-image--circle";
    case "tall":
      return " service-image--tall";
    case "fit":
      return " service-image--fit";
    default:
      return "";
  }
}

export function ServiceDetail({ page }: { page: ServicePageData }) {
  return (
    <section className="service-detail standalone">
      <div className="container-x">
        <div className="service-detail-stack">
          {page.blocks.map((block, i) => (
            <article className="service-block" key={i}>
              {block.heading && (
                <h2 className="service-block-title">{block.heading}</h2>
              )}

              {block.paragraphs?.map((p) => (
                <p className="service-block-copy" key={p.slice(0, 24)}>
                  {p}
                </p>
              ))}

              {block.schedule && (
                <ul className="service-schedule">
                  {block.schedule.map((line) => (
                    <li key={line}>
                      <span className="service-schedule-line">{line}</span>
                    </li>
                  ))}
                </ul>
              )}

              {block.hours && (
                <div className="hours-table service-hours">
                  {block.hours.map((row) => (
                    <div className="hours-row" key={row.label}>
                      <span className="lbl">{row.label}</span>
                      <span className="val">{row.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {block.contacts && (
                <ul className="service-contacts">
                  {block.contacts.map((c) => (
                    <li key={c.name}>
                      <span className="service-contact-name">{c.name}</span>
                      {c.note && <span className="service-contact-note">{c.note}</span>}
                      {c.phone && (
                        <a className="service-contact-phone" href={`tel:${c.phone.replace(/\D/g, "")}`}>
                          {c.phone}
                        </a>
                      )}
                      {c.href && (
                        <a
                          className="service-contact-link"
                          href={c.href}
                          target={c.href.startsWith("http") ? "_blank" : undefined}
                          rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                        >
                          {c.hrefLabel ?? c.href}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              {block.links && (
                <div className="service-links">
                  {block.links.map((link) =>
                    link.href.startsWith("/") ? (
                      <Link key={link.label} className="btn btn-ghost" to={link.href}>
                        {link.label} <span className="btn-arrow" />
                      </Link>
                    ) : (
                      <a
                        key={link.label}
                        className="btn btn-ghost"
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noreferrer" : undefined}
                      >
                        {link.label} <span className="btn-arrow" />
                      </a>
                    ),
                  )}
                </div>
              )}

              {block.carousel && block.carousel.length > 0 && (
                <div className="service-carousel">
                  <ImageCarousel slides={block.carousel} variant="service" />
                </div>
              )}

              {block.video && <ServiceVideo {...block.video} />}

              {block.imagePlaceholder && (
                <div className={`service-image${serviceImageClass(block.imageLayout)}`}>
                  <ImageSlot
                    src={block.imageSrc}
                    placeholder={block.imagePlaceholder}
                    alt={block.imageAlt ?? block.heading ?? block.imagePlaceholder}
                    shape={block.imageLayout === "circle" ? "circle" : "rect"}
                    fit={block.imageLayout === "default" ? "cover" : "contain"}
                  />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
