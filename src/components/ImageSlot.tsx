// Production stand-in for the design's <image-slot> drop-zones.
// Renders a real photo when `src` is provided; otherwise a warm placeholder
// with the slot's label so it's clear what photo belongs there.

interface ImageSlotProps {
  src?: string;
  alt?: string;
  placeholder: string;
  shape?: "rect" | "circle";
  className?: string;
}

export function ImageSlot({
  src,
  alt,
  placeholder,
  shape = "rect",
  className = "",
}: ImageSlotProps) {
  const radius = shape === "circle" ? "rounded-full" : "";

  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? placeholder}
        className={`h-full w-full object-cover ${radius} ${className}`}
      />
    );
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
