import { Link, useParams } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { ServiceDetail } from "../components/sections/ServiceDetail";
import { getServicePage } from "../data/servicePages";

export function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const page = getServicePage(slug);

  if (!page) {
    return (
      <>
        <PageHeader
          eyebrow="Services"
          title="Page not found."
          redWord="found"
          intro="That program isn't listed here. Pick a service from the menu or head back home."
        />
        <section className="service-detail standalone">
          <div className="container-x">
            <Link className="btn btn-primary" to="/">
              Back to home <span className="btn-arrow" />
            </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow={page.eyebrow}
        title={page.title}
        redWord={page.redWord}
        intro={page.intro}
      />
      <ServiceDetail page={page} />
    </>
  );
}
