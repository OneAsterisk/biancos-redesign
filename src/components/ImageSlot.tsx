// Production stand-in for the design's <image-slot> drop-zones.
// Renders a real photo when `src` is provided; otherwise a warm placeholder
// with the slot's label so it's clear what photo belongs there.

interface ImageSlotProps {
  src?: string;
  /** Smaller modern format; rendered inside <picture> when set. */
  webpSrc?: string;
  alt?: string;
  placeholder: string;
  shape?: "rect" | "circle";
  fit?: "cover" | "contain";
  className?: string;
  width?: number;
  height?: number;
  /** Set on above-the-fold / LCP images. */
  priority?: boolean;
}

export function ImageSlot({
  src,
  webpSrc,
  alt,
  placeholder,
  shape = "rect",
  fit = "cover",
  className = "",
  width,
  height,
  priority = false,
}: ImageSlotProps) {
  const radius = shape === "circle" ? "rounded-full" : "";
  const objectFit = fit === "contain" ? "object-contain" : "object-cover";
  const imgClass = `h-full w-full ${objectFit} ${radius} ${className}`;
  const imgProps = {
    alt: alt ?? placeholder,
    className: imgClass,
    width,
    height,
    decoding: priority ? ("sync" as const) : ("async" as const),
    fetchpriority: priority ? ("high" as const) : undefined,
    loading: priority ? ("eager" as const) : ("lazy" as const),
  };

  if (src) {
    if (webpSrc) {
      return (
        <picture className="block h-full w-full">
          <source srcSet={webpSrc} type="image/webp" />
          <img src={src} {...imgProps} />
        </picture>
      );
    }

    return <img src={src} {...imgProps} />;
  }

  return (
    <div
      className={`flex h-full w-full items-center justify-center ${radius} ${className}`}
      style={{
        background: "var(--color-cream-3)",
        border: "1px dashed rgba(22,19,16,.25)",
      }}
      role="img"
      aria-label={placeholder}
    >
      <span
        className="mono px-3 text-center"
        style={{ color: "var(--color-muted)", fontSize: 10, lineHeight: 1.5 }}
      >
        {placeholder}
      </span>
    </div>
  );
}
