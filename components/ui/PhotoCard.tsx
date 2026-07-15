import { assetExists } from "@/lib/asset";

interface PhotoCardProps {
  src?: string;
  alt: string;
  attribution?: string;
  aspectRatio?: "square" | "landscape" | "portrait";
}

const ASPECT: Record<NonNullable<PhotoCardProps["aspectRatio"]>, number> = {
  square: 1,
  landscape: 16 / 9,
  portrait: 3 / 4,
};

export function PhotoCard({
  src,
  alt,
  attribution,
  aspectRatio = "landscape",
}: PhotoCardProps) {
  const ratio = ASPECT[aspectRatio];

  return (
    <figure
      style={{
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-2)",
      }}
    >
      <div
        className="hover-card hover-media"
        style={{
          position: "relative",
          width: "100%",
          paddingBottom: `${(1 / ratio) * 100}%`,
          background: "var(--color-surface-2)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          border: "1px solid var(--color-border)",
        }}
      >
        <div
          role="img"
          aria-label={alt}
          className="img-placeholder"
          data-label={alt}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            borderRadius: 0,
          }}
        />
        {src && assetExists(src) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
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

      {attribution ? (
        <figcaption
          style={{
            fontSize: "var(--text-xs)",
            color: "var(--color-text-faint)",
            lineHeight: "var(--leading-snug)",
          }}
        >
          {attribution}
        </figcaption>
      ) : null}
    </figure>
  );
}
