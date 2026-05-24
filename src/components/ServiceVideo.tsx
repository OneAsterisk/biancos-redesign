interface ServiceVideoProps {
  title?: string;
  youtubeId?: string;
  src?: string;
  placeholder?: string;
}

export function ServiceVideo({ title, youtubeId, src, placeholder }: ServiceVideoProps) {
  const heading = title ?? "Watch";

  if (youtubeId) {
    return (
      <div className="service-video-wrap">
        <h3 className="service-video-title">{heading}</h3>
        <div className="service-video">
          <iframe
            title={heading}
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  if (src) {
    return (
      <div className="service-video-wrap">
        <h3 className="service-video-title">{heading}</h3>
        <div className="service-video">
          <video controls playsInline preload="metadata" src={src}>
            <track kind="captions" />
          </video>
        </div>
      </div>
    );
  }

  return (
    <div className="service-video-wrap">
      <h3 className="service-video-title">{heading}</h3>
      <div className="service-video service-video--placeholder" role="img" aria-label={placeholder}>
        <span className="mono" style={{ color: "var(--ink-3)", fontSize: 10, lineHeight: 1.5, padding: "0 24px", textAlign: "center" }}>
          {placeholder}
        </span>
      </div>
    </div>
  );
}
