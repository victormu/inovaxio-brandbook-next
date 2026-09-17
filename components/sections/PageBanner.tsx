import { assetExists } from "@/lib/asset";

interface PageBannerProps {
  /** Número + nome do bloco, ex.: "01 Fundamentos" */
  kicker?: string;
  /** Título grande do banner (vira o h1 da página) */
  title: string;
  /** Linha de apoio abaixo do banner */
  description?: string;
  /**
   * Caminho do banner SEM extensão, ex.: "/assets/banners/fundamentos".
   * O espaço fica aberto: solte um arquivo de imagem OU de vídeo com esse
   * nome e ele aparece automaticamente (detecta o formato pela extensão).
   */
  mediaBase?: string;
}

const VIDEO_EXTS = ["mp4", "webm"] as const;
const IMAGE_EXTS = ["avif", "webp", "jpg", "jpeg", "png"] as const;

type ResolvedMedia = { src: string; kind: "video" | "image" };

// Procura, na ordem, um vídeo e depois uma imagem com o mesmo nome-base.
// Mantém o banner "em aberto": qualquer formato que Victor soltar é aceito.
function resolveMedia(base?: string): ResolvedMedia | null {
  if (!base) return null;
  for (const ext of VIDEO_EXTS) {
    const src = `${base}.${ext}`;
    if (assetExists(src)) return { src, kind: "video" };
  }
  for (const ext of IMAGE_EXTS) {
    const src = `${base}.${ext}`;
    if (assetExists(src)) return { src, kind: "image" };
  }
  return null;
}

export function PageBanner({
  kicker,
  title,
  description,
  mediaBase,
}: PageBannerProps) {
  const media = resolveMedia(mediaBase);
  const hasMedia = media !== null;
  // Kicker do banner desenhado é só o número (ex.: "03"); o nome vive no título.
  const kickerNum = kicker ? kicker.trim().split(/\s+/)[0] : null;

  return (
    <header style={{ marginBottom: "var(--space-12)" }}>
      <div
        className="page-hero ctx-dark"
        style={hasMedia ? { background: "#000" } : undefined}
      >
        {hasMedia ? (
          media.kind === "video" ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            >
              <source src={media.src} />
            </video>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={media.src}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          )
        ) : null}

        {/* Scrim: garante legibilidade do título sobre qualquer mídia. */}
        {hasMedia ? (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.86) 0%, rgba(0,0,0,0.18) 56%, transparent 100%)",
            }}
          />
        ) : null}

        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "var(--content-max)",
            padding: "clamp(var(--space-8), 5vw, var(--space-16))",
          }}
        >
          {kickerNum ? (
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "var(--text-xl)",
                color: "var(--color-text)",
                marginBottom: "var(--space-2)",
              }}
            >
              {kickerNum}
            </div>
          ) : null}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "var(--text-5xl)",
              lineHeight: 1.06,
              letterSpacing: "var(--tracking-tight)",
              margin: 0,
              maxWidth: "18ch",
              // Título branco sólido sobre a banda navy (o gradiente da marca
              // é preenchimento de superfície, nunca texto).
              color: "var(--color-text)",
            }}
          >
            {title}
          </h1>
        </div>
      </div>

      {description ? (
        <p
          style={{
            fontSize: "var(--text-lg)",
            color: "var(--color-text-muted)",
            lineHeight: "var(--leading-relaxed)",
            maxWidth: "62ch",
            marginTop: "var(--space-6)",
          }}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
