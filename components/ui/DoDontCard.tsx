import { assetExists } from "@/lib/asset";

interface DoDontCardProps {
  variant: "do" | "dont";
  caption: string;
  imageLabel: string;
  image?: string;
}

const CONFIG = {
  do: {
    label: "Faça",
    color: "hsl(140 50% 60%)",
    tint: "hsl(140 50% 60% / 0.06)",
    border: "hsl(140 50% 60% / 0.22)",
    icon: (
      <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden="true">
        <path
          d="M1 5l3.5 3.5L11 1"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  dont: {
    label: "Não faça",
    color: "hsl(0 60% 66%)",
    tint: "hsl(0 60% 60% / 0.06)",
    border: "hsl(0 60% 60% / 0.22)",
    icon: (
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
        <path
          d="M1.5 1.5l8 8M9.5 1.5l-8 8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
} as const;

export function DoDontCard({ variant, caption, imageLabel, image }: DoDontCardProps) {
  const cfg = CONFIG[variant];

  return (
    <figure
      className="hover-card"
      style={{
        margin: 0,
        background: cfg.tint,
        border: `1px solid ${cfg.border}`,
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        role="img"
        aria-label={imageLabel}
        className="img-placeholder"
        data-label={imageLabel}
        style={{
          minHeight: 160,
          borderRadius: 0,
          border: "none",
          borderBottom: `1px solid ${cfg.border}`,
          background: "var(--color-surface)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {image && assetExists(image) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={imageLabel}
            loading="lazy"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : null}
      </div>
      <figcaption
        style={{
          padding: "var(--space-4)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-2)",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "var(--space-2)",
            fontSize: "var(--text-xs)",
            fontWeight: 700,
            letterSpacing: "var(--tracking-wide)",
            textTransform: "uppercase",
            color: cfg.color,
          }}
        >
          {cfg.icon}
          {cfg.label}
        </span>
        <span
          style={{
            fontSize: "var(--text-sm)",
            color: "var(--color-text-muted)",
            lineHeight: "var(--leading-snug)",
          }}
        >
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}
