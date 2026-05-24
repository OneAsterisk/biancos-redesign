export function Marquee() {
  return (
    <div
      className="overflow-hidden whitespace-nowrap py-[18px]"
      style={{
        background: "var(--color-ink)",
        color: "var(--color-cream)",
        borderTop: "1px solid var(--color-ink)",
        borderBottom: "1px solid var(--color-ink)",
        marginTop: "var(--gap-md)",
      }}
    >
      <div className="marquee-track">
        {[0, 1].map((n) => (
          <span key={n}>
            Feel Better <Dot />
            Move Better <Dot />
            Live Better <Dot />
            Est. 1998 <Dot />
            Kingsford, MI <Dot />
            601 S. Westwood Ave <Dot />
          </span>
        ))}
      </div>
    </div>
  );
}

function Dot() {
  return (
    <span
      className="inline-block h-[10px] w-[10px] rounded-full"
      style={{ background: "var(--color-red)" }}
    />
  );
}
