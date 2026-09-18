import { assetExists } from "@/lib/asset";

interface DownloadCardProps {
  name: string;
  description: string;
  format: string;
  size?: string;
  href: string;
  preview?: React.ReactNode;
}

export function DownloadCard({
  name,
  description,
  format,
  size,
  href,
  preview,
}: DownloadCardProps) {
  // Rotas geradas (ex: /assets/tokens.css) não existem em public/, mas são
  // servidas. Só checamos o disco para os arquivos que deveriam estar lá.
  const isRoute = href === "/assets/tokens.css";
  const disponivel = isRoute || assetExists(href);

  return (
    <div
      className="card-elev"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          background: "var(--color-surface-2)",
          height: 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid var(--color-border)",
          overflow: "hidden",
        }}
      >
        {preview ? (
          preview
        ) : (
          <div
            style={{
              fontFamily: "monospace",
              fontWeight: 600,
              fontSize: "var(--text-2xl)",
              color: "var(--color-text-faint)",
              letterSpacing: "-0.02em",
            }}
          >
            .{format.toLowerCase()}
          </div>
        )}
      </div>

      <div
        style={{
          padding: "var(--space-4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "var(--space-3)",
        }}
      >
        <div>
          <div
            style={{
              fontWeight: 600,
              fontSize: "var(--text-sm)",
              color: "var(--color-text)",
              marginBottom: 2,
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: "var(--text-xs)",
              color: "var(--color-text-faint)",
            }}
          >
            {description}
          </div>
          <div
            style={{
              marginTop: "var(--space-1)",
              display: "flex",
              gap: "var(--space-2)",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "var(--text-xs)",
                padding: "1px var(--space-2)",
                background: "var(--color-surface-2)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)",
                color: "var(--color-text-faint)",
                fontFamily: "monospace",
              }}
            >
              {format}
            </span>
            {size ? (
              <span
                style={{
                  fontSize: "var(--text-xs)",
                  color: "var(--color-text-faint)",
                }}
              >
                {size}
              </span>
            ) : null}
          </div>
        </div>

        {disponivel ? (
        <a
          href={href}
          download
          aria-label={`Baixar ${name}`}
          className="download-btn"
          style={{
            flexShrink: 0,
            padding: "var(--space-2) var(--space-4)",
            background: "var(--color-primary)",
            color: "var(--color-on-primary)",
            borderRadius: "var(--radius-md)",
            fontSize: "var(--text-xs)",
            fontWeight: 600,
            textDecoration: "none",
            transition:
              "filter var(--duration-fast) var(--ease-out), box-shadow var(--duration-fast) var(--ease-out), transform var(--duration-fast) var(--ease-out)",
          }}
        >
          Baixar
        </a>
        ) : (
          <span
            title="Arquivo ainda não inserido em public/assets"
            style={{
              flexShrink: 0,
              padding: "var(--space-2) var(--space-4)",
              background: "var(--color-surface-2)",
              color: "var(--color-text-faint)",
              border: "1px dashed var(--color-border-strong)",
              borderRadius: "var(--radius-md)",
              fontSize: "var(--text-caption)",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            Em breve
          </span>
        )}
      </div>
    </div>
  );
}
