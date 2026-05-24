import { Fragment, type ReactNode } from "react";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  /** A substring of `title` to highlight in heritage red. */
  redWord?: string;
  intro?: ReactNode;
}

export function PageHeader({ eyebrow, title, redWord, intro }: PageHeaderProps) {
  const renderTitle = () => {
    if (!redWord) return title;
    const idx = title.indexOf(redWord);
    if (idx < 0) return title;
    return (
      <Fragment>
        {title.slice(0, idx)}
        <span style={{ color: "var(--red)" }}>{redWord}</span>
        {title.slice(idx + redWord.length)}
      </Fragment>
    );
  };

  return (
    <section className="page-header" id="top">
      <div className="container-x">
        <div className="page-header-grid">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h1 className="display page-h1" style={{ marginTop: 18 }}>
              {renderTitle()}
            </h1>
          </div>
          {intro && <p className="page-intro">{intro}</p>}
        </div>
      </div>
    </section>
  );
}
