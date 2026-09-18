import { Panel } from "@/components/manual/Panel";
import { Topic } from "@/components/manual/Topic";
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
  { label: "Assinatura cor", src: "/assets/logo/inovaxio-horizontal-cor.svg", bg: "var(--plate-dark)" },
  { label: "Negativa (branco)", src: "/assets/logo/inovaxio-horizontal-branco.svg", bg: "var(--plate-dark)" },
  { label: "Símbolo", src: "/assets/logo/simbolo-cor.svg", bg: "var(--plate-light)" },
  { label: "Monocromático (preto)", src: "/assets/logo/inovaxio-horizontal-preto.svg", bg: "var(--plate-light)" },
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
              // --radius-2xl é a assinatura do site e só lê como intenção em
              // superfície grande: numa placa pequena vira bolha.
              borderRadius:
                minHeight >= 200 ? "var(--radius-2xl)" : "var(--radius-md)",
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
      band="light"
      lead="O símbolo é a âncora visual da marca. Use sempre os arquivos originais, sem recolorização, distorção ou efeitos adicionais."
    >
      <Topic
        wide
        title="Assinatura principal"
        lead="A versão que abre qualquer peça. Só troque por outra quando a proporção ou o fundo exigirem."
      >
        <LogoImage
          src="/assets/logo/inovaxio-vertical-cor.svg"
          alt="Assinatura principal Inovaxio"
          bg="var(--plate-dark)"
          minHeight={280}
          className="hover-media"
        />
      </Topic>

      <Topic
        wide
        title="Versões"
        lead="Quatro arquivos cobrem todo caso de uso. Escolha pela cor do fundo, não pelo gosto."
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(180px, 100%), 1fr))",
            gap: "var(--space-3)",
          }}
        >
          {LOGO_VERSIONS.map((v) => (
            <div key={v.label}>
              <LogoImage src={v.src} alt={v.label} bg={v.bg} minHeight={130} className="hover-card hover-media" />
              <p
                style={{
                  fontSize: "var(--text-caption)",
                  color: "var(--color-text-faint)",
                  marginTop: "var(--space-2)",
                }}
              >
                {v.label}
              </p>
            </div>
          ))}
        </div>
      </Topic>

      <Topic
        wide
        title="Construção"
        lead="O símbolo nasce de um grid e de proporções áureas. Isso não é decoração: é o que mantém o desenho estável em qualquer tamanho."
      >
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
              bg="var(--plate-dark-soft)"
              minHeight={220}
              className="hover-card hover-media"
            />
          ))}
        </div>
      </Topic>

      <Topic
        title="Área de proteção"
        lead="Mantenha ao redor do logo um espaço livre igual à metade da altura do símbolo em todos os lados. Nenhum elemento invade essa área."
      >
        <LogoImage
          src="/assets/logo/area-protecao.png"
          alt="Área de proteção"
          bg="var(--plate-dark-soft)"
          minHeight={220}
          className="hover-card hover-media"
        />
      </Topic>

      <Topic
        title="Tamanho mínimo"
        lead="Abaixo desses valores o desenho perde legibilidade e o símbolo vira mancha."
      >
        <dl style={{ display: "grid", gap: "var(--space-3)" }}>
          {[
            { k: "Símbolo", v: "24px em tela · 10mm impresso" },
            { k: "Assinatura completa", v: "120px em tela · 25mm impresso" },
          ].map((item) => (
            <div
              key={item.k}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "var(--space-4)",
                paddingBottom: "var(--space-3)",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              <dt
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: "var(--text-sm)",
                  color: "var(--color-text)",
                }}
              >
                {item.k}
              </dt>
              <dd
                style={{
                  margin: 0,
                  fontSize: "var(--text-sm)",
                  color: "var(--color-text-muted)",
                  textAlign: "right",
                }}
              >
                {item.v}
              </dd>
            </div>
          ))}
        </dl>
      </Topic>

      <Topic
        wide
        title="Proibições"
        lead="Seis formas de destruir o logo. Cada uma já aconteceu em alguma peça."
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(200px, 100%), 1fr))",
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
      </Topic>
    </Panel>
  );
}
