import { Panel } from "@/components/manual/Panel";
import { DoDontCard } from "@/components/ui/DoDontCard";
import { assetExists } from "@/lib/asset";

const LOGO_DONTS = [
  "Não distorcer nem esticar o logo.",
  "Não recolorir fora da paleta oficial.",
  "Não rotacionar.",
  "Não aplicar sombra, brilho ou efeito.",
  "Não usar sobre fundo de baixo contraste.",
  "Não recriar com outra fonte ou contorno.",
];

const LOGO_VERSIONS = [
  { label: "Assinatura cor", src: "/assets/logo/inovaxio-horizontal-cor.svg", bg: "#0d0d0d" },
  { label: "Negativa (branco)", src: "/assets/logo/inovaxio-horizontal-branco.svg", bg: "#0d0d0d" },
  { label: "Símbolo", src: "/assets/logo/simbolo-cor.svg", bg: "#ffffff" },
  { label: "Monocromático (preto)", src: "/assets/logo/inovaxio-horizontal-preto.svg", bg: "#ffffff" },
];

function LogoImage({
  src,
  alt,
  bg,
  minHeight,
  className,
}: {
  src: string;
  alt: string;
  bg: string;
  minHeight: number;
  className?: string;
}) {
  const hasImage = assetExists(src);
  const rootClass = [hasImage ? undefined : "img-placeholder", className]
    .filter(Boolean)
    .join(" ");
  return (
    <div
      // Com imagem: container limpo (sem rótulo nem borda tracejada), só o
      // fundo do logo e cantos arredondados. Sem imagem: mantém o placeholder
      // "IMG -- ..." marcando o espaço a preencher.
      className={rootClass || undefined}
      data-label={hasImage ? undefined : `IMG -- ${alt}`}
      style={{
        minHeight,
        position: "relative",
        overflow: "hidden",
        ...(hasImage
          ? {
              background: bg,
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)",
            }
          : {}),
      }}
    >
      {hasImage ? (
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
            objectFit: "contain",
            padding: "var(--space-6)",
          }}
        />
      ) : null}
    </div>
  );
}

const LOGO_CONSTRUCTION = [
  { label: "Grid de construção", src: "/assets/logo/construcao-grid.png" },
  { label: "Proporção áurea", src: "/assets/logo/construcao-aurea.png" },
];

export function LogoSection() {
  return (
    <Panel
      id="logo"
      index="01 / 06"
      title="Logo"
      band="dark"
      lead="O símbolo é a âncora visual da marca. Use sempre os arquivos originais, sem recolorização, distorção ou efeitos adicionais."
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-10)",
        }}
      >
        <LogoImage
          src="/assets/logo/inovaxio-vertical-cor.svg"
          alt="Assinatura principal Inovaxio"
          bg="#0d0d0d"
          minHeight={280}
          className="hover-media"
        />

        <div>
          <p
            className="label"
            style={{ fontFamily: "var(--font-body)", marginBottom: "var(--space-4)" }}
          >
            Versões
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "var(--space-3)",
            }}
          >
            {LOGO_VERSIONS.map((v) => (
              <div key={v.label}>
                <LogoImage src={v.src} alt={v.label} bg={v.bg} minHeight={130} className="hover-card hover-media" />
                <p
                  style={{
                    fontSize: "var(--text-xs)",
                    color: "var(--color-text-faint)",
                    marginTop: "var(--space-2)",
                  }}
                >
                  {v.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p
            className="label"
            style={{ fontFamily: "var(--font-body)", marginBottom: "var(--space-4)" }}
          >
            Construção
          </p>
          <div
            className="stack-mobile"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--space-3)",
            }}
          >
            {LOGO_CONSTRUCTION.map((c) => (
              <LogoImage
                key={c.label}
                src={c.src}
                alt={c.label}
                bg="#1a1a1a"
                minHeight={220}
                className="hover-card hover-media"
              />
            ))}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "var(--space-6)",
          }}
        >
          <div>
            <p
              className="label"
              style={{ fontFamily: "var(--font-body)", marginBottom: "var(--space-3)" }}
            >
              Área de proteção
            </p>
            <div style={{ marginBottom: "var(--space-3)" }}>
              <LogoImage
                src="/assets/logo/area-protecao.png"
                alt="Área de proteção"
                bg="#1a1a1a"
                minHeight={220}
                className="hover-card hover-media"
              />
            </div>
            <p
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-text-muted)",
                lineHeight: "var(--leading-relaxed)",
              }}
            >
              Mantenha ao redor do logo um espaço livre igual à metade da altura
              do símbolo em todos os lados. Nenhum elemento invade essa área.
            </p>
          </div>
          <div>
            <p
              className="label"
              style={{ fontFamily: "var(--font-body)", marginBottom: "var(--space-3)" }}
            >
              Tamanho mínimo
            </p>
            <p
              style={{
                fontSize: "var(--text-sm)",
                color: "var(--color-text-muted)",
                lineHeight: "var(--leading-relaxed)",
              }}
            >
              Símbolo: 24px (digital) ou 10mm (impresso). Assinatura completa:
              120px ou 25mm. Abaixo disso perde legibilidade.
            </p>
          </div>
        </div>

        <div>
          <p
            className="label"
            style={{ fontFamily: "var(--font-body)", marginBottom: "var(--space-4)" }}
          >
            Proibições
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "var(--space-3)",
            }}
          >
            {LOGO_DONTS.map((caption, i) => (
              <DoDontCard
                key={caption}
                variant="dont"
                caption={caption}
                imageLabel={`IMG -- Proibição ${i + 1}`}
                image={`/assets/logo/proibicoes/proibicao-${i + 1}.png`}
              />
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}
